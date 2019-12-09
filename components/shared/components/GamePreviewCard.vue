<template>
<n-link
  class="game-preview"
  :to="simulator.page"
>
  <span class="game-preview__lines" />
  <svg-icon
    class="game-preview__icon"
    :name="simulator.iconName"
    width="60"
    height="60"
  />

  <h2 class="game-preview__title">
    {{ simulator.name }}
  </h2>

  <p class="game-preview__description">
    {{ simulator.description }}
  </p>
  <p class="game-preview__target">
    {{ simulator.target }}
  </p>

  <div class="game-preview__button">
    <BorderButton
      text="Играть"
      icon-name="play"
      :wide="true"
    />
  </div>
</n-link>
</template>

<script>
import BorderButton from './buttons/BorderButton';

export default {
  name: 'GamePreviewCard',

  components: { BorderButton },

  props: {
    simulator: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped lang="stylus">
.game-preview
  position relative
  box-sizing border-box
  display flex
  flex-direction column
  align-items flex-start
  width 100%
  height 400px
  padding 30px 20px
  border 1px solid $black
  // box-shadow: 0 0 3px 2px #4e4e4e;
  &::before,
  &::after
    content ''
    width 0
    height 1px
    position absolute
    transition all 0.3s linear
    background $violet
  &::before
    left 0
    top 0
  &::after
    right:0
    bottom 0

  &:hover
    &::before,
    &::after
      width 100%
    .game-preview__lines::before,
    .game-preview__lines::after
      height 100%

  &__lines
    &::before,
    &::after
      content ''
      width 1px
      height 0
      position absolute
      transition all 0.3s linear
      background $violet
    &::before
      left 0
      top 0
    &::after
      right 0
      bottom 0

  &__icon
    align-self center

  &__title
    margin-top 20px
    font-size 30px

  &__description
    width 100%
    margin-top 20px
    font-size 16px

  &__target
    margin-top auto
    border-bottom 1px solid $violet

  &__button
    width 100%
    margin-top 30px
</style>
