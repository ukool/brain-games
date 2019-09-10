<template>
<div class="success-modal">
  <div class="success-modal__inner">

  </div>
</div>
</template>

<script>
export default {
  name: 'SuccessModal',
};
</script>

<style scoped lang="stylus">
.success-modal
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 99
  display flex
  justify-content center
  align-items center
  background: linear-gradient(to right, #2bc0e4, #eaecc6);

  &__inner
    width 500px
    height 500px
    background-color #fff
</style>
