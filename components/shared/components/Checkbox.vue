<template>
<div class="checkbox">
  <p
    v-if="$props.title"
    class="checkbox__title"
  >
    {{ $props.title }}
  </p>

  <label class="checkbox__label">
    <input
      v-model="checked"
      class="checkbox__input"
      type="checkbox"
      @change="clickHandler($event)"
    >
    <span class="checkbox__background" />
    <span class="checkbox__icon" />
  </label>
</div>
</template>

<script>
export default {
  name: 'VCheckbox',

  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    title: {
      type: String,
      default: null,
    },

    value: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      checked: this.$props.value,
    };
  },

  methods: {
    clickHandler($event) {
      this.$emit('checked', $event.target.checked, this.$props.name);
    },
  },
};
</script>

<style scoped lang="stylus">
.checkbox
  display flex
  align-items center
  // flex-direction column

  &__label
    position relative
    display block
    width 40px
    height 20px
    cursor pointer

    ../__title + &
      margin-left auto

  &__input
    display none

    &:checked ~ .checkbox__icon
      background $violet
      transform: translateX(20px)
      transition all .2s cubic-bezier(.8,.4,.3,1.25), background .15s ease
      box-shadow 0 3px 8px rgba($violet,.2)

      &::before
        transform scale(1)
        opacity 0
        transition all .4s ease

    &:checked ~ .checkbox__background
      background $gray

  &__background
    position relative
    z-index 10
    top 3px
    left 0px
    width 40px
    height 14px
    display block
    background $gray
    border-radius 8px
    transition background .2s ease

  &__icon
    position absolute
    top 0
    left 0
    z-index 15
    width 20px
    height 20px
    display block
    background white
    border-radius 10px
    box-shadow 0 3px 8px rgba($gray,.5)
    transition all .2s ease

    &::before
      content ''
      position absolute
      display block
      margin -18px
      width 56px
      height 56px
      background rgba($violet,.5)
      border-radius 50%
      transform scale(0)
      opacity 1
      pointer-events none
</style>
