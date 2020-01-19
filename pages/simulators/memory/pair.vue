<template>
<SimulatorField
  :simulator-info="simulatorInfo"
  :simulator-pause="status.pause"
  :simulator-final="status.final"
  :final-data="finalData"
  @start-simulator="startSimulator"
  @start-simulator-after-pause="startSimulatorAfterPause"
>
  <template #simulator>
    <div class="pair">
      <transition name="fade">
        <div
          v-if="showSimulator"
          class="pair__main"
        >
          <PairCard
            v-for="(card, index) in roundCards"
            :key="`${index}_card`"
            :card="card"
            :icon-set="settings.cardsImage.value"
            class="pair__card"
            :class="settings.difficulty.value"
            @card-click="handleClick"
          />
        </div>
      </transition>
    </div>
  </template>
  <template #sidebar>
    <Sidebar
      :settings="settings"
      @change-selectable="changeSelectableSettings"
      @reset="resetSimulator"
    >
      <template #info>
        <ul class="sidebar-list">
          <li class="sidebar-item">
            Текущий раунд: {{ roundData.currentRound }}
          </li>
          <li class="sidebar-item">
            Осталось найти пар: {{ remainsFind }}
          </li>
        </ul>
      </template>
    </Sidebar>
  </template>
</SimulatorField>
</template>

<script>
import firebase from 'firebase/app';
import { shuffleArray, searchDuplicateItem } from '~/helpers/functions';
import PairCard from '~/components/memory/pair/PairCard';
import SimulatorField from '~/components/shared/layouts/SimulatorField';
import Sidebar from '~/components/shared/layouts/Sidebar';

export default {
  name: 'PairSimulator',

  components: {
    Sidebar,
    SimulatorField,
    PairCard,
  },

  data() {
    return {
      settings: {
        difficulty: {
          title: 'Сложность',
          value: 'easy',
          name: 'difficulty',
          description: 'легкая',
          options: {
            default: {
              value: 'easy',
              title: 'легкая',
            },
            list: [
              { value: 'easy', title: 'легкая' },
              { value: 'medium', title: 'средняя' },
              { value: 'hard', title: 'сложная' },
            ],
          },
          type: 'selectable',
        },
        cardsImage: {
          title: 'Изображения',
          value: 'animal',
          name: 'cardsImage',
          description: 'животные',
          options: {
            default: {
              value: 'animal',
              title: 'животные',
            },
            list: [
              { value: 'pokemon', title: 'покемоны' },
              { value: 'animal', title: 'животные' },
              { value: 'fruit', title: 'фрукты' },
              { value: 'bird', title: 'птицы' },
              { value: 'flag', title: 'флаги' },
            ],
          },
          type: 'selectable',
        },
        rounds: {
          title: 'Раундов',
          value: 1,
          name: 'rounds',
          options: {
            default: {
              value: 1,
              title: 1,
            },
            list: [
              { value: 1, title: 1 },
              { value: 3, title: 3 },
              { value: 5, title: 5 },
              { value: 10, title: 10 },
            ],
          },
          type: 'selectable',
        },
      },
      configDifficulty: {
        easy: {
          cardsQuantity: 10,
          flipDelay: 1300,
          picturesQuantity: 20,
        },
        medium: {
          cardsQuantity: 15,
          flipDelay: 1200,
          picturesQuantity: 20,
        },
        hard: {
          cardsQuantity: 21,
          flipDelay: 1100,
          picturesQuantity: 21,
        },
      },
      results: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      status: {
        played: false,
        final: false,
        pause: false,
      },
      finalData: {
        difficulty: {
          title: 'Сложность',
          value: null,
        },
        cardsImage: {
          title: 'Изображения',
          value: null,
        },
        cardsQuantity: {
          title: 'Количество карточек',
          value: null,
        },
        correctAnswers: {
          title: 'Правильных ответов',
          value: null,
        },
        incorrectAnswers: {
          title: 'Неправильных ответов',
          value: 0,
        },
      },
      flippedCards: {
        first: null,
        second: null,
      },
      firstClickOnCard: {
        timer: null,
        time: null,
        maxFlipTime: 0,
      },
      roundData: {
        cardsFlipped: 0,
        currentRound: 1,
      },
      roundCards: [],
      pauseBeforeNewRound: false,
      simulatorInfo: null,
    };
  },

  computed: {
    difficulty() {
      return this.settings.difficulty.value;
    },

    showSimulator() {
      return !!(this.roundCards && this.roundCards.length && !this.pauseBeforeNewRound && this.status.played);
    },

    remainsFind() {
      return this.configDifficulty[this.difficulty].cardsQuantity - this.roundData.cardsFlipped;
    },
  },

  watch: {
    firstClickOnCard: {
      handler(val) {
        if (val.time >= val.maxFlipTime) {
          this.flippedCards.first.flip = false;
          this.flippedCards.first = null;

          clearTimeout(val.timer);
        }
      },
      deep: true,
    },
  },

  asyncData() {
    return firebase.database().ref('simulatorsInfo/memory/pair')
      .once('value')
      .then(snap => ({ simulatorInfo: snap.val() }));
  },

  mounted() {
    this.startSimulator();
  },

  methods: {
    setSimulatorOnPlayed() {
      this.status.played = true;
      this.status.final = false;
      this.status.pause = false;
    },

    setSimulatorOnPause() {
      this.status.played = false;
      this.status.final = false;
      this.status.pause = true;
    },

    setSimulatorOnFinal() {
      this.status.played = false;
      this.status.final = true;
      this.status.pause = false;

      this.finalData.difficulty.value = this.settings.difficulty.description;
      this.finalData.cardsImage.value = this.settings.cardsImage.description;
      this.finalData.correctAnswers.value = this.results.correctAnswers;
      this.finalData.incorrectAnswers.value = this.results.incorrectAnswers;
      this.finalData.cardsQuantity.value = this.configDifficulty[this.difficulty].cardsQuantity * 2;
    },

    startSimulator() {
      this.roundData.cardsFlipped = 0;
      this.setSimulatorOnPlayed();
      this.roundCards = this.fillRoundCardsArray();
      this.roundCards = this.shuffleArray(this.roundCards);
    },

    startSimulatorAfterPause() {
      this.resetSimulator();
      this.startSimulator();
    },

    resetSimulator() {
      this.setSimulatorOnPause();
      this.roundData.cardsFlipped = 0;
      this.roundData.currentRound = 1;
      this.roundCards = [];
      this.results.correctAnswers = 0;
      this.results.incorrectAnswers = 0;
    },

    /**
     * Генирирует случайное число от 0 до количевства изображений
     */
    generateRandomNumber() {
      return Math.floor(Math.random() * this.configDifficulty[this.difficulty].picturesQuantity);
    },

    /**
     * Заполняет массив roundCards
     */
    fillRoundCardsArray() {
      const maxArrayLength = this.configDifficulty[this.difficulty].cardsQuantity;

      const fillCardsArray = (index, acc) => {
        if (index === maxArrayLength) return acc;

        const randomNumber = this.generateRandomNumber();

        if (!this.searchDuplicateItem(acc, 'imageIndex', randomNumber)) {
          acc.push(
            {
              imageIndex: randomNumber,
              success: false,
              flip: false,
            },
          );
          return fillCardsArray(index + 1, acc);
        }
        return fillCardsArray(index, acc);
      };

      let cardsArray = fillCardsArray(0, []);
      cardsArray = this.duplicateArray(cardsArray);
      cardsArray.forEach((item, index) => {
        item.id = index + 1;
      });

      return cardsArray;
    },

    /**
     * Дублирует имеющиеся элементы в массиве
     */
    duplicateArray(array) {
      const localArray = array;
      const duplicateArray = JSON.parse(JSON.stringify(localArray));
      localArray.push(...duplicateArray);

      return localArray;
    },

    /**
     * Ищет карту в массиве карточек игры и возвращает ее
     */
    findCard(id) {
      return this.roundCards.find(item => item.id === id);
    },

    /**
     * Сравнивает перевернутые карточки
     */
    comparesCards() {
      if (this.flippedCards.first.imageIndex === this.flippedCards.second.imageIndex) {
        setTimeout(() => {
          this.flippedCards.first.success = true;
          this.flippedCards.second.success = true;
          this.flippedCards.first = null;
          this.flippedCards.second = null;
        }, 300);

        this.results.correctAnswers += 1;
        this.roundData.cardsFlipped += 1;
      } else {
        this.results.incorrectAnswers += 1;
        setTimeout(() => {
          this.flippedCards.first.flip = false;
          this.flippedCards.second.flip = false;
          this.flippedCards.first = null;
          this.flippedCards.second = null;
        }, 300);
      }

      if (this.configDifficulty[this.difficulty].cardsQuantity === this.roundData.cardsFlipped) {
        if (this.roundData.currentRound === this.settings.rounds.value) {
          this.setSimulatorOnFinal();
        } else {
          this.roundData.currentRound += 1;
          this.pauseBeforeNewRound = true;
          this.startSimulator();
          setTimeout(() => {
            this.pauseBeforeNewRound = false;
          }, 200);
        }
      }
    },

    handleClick({ id }) {
      if (!this.flippedCards.first) {
        this.firstClickOnCard.time = Date.now();

        this.firstClickOnCard.maxFlipTime = Date.now()
          + this.configDifficulty[this.difficulty].flipDelay;

        this.firstClickOnCard.timer = setInterval(() => {
          this.firstClickOnCard.time = Date.now();
        }, 200);

        this.flippedCards.first = this.findCard(id);
        this.flippedCards.first.flip = true;
      } else if (!this.flippedCards.second) {
        clearInterval(this.firstClickOnCard.timer);
        this.flippedCards.second = this.findCard(id);
        this.flippedCards.second.flip = true;
        this.comparesCards();
      }
    },

    changeSelectableSettings({ settingName, settingValue, settingDescription }) {
      this.settings[settingName].value = settingValue;
      this.settings[settingName].description = settingValue;
      this.settings[settingName].description = settingDescription;
      this.resetSimulator();
    },

    shuffleArray,
    searchDuplicateItem,
  },
};
</script>

<style lang="stylus" scoped>
.section
  margin-top 50px

.pair
  position relative
  display flex
  justify-content center
  align-self center
  width 100%

  &__main
    display flex
    justify-content space-between
    flex-wrap wrap
    width 75%
    &.easy
      width 67%

  &__card
    &.easy
      width calc(100% / 5 - 5px)
      margin-bottom 5px
    &.medium
      width calc(100% / 6 - 5px)
      margin-bottom 5px
    &.hard
      width calc(100% / 7 - 3px)
      margin-bottom 3px
</style>
