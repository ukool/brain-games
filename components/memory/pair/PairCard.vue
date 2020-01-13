<template>
<div
  class="card"
  :class="{ 'disabled' : card.flip}"
  @click="showingBackSide"
>
  <div
    class="card__container"
    :class="{ 'flip': card.flip }"
  >
    <div class="card__inner front">
      <svg-icon
        class="card__icon-question"
        name="question"
        width="70"
        height="70"
      />
    </div>

    <div class="card__inner back">
      <svg-icon
        v-if="!card.success"
        class="card__icon-main"
        :name="`${iconSet}/${iconSet}-${card.imageIndex}`"
        width="90"
        height="90"
      />

      <transition name="fade">
        <svg-icon
          v-if="card.success"
          class="card__icon-success"
          name="success"
          width="90"
          height="90"
        />
      </transition>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PairCard',

  props: {
    card: {
      type: Object,
      default: null,
    },

    iconSet: {
      type: String,
      default: 'fruit',
    },
  },

  data() {
    return {
      showBackSides: false,
    };
  },

  methods: {
    showingBackSide() {
      const cardData = {
        id: this.card.id,
        imageIndex: this.card.imageIndex,
      };

      this.$emit('card-click', cardData);
    },

  },
};
</script>

<style lang="stylus" scoped>
.card
  position relative
  box-sizing border-box
  border 1px solid rgba(#000, 0.1)
  border-radius 5px
  box-shadow 5px 5px rgba(#000, 0.01)
  cursor pointer
  perspective 1000px
  width 100%
  &::after
    content ''
    display block;
    padding-top 100%
  &.disabled
    pointer-events none

  &__container
    position absolute
    top 0
    right 0
    width 100%
    height 100%
    text-align center
    transition transform 0.3s
    transform-style preserve-3d

    &.flip
      transform rotateY(180deg)

  &__inner
    position absolute
    top 0
    left 0
    display flex
    align-items center
    justify-content center
    width 100%
    height 100%
    backface-visibility hidden

    &.front
      background-color rgba(#000, 0.1)

    &.back
      transform rotateY(180deg)

  &__icon-main,
  &__icon-question,
  &__icon-success
    display block
    height auto

  &__icon-main
    width 90%

  &__icon-question
    width 60%

  &__icon-success
    width 50%
</style>
