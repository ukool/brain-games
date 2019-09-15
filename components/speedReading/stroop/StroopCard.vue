<template>
<div class="stroop-card">
  <p
    class="stroop-card__text"
    :style="{ color: currentCard.hexColor }"
  >
    {{ currentCard.name }}
  </p>
  <div class="stroop-card__answers">
    <button
      v-for="answer in answers"
      :key="answer.id"
      class="stroop-card__btn"
      :class="{
        'error' : answer.error,
        'success': answer.succer,
      }"
      :style="{ color: answer.hexColor }"
      @click="handleClick(answer.id)"
    >
      {{ answer.name }}
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'StroopCard',
  props: {
    currentCard: {
      type: Object,
      default: null,
    },

    answers: {
      type: Array,
      default: null,
    },
  },

  methods: {
    handleClick(value) {
      this.$emit('click-btn-answer', value);
    },
  },
};
</script>

<style lang="stylus" scoped>
.stroop-card
  text-align center
  padding 20px
  border 1px solid $violet-dark
  border-radius 5px

  &__text
    margin-top 50px
    font-size 25px
    text-transform uppercase

  &__answers
    display flex
    flex-wrap wrap
    justify-content space-between
    margin-top 50px
    padding 10px

  &__btn
    display block
    width calc(100% / 2 - 10px)
    margin-bottom 20px
    padding 15px
    border 1px solid $violet
    border-radius 3px
    transition 0.2s ease-in-out
    &:hover
      border-color $blue
    &.error
      animation shake 0.2s

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
