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
          И просто занять время...
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
        src="/img/index/frankenstein.svg"
        alt=""
      >
    </div>
    <div class="container differences__container">
      <div class="differences__inner">
        <h1 class="differences__title">
          А отличие?
        </h1>
        <ul class="differences__list">
          <li class="differences__item">
            - бесплатно
          </li>
          <li class="differences__item">
            - стильно
          </li>
          <li class="differences__item">
            - просто
          </li>
          <li class="differences__item">
            - без рекламы
          </li>
          <li class="differences__item">
            - вау, пыщь-пыщь
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="games">
    <div class="container">
      <h1 class="games__title">
        Доступные категории
      </h1>
      <div class="row">
        <ul class="games__list">
          <li
            v-for="(category, index) in categories"
            :key="`${index}_category`"
            class="games__item"
          >
            <nuxt-link
              class="games__link"
              :to="category.page"
            >
              <span class="games__name">
                {{ category.title }}
              </span>
              <span class="games__description">
                {{ category.description }}
              </span>
              <span class="games__count">
                Игр: {{ category.gameAmount }}
              </span>
              <img
                class="games__image"
                :src="category.imageSrc"
              />
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="it-all">
    <div class="container it-all__container">
      <div class="it-all__inner">
        <h1 class="it-all__title">
          И это все?
        </h1>
        <p class="it-all__description">
          Пока - да )=
        </p>
        <p class="it-all__description">
          В скором времени ожидается пополнение игр
        </p>
      </div>
    </div>
    <div class="it-all__image-box">
      <img
        class="it-all__img"
        src="/img/index/frankenstein.svg"
        alt=""
      >
    </div>
  </section>

  <section class="new">
    <div class="new__image-box">
      <img
        class="new__img"
        src="/img/index/snail.svg"
        alt=""
      >
    </div>
    <div class="container new__container">
      <div class="new__inner">
        <h1 class="new__title">
          И что будет?
        </h1>
        <ul class="new__list">
          <li class="new__item">
            - новые игры
          </li>
          <li class="new__item">
            - личный кабинет
          </li>
          <li class="new__item">
            - статистика
          </li>
          <li class="new__item">
            - прогресс
          </li>
          <li class="new__item">
            - и другая пижня
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="help hero">
    <div class="container it-all__container">
      <div class="it-all__inner">
        <h1 class="it-all__title">
          Вау! Помочь?
        </h1>
        <p class="it-all__description">
          Буду рад
        </p>
        <p class="it-all__description">
          Проект оpen source - вот github
        </p>
      </div>
    </div>
    <div class="hero__image-box">
      <img
        class="hero__img"
        src="/img/index/watch.svg"
        alt=""
      >
    </div>
  </section>

  <section class="new communication">
    <div class="new__image-box">
      <img
        class="new__img"
        src="/img/index/talkie.svg"
        alt=""
      >
    </div>
    <div class="container new__container">
      <div class="new__inner">
        <h1 class="new__title">
          На связи?
        </h1>
        <p class="it-all__description">
          Канешн
        </p>
        <ul class="new__list">
          <li class="new__item">
            - telegramm
          </li>
          <li class="new__item">
            - email
          </li>
          <li class="new__item">
            - issue на github
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
      categories: [
        {
          title: 'Память и внимание',
          description: 'Вжух и запомнил',
          page: 'memory',
          imageSrc: 'img/index/memory.svg',
          gameAmount: 1,
        },
        {
          title: 'Скорочтение',
          description: 'Вжух и прочитал',
          page: 'speed-reading',
          imageSrc: '/img/index/speed.svg',
          gameAmount: 1,
        },
        {
          title: 'Устный счет',
          description: 'Вжух и посчитал',
          page: 'math',
          imageSrc: '/img/index/math.svg',
          gameAmount: 1,
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.hero
    position relative
    height 600px
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
  height 600px
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
  height 600px
  &__title
    font-weight: 700
    font-size 60px
    margin-top 5vh
    text-align center
    letter-spacing 1.1px

  &__list
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between
    margin-top 5vh
    +xs()
      flex-direction column

  &__item
    position relative
    width calc(100% / 3 - 20px)
    height: 420px
    margin-bottom 20px
    +xs()
      width 100%

  &__link
    position relative
    box-sizing border-box
    display flex
    flex-direction column
    overflow hidden
    width 100%
    height 100%
    padding 34px 30px 30px 30px
    background-color $blue-light
    transition 0.4s ease-in-out
    +xs()
      font-size: 21px
    &:hover
      box-shadow 0 10px 30px rgba(0, 0, 0, 0.4)

  &__name
    font-weight 700
    font-size 30px
    color $violet

  &__description
    margin-top: 15px
    font-size 20px

  &__count
    margin-top auto

  &__image
    position absolute
    bottom -30px
    right 0
    width 250px
    height 250px
    margin-top 20px

.it-all
  position relative
  height 600px
  background-color #595e62

  &__title
    font-weight: 700
    font-size 60px
    padding-top 10vh
    letter-spacing 1.1px
    color white

  &__description
    max-width 50%
    margin-top 50px
    font-size 45px
    color white
    & + &
      margin-top 20px

  &__image-box
    position absolute
    bottom 0
    right 0
    width 600px
    height 600px

  &__img
    display block
    width 100%
    height auto

.new
  position relative
  height 600px
  width 100%
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
    width 77%
    margin-left 23%

  &__item
    margin-top 50px
    font-size 25px
    & + &
      margin-top: 20px

  &__image-box
    position absolute
    top 0
    left 0
    width 600px
    height 600px

  &__img
    display block
    width: 100%
    height auto
.help
  background-color $violet

.communication
  background-color $green-light
</style>
