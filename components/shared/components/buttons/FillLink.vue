<template>
<n-link
  class="fill-button"
  :class="[size, wide, disabled ? 'disabled' : null]"
  :to="href"
  type="button"
  @click="handlerClick"
>
  <span class="fill-button__text">
    {{ text }}
  </span>
</n-link>
</template>

<script>
import fillButtonMixin from './mixins/fillButtonMixin';

export default {
  name: 'FillLink',

  mixins: [fillButtonMixin],

  props: {
    href: {
      type: [String, Object],
      default: '/',
    },
  },
};
</script>

<style lang="stylus" src="./stylus/fillButton.styl" />
