<template>
<GameField
  :simulator-info="simulatorInfo"
  :game-pause="gameStatus.pause"
  :game-final="gameStatus.final"
  :final-modal-data="gameFinalData"
  @start-game="setGameOnPlayed"
  @start-game-after-pause="setGameOnPlayed"
>
  <template #game>
    <div class="game__wrapper">
      <div
        v-show="gameStatus.played"
        class="game__main"
      >
        <PairCard
          v-for="(card, index) in gameCards"
          :key="`${index}_card`"
          :card="card"
          :icon-set="gameSettings.cardsImage.value"
          class="game__card"
          :class="gameSettings.difficulty.value"
          @card-click="handleClick"
        />
      </div>
    </div>
  </template>
  <template #sidebar>
    <Sidebar
      :settings="gameSettings"
      @change-difficulty="changeDifficultyLevel"
      @reset="resetGame(true)"
    />
  </template>
</GameField>
</template>

<script>
import firebase from 'firebase/app';
import PairCard from '~/components/memory/pair/PairCard';
import GameField from '~/components/shared/layouts/GameField';
import Sidebar from '~/components/shared/layouts/Sidebar';

export default {
  name: 'PairSimulator',

  components: {
    Sidebar,
    GameField,
    PairCard,
  },

  data() {
    return {
      gameSettings: {
        difficulty: {
          title: 'Сложность',
          value: 'easy',
          name: 'difficulty',
          options: {
            default: {
              value: 'easy',
              title: 'легкий',
            },
            list: [
              { value: 'easy', title: 'легкий' },
              { value: 'medium', title: 'средний' },
              { value: 'hard', title: 'сложный' },
            ],
          },
          type: 'selectable',
        },
        cardsImage: {
          title: 'Изображения',
          value: 'animal',
          name: 'cardsImage',
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
        picturesQuantity: 20,
        cardQuantity: 10,
        flipDelay: {
          easy: 1200,
          medium: 1100,
          hard: 900,
        },
      },
      gameResult: {
        moves: 0,
        correctAnswersCount: 0,
      },
      gameStatus: {
        played: false,
        final: false,
        pause: false,
      },
      gameFinalData: {
        difficulty: {
          title: 'Сложность',
          value: null,
        },
        cardsImage: {
          title: 'Изображения',
          value: null,
        },
        cardQuantity: {
          title: 'Количество карточек',
          value: null,
        },
        moves: {
          title: 'Количество ходов',
          value: null,
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
      gameCards: [],
      simulatorInfo: null,
    };
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

  methods: {
    /**
     * Устанавливает игру в режим "игра начата"
     */
    setGameOnPlayed() {
      this.gameStatus.played = true;
      this.gameStatus.pause = false;
      this.gameStatus.final = false;

      this.startGame();
    },

    /**
     * Устанавливает игру в режим паузы
     */
    setGameOnPause() {
      this.gameStatus.played = false;
      this.gameStatus.pause = true;
    },

    /**
     * Устанавливает игру в режим "игра закончена"
     */
    setGameOnFinal() {
      this.gameStatus.played = false;
      this.gameStatus.final = true;

      this.gameFinalData.difficulty.value = this.gameSettings.difficulty.title;
      this.gameFinalData.moves.value = this.gameResult.moves;
      this.gameFinalData.cardsImage.value = this.gameSettings.cardsImage.title;
      this.gameFinalData.cardQuantity.value = this.gameSettings.cardQuantity;
      this.gameFinalData.cardsImage.value = this.gameSettings.cardsImage.title;
    },

    startGame() {
      if (this.gameSettings.difficulty.value === 'easy') this.startEasyGame();
      else if (this.gameSettings.difficulty.value === 'medium') this.startMediumGame();
      else if (this.gameSettings.difficulty.value === 'hard') this.startHardGame();
    },

    startEasyGame() {
      this.gameSettings.cardQuantity = 10;
      this.gameCards = this.fillGameCardsArray();
    },

    startMediumGame() {
      this.gameSettings.cardQuantity = 15;
      this.gameCards = this.fillGameCardsArray();
    },

    startHardGame() {
      this.gameSettings.cardQuantity = 21;
      this.gameSettings.picturesQuantity = 21;
      this.gameCards = this.fillGameCardsArray();
    },

    /**
     * Сбрасывает игру
     */
    resetGame() {
      this.setGameOnPause();
      this.gameCards = this.fillGameCardsArray();
    },

    /**
     * Генирирует случайное число от 0 до количевства изображений
     */
    generateRandomNumber() {
      return Math.floor(Math.random() * this.gameSettings.picturesQuantity);
    },

    /**
     * Заполняет массив gameCards
     */
    fillGameCardsArray() {
      const maxArrayLength = this.gameSettings.cardQuantity;

      const fillCardsArray = (index, acc) => {
        if (index === maxArrayLength) return acc;

        const randomNumber = this.generateRandomNumber();

        if (!this.searchDuplicateValue(acc, randomNumber)) {
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
      cardsArray = this.shuffleArray(cardsArray);

      return cardsArray;
    },

    /**
     * Ищет дубликаты в массиве
     */
    searchDuplicateValue(array, value) {
      let duplicate = false;

      array.forEach((item) => {
        if (item.imageIndex === value) {
          duplicate = true;
        }
      });

      return duplicate;
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
     * Перемешивает массив
     */
    shuffleArray(array, quantity = 3) {
      const sort = () => Math.random() - 0.5;

      const shuffle = (index) => {
        if (index === quantity) return array;
        array.sort(sort);
        return shuffle(index + 1);
      };

      return shuffle(0);
    },

    /**
     * Ищет карту в массиве карточек игры и возвращает ее
     */
    findGameCard(id) {
      return this.gameCards.find(item => item.id === id);
    },

    /**
     * Сравнивает перевернутые карты
     */
    comparesCards() {
      if (this.flippedCards.first.imageIndex === this.flippedCards.second.imageIndex) {
        setTimeout(() => {
          this.flippedCards.first.success = true;
          this.flippedCards.second.success = true;
          this.flippedCards.first = null;
          this.flippedCards.second = null;
        }, 300);

        this.gameResult.correctAnswersCount += 1;

        if (this.gameSettings.cardQuantity === this.gameResult.correctAnswersCount) {
          this.setGameOnFinal();
        }
      } else {
        setTimeout(() => {
          this.flippedCards.first.flip = false;
          this.flippedCards.second.flip = false;
          this.flippedCards.first = null;
          this.flippedCards.second = null;
        }, 300);
      }
    },

    handleClick({ id }) {
      if (!this.flippedCards.first) {
        this.firstClickOnCard.time = Date.now();

        this.firstClickOnCard.maxFlipTime = Date.now()
          + this.gameSettings.flipDelay[this.gameSettings.difficulty.value];

        this.firstClickOnCard.timer = setInterval(() => {
          this.firstClickOnCard.time = Date.now();
        }, 100);

        this.flippedCards.first = this.findGameCard(id);
        this.flippedCards.first.flip = true;
        this.gameResult.moves += 1;
      } else if (!this.flippedCards.second) {
        clearInterval(this.firstClickOnCard.timer);
        this.flippedCards.second = this.findGameCard(id);
        this.flippedCards.second.flip = true;
        this.gameResult.moves += 1;
        this.comparesCards();
      }
    },

    changeDifficultyLevel(settingName, settingValue) {
      this.setGameOnPause();
      this.gameSettings[settingName].value = settingValue;
    },
  },
};
</script>

<style lang="stylus" scoped>
.section
  margin-top 50px

.game
  &__wrapper
    position relative
    display flex
    justify-content center
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
