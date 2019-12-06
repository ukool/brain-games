<template>
<div class="spinner">
  <div class="spinner__item spinner__item_1" />
  <div class="spinner__item spinner__item_2" />
  <div class="spinner__item spinner__item_3" />
</div>
</template>

<script>
export default {
  name: 'DotsLoader',
};
</script>

<style scoped lang="stylus">
.spinner
  width 70px
  display flex
  text-align center

  &__item
    width 18px
    height 18px
    background-color $green-light
    border-radius 100%
    display inline-block
    animation bounced 1.4s infinite ease-in-out both

    &_1
      animation-delay -0.32s

    &_2
      animation-delay -0.16s

@keyframes bounced {
  0%, 80%, 100% {
    transform scale(0)
  }
  40% {
    transform scale(1.0)
  }
}
</style>
