<template>
<button
  class="border-btn"
  type="button"
>
  {{ text }}
</button>
</template>

<script>
export default {
  name: 'BorderButton',

  props: {
    text: {
      type: String,
      default: 'Тыц',
      require: true,
    },
  },
};
</script>

<style lang="stylus" src="./stylus/borderButton.styl" />
