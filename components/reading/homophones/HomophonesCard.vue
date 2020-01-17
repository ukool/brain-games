<template>
<div
  class="homophones-card"
  :class="{
    'error' : card.error,
    'success': card.success,
  }"
  @click="handleClick(card.valueFirst, card.valueSecond)"
>
  <p class="homophones-card__inner">
    <span class="homophones-card__text">
      {{ card.valueFirst.toLowerCase() }}
    </span>
    <span class="homophones-card__text">
      {{ card.valueSecond.toLowerCase() }}
    </span>
  </p>
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
    difficulty: {
      type: String,
      default: '',
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
  box-sizing border-box
  width 100%
  border 1px solid $violet-dark
  cursor pointer
  transition background-color 0.2s ease-in-out
  &::after
    content ''
    display block
    padding-top 100%
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
    user-select none
    & + &
      margin-top 5px
</style>
