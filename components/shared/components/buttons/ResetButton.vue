<template>
<button
  class="border-btn"
  :class="[size]"
  type="button"
  @click="handlerClick"
>
  <svg-icon
    class="border-btn__icon"
    name="refr"
    width="16"
    height="16"
  />
  {{ $props.text }}
</button>
</template>

<script>
export default {
  name: 'ResetButton',

  props: {
    text: {
      type: String,
      default: 'Сбросить',
    },

    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['md', 'sm', 'xs'].indexOf(value) !== -1;
      },
    },
  },

  methods: {
    handlerClick() {
      this.$emit('reset');
    },
  },
};
</script>

<style lang="stylus">
@import "./stylus/borderButton.styl"
.reset
  position relative
  display flex
  align-items center
  justify-content center
  box-sizing border-box
  padding 10px 20px
  border 1px solid $black
  transition color 0.2s ease-in-out, border-color 0.2s ease-in-out

  &::before
    content ''
    position absolute
    bottom -1px
    left 0
    width 100%
    height 2px
    background-color $violet-dark
    transform scale(0)
    transform-origin 0 0
    transition transform 0.2s ease-in-out

  &:hover
    color $violet-dark
    border-color $violet-dark

    &::before
      transform scale(1)

    .reset__icon
      fill $violet-dark

  &__icon
    margin-right 15px
    transition fill 0.2s ease-in-out
</style>
