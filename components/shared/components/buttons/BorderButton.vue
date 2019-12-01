<template>
<button
  class="border-btn"
  :class="[size]"
  type="button"
  @click="handlerClick"
>
  <svg-icon
    v-if="iconName"
    class="border-btn__icon"
    :class="onlyIcon"
    :name="iconName"
    width="16"
    height="16"
  />
  <template v-if="text">
    {{ text }}
  </template>
</button>
</template>

<script>
export default {
  name: 'BorderButton',

  props: {
    text: {
      type: String,
      default: null,
    },

    iconName: {
      type: String,
      default: null,
    },

    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['md', 'sm', 'xs'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    onlyIcon() {
      if (this.iconName && !this.text) return 'only-icon';
      return false;
    },
  },

  methods: {
    handlerClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="stylus" src="./stylus/borderButton.styl" />
