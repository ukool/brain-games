<template>
<n-link
  class="simulator-preview"
  :to="simulator.page"
>
  <span class="simulator-preview__lines" />
  <svg-icon
    class="simulator-preview__icon"
    :name="simulator.iconName"
    width="65"
    height="65"
  />

  <h2 class="simulator-preview__title">
    {{ simulator.name }}
  </h2>

  <p class="simulator-preview__description">
    {{ simulator.description }}
  </p>
  <p class="simulator-preview__target">
    {{ simulator.target }}
  </p>

  <div class="simulator-preview__button">
    <BorderButton
      text="Играть"
      icon-name="play"
      :wide="true"
    />
  </div>
  <svg-icon
    class="simulator-preview__shape"
    :name="`shape/shape-${randomShapeNumber}`"
    width="300"
    height="300"
  />
</n-link>
</template>

<script>
import BorderButton from './buttons/BorderButton';

export default {
  name: 'SimulatorPreviewCard',

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
    };
  },

  computed: {
    randomShapeNumber() {
      return Math.floor(Math.random() * 23);
    },
  },

};
</script>

<style scoped lang="stylus">
.simulator-preview
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
    .simulator-preview__lines::before,
    .simulator-preview__lines::after
      height 100%
  &.memory > .simulator-preview__shape
    fill #ecdaff
  &.mind > .simulator-preview__shape
    fill #fad12d
  &.reading > .simulator-preview__shape
    fill #8ed1fc

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
    opacity 0.6
</style>
