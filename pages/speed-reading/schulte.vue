<template>
<GameField
  :game-pause="gameStatus.pause"
  @start-game="setGameOnPlayed"
>
  <template v-slot:game>
    <div
      class="game__wrapper"
      :class="currentCssClass"
    >
      <SchulteCard
        v-for="card in cards"
        :key="`${card.number}_number`"
        :card="card"
        :fill-cards="gameSettings.highlight"
        :colored-cards="gameSettings.coloredCards"
        :animation-cards="gameSettings.animation"
        class="game__card"
        :class="currentCssClass"
        @card-click="compareCardNumbers"
      />
    </div>
    <div
      v-if="gameSettings.tip"
      class="game__tip"
    >
      Найдите число {{ currentCardNumber }}
    </div>
  </template>

  <template v-slot:sidebar>
    <SchulteSidebar
      :settings="gameSettings"
      @change-difficulty="changeDifficultyLevel"
      @change-settings="changeGameSettings"
      @reset="resetGame"
    />
  </template>
</GameField>
</template>

<script>
import SchulteCard from '~/components/speedReading/schulte/SchulteCard';
import SchulteSidebar from '~/components/speedReading/schulte/SchulteSidebar';
import GameField from '~/components/shared/elements/GameField';

export default {
  name: 'SchulteGame',

  components: {
    GameField,
    SchulteCard,
    SchulteSidebar,
  },

  data() {
    return {
      gameSettings: {
        cardAmount: 25,
        difficulty: '5x5',
        highlight: true,
        coloredCards: false,
        orally: false,
        animation: true,
        sounds: false,
        animatedBackground: false,
        tip: true,
      },
      gameStatus: {
        played: false,
        stop: false,
        pause: false,
      },
      gameResult: {
        success: false,
        moves: 0,
      },
      currentCardNumber: 1,
      currentCssClass: 'five',
      cards: null,
    };
  },

  computed: {
  },

  mounted() {
    this.cards = this.shuffleCardsArray();
  },

  methods: {
    /**
     * Генерирует массив карточек
     * в завимости от количества cardAmount в gameSettings
     * @returns { Array }
     */
    generateCardsArray() {
      return Array.from(Array(this.gameSettings.cardAmount).keys()).map(i => ({
        number: i + 1,
        status: null,
      }));
    },

    /**
     * Перемешивает массив карточек
     * @returns { Array }
     */
    shuffleCardsArray() {
      const cardsArray = this.generateCardsArray();
      cardsArray.sort(() => Math.random() - 0.5);
      cardsArray.sort(() => Math.random() - 0.5);

      return cardsArray;
    },

    /**
     * Сравнивает карточку на которую кликнули,
     * с карточкой которая должна быть следующей
     * @param number
     */
    compareCardNumbers(number) {
      const card = this.findCardByNumber(number);

      if (number === this.currentCardNumber) {
        this.currentCardNumber += 1;
        card.status = 'success';
      } else {
        card.status = 'error';
        setTimeout(() => {
          card.status = null;
        }, 500);
      }

      if (this.currentCardNumber === this.gameSettings.cardAmount) {
        this.gameStatus.played = false;
        this.gameStatus.stop = true;
        this.gameResult.success = true;
      }

      this.gameResult.moves += 1;
    },

    findCardByNumber(number) {
      return this.cards.find(card => card.number === number);
    },

    /**
     * Изменяет сложность уровня игры
     * @param value
     */
    changeDifficultyLevel(value) {
      this.setGameOnPause();
      this.gameSettings.difficulty = value;
      this.gameSettings.cardAmount = value[0] * value[2];

      this.resetGame();
    },

    /**
     * Изменяет настройки игры
     * @param value
     * @param settingsName
     */
    changeGameSettings(value, settingsName) {
      this.setGameOnPause();
      this.gameSettings[settingsName] = value;
      this.resetGame();
    },

    /**
     * Сбрасывает игру
     */
    resetGame() {
      this.setGameOnPause();
      this.getCurrentClass();
      this.currentCardNumber = 1;
      this.cards = this.shuffleCardsArray();
    },

    setGameOnPause() {
      this.gameStatus.played = false;
      this.gameStatus.pause = true;
    },

    setGameOnPlayed() {
      this.gameStatus.played = true;
      this.gameStatus.pause = false;
    },

    getCurrentClass() {
      switch (this.gameSettings.difficulty) {
      case '5x5':
        this.currentCssClass = 'five';
        break;
      case '6x6':
        this.currentCssClass = 'six';
        break;
      case '7x7':
        this.currentCssClass = 'seven';
        break;
      case '8x8':
        this.currentCssClass = 'eight';
        break;
      case '9x9':
        this.currentCssClass = 'nine';
        break;
      default:
      }
    },
  },
};
</script>
<style scoped lang="stylus">
.game
  &__wrapper
    display flex
    flex-wrap wrap
    &.four,
    &.five
      width 50%
    &.six
      width 70%
    &.seven
      width 75%
    &.eight
      width 90%
    &.nine
      width 100%

  &__card
    &.four
      width calc(100% / 4 - 2px)
    &.five
      width calc(100% / 5 - 2px)
    &.six
      width calc(100% / 6 - 2px)
      /deep/ .card__wrapper
        padding-top 85%
    &.seven
      width calc(100% / 7 - 2px)
      /deep/ .card__wrapper
        padding-top 70%
    &.eight
      width calc(100% / 8 - 2px)
      /deep/ .card__wrapper
        padding-top 50%
    &.nine
      width calc(100% / 9 - 2px)
      /deep/ .card__wrapper
        padding-top 50%
</style>
