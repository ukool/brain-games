<template>
<SimulatorField
  :simulator-info="simulatorInfo"
  :simulator-pause="status.pause"
  :simulator-final="status.final"
  :final-data="finalData"
  @start-simulator="startSimulator"
  @start-simulator-after-pause="startSimulator"
>
  <template #simulator>
    <div class="homophones">
      <transition name="fade">
        <div
          v-if="status.played && !pauseBeforeNewRound"
          class="homophones__wrapper"
        >
          <template v-if="roundsCards.length">
            <HomophonesCard
              v-for="(card, index) in roundsCards"
              :key="index"
              :card="card"
              class="homophones__card"
              :class="settings.difficulty.value"
              :difficulty="difficulty"
              @click-card="listenerClickCard"
            />
          </template>
        </div>
      </transition>
    </div>
  </template>


  <template #sidebar>
    <Sidebar
      :settings="settings"
      @change-selectable="changeSwitchableSettings"
      @reset="resetSimulator"
    >
      <template #info>
        <ul class="sidebar-list">
          <li class="sidebar-item">
            Текущий раунд: {{ roundData.currentRound }}
          </li>
          <li class="sidebar-item">
            Осталось найти: {{ remainsFind }}
          </li>
        </ul>
      </template>
    </Sidebar>
  </template>
</SimulatorField>
</template>

<script>
import firebase from 'firebase/app';
import homophones from '~/helpers/homophones';
import { shuffleArray, searchDuplicateItem } from '~/helpers/functions';
import SimulatorField from '~/components/shared/layouts/SimulatorField';
import Sidebar from '~/components/shared/layouts/Sidebar';
import HomophonesCard from '~/components/reading/homophones/HomophonesCard';

export default {
  name: 'HomophonesSimulator',

  components: {
    SimulatorField,
    Sidebar,
    HomophonesCard,
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
        rounds: {
          title: 'Раундов',
          value: 10,
          name: 'rounds',
          options: {
            default: {
              value: 10,
              title: 10,
            },
            list: [
              { value: 10, title: 10 },
              { value: 15, title: 15 },
              { value: 20, title: 20 },
            ],
          },
          type: 'selectable',
        },
      },
      configDifficulty: {
        easy: {
          homophonesCards: 5,
          repeatCard: 15,
        },
        medium: {
          homophonesCards: 4,
          repeatCard: 21,
        },
        hard: {
          homophonesCards: 3,
          repeatCard: 27,
        },
      },
      results: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      finalData: {
        difficulty: {
          title: 'Сложность',
          value: null,
        },
        correctAnswers: {
          title: 'Правильных ответов',
          value: null,
        },
        incorrectAnswers: {
          title: 'Неправильных ответов',
          value: null,
        },
        rounds: {
          title: 'Количество раундов',
          value: null,
        },
      },
      status: {
        played: false,
        final: false,
        pause: false,
      },
      roundData: {
        correctAnswers: 0,
        currentRound: 1,
      },
      homophones,
      homophonesCards: [],
      repeatCards: [],
      roundsCards: [],
      pauseBeforeNewRound: false,
      simulatorInfo: null,
    };
  },

  computed: {
    difficulty() {
      return this.settings.difficulty.value;
    },

    remainsFind() {
      return this.configDifficulty[this.difficulty].homophonesCards - this.roundData.correctAnswers;
    },
  },

  asyncData() {
    return firebase.database().ref('simulatorsInfo/memory/remember-number')
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
      this.finalData.correctAnswers.value = this.results.correctAnswers;
      this.finalData.incorrectAnswers.value = this.results.incorrectAnswers;
      this.finalData.rounds.value = this.settings.rounds.value;
    },

    startSimulator() {
      this.setSimulatorOnPlayed();
      this.roundData.correctAnswers = 0;
      this.homophonesCards = this.fillHomophonesCards();
      this.repeatCards = this.fillCardsDuplicateWords();
      this.roundsCards = [...this.homophonesCards, ...this.repeatCards];

      this.roundsCards = this.shuffleArray(this.roundsCards, 4);
    },

    resetSimulator() {
      this.roundData.currentRound = 1;
      this.setSimulatorOnPause();
    },

    /**
     * Генерирует случайное число где максимальное число это длинна массива homophones
     */
    generateRandomNumber() {
      return Math.floor(Math.random() * this.homophones.length);
    },

    fillHomophonesCards() {
      const fillHomophones = (index, acc) => {
        if (index === this.configDifficulty[this.difficulty].homophonesCards) return acc;

        const randomNumber = this.generateRandomNumber();
        const randomFirstValue = this.homophones[randomNumber].valueFirst;

        if (!this.searchDuplicateItem(this.homophonesCards, 'searchDuplicateItem', randomFirstValue)) {
          acc.push({
            valueFirst: this.homophones[randomNumber].valueFirst,
            valueSecond: this.homophones[randomNumber].valueSecond,
            success: false,
            error: false,
          });
          return fillHomophones(index + 1, acc);
        }
        return fillHomophones(index, acc);
      };

      return fillHomophones(0, []);
    },

    fillCardsDuplicateWords() {
      const fillCards = (index, acc) => {
        if (index === this.configDifficulty[this.difficulty].repeatCard) return acc;

        const randomNumber = this.generateRandomNumber();
        const randomFirstValue = this.homophones[randomNumber].valueFirst;

        if (!this.searchDuplicateItem(this.homophonesCards, 'valueFirst', randomFirstValue)) {
          acc.push({
            valueFirst: this.homophones[randomNumber].valueFirst,
            valueSecond: this.homophones[randomNumber].valueFirst,
            success: false,
            error: false,
          });
          return fillCards(index + 1, acc);
        }
        return fillCards(index, acc);
      };

      return fillCards(0, []);
    },

    changeSwitchableSettings(settingName, settingValue) {
      this.setSimulatorOnPause();
      this.settings[settingName].value = settingValue;
      this.settings[settingName].description = settingValue;

      this.resetSimulator();
    },

    listenerClickCard(valueFirst, valueSecond) {
      const clickedCard = this.roundsCards.find(item => item.valueFirst === valueFirst);

      if (valueFirst !== valueSecond) {
        this.roundData.correctAnswers += 1;
        this.results.correctAnswers += 1;
        clickedCard.success = true;
      } else if (valueFirst === valueSecond) {
        this.results.incorrectAnswers += 1;
        clickedCard.error = true;

        setTimeout(() => {
          clickedCard.error = false;
        }, 300);
      }

      if (this.roundData.correctAnswers === this.configDifficulty[this.difficulty].homophonesCards) {
        if (this.roundData.currentRound === this.settings.rounds.value) {
          this.setSimulatorOnFinal();
        } else {
          this.pauseBeforeNewRound = true;
          setTimeout(() => {
            this.startSimulator();
            this.pauseBeforeNewRound = false;
            this.roundData.currentRound += 1;
          }, 200);
        }
      }
    },

    shuffleArray,
    searchDuplicateItem,
  },
};
</script>

<style lang="stylus" scoped>
.homophones
  position relative
  display flex
  justify-content center
  align-self center
  flex-wrap wrap
  width 100%
  background-color #fff

  &__wrapper
    display flex
    flex-wrap wrap
    justify-content space-between
    width 60%

  &__card
    margin-bottom 10px
    &.easy
      width calc(100% / 4 - 10px)
    &.medium
      width calc(100% / 5 - 10px)
    &.hard
      width calc(100% / 5 - 10px)

.sidebar-item
  &:not(:first-of-type)
    margin-top 15px
</style>
