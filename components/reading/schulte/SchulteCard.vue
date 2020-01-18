<template>
<div
  class="card"
  :style="{ backgroundColor: backgroundColor }"
  :class="[
    card.status,
    { 'no-animation': !animationCards },
    { 'no-fill' : !fillCards && !coloredCards },
    { 'colored-cards' : coloredCards },
    { 'colored-cards-no-fill' : coloredCards && !fillCards },
  ]"
>
  <button
    class="card__button"
    :class="{ 'error' : error }"
    type="button"
    @click="clickHandler(card.number)"
  >
    {{ card.number }}
  </button>
</div>
</template>

<script>
export default {
  name: 'SchulteCard',

  props: {
    card: {
      type: Object,
      default: null,
    },
    fillCards: {
      type: Boolean,
      default: true,
    },
    coloredCards: {
      type: Boolean,
      default: false,
    },
    animationCards: {
      type: Boolean,
      default: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    backgroundColor() {
      return this.coloredCards ? this.getRandomColor() : null;
    },
  },

  methods: {
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    clickHandler(value) {
      this.$emit('card-click', value);
    },
  },
};
</script>

<style lang="stylus" scoped>
.card
  position relative
  display flex
  align-items center
  justify-content center
  box-sizing border-box
  margin 1px
  border 1px solid $black
  color $black
  border-radius 3px
  transition border-color 0.2s ease-in-out
  box-shadow 1px 1px 5px $violet
  &::after
    content ''
    display block;
    padding-top 100%
  &:hover
    border-color $violet

  &.success > .card__button
    background-color $pink
    border-color $blue
    color $blue
    pointer-events none

  &.success.no-fill > .card__button
    background-color transparent
    border-color $black
    color $black

  &.success.colored-cards  > .card__button
    background-color white !important
    border-color $black !important
    color $black !important

  &.success.colored-cards.colored-cards-no-fill > .card__button
    background-color transparent !important
    border-color $black !important
    color $white !important

  &.colored-cards
    color white

  &.error
    animation shake 0.2s

  &.no-animation
    animation none !important

  &__button
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    user-select none
</style>
