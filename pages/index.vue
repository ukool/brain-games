<template>
<main class="index">
  <section class="hero">
    <div class="container hero__container">
      <div class="hero__inner">
        <h1 class="hero__title">
          Для чего сайт?
        </h1>
        <p class="hero__description">
          Поиграть, размять мозг, улучшить память, увеличить скорость чтения
        </p>
        <p class="hero__description">
          И просто занять время
        </p>
      </div>
    </div>
    <div class="hero__image-box">
      <img
        class="hero__img"
        src="/img/index/rocket.svg"
        alt=""
      >
    </div>
  </section>

  <section class="differences">
    <div class="differences__image-box">
      <img
        class="differences__img"
        src="/img/index/colors.svg"
        alt=""
      >
    </div>
    <div class="container differences__container">
      <div class="differences__inner">
        <h1 class="differences__title">
          Чем отличается от похожих сайтов?
        </h1>
        <ul class="differences__list">
          <li class="differences__item">
            - бесплатно
          </li>
          <li class="differences__item">
            - всегда бесплатно
          </li>
          <li class="differences__item">
            - уровень сложности выбираете сами
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="games">
    <div class="container">
      <div class="row">
        <ul class="games__list">
          <li
            v-for="(link, index) in links"
            :key="`${index}_menu`"
            class="games__item"
          >
            <nuxt-link
              class="games__link"
              :to="link.page"
            >
              {{ link.name }}
              <svg-icon
                class="games__icon"
                :name="link.icon"
              />
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</main>
</template>

<script>

export default {
  data() {
    return {
      links: [
        { name: 'Развитие памяти', page: 'memory', icon: 'memory' },
        { name: 'Скорочтение', page: 'speed-reading', icon: 'book' },
        { name: 'Математика', page: 'math', icon: 'math' },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.hero
    position relative
    height 60vh
    width: 100%
    background-color $violet

    &__title
      font-weight: 700
      font-size 60px
      padding-top 10vh
      letter-spacing 1.1px
      color white

    &__description
      max-width 50%
      margin-top: 50px
      font-size: 45px
      color white
      & + &
        margin-top: 20px

    &__image-box
      position absolute
      bottom 0
      right 0
      width: 600px
      height: 600px

    &__img
      display block
      width: 100%
      height auto

.differences
  position relative
  height 60vh
  width: 100%
  background-color $yellow

  &__inner
    max-width 50%
    margin-left auto

  &__title
    font-weight 700
    font-size 60px
    padding-top 10vh
    letter-spacing 1.1px
    text-align right

  &__list
    width 77%;
    margin-left 23%;

  &__item
    margin-top 50px
    font-size 25px
    & + &
      margin-top: 20px

  &__image-box
    position absolute
    top 0
    left 0
    width: 600px
    height: 600px

  &__img
    display block
    width: 100%
    height auto

.games
  &__list
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between
    +xs()
      flex-direction column

  &__item
    position relative
    width calc(100% / 2 - 20px)
    margin-bottom 20px
    +xs()
      width 100%

    &::after
      content ''
      display block
      padding-bottom 50%

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
    font-weight 500
    font-size 30px
    text-transform uppercase
    border 1px solid $violet-dark
    border-radius 5px
    +xs()
      font-size: 21px

  &__icon
    width 60px
    height 60px
    margin-top 20px
</style>
