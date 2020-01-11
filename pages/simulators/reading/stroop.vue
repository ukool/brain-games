<template>
<section class="section">
  <div class="container game">
    <div class="row">
      <div class="game__field">
        <FigureLoader
          v-if="!answers.length"
        />
        <StroopCard
          v-if="answers.length"
          :current-card="currentCard"
          :answers="answers"
          @click-btn-answer="listenerClickBtnAnswer"
        />
      </div>

      <aside class="game__sidebar">
        <StroopSidebar
          :settings="gameSettings"
          @change-difficulty="listenerChangeDifficulty"
          @change-amoun-round="listenerChangeAmountRound"
          @change-settings="listenerChangeSetting"
          @reset="startGame"
        />
      </aside>
    </div>
  </div>
</section>
</template>

<script>
import FigureLoader from '~/components/shared/components/loaders/FigureLoader.vue';
import StroopCard from '~/components/reading/stroop/StroopCard';
import StroopSidebar from '~/components/reading/stroop/StroopSidebar';

export default {
  components: {
    FigureLoader,
    StroopCard,
    StroopSidebar,
  },

  data() {
    return {
      gameSettings: {
        difficulty: 'easy',
        language: 'rus',
        rounds: 10,
        cardsAnswerCount: 4,
        english: false,
      },
      gameResult: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      gameStatus: {
        start: false,
        complete: false,
      },
      currentCard: {
        hexColor: '',
        name: '',
        id: null,
      },

      colors: [
        {
          rusName: 'красный',
          engName: 'red',
          hexColor: '#FF0000',
          id: 0,
        },
        {
          rusName: 'зеленый',
          engName: 'green',
          hexColor: '#008000',
          id: 1,
        },
        {
          rusName: 'синий',
          engName: 'blue',
          hexColor: '#0000FF',
          id: 2,
        },
        {
          rusName: 'оранжевый',
          engName: 'orange',
          hexColor: '#FFA500',
          id: 3,
        },
        {
          rusName: 'желтый',
          engName: 'yellow',
          hexColor: '#ffff4c',
          id: 4,
        },
        {
          rusName: 'фиолетовый',
          engName: 'violet',
          hexColor: '#EE82EE',
          id: 5,
        },
        {
          rusName: 'серый',
          engName: 'gray',
          hexColor: '#808080',
          id: 6,
        },
        {
          rusName: 'черный',
          engName: 'black',
          hexColor: '#000000',
          id: 7,
        },
        {
          rusName: 'коричневый',
          engName: 'brown',
          hexColor: '#8B4513',
          id: 8,
        },
      ],
      answers: [],
    };
  },

  mounted() {
    this.startGame();
  },

  destroyed() {
    this.currentCard = null;
    this.answers = null;
  },

  methods: {
    /**
     * Генерирует случайное число где максимальное число это длинна массива colors
     */
    generateRandomNumber() {
      const randomNumber = Math.floor(Math.random() * this.colors.length);

      return randomNumber;
    },

    /**
     * Заполняет текущую активную карточку
     */
    fillCurrentCard() {
      const randomId = this.generateRandomNumber();
      const randomItem = this.colors.find(item => item.id === randomId);

      this.currentCard.hexColor = randomItem.hexColor;
      this.currentCard.id = randomItem.id;

      if (this.gameSettings.difficulty !== 'hard') {
        this.currentCard.name = this.colors[this.generateRandomNumber()][`${this.gameSettings.language}Name`];
      } else {
        this.currentCard.name = this.colors[this.generateRandomNumber()].rusName;
      }
    },

    /**
     * Заполняет массив с ответами: одним правильным и тремя неправильными
     */
    fillAnswersArray() {
      const rightColorValue = this.currentCard.hexColor;
      const rightAnswerId = this.currentCard.id;

      this.answers = [];

      this.answers.push({
        name: '',
        hexColor: rightColorValue,
        id: rightAnswerId,
      });

      if (this.gameSettings.difficulty === 'easy') {
        this.answers[0].name = this.colors.find(item => item.id === rightAnswerId)[`${this.gameSettings.language}Name`];
      } else if (this.gameSettings.difficulty === 'medium') {
        this.answers[0].name = this.colors[this.generateRandomNumber()][`${this.gameSettings.language}Name`];
      } else if (this.gameSettings.difficulty === 'hard') {
        this.answers[0].name = this.colors[this.generateRandomNumber()][`${this.gameSettings.language}Name`];
      }

      let i = 0;

      while (i < 3) {
        const randomNumber = this.generateRandomNumber();
        const random = this.gameSettings.difficulty === 'easy' ? randomNumber : this.generateRandomNumber();

        if (!this.searchDublicateValue(this.answers, randomNumber)) {
          this.answers.push({
            name: this.colors[random][`${this.gameSettings.language}Name`],
            hexColor: this.colors[randomNumber].hexColor,
            id: this.colors[randomNumber].id,
            error: false,
          });

          i += 1;
        }
      }

      this.shuffleAnswersArray();
    },

    /**
     * Ищет дубликаты
     */
    searchDublicateValue(array, value) {
      let dublicate = false;

      array.forEach((item) => {
        if (item.id === value) {
          dublicate = true;
        }
      });

      return dublicate;
    },

    /**
     * Перемешивает массив с ответами
     */
    shuffleAnswersArray() {
      this.answers.sort(() => Math.random() - 0.5);
      this.answers.sort(() => Math.random() - 0.5);
    },

    /**
     * Запускает или перезапускает игру
     */
    startGame() {
      this.fillCurrentCard();
      this.fillAnswersArray();
    },

    // Слушатели кастомных событий
    listenerClickBtnAnswer(id) {
      const clickCard = this.answers.find(item => item.id === id);

      if (clickCard.id === this.currentCard.id) {
        this.gameResult.correctAnswers += 1;
        this.startGame();
      } else {
        clickCard.error = true;
        setTimeout(() => {
          clickCard.error = false;
        }, 200);
        this.gameResult.incorrectAnswers += 1;
      }

      if (this.gameResult.correctAnswers === this.gameSettings.rounds) {
        this.gameStatus.complete = true;
      }
    },

    /**
     * Слушает событие смены уровня сложности
     */
    listenerChangeDifficulty(level) {
      this.gameSettings.difficulty = level;
      this.startGame();
    },

    /**
     * Слушает событие смены колиства раундов
     */
    listenerChangeAmountRound(amount) {
      this.gameSettings.rounds = amount;
      this.startGame();
    },

    /**
     * Слушает изменения событий чекбокса
     */
    listenerChangeSetting(value, name) {
      if (name === 'english' && value) {
        this.gameSettings.language = 'eng';
        this.startGame();
      } else if (name === 'english' && !value) {
        this.gameSettings.language = 'rus';
        this.startGame();
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
</style>
