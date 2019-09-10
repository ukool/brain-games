<template>
<section class="section">
  <div class="container">
    <div class="row">
      <div
        v-if="gameSuccess"
        class="memory__modal"
      >
        <svg-icon
          name="fireworks"
          width="150"
          heigth="150"
        />
        <h2 class="memory__title">
          Ура!
          <br>
          Вы выиграли!
        </h2>

        <button
          class="memory__button"
          type="button"
        >
          Повторить
        </button>
      </div>
      <div class="memory__field">
        <PairCard
          v-for="(card, index) in cardNumbers"
          :key="index"
          :card="card"
          :name="images"
          class="memory__card"
          :class="getActuallyCardClass()"
          @card-click="handleClick"
        />
      </div>
      <div class="memory__sidebar">
        {{ gameSuccess }}
        <PairSidebar
          :moves="moves"
          :game-success="gameSuccess"
          @change-difficulty="changeDifficultyLevel"
          @change-images="changeImages"
        />
      </div>
    </div>
  </div>
</section>
</template>

<script>
import PairCard from '~/components/memory/pair/PairCard';
import PairSidebar from '~/components/memory/pair/PairSidebar';

export default {
  components: {
    PairCard,
    PairSidebar,
  },

  data() {
    return {
      amountPictures: 20,
      cardAmount: 10,
      cardNumbers: [],
      firstFlipCard: null,
      secondFlipCard: null,
      success: false,
      correctAnswersCount: 0,
      levelDifficulty: 'easy',
      images: 'animal',
      moves: 0,
      gameSuccess: false,
    };
  },

  watch: {
    levelDifficulty(value) {
      console.log('watch');
      this.levelDifficulty = value;
      this.changeCardAmount(this.levelDifficulty);
      this.resetGame();
    },

    images(value) {
      this.images = value;
    },
  },

  mounted() {
    this.cardNumbers = this.shuffleCardsArray();
  },

  methods: {
    changeCardAmount(level) {
      if (level === 'easy') {
        this.cardAmount = 10;
      } else if (level === 'medium') {
        this.cardAmount = 15;
      } else if (level === 'hard') {
        this.amountPictures = 21;
        this.cardAmount = 21;
      }
    },

    generateRandomNumber() {
      return Math.floor(Math.random() * this.amountPictures);
    },

    fillArray() {
      const array = [];

      let i = 0;

      while (i < this.cardAmount) {
        const randomNumber = this.generateRandomNumber();

        if (!this.searchDublicateValue(array, randomNumber)) {
          array.push(
            {
              imageIndex: randomNumber,
              success: false,
              flip: false,
            },
          );
          i += 1;
        }
      }

      return array;
    },

    searchDublicateValue(array, value) {
      let dublicate = false;

      array.forEach((item) => {
        if (item.imageIndex === value) {
          dublicate = true;
        }
      });

      return dublicate;
    },

    dublicateCardsArray() {
      const cardsArray = this.fillArray();
      const dublicateArray = JSON.parse(JSON.stringify(cardsArray));

      cardsArray.push(...dublicateArray);

      return cardsArray;
    },

    addIdToCardsArray() {
      let i = 0;
      const cardsArray = this.dublicateCardsArray();

      cardsArray.forEach((item) => {
        item.id = i;
        i += 1;
      });

      return cardsArray;
    },

    shuffleCardsArray() {
      return this.addIdToCardsArray().sort(() => Math.random() - 0.5);
    },

    handleClick(id) {
      if (!this.firstFlipCard) {
        this.firstFlipCard = this.findCard(id);
        this.firstFlipCard.flip = true;
        this.moves += 1;
      } else if (!this.secondFlipCard) {
        this.secondFlipCard = this.findCard(id);
        this.secondFlipCard.flip = true;
        this.moves += 1;
        this.comparesCards();
      }
    },

    comparesCards() {
      if (this.firstFlipCard.imageIndex === this.secondFlipCard.imageIndex) {
        setTimeout(() => {
          this.firstFlipCard.success = true;
          this.secondFlipCard.success = true;
          this.firstFlipCard = null;
          this.secondFlipCard = null;
        }, 300);

        this.correctAnswersCount += 1;

        if (this.cardAmount === this.correctAnswersCount ) {
          this.gameSuccess = true;
        }
      } else {
        setTimeout(() => {
          this.firstFlipCard.flip = false;
          this.secondFlipCard.flip = false;
          this.firstFlipCard = null;
          this.secondFlipCard = null;
        }, 400);
      }
    },

    findCard(id) {
      return this.cardNumbers.find(item => item.id === id);
    },

    resetGame() {
      console.log('reset')
      this.cardNumbers = this.shuffleCardsArray();
    },

    changeDifficultyLevel(value) {
      this.levelDifficulty = value;
      console.log(this.levelDifficulty);
    },

    changeImages(value) {
      this.images = value;
      this.resetGame();
    },

    getActuallyCardClass() {
      if (this.levelDifficulty === 'easy') return 'easy';
      if (this.levelDifficulty === 'medium') return 'medium';
      if (this.levelDifficulty === 'hard') return 'hard';
    },
  },
};
</script>

<style lang="stylus" scoped>
.section
  margin-top 50px

.memory
  &__field
    display flex
    justify-content space-between
    flex-wrap wrap
    width 75%
    margin-right auto

  &__sidebar
    width 23%

  &__card
    &.easy
      width calc(100% / 5 - 5px)
    &.medium
      width calc(100% / 6 - 5px)
    &.hard
      width calc(100% / 7 - 10px)

  &__modal
    position fixed
    top 0
    left 0
    display flex
    flex-direction column
    align-items center
    justify-content center
    width 100%
    height 100%
    z-index 20
    background-color rgba(#000, 0.3)

  &__title
    margin-top 20px
    font-size 60px
    text-align center

  &__button
    margin-top 30px
</style>
