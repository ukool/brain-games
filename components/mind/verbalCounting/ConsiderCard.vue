<template>
<div class="condition">
  <div class="condition__inner">
    <p class="condition__text">
      {{ condition }}
    </p>
    <p class="condition__text">
      =
    </p>
    <label class="condition__label">
      <input
        ref="input"
        v-model="userAnswer"
        type="text"
        class="condition__input"
        :class="[userAnswerIsCorrect]"
        @keypress.enter="handleSubmit"
        @input="handleInput($event.target.value)"
      >
      <span
        v-if="error.hasError"
        class="condition__error"
      >
        {{ error.message }}
      </span>
    </label>
    <BorderButton
      class="condition__button"
      text="Проверить"
      @click="handleSubmit"
    />
  </div>
</div>
</template>

<script>
import BorderButton from '~/components/shared/components/buttons/BorderButton';

export default {
  name: 'VerbalCountingCard',

  components: { BorderButton },

  props: {
    condition: {
      type: String,
      default: null,
    },
    correctAnswer: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      userAnswer: null,
      error: {
        hasError: false,
        message: 'Введите ответ',
      },
      userAnswerIsCorrect: null,
    };
  },

  mounted() {
    this.$refs.input.focus();
  },

  methods: {
    handleSubmit() {
      if (!this.userAnswer) {
        this.error.hasError = true;
        return;
      }

      if (this.userAnswer === this.correctAnswer) {
        this.userAnswerIsCorrect = 'success';
      } else {
        this.userAnswerIsCorrect = 'error';
      }

      this.$emit('submit-answer', this.userAnswer);

      this.userAnswer = null;
      this.error.hasError = false;
    },

    handleInput(value) {
      this.error.hasError = false;

      const regExpOnlyNumbers = /[^0-9-]+/g;
      this.userAnswer = value.replace(regExpOnlyNumbers, '');
    },
  },
};
</script>

<style lang="stylus" scoped>
.condition
  position relative
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%

  &__inner
    display flex
    flex-direction column
    align-items center

  &__text
    height 42px
    font-size 36px
    &:not(:first-of-type)
      margin-top 10px

  &__label
    position relative
    padding-bottom 25px

  &__input
    display flex
    justify-content center
    align-items center
    text-align center
    width 180px
    height 60px
    padding 0 10px
    font-size 36px
    border 1px solid $blue
    &:focus
      border-color $violet-dark
  .error
    border-color $red
  .success
    border-color $green

  &__error
    position absolute
    bottom 0
    width 100%
    text-align center
    color $red

  &__button
    margin-top 40px

.sidebar-item
  &:not(:first-of-type)
    margin-top 15px
</style>
