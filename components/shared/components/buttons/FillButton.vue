<template>
<button
  class="fill-button"
  :class="[size, wide, disabled ? 'disabled' : null, loading ? 'loaded' : null]"
  type="button"
  @click="handlerClick"
>
  <span class="fill-button__text">
    {{ text }}
  </span>

  <span
    v-if="loading"
    class="fill-button__loader-container"
  >
    <DotsLoader class="fill-button__loader" />
  </span>
</button>
</template>

<script>
import fillButtonMixin from './mixins/fillButtonMixin';
import DotsLoader from '../loaders/DotsLoader';

export default {
  name: 'FillButton',
  components: { DotsLoader },
  mixins: [fillButtonMixin],
};
</script>

<style lang="stylus" src="./stylus/fillButton.styl" />
