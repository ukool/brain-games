<template>
<div class="checkbox">
  <p
    v-if="item"
    class="checkbox__title"
  >
    {{ item.title }}
  </p>

  <label class="checkbox__label">
    <input
      class="checkbox__input"
      :value="value"
      type="checkbox"
      :checked="isChecked"
      @change="changeHandle"
    >
  </label>
</div>
</template>

<script>
export default {
  name: 'Checkbox',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: {
      type: [Boolean, String, Number, Array],
      default: null,
    },

    title: {
      type: String,
      default: null,
    },

    item: {
      type: Object,
      default: null,
    },
  },

  computed: {
    isChecked() {
      return this.value;
    },
  },

  methods: {
    changeHandle() {
      let updatedValue;

      if (typeof this.value === 'boolean') {
        updatedValue = !this.value;
        this.$emit('change', updatedValue, this.item.name);
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.checkbox
  display flex
  align-items center

  &__label
    position relative
    display block
    width 40px
    height 20px
    cursor pointer

    ../__title + &
      margin-left auto

  &__input
    appearance none
    width 40px
    height 16px
    border 1px solid #ebebeb
    border-radius 2px
    background-color #ebebeb
    position relative
    display inline-flex
    overflow hidden
    align-items center
    transition  background 0.3s
    box-sizing border-box
    cursor pointer

    &::after
      content ''
      position absolute
      top -1px
      left  -1px
      width 16px
      height 16px
      background-color $white
      border 1px solid #ebebeb
      border-radius 2px
      transition  left 0.1s cubic-bezier(0.785, 0.135, 0.15, 0.86)

    &:checked
      background-color rgba($violet, 0.7)
      border-color $green-light

      &::after
        left:23px
        border-color $green-light

    &:hover:not(:checked):not(:disabled)::after,
    &:focus:not(:checked):not(:disabled)::after
      left -1px

    &:disabled
      opacity 0.5
</style>
