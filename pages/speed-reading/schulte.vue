<template>
<section class="section">
  <div class="container">
    <div class="row">
      <!-- <SuccessModal /> -->
      <div class="game__field">
        <div
          v-if="gameSettings.tip"
          class="game__tip"
        >
          Найдите число {{ currentCardNumber }}
        </div>
        <div
          class="game__inner"
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
      </div>
      <div class="game__sidebar">
        <SchulteSidebar
          :settings="gameSettings"
          @change-difficulty="changeDifficultyLevel"
          @change-settings="changeGameSettings"
          @reset="resetGame"
        />
      </div>
    </div>
  </div>
</section>
</template>

<script>
import SuccessModal from '~/components/shared/modal/SuccessModal';
import SchulteCard from '~/components/speedReading/schulte/SchulteCard';
import SchulteSidebar from '~/components/speedReading/schulte/SchulteSidebar';

export default {
  components: {
    SchulteCard,
    SchulteSidebar,
    SuccessModal,
  },

  data() {
    return {
      gameSettings: {
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
        start: false,
        stop: false,
        success: false,
      },
      currentCardNumber: 1,
      currentCssClass: 'five',
      cards: null,
      cardAmount: 25,
    };
  },

  computed: {
  },

  mounted() {
    this.cards = this.shuffleCardsArray();
  },

  methods: {
    generateCardsArray() {
      return Array.from(Array(this.cardAmount).keys()).map(i => ({
        number: i + 1,
        status: null,
      }));
    },

    shuffleCardsArray() {
      const cardsArray = this.generateCardsArray();
      cardsArray.sort(() => Math.random() - 0.5);
      cardsArray.sort(() => Math.random() - 0.5);

      return cardsArray;
    },

    cardClickListener(value) {
      console.log(value);
    },

    compareCardNumbers(value) {
      const card = this.findCardByValue(value);

      if (value === this.currentCardNumber) {
        this.currentCardNumber += 1;
        card.status = 'success';
      } else {
        card.status = 'error';
        setTimeout(() => {
          card.status = null;
        }, 500);
      }

      if (this.currentCardNumber === this.cardAmount) {
        this.gameStatus.stop = true;
        this.gameStatus.success = true;
      }
    },

    findCardByValue(value) {
      return this.cards.find(card => card.number === value);
    },

    changeDifficultyLevel(value) {
      this.gameSettings.difficulty = value;
      this.cardAmount = value[0] * value[2];

      this.resetGame();
    },

    changeGameSettings(value, settingsName) {
      this.gameSettings[settingsName] = value;
      this.resetGame();
    },

    resetGame() {
      this.getCurrentClass();
      this.currentCardNumber = 1;
      this.cards = this.shuffleCardsArray();
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

<style lang="stylus" scoped>
.section
  margin-top 50px

.game
  &__field
    position relative
    padding-top 45px
    display flex
    justify-content center
    flex-wrap wrap
    width 75%
    margin-right auto

  &__tip
    position absolute
    top 0
    left 50%
    transform translateX(-50%)

  &__inner
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


  &__sidebar
    width 23%

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
