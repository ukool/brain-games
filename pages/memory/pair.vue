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
      <div
        class="memory__field"
        :class="gameSettings.difficulty"
      >
        <PlugPlayButton
          v-if="showPlugStartGame"
        />
        <transition name="fade">
          <Countdown
            v-if="showCountdown"
          />
        </transition>

        <template v-if="!showPlugStartGame && !showCountdown && gameCards.length">
          <PairCard
            v-for="(card, index) in gameCards"
            :key="`${index}_card`"
            :card="card"
            :name="gameSettings.images"
            class="memory__card"
            :class="gameSettings.difficulty"
            @card-click="handlerClick"
          />
        </template>
      </div>
      <div class="memory__sidebar">
        {{ gameSuccess }}
        <PairSidebar
          :moves="gameResult.moves"
          :game-success="gameSuccess"
          @change-difficulty="listenerChangeDifficultyLevel"
          @change-images="listenerChangeImages"
        />
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapState } from 'vuex';
import PairCard from '~/components/memory/pair/PairCard';
import PairSidebar from '~/components/memory/pair/PairSidebar';

export default {
  components: {
    PairCard,
    PairSidebar,
  },

  data() {
    return {
      gameSettings: {
        difficulty: 'easy',
        images: 'animal',
        picturesAmount: 20,
        cardAmount: 10,
      },

      gameResult: {
        moves: 0,
      },

      gameStatus: {
        start: false,
        complete: false,
      },

      flippedCards: {
        first: null,
        second: null,
        identically: false,
      },

      gameCards: [],

      correctAnswersCount: 0,
      levelDifficulty: 'easy',
      gameSuccess: false,
    };
  },

  computed: {
    ...mapState('plugStartGame', ['showPlugStartGame']),
    ...mapState('countdown', ['showCountdown']),
    ...mapState('resetGame', ['resetGame']),
  },

  watch: {
    resetGame(value) {
      if (value) {
        this.$store.commit('resetGame/startGame');
        this.$store.commit('plugStartGame/showPlugStartGame');
        this.startGame();
      }
    },
  },

  mounted() {
    this.startGame();
  },

  destroyed() {
    this.$store.commit('plugStartGame/showPlugStartGame');
    this.$store.commit('countdown/hideCountdown');
  },

  methods: {
    /**
     * Генирирует случайное число от 0 до количевства изображений
     */
    generateRandomNumber() {
      return Math.floor(Math.random() * this.gameSettings.picturesAmount);
    },

    /**
     * Заполняет массив gameCards
     */
    fillGameCardsArray() {
      const gameArray = [];

      let i = 0;

      while (i < this.gameSettings.cardAmount) {
        const randomNumber = this.generateRandomNumber();

        if (!this.searchDublicateValue(gameArray, randomNumber)) {
          gameArray.push(
            {
              imageIndex: randomNumber,
              success: false,
              flip: false,
            },
          );
          i += 1;
        }
      }

      return gameArray;
    },

    /**
     * Ищет дубликаты в массиве
     */
    searchDublicateValue(array, value) {
      let dublicate = false;

      array.forEach((item) => {
        if (item.imageIndex === value) {
          dublicate = true;
        }
      });

      return dublicate;
    },

    /**
     * Дублирует имеющиеся элементы в массиве
     */
    dublicateGameCardsArray() {
      const gameCards = this.fillGameCardsArray();
      const dublicateArray = JSON.parse(JSON.stringify(gameCards));

      gameCards.push(...dublicateArray);

      return gameCards;
    },

    /**
     * Добаляет к каждому элементу массива id
     */
    addIdToGameCardsArray() {
      let i = 0;
      const gameCards = this.dublicateGameCardsArray();

      gameCards.forEach((item) => {
        item.id = i;
        i += 1;
      });

      return gameCards;
    },

    /**
     * Перемешивает массив
     */
    shuffleGameCardsArray() {
      const gameCards = this.addIdToGameCardsArray();

      gameCards.sort(() => Math.random() - 0.5);
      gameCards.sort(() => Math.random() - 0.5);
      gameCards.sort(() => Math.random() - 0.5);

      return gameCards;
    },

    /**
     * Ищет карту в массиве и возвращает ее
     */
    findGameCard(id) {
      return this.gameCards.find(item => item.id === id);
    },

    startGame() {
      if (this.gameSettings.difficulty === 'easy') this.startEasyGame();
      else if (this.gameSettings.difficulty === 'medium') this.startMediumGame();
      else if (this.gameSettings.difficulty === 'hard') this.startHardGame();
    },

    startEasyGame() {
      this.gameSettings.cardAmount = 10;
      this.gameCards = this.shuffleGameCardsArray();
    },

    startMediumGame() {
      this.gameSettings.cardAmount = 15;
      this.gameCards = this.shuffleGameCardsArray();
    },

    startHardGame() {
      this.gameSettings.cardAmount = 21;
      this.gameSettings.picturesAmount = 21;
      this.gameCards = this.shuffleGameCardsArray();
    },

    /**
     * Сбрасывает игру
     */
    resetGame() {
      console.log('reset')
      this.gameCards = this.shuffleGameCardsArray();
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

        this.correctAnswersCount += 1;

        if (this.gameSettings.cardAmount === this.correctAnswersCount) {
          this.gameSuccess = true;
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

    // Обработчики событий

    handlerClick(id) {
      if (!this.flippedCards.first) {
        this.flippedCards.first = this.findGameCard(id);
        this.flippedCards.first.flip = true;
        this.gameResult.moves += 1;
      } else if (!this.flippedCards.second) {
        this.flippedCards.second = this.findGameCard(id);
        this.flippedCards.second.flip = true;
        this.gameResult.moves += 1;
        this.comparesCards();
      }
    },

    // Слушатели кастомных событий

    listenerChangeDifficultyLevel(level) {
      this.gameSettings.difficulty = level;
      this.$store.commit('plugStartGame/showPlugStartGame');

      this.startGame();
    },

    listenerChangeImages(value) {
      this.gameSettings.images = value;
      this.$store.commit('plugStartGame/showPlugStartGame');

      this.startGame();
    },
  },
};
</script>

<style lang="stylus" scoped>
.section
  margin-top 50px

.memory
  &__field
    position relative
    display flex
    justify-content space-between
    flex-wrap wrap
    width 75%
    margin-right auto
    &.easy
      width 67%

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
