<template>
<div class="card">
  <div
    class="card__wrapper"
    :style="{ backgroundColor: getBgColor() }"
    :class="[
      $props.card.status,
      { 'no-animation': !$props.animationCards },
      { 'no-fill' : !$props.fillCards }
    ]"
  >
    <button
      class="card__button"
      :class="{ 'error' : $props.error }"
      type="button"
      @click="clickHandler($props.card.number)"
    >
      {{ $props.card.number }}
    </button>
  </div>
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

  methods: {
    getBgColor() {
      return this.$props.coloredCards ? this.getRandomColor() : null;
    },

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
  &__wrapper
    position relative
    display flex
    align-items center
    justify-content center
    box-sizing border-box
    margin 1px
    padding-top 100%
    border 1px solid $black
    color $black
    border-radius 3px
    transition border-color 0.2s ease-in-out
    box-shadow 1px 1px 5px $violet
    &:hover
      border-color $violet

    &.success
      background $pink !important
      border-color $blue !important
      color $blue !important
      pointer-events none

    &.success.no-fill
      background-color transparent !important
      border-color #000 !important
      color $black !important

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
