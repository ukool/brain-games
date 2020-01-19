<template>
<ul class="breadcrumbs">
  <li class="breadcrumbs__item">
    <nuxt-link
      class="breadcrumbs__link"
      to="/"
    >
      <span class="breadcrumbs__text">
        Главная
      </span>
    </nuxt-link>
  </li>
  <li
    v-for="(breadcrumb, index) in breadcrumbs"
    :key="`${index}_breadcrumb`"
    class="breadcrumbs__item"
  >
    <nuxt-link
      class="breadcrumbs__link"
      :to="breadcrumb.href"
      :class="{'last' : index === breadcrumbs.length - 1 }"
    >
      <span class="breadcrumbs__text">
        {{ breadcrumb.name }}
      </span>
    </nuxt-link>
  </li>
</ul>
</template>

<script>
export default {
  name: 'Breadcrumbs',

  props: {
    breadcrumbs: {
      type: Array,
      default: null,
    },
  },
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
    padding-left 10px
    padding-right 21px
    font-size 16px
    transition color 0.2s ease-in-out
    &::after
      content ''
      position absolute
      top 50%
      right 0
      width: 100%
      height 1px
      background-color $black
      transfrorm translateY(-50%)
      transform-origin 0 100%
      transition 0.2s linear

    &:hover
      color $violet
      &::after
        width 14px

      .breadcrumbs__text::after
        opacity 1

    &.last
      pointer-events none
      border none
      &::after
        display none

      .breadcrumbs__text::after
        display: none

  &__text
    position relative

    &::after
      content ''
      position absolute
      left 0
      bottom -2px
      width 100%
      height 1px
      background-color: $violet
      opacity 0
      transition opacity 0.2s linear
</style>
