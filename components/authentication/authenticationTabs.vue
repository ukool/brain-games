<template>
<div class="registration-tabs">
  <n-link
    class="registration-tabs__btn"
    :to="{ name: 'sign-up'}"
    :class="{'disabled' : $route.name === 'sign-up'}"
  >
    Регистрация
  </n-link>
  <n-link
    class="registration-tabs__btn"
    :to="{ name: 'sign-in'}"
    :class="{'disabled' : $route.name === 'sign-in'}"
  >
    Войти
  </n-link>
</div>
</template>

<script>
export default {
  name: 'AuthenticationTabs',
};
</script>

<style scoped lang="stylus">
.registration-tabs
  display flex
  justify-content space-between

  &__btn
    width calc(50% - 5px)
    line-height: 25px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-align center
    text-transform: uppercase;
    border-bottom 1px solid $black
    &.disabled
      opacity 0.2
      pointer-events none
      border-color transparent
</style>
