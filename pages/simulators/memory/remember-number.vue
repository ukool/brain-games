<template>
<GameField
  :simulator-info="simulatorInfo"
  :game-pause="gameStatus.pause"
  :game-final="gameStatus.final"
  :final-modal-data="gameFinalData"
>
  <template #game>
    <div class="game__field">
      <RememberNumberCard
        :current-number="currentNumber"
        :number-length="configDifficulty[difficulty].numberLength"
        :status-end-game="gameStatus.complete"
        :visible-time="configDifficulty[difficulty].visibleTime"
        :difficulty="difficulty"
        :number-in-filed="configDifficulty[difficulty].numberInFiled"
        @submit-answer="checkSubmitAnswer"
      />
    </div>
  </template>


  <template #sidebar>
    <Sidebar
      :settings="gameSettings"
      @change-difficulty="changeSwitchableSettings"
      @reset="resetGame"
    >
      <template #info>
        Текущий раунд: {{ currentRound }}
      </template>
    </Sidebar>
  </template>
</GameField>
</template>

<script>
import firebase from 'firebase/app';
import GameField from '~/components/shared/layouts/GameField';
import Sidebar from '~/components/shared/layouts/Sidebar';
import RememberNumberCard from '~/components/memory/rememberNumber/RememberNumberCard';

export default {
  name: 'RememberNumberSimulator',

  components: {
    GameField,
    Sidebar,
    RememberNumberCard,
  },

  data() {
    return {
      gameSettings: {
        difficulty: {
          title: 'Сложность',
          value: 'medium',
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
          visibleTime: 1100,
          numberLength: 4,
          minimalNumberLength: 4,
          numberInFiled: 1,
        },
        medium: {
          visibleTime: 1000,
          numberLength: 6,
          minimalNumberLength: 6,
          numberInFiled: 2,
        },
        hard: {
          visibleTime: 900,
          numberLength: 9,
          minimalNumberLength: 9,
          numberInFiled: 3,
        },
      },
      gameResult: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },
      gameFinalData: {
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
      gameStatus: {
        played: false,
        final: false,
        pause: false,
      },
      showTimer: false,
      userAnswer: null,
      currentNumber: null,
      infinityGame: false,
      currentRound: 1,
      simulatorInfo: null,
    };
  },

  computed: {
    difficulty() {
      return this.gameSettings.difficulty.value;
    },
  },

  asyncData() {
    return firebase.database().ref('simulatorsInfo/memory/remember-number')
      .once('value')
      .then(snap => ({ simulatorInfo: snap.val() }));
  },

  mounted() {
    this.startGame();
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

      this.gameFinalData.difficulty.value = this.gameSettings.difficulty.value;
      this.gameFinalData.correctAnswers.value = this.gameResult.correctAnswers;
      this.gameFinalData.incorrectAnswers.value = this.gameResult.incorrectAnswers;
      this.gameFinalData.rounds.value = this.gameSettings.rounds.value;
    },

    startGame() {
      this.currentNumber = this.fillCurrentNumber();
    },
    /**
     * Сбрасывает игру
     */
    resetGame() {
      this.startGame();
      this.currentRound = 1;
      // this.gameCards = this.fillGameCardsArray();
    },

    generateRandomNumber() {
      return Math.floor(Math.random() * 9);
    },

    fillCurrentNumber() {
      const maxLength = this.configDifficulty[this.difficulty].numberLength;
      const currentNumber = [];

      for (let i = 1; i <= maxLength; i += 1) {
        currentNumber.push(this.generateRandomNumber());
      }

      return currentNumber.join('');
    },

    increaseNumbersLength() {
      if (this.gameResult.correctAnswers % 3 !== 0) return;

      if (this.difficulty === 'easy') {
        this.configDifficulty.easy.numberLength += 1;
      } else if (this.difficulty === 'medium') {
        this.configDifficulty.medium.numberLength += 2;
      } else if (this.difficulty === 'hard') {
        this.configDifficulty.hard.numberLength += 3;
      }

      this.configDifficulty[this.difficulty].visibleTime -= 50;
    },

    decreaseNumberLength() {
      const { numberLength, minimalNumberLength } = this.configDifficulty[this.difficulty];

      if (numberLength > minimalNumberLength && this.difficulty === 'easy') {
        this.configDifficulty.easy.numberLength -= 1;
      } else if (numberLength > minimalNumberLength && this.difficulty === 'medium') {
        this.configDifficulty.medium.numberLength -= 2;
      } else if (numberLength > minimalNumberLength && this.difficulty === 'hard') {
        this.configDifficulty.hard.numberLength -= 3;
      }

      this.configDifficulty[this.difficulty].visibleTime += 50;
    },

    checkSubmitAnswer(answer) {
      let rightAnswer;
      const difficulty = this.gameSettings.difficulty.value;
      const delay = this.configDifficulty[difficulty].visibleTime;

      setTimeout(() => {
        rightAnswer = Number(answer) === Number(this.currentNumber);

        if (rightAnswer) {
          this.gameResult.correctAnswers += 1;
          this.increaseNumbersLength();
        } else {
          this.gameResult.incorrectAnswers += 1;
          this.decreaseNumberLength();
        }

        this.currentRound += 1;

        if (this.currentRound >= this.gameSettings.rounds.value && !this.gameSettings.infinityGame) {
          this.setGameOnFinal();
          return;
        }

        this.startGame();
      }, delay);
    },

    changeSwitchableSettings(settingName, settingValue) {
      this.setGameOnPause();
      this.gameSettings[settingName].value = settingValue;

      this.resetGame();
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

  &__sidebar
    width 23%

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
