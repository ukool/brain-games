<template>
<div class="authentication-info">
  <h2 class="authentication-info__title">
    Присоединяйтесь, чтобы
  </h2>
  <ul class="authentication-info__list">
    <li class="authentication-info__item">
      видеть статистику
    </li>
    <li class="authentication-info__item">
      следить за прогрессом
    </li>
    <li class="authentication-info__item">
      добавлять игры в избранное
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'AuthenticationInfo',
};
</script>

<style scoped lang="stylus">
.authentication-info
  padding-left 20px
  border-left 1px solid $violet

  &__title
    font-size 30px
    line-height 1.5

  &__list
    margin-top 20px

  &__item
    position relative
    font-weight 300
    font-size 18px
    line-height 1.67
    &:not(&:last-of-type)
      margin-top 25px
    &::before
      content '-'

</style>
