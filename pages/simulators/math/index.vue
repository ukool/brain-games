<template>
<div class="container index">
  <div class="row">
    math page
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.memory
  &__list
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between

  &__item
    width calc(100% / 2 - 20px)
    margin-bottom 20px

  &__inner
    position relative
    padding-top 50%

  &__link
    position absolute
    top 0
    left 0
    display flex
    flex-direction column
    justify-content center
    align-items center
    width 100%
    height 100%
    font-size 30px
    text-transform uppercase
    border 1px solid $violet-dark
    border-radius 5px

  &__icon
    width 60px
    height 60px
    margin-top 20px
</style>
