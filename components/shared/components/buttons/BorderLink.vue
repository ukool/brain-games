<template>
<n-link
  class="border-btn"
  :class="[size]"
  :to="href"
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
</n-link>
</template>

<script>
import borderButtonMixin from './mixins/borderButtonMixin';

export default {
  name: 'BorderLink',

  mixins: [borderButtonMixin],

  props: {
    href: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus" src="./stylus/borderButton.styl" />
