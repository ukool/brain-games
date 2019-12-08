<template>
<section class="section game">
  <div class="container">
    <div class="row">
      <div class="game__field">
        <PlugPlayButton
          v-if="!gameStatus.start"
          @play="listenerPlay"
        />
        <transition name="fade">
          <Countdown
            v-show="showTimer && !gameStatus.start"
            class="game__start"
            :start-timer="showTimer"
          />
        </transition>

        <RememberNumberCard
          :current-number="currentNumber"
          :number-length="gameSettings.numberLength"
          :status-end-game="gameStatus.complete"
          :level="gameSettings.difficulty"
          :max-length-field="gameSettings.maxLengthField"
          @submit-answer="listenerSubmitAnswer"
        />
      </div>

      <aside class="game__sidebar">
        <RememberNumberSidebar
          :settings="gameSettings"
          @change-difficulty="listenerChangeGameDifficulty"
          @change-amoun-round="listenerChangeAmounRound"
          @change-settings="listenerChangeSettings"
          @reset="startGame"
          @start-game="listenerStartGame"
        />
      </aside>
    </div>
  </div>
</section>
</template>

<script>
import RememberNumberCard from '~/components/memory/rememberNumber/RememberNumberCard';
import RememberNumberSidebar from '~/components/memory/rememberNumber/RememberNumberSidebar';

export default {
  components: {
    RememberNumberCard,
    RememberNumberSidebar,
  },

  data() {
    return {
      gameSettings: {
        difficulty: 'easy',
        rounds: 10,
        numberLength: 4,
        maxLengthField: 1,
        deleayMS: 1500,
        infinityGame: false,
      },

      gameResult: {
        correctAnswers: 0,
        incorrectAnswers: 0,
      },

      gameStatus: {
        start: false,
        complete: false,
        currentRound: 0,
      },
      showTimer: false,
      userAnswer: null,
      currentNumber: null,
    };
  },

  mounted() {
    this.startGame();
    // this.gameResult.start = true;
  },

  methods: {
    generateRandomNumber() {
      const randomNumber = Math.floor(Math.random() * 9);

      return randomNumber;
    },

    fillCurrentNumber(maxLengnt = this.gameSettings.numberLength) {
      const currentNumber = [];

      for (let i = 1; i <= maxLengnt; i += 1) {
        currentNumber.push(this.generateRandomNumber());
      }

      return currentNumber.join('');
    },

    startGame(numberLength) {
      if (this.gameSettings.difficulty === 'easy') {
        this.startEasyGame(numberLength);
      } else if (this.gameSettings.difficulty === 'medium') {
        this.startMediumGame(numberLength);
      } else if (this.gameSettings.difficulty === 'hard') {
        this.startHardGame(numberLength);
      }

      this.gameStatus.currentRound += 1;
    },

    startEasyGame(numberLength = 4) {
      this.gameSettings.maxLengthField = 1;
      this.gameSettings.numberLength = numberLength;
      this.currentNumber = this.fillCurrentNumber();
    },

    startMediumGame(numberLength = 3) {
      this.gameSettings.maxLengthField = 2;
      this.gameSettings.numberLength = numberLength;

      this.currentNumber = this.fillCurrentNumber(this.gameSettings.numberLength * 2);
    },

    startHardGame(numberLength = 3) {
      this.gameSettings.maxLengthField = 3;
      this.gameSettings.numberLength = numberLength;

      this.currentNumber = this.fillCurrentNumber(this.gameSettings.numberLength * 3);
    },

    // TODO нужно считать правильно
    stopGame() {
      this.currentNumber = '----';
    },

    addingNumbersLength() {
      if (this.gameResult.correctAnswers % 3 !== 0) return;

      this.gameSettings.numberLength += 1;
      this.gameSettings.deleayMS -= 100;
    },

    increaceNumberLength() {
      if (this.gameSettings.numberLength > 4 && this.gameSettings.difficulty === 'easy') {
        this.gameSettings.numberLength -= 1;
        this.gameSettings.deleayMS -= 100;
      } else if (this.gameSettings.numberLength > 3 && this.gameSettings.difficulty === 'medium') {
        this.gameSettings.numberLength -= 1;
        this.gameSettings.deleayMS -= 100;
      } else if (this.gameSettings.numberLength > 3 && this.gameSettings.difficulty === 'hard') {
        this.gameSettings.numberLength -= 1;
        this.gameSettings.deleayMS -= 100;
      }
    },

    // Слушатели кастомных событий

    listenerPlay() {
      this.showTimer = true;

      setTimeout(() => {
        this.showTimer = false;
        this.gameStatus.start = true;
        this.startGame();
      }, 4100);
    },

    listenerStartGame() {
      this.gameStatus.start = true;
      this.startGame();

      setTimeout(() => {
        this.gameStatus.start = false;
      }, 4100);
    },

    listenerSubmitAnswer(answer) {
      let rightAnswer;

      setTimeout(() => {
        rightAnswer = Number(answer) === Number(this.currentNumber);

        if (rightAnswer) {
          this.gameResult.correctAnswers += 1;
          this.addingNumbersLength();
        } else {
          this.gameResult.incorrectAnswers += 1;
          this.increaceNumberLength();
        }

        if (this.gameStatus.currentRound >= this.gameSettings.rounds && !this.gameSettings.infinityGame) {
          console.log('stop game');
          this.gameStatus.complete = true;
          this.stopGame();
          return;
        }

        this.startGame(this.gameSettings.numberLength);
      }, this.gameSettings.deleayMS);
    },

    listenerChangeGameDifficulty(level) {
      this.gameSettings.difficulty = level;
      this.gameStatus.start = false;
      if (level === 'easy') {
        this.startEasyGame();
      } else if (level === 'medium') {
        this.startMediumGame();
      } else if (level === 'hard') {
        this.startHardGame();
      }
    },

    listenerChangeAmounRound(amount) {
      this.gameSettings.amount = amount;
    },

    listenerChangeSettings(value, name) {
      this.gameSettings[name] = value;
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
