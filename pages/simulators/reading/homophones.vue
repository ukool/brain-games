<template>
<section class="section">
  <div class="container game">
    <div class="row">
      <div class="game__field">
        <div class="game__inner">
          <HomophonesCard
            v-for="(card, index) in cards"
            :key="index"
            :card="card"
            class="game__card"
            :class="gameSettings.difficulty"
            @click-card="listenerClickCard"
          />
        </div>
      </div>

      <aside class="game__sidebar">
      </aside>
    </div>
  </div>
</section>
</template>

<script>
import homophones from '~/supportingData/homophones';
import HomophonesCard from '~/components/reading/homophones/HomophonesCard';

export default {
  components: {
    HomophonesCard,
  },

  data() {
    return {
      homophones,

      gameSettings: {
        difficulty: 'easy',
        rounds: 10,
        homophonesCard: 6,
        repeatCard: 14,
      },
      gameResult: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      gameStatus: {
        start: false,
        complete: false,
      },

      cards: [],
    };
  },

  mounted() {
    this.fillHomophonesCards();
  },

  methods: {
    /**
     * Генерирует случайное число где максимальное число это длинна массива homophones
     */
    generateRandomNumber() {
      const randomNumber = Math.floor(Math.random() * this.homophones.length);

      return randomNumber;
    },

    fillHomophonesCards() {
      let i = 0;

      while (i < this.gameSettings.homophonesCard) {
        const randomNumber = this.generateRandomNumber();
        const randomFirstValue = this.homophones[randomNumber].valueFirst;

        if (!this.searchDublicateValue(this.cards, randomFirstValue)) {
          this.cards.push({
            valueFirst: this.homophones[randomNumber].valueFirst,
            valueSecond: this.homophones[randomNumber].valueSecond,
            success: false,
            error: false,
          });

          i += 1;
        }
      }

      this.fillCardsDublicateWords();
    },

    fillCardsDublicateWords() {
      let i = 0;

      while (i < this.gameSettings.repeatCard) {
        const randomNumber = this.generateRandomNumber();
        const randomFirstValue = this.homophones[randomNumber].valueFirst;

        if (!this.searchDublicateValue(this.cards, randomFirstValue)) {
          this.cards.push({
            valueFirst: this.homophones[randomNumber].valueFirst,
            valueSecond: this.homophones[randomNumber].valueFirst,
            success: false,
            error: false,
          });

          i += 1;
        }
      }

      this.shuffleCardsArray();
    },

    /**
     * Ищет дубликаты
     */
    searchDublicateValue(array, value) {
      let dublicate = false;

      array.forEach((item) => {
        if (item.valueFirst === value) {
          dublicate = true;
        }
      });

      return dublicate;
    },

    /**
     * Перемешивает массив с карточками
     */
    shuffleCardsArray() {
      this.cards.sort(() => Math.random() - 0.5);
      this.cards.sort(() => Math.random() - 0.5);
      this.cards.sort(() => Math.random() - 0.5);
    },

    // Слушатели кастомных событий

    listenerClickCard(valueFirst, valueSecond) {
      const clickedCard = this.cards.find(item => item.valueFirst === valueFirst);

      if (valueFirst !== valueSecond) {
        this.gameResult.correctAnswers += 1;
        clickedCard.success = true;
      } else if (valueFirst === valueSecond) {
        this.gameResult.incorrectAnswers += 1;
        clickedCard.error = true;

        setTimeout(() => {
          clickedCard.error = false;
        }, 300);
      }

      if (this.gameResult.correctAnswers === this.gameSettings.homophonesCard) {
        this.gameStatus.complete = true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.game
  &__field
    position relative
    display flex
    justify-content center
    flex-wrap wrap
    width 75%
    margin-right auto
    background-color #fff

  &__inner
    width 50%
    display flex
    flex-wrap wrap
    justify-content space-between

  &__card
    margin-bottom 15px
    &.easy
      width calc(100% / 4 - 10px)
</style>
