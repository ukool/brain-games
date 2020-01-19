<template>
<section class="error-page df fdc jcsb">
  <div class="error-page__container df fdc aic">
    <h2 class="error-page__title">
      404
    </h2>

    <p class="error-page__description">
      К сожалению, данной страницы не существует
    </p>

    <p class="error-page__info">
      Вы можете вернуться на
      <nuxt-link
        to="/"
        class="error-page__link bottom-two-line"
      >
        главную
      </nuxt-link>

      страницу или перейти в

      <nuxt-link
        to="/simulators"
        class="error-page__link bottom-two-line"
      >
        тренажеры
      </nuxt-link>
    </p>
    <div class="error-page__link-box w100">
      <BorderLink
        class="error-page__mobile-link"
        href="/"
        text="Главная"
      />
      <BorderLink
        class="error-page__mobile-link"
        href="/simulators"
        text="Тренажеры"
      />
    </div>
  </div>
</section>
</template>

<script>
import BorderLink from '~/components/shared/components/buttons/BorderLink';

export default {
  name: 'Error',

  components: { BorderLink },

  layout: 'blank',
};
</script>

<style lang="stylus" scoped>
.error-page
  margin-top auto
  margin-bottom auto

  &__title
    width-between-property('font-size', $sm, 200, $lg, 300, true, true)
    font-weight 900
    letter-spacing 5
    text-align center
    color $violet
    user-select none
    +lt-sm()
      width-between-property('font-size', $xs, 150, $sm, 200, true, true)
      letter-spacing 2.5px
    +xs()
      letter-spacing 1px

  &__description
    font-size 22px
    font-weight 500
    line-height 1.1
    text-align center

  &__info
    margin-top 25px
    font-size 16px
    text-align center

  &__link
    display inline-flex
    transition color 0.2s ease-in-out
    +lt-sm()
      pointer-events none
      &::before,
      &::after
        display: none

  &__link-box
    margin-top 60px
    +gt-sm()
      display none
    +lt-sm()
      display flex
      justify-content center
    +xs()
      flex-direction column
      align-items center

  &__mobile-link
    width 200px
    +gt-xs()
      &:not(:last-of-type)
        margin-right 50px
    +xs()
      width calc(100% - 60px)
      &:not(:first-of-type)
        margin-top 20px
</style>
