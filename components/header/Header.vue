<template>
<div class="container">
  <header class="header row">
    <n-link
      class="header__logo-link"
      :to="{name: 'index'}"
    >
      <img
        class="header__image"
        src="~/assets/img/logo.png"
        alt=""
      >
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

          <ul class="header__sublist">
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
        </li>
        <!-- <li class="header__item">
          <n-link
            class="header__link"
            to="/"
          >
            Скорочтение
          </n-link>
        </li> -->
        <!-- <li class="header__item">
          <n-link
            class="header__link"
            to="/"
          >
            Математика
          </n-link>
        </li> -->
      </ul>
    </nav>
  </header>
</div>
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
            { name: 'Запомнить числа', href: '' }, // href: '/memory/number' },
            { name: 'Запомнить слова', href: '' }, // href: '/memory/words' },
            { name: 'Запомнить картинки', href: '' }, // href: '/memory/images' },
          ],
        },
        {
          name: 'Скорочтение',
          href: '',
          sublinks: [
            { name: 'Таблица Шульте', href: '/speed-reading/schulte' }, // href: '/speed-reading/schulte' },
            { name: 'Тест Струпа', href: '' }, // href: '/speed-reading/stroop' },
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
      ]
    };
  },
};
</script>

<style scoped lang="stylus">
.header
  justify-content space-between
  align-items center

  &__image
    display block
    width 100px
    height auto

  &__nav
    display flex

  &__list
    display flex

  &__item
    &:not(:last-of-type)
      margin-right 15px
</style>
