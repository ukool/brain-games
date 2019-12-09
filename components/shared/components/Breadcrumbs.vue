<template>
<ul class="breadcrumbs">
  <li class="breadcrumbs__item">
    <a
      class="breadcrumbs__link breadcrumbs__link_passed"
      href="/"
    >
      <span class="breadcrumbs__text">
        Главная
      </span>
    </a>
  </li>
  <li class="breadcrumbs__item">
    <a
      class="breadcrumbs__link breadcrumbs__link_passed"
      href="/"
    >
      <span class="breadcrumbs__text">
        Книги
      </span>
    </a>
  </li>
  <li class="breadcrumbs__item">
    <a
      class="breadcrumbs__link"
      href="/"
    >
      <span class="breadcrumbs__text">
        Бхагават Гита
      </span>
    </a>
  </li>
</ul>
</template>

<script>
export default {
  name: 'Breadcrumbs',
};
</script>

<style scoped lang="stylus">
.breadcrumbs
  display flex

  &__item:first-of-type .breadcrumbs__link_passed
    padding-left 0

  &__link
    display inline-block
    position relative
    padding-left: 10px
    padding-right: 21px
    font-size 14px
    transition color 0.2s ease-in-out
    +lt-lg()
      font-size 14px

    &::after
      content ''
      position absolute
      top 50%
      right 0
      height: 1px
      background-color $black
      transfrorm translateY(-50%)
      transform-origin 0 100%
      transition 0.2s linear

    &:hover
      color $violet-light

      .breadcrumbs__text::after
        opacity 1

    &_passed
      color $gray-light
      &::after
        width: 100%

      &:hover::after
        width: 14px

    &:not(&_passed)
      border none
      pointer-events none

      .breadcrumbs__text::after
        display: none

  &__text
    position relative

    &::after
      content ''
      position absolute
      left 0
      bottom -2px
      width: 100%
      height: 1px
      background-color: $violet-light
      opacity 0
      transition opacity 0.2s linear
</style>
