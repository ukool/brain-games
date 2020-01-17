<template>
<div class="result-modal">
  <svg-icon
    class="result-modal__icon"
    :name="answerIsRight ? 'fireworks' : 'crying'"
    width="100"
    height="100"
  />
  <p
    v-if="answerIsRight"
    class="result-modal__text"
  >
    Правильно!
  </p>
  <template v-else>
    <p class="result-modal__text">
      Неправильно
    </p>

    <p class="result-modal__text">
      Ответ: {{ correctAnswer }}
    </p>
  </template>
</div>
</template>

<script>
export default {
  name: 'ResultModal',

  props: {
    answerIsRight: {
      type: Boolean,
      default: false,
    },
    correctAnswer: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped lang="stylus">
.result-modal
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color $white

  &__text
    height 42px
    font-size 36px
    &:not(:first-of-type)
      margin-top 10px
    .result-modal__icon + &
      margin-top 15px
</style>
