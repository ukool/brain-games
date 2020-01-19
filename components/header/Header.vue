<template>
<header class="header">
  <div class="container">
    <div class="row header__row">
      <n-link
        class="header__logo-link"
        :to="{name: 'index'}"
      >
        <svg-icon
          class="header__image"
          name="idea"
          width="50"
          height="50"
        />
      </n-link>

      <nav class="header__nav">
        <ul class="header__list">
          <li
            v-for="(menu, index) in menuStructure"
            :key="`${index}_menu`"
            class="header__item"
          >
            <n-link
              class="header__link"
              :to="menu.href"
            >
              {{ menu.name }}
            </n-link>
          </li>
          <!--<li class="header__item">-->
          <!--  <n-link-->
          <!--    class="header__link"-->
          <!--    :to="{ name: 'sign-in'}"-->
          <!--  >-->
          <!--    Личный кабинет-->
          <!--  </n-link>-->
          <!--</li>-->
        </ul>
      </nav>
    </div>
  </div>
</header>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      menuStructure: [
        {
          name: 'Память',
          href: '/simulators/memory',
        },
        {
          name: 'Мышление',
          href: '/simulators/mind',
        },
        {
          name: 'Скорочтение',
          href: '/simulators/reading',
        },
      ],
    };
  },
};
</script>

<style scoped lang="stylus">
.header
  padding 5px 0
  background-color $violet
  border-bottom 1px solid $white

  &__row
    justify-content space-between
    align-items center

  &__logo-link
    width 50px
    height 50px

  &__image
    display block
    width 50px
    height 50px

  &__nav
    display flex

  &__list
    display flex

  &__item
    position relative
    &:not(:last-of-type)
      margin-right 20px

  &__link
    font-size 18px
    color $white
</style>
