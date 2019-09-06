<template>
<div class="test">
  <div
    class="card"
    @click="showingBackSide"
  >
    <div
      class="card__container"
      :class="{ 'flip': $props.card.flip }"
    >
      <div class="card__inner front">
        <svg-icon
          name="question"
          width="70"
          height="70"
        />
        {{ $props.card.imageIndex }}
      </div>

      <div class="card__inner back">
        <template v-if="!$props.card.success">
          <svg-icon
            :name="`${this.$props.name}/${this.$props.name}-${this.$props.card.imageIndex}`"
            width="90"
            height="90"
          />
          {{ this.$props.card.imageIndex }}
        </template>

        <template v-else>
          <svg-icon
            name="success"
            width="90"
            height="90"
          />
          <!-- {{ this.$props.card.imageIndex }} -->
        </template>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CardMemory',

  props: {
    card: {
      type: Object,
      default: null,
    },

    name: {
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
      this.$emit('card-click', this.$props.card.id, this.$props.card.imageIndex);
    },

  },
};
</script>

<style lang="stylus" scoped>
.card
  position relative
  box-sizing border-box
  margin-bottom 10px
  border 1px solid rgba(#000, 0.1)
  border-radius 5px
  box-shadow 5px 5px rgba(#000, 0.01)
  cursor pointer
  perspective 1000px
  width 100%
  padding-top 100%

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
      pointer-events none

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
</style>
