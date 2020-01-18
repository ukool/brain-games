<template>
<div class="card">
  <div class="card__numbers">
    <div
      v-for="(symbols, index) in splittedCurrentNumber"
      :key="`${index}_symbol`"
      class="card__box"
    >
      <div
        class="card__symbol"
      >
        <svg-icon
          v-if="!showNumbers"
          class="card__icon"
          name="question"
        />
        <template v-else-if="showNumbers">
          {{ symbols }}
        </template>
      </div>
    </div>
  </div>

  <div class="card__answers">
    <p class="card__label">
      Ваш ответ:
    </p>
    <div class="card__inputs">
      <div
        v-for="(input, index) in answerFieldsQuantity"
        :key="`${index}_input`"
        class="card__input-box"
      >
        <input
          :ref="`input_${index}`"
          :value="fragmentedAnswer[index]"
          class="card__input"
          :class="answerCss[index]"
          type="text"
          :disabled="disabledInputs"
          :maxlength="numberInFiled"
          @input="inputHandle($event.target.value, index)"
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
    numberInFiled: {
      type: Number,
      default: 0,
    },
    visibleTime: {
      type: Number,
      default: 1200,
    },
    statusEndGame: {
      type: Boolean,
      default: false,
    },
    difficulty: {
      type: String,
      default: 'easy',
    },
  },

  data() {
    return {
      showNumbers: false,
      disabledInputs: false,
      fragmentedAnswer: {},
      answerFull: '',
      answerCss: [],
      currentNumberLength: null,
      currentFieldIndex: 1,
      numbersForMedium: [],
    };
  },

  computed: {
    splittedCurrentNumber() {
      const arrayNumbers = String(this.currentNumber).split('');

      let symbols = [];

      if (this.difficulty === 'easy') {
        symbols = arrayNumbers;
      }

      if (this.difficulty === 'medium') {
        symbols = this.arrayToChunk(arrayNumbers, 2);
      }

      if (this.difficulty === 'hard') {
        symbols = this.arrayToChunk(arrayNumbers, 3);
      }

      return symbols;
    },

    answerFieldsQuantity() {
      if (this.difficulty === 'medium') return this.numberLength / 2;
      if (this.difficulty === 'hard') return this.numberLength / 3;

      return this.numberLength;
    },
  },

  watch: {
    currentNumber() {
      this.resetSimulator();
      this.startSimulator();
    },
    statusEndGame(value) {
      if (value) this.disabledInputs = true;
    },
  },

  mounted() {
    this.fillFragmentedAnswerObject();
  },

  methods: {
    startSimulator() {
      this.disabledInputs = true;
      this.showNumbers = true;

      setTimeout(() => {
        this.disabledInputs = false;
        this.showNumbers = false;
        this.$nextTick(() => this.$refs.input_0[0].focus());
      }, this.visibleTime);
    },

    resetSimulator() {
      this.fragmentedAnswer = {};
      this.fillFragmentedAnswerObject();
      this.answerFull = '';
      this.answerCss = [];
    },

    arrayToChunk(array, size) {
      let chunkedArray = [];
      let index = 0;
      while (index < array.length) {
        chunkedArray.push(array.slice(index, size + index));
        index += size;
      }

      chunkedArray = chunkedArray.map(item => item.join(''));

      return chunkedArray;
    },

    inputHandle(value, index) {
      const regExpOnlyNumbers = /[^0-9]/g;
      const hasLetterInValue = regExpOnlyNumbers.test(value);

      if (hasLetterInValue) {
        this.$refs[`input_${index}`][0].value = '';
        this.$refs[`input_${index}`][0].focus();
        return;
      }

      this.fragmentedAnswer[index] = value.replace(regExpOnlyNumbers, '');

      if (value.length === this.numberInFiled && index < this.splittedCurrentNumber.length - 1) {
        this.$refs[`input_${index + 1}`][0].focus();
      }
      const answerIsFull = this.checkFullAnswer();
      if (answerIsFull) {
        this.answerFull = Object.values(this.fragmentedAnswer).join('');
        this.checkFragmentedAnswer();
        this.disabledInputs = true;

        this.submitAnswer();
      }
    },

    fillFragmentedAnswerObject() {
      for (let i = 0; i <= this.answerFieldsQuantity - 1; i += 1) {
        this.fragmentedAnswer[i] = '';
      }
    },

    checkFullAnswer() {
      return Object.values(this.fragmentedAnswer).every(item => item !== '' && item.length === this.numberInFiled);
    },

    checkFragmentedAnswer() {
      Object.values(this.fragmentedAnswer).forEach((item, index) => {
        if (item === this.splittedCurrentNumber[index]) {
          this.answerCss.push('success');
        } else {
          this.answerCss.push('error');
        }
      });
    },

    submitAnswer() {
      this.$emit('submit-answer', this.answerFull);
    },

    // keyupHandler({ code }, index) {
    //   const hasMaxLengthValueInInput = this.fragmentedAnswer[index].length >= 2;
    //
    //   if (code === 'ArrowRight' && index < this.splittedCurrentNumber.length - 1) {
    //     if (this.difficulty === 'easy') {
    //       this.$refs[`input_${index + 1}`][0].select();
    //     } else if (hasMaxLengthValueInInput) {
    //       this.$refs[`input_${index + 1}`][0].focus();
    //     }
    //   } else if (code === 'ArrowLeft' && index > 0) {
    //     if (this.difficulty === 'easy') {
    //       this.$refs[`input_${index - 1}`][0].select();
    //     } else if (!hasMaxLengthValueInInput) {
    //       this.$refs[`input_${index - 1}`][0].focus();
    //     }
    //   }
    //
    //   // if (this.fragmentedAnswer[index].length === 0 && index > 0) {
    //   //   this.$refs[`input_${index - 1}`][0].focus();
    //   // }
    // },
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
    box-sizing border-box
    width 60px
    height 60px
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
    box-sizing border-box
    width 60px
    height 60px

    & + &
      margin-left 1px

  &__input
    display block
    width 100%
    height 100%
    font-size 25px
    text-align center
    box-sizing border-box
    border 1px solid $blue
    &:focus
      border-color $violet-dark

.error
  border-color $red
.success
  border-color $green
</style>
