<template>
<button
  class="border-btn"
  :class="[ size, wide ? 'wide' : null ]"
  type="button"
  @click="handlerClick"
>
  <svg-icon
    v-if="iconName"
    class="border-btn__icon"
    :class="onlyIcon"
    :name="iconName"
    width="20"
    height="20"
  />
  <template v-if="text">
    {{ text }}
  </template>
</button>
</template>

<script>
import borderButtonMixin from './mixins/borderButtonMixin';

export default {
  name: 'BorderButton',

  mixins: [borderButtonMixin],
};
</script>

<style lang="stylus" src="./stylus/borderButton.styl" />
