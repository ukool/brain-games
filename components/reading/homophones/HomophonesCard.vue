<template>
<div>
<button
  class="homophones-card"
  :class="{
    'error' : card.error,
    'success': card.success,
  }"
  type="button"
  @click="handleClick(card.valueFirst, card.valueSecond)"
>
  <div class="homophones-card__inner">
    <span class="homophones-card__text">
      {{ card.valueFirst.toLowerCase() }}
    </span>
    <span class="homophones-card__text">
      {{ card.valueSecond.toLowerCase() }}
    </span>
  </div>
</button>
</div>
</template>

<script>
export default {
  name: 'HomophonesCard',

  props: {
    card: {
      type: Object,
      default: null,
    },
  },

  methods: {
    handleClick(valueFirst, valueSecond) {
      this.$emit('click-card', valueFirst, valueSecond);
    },
  },
};
</script>

<style lang="stylus" scoped>
.homophones-card
  position relative
  width 100%
  padding-top 100%
  box-sizing border-box
  border 1px solid $violet-dark
  &.error
    animation shake 0.2s
    pointer-events none
  &.success
    background-color $violet-dark
    color white
    pointer-events none

  &__inner
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    display flex
    flex-direction column
    justify-content center
    align-items center

  &__text
    & + &
      margin-top 5px

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
