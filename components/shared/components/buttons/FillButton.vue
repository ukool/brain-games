<template>
<button
  class="fill-button"
  :class="[size, wide, disabled ? 'disabled' : null]"
  type="button"
  @click="handlerClick"
>
  <span class="fill-button__text">
    {{ text }}
  </span>
</button>
</template>

<script>
import fillButtonMixin from './mixins/fillButtonMixin';

export default {
  name: 'FillButton',

  mixins: [fillButtonMixin],
};
</script>

<style lang="stylus" src="./stylus/fillButton.styl" />
