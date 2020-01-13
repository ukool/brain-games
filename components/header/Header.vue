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
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseleave(index)"
          >
            <n-link
              class="header__link"
              :to="menu.href"
            >
              {{ menu.name }}
            </n-link>
            <transition name="fade">
              <ul
                v-if="acitveMenuItem === index"
                class="header__sublist"
              >
                <li
                  v-for="(submenu, item) in menu.sublinks"
                  :key="`${item}_submenu`"
                  class="header__subitem"
                >
                  <n-link
                    class="header__sublink"
                    :to="submenu.href"
                  >
                    {{ submenu.name }}
                  </n-link>
                </li>
              </ul>
            </transition>
          </li>
          <li class="header__item">
            <n-link
              class="header__link"
              :to="{ name: 'sign-in'}"
            >
              Личный кабинет
            </n-link>
          </li>
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
          href: '',
          sublinks: [
            { name: 'Найти пару', href: '/memory/pair' }, // href: '/memory/find-pair' },
            { name: 'Найти одинаковую', href: '' }, // href: '/memory/same' },
            { name: 'Запомнить числа', href: '/memory/remember-number' },
            { name: 'Запомнить слова', href: '' }, // href: '/memory/words' },
            { name: 'Запомнить картинки', href: '' }, // href: '/memory/images' },
          ],
        },
        {
          name: 'Скорочтение',
          href: '',
          sublinks: [
            { name: 'Таблица Шульте', href: '/speed-reading/schulte' },
            { name: 'Тест Струпа', href: '/speed-reading/stroop' },
            { name: 'Найти слово', href: '' }, // href: '/speed-reading/find-word' },
            { name: 'Скоростное чтение', href: '' }, // href: '/speed-reading/reading' },
            { name: 'Нестандартное чтение', href: '' }, // href: '/speed-reading/сustom-reading' },
          ],
        },
        {
          name: 'Математика',
          href: '',
          sublinks: [
            { name: 'Устный счет', href: '' }, // }href: '/math/verbal' },
          ],
        },
      ],
      acitveMenuItem: null,
    };
  },

  methods: {
    handleMouseEnter(index) {
      this.acitveMenuItem = index;
    },

    handleMouseleave() {
      this.acitveMenuItem = null;
    },
  },
};
</script>

<style scoped lang="stylus">
.header
  padding 5px 0
  background-color $violet
  border-bottom 1px solid $black

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

  &__sublist
    position absolute
    padding 15px
    box-sizing border-box
    background-color white
    z-index 1020
    // width 185px

  &__sublink
    display inline-block
    padding 3px 0
    transition color 0.2s ease-in-out
    &:hover
      color $violet

.fade-enter-active,
.fade-leave-active
  transition opacity 0.2s ease-in-out

.fade-enter,
.fade-leave-to
  opacity 0
  transition opacity 0.2s ease-in-out

</style>
