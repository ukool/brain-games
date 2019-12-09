<template>
<n-link
  class="game-preview"
  :to="simulator.page"
>
  <span class="game-preview__lines" />
  <svg-icon
    class="game-preview__icon"
    :name="simulator.iconName"
    width="65"
    height="65"
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
  <svg-icon
    class="game-preview__shape"
    :name="`shape/shape-${randomShapeNumber}`"
    :fill="randomShapeColor"
    width="300"
    height="300"
  />
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

  data() {
    return {
      colors: [
        '#ecdaff',
        '#a8dab4',
        '#d0edf5',
        '#fad12d',
        '#f78da7',
        // '#9900ef',
        '#8ed1fc',
        '#fcb900',
      ],
      currentColor: '',
    };
  },

  computed: {
    randomShapeNumber() {
      return Math.floor(Math.random() * 23);
    },

    randomShapeColor() {
      const randomNumber = Math.floor(Math.random() * this.colors.length - 1);
      return this.colors[randomNumber];
    },
  },

};
</script>

<style scoped lang="stylus">
.game-preview
  position relative
  box-sizing border-box
  overflow hidden
  display flex
  flex-direction column
  align-items flex-start
  width 100%
  height 400px
  padding 30px 20px
  border 1px solid $black
  transition box-shadow 0.3s ease-in-out
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
    box-shadow 0 0 3px 2px rgba($violet, 0.3)
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

  &__shape
    position absolute
    z-index -1
    top 40%
    right 0
    transform translateY(-50%)
    opacity 0.7
</style>
