<template>
<div class="card">
  <div class="card__numbers">
    <template v-if="$props.level === 'easy'">
      <div
        v-for="(symbol, index) in currentNumber"
        :key="`${index}_symbol`"
        class="card__box"
      >
        <div
          v-if="showNumbers"
          class="card__symbol"
        >
          {{ symbol }}
        </div>
        <svg-icon
          v-else
          class="card__icon"
          name="question"
        />
      </div>
    </template>
    <template v-else>
      <div
        v-for="(symbols, index) in fillGameCards()"
        :key="`${index}_symbol`"
        class="card__box"
      >
        <div
          v-if="showNumbers"
          class="card__symbol"
        >
          {{ symbols.join('') }}
        </div>
        <svg-icon
          v-else
          class="card__icon"
          name="question"
        />
      </div>
    </template>
  </div>

  <div class="card__answers">
    <p class="card__label">
      Ваш ответ:
      {{ currentNumber }}
    </p>
    <div class="card__inputs">
      <div
        v-for="(input, index) in numberLength"
        :key="`${index}_input`"
        class="card__input-box"
        :class="answerCss[index]"
      >
        <input
          :ref="`input${index}`"
          v-model="answerPart[index]"
          class="card__input"
          type="text"
          :disabled="disabledInputs"
          :maxlength="maxLengthField"
          @input="handleInput($event.target.value, index)"
        >
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'RememberNumberCard',

  props: {
    currentNumber: {
      type: String,
      default: '',
    },
    numberLength: {
      type: Number,
      default: 3,
    },
    maxLengthField: {
      type: Number,
      default: 1,
    },
    statusEndGame: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      default: 'easy',
    },
  },

  data() {
    return {
      showNumbers: true,
      disabledInputs: false,
      answerPart: {},
      answerFull: '',
      answerCss: [],
      currentNumberLength: null,
      currentFieldIndex: 1,
      numbersForMedium: [],
    };
  },

  computed: {
    // currentNumberLength() {
    //   return this.$props.currentNumber.length - 1;
    // },
  },

  watch: {
    currentNumber() {
      this.resetGame();
      this.startGame();
    },
    statusEndGame(value) {
      if (value) this.disabledInputs = true;
    },
  },

  mounted() {
    this.fillAnswerPartObject();

    // this.$refs.input_4.focus();
    // this.$nextTick(() => this.$refs.input_4.focus())
  },

  methods: {
    startGame() {
      this.disabledInputs = false;
      if (this.$props.level === 'easy') {
        this.startEasyGame();
      } else if (this.$props.level === 'medium') {
        this.startMediumGame();
      } else if (this.$props.level === 'hard') {
        this.startHardGame();
      }
      this.showNumbers = true;

      setTimeout(() => {
        // this.showNumbers = false;
      }, 1500);
    },

    startEasyGame() {

    },

    startMediumGame() {

    },

    startHardGame() {

    },

    fillGameCards() {
      const symbols = [];
      if (this.$props.level === 'medium') {
        for (let i = 1; i < this.$props.numberLength * 2; i += 2) {
          symbols.push([this.$props.currentNumber[i - 1], this.$props.currentNumber[i]]);
        }
      } else if (this.$props.level === 'hard') {
        for (let i = 1; i < this.$props.numberLength * 3; i += 3) {
          symbols.push([this.$props.currentNumber[i - 1], this.$props.currentNumber[i], this.$props.currentNumber[i + 1]]);
        }
      }
      return symbols;
    },

    handleInput(value, index) {
      this.answerPart[index] = value.replace(/[^0-9]/g, '');

      const answerIsFull = this.checkAnswerPartArray();
      console.log(answerIsFull);

      if (answerIsFull) {
        this.answerFull = Object.values(this.answerPart).join('');
        this.checkAnswer();
        this.disabledInputs = true;

        this.submitAnswer();
      }
    },

    fillAnswerPartObject() {
      for (let i = 1; i <= this.$props.numberLength - 1; i += 1) {
        this.answerPart[i] = '';
      }
    },

    checkAnswerPartArray() {
      let answerLength;

      if (this.$props.level === 'easy') answerLength = 1;
      else if (this.$props.level === 'medium') answerLength = 2;
      else if (this.$props.level === 'hard') answerLength = 3;

      return Object.values(this.answerPart).every(item => item !== '' && item.length === answerLength);
    },

    resetGame() {
      this.answerPart = {};
      this.fillAnswerPartObject();
      this.answerFull = '';
      this.answerCss = [];
    },

    checkAnswer() {
      for (let i = 1; i <= this.$props.numberLength; i += 1) {
        if (this.$props.currentNumber[i] === this.answerFull[i]) {
          this.answerCss.push('success');
        } else {
          this.answerCss.push('error');
        }
      }
    },

    // кастомные события

    submitAnswer() {
      this.$emit('submit-answer', this.answerFull);
    },
  },
};
</script>

<style lang="stylus" scoped>
.card
  display flex
  flex-direction column

  &__numbers
    display flex

  &__box
    position relative
    display flex
    justify-content center
    align-items center
    width 50px
    height 50px
    border 1px solid $violet-dark
    & + &
      margin-left 1px

  &__symbol
    font-size 25px
    &.hidden
      font-size 0

  &__icon
    width 25px
    height 25px

  &__label
    display flex
    flex-direction column
    margin-top 50px

  &__inputs
    display flex
    margin-top 15px

  &__input-box
    display flex
    justify-content center
    align-items center
    width 50px
    height 50px
    border 1px solid $blue
    & + &
      margin-left 1px
    &.error
      border-color $red
    &.success
      border-color $green

  &__input
    display block
    width 100%
    height 100%
    font-size 25px
    text-align center
</style>