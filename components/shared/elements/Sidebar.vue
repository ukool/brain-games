<template>
<div class="sidebar">
  <slot name="content"></slot>
</div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped lang="stylus">
.sidebar
  &__title
    font-size 20px

  &__checkbox
    & + &
      margin-top 30px

    ../__select + &
      margin-top 30px

  &__select
    & + &
      margin-top 15px

    .sidebar__title + &
      margin-top 15px

  &__btn-reset
    margin-top 30px

  &__info-list
      margin-top 30px

  &__info-item
    &:not(:first-of-type)
      margin-top 10px
</style>
