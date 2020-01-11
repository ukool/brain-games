<template>
<main class="index">
  <section class="hero about">
    <div class="container hero__container">
      <div class="hero__col half-width">
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
    <div class="hero__image-box absolute">
      <img
        class="hero__img"
        src="/img/index/rocket.svg"
        alt=""
      >
    </div>
  </section>

  <section class="hero differences">
    <div class="container hero__container">
      <img
        class="hero__img"
        src="/img/index/frankenstein.svg"
        alt=""
      >

      <div class="hero__col pressed-right">
        <h1 class="hero__title black">
          Почему здесь?
        </h1>
        <ul class="hero__list">
          <li class="hero__list-item">
            бесплатно
          </li>
          <li class="hero__list-item">
            стильно
          </li>
          <li class="hero__list-item">
            просто
          </li>
          <li class="hero__list-item">
            без рекламы
          </li>
          <li class="hero__list-item">
            вау, пыщь-пыщь
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="games">
    <div class="container">
      <h1 class="hero__title black games__title">
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
                :class="[category.page]"
                :src="category.imageSrc"
              />
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="it-all hero">
    <div class="container hero__container">
      <div class="hero__col">
        <h1 class="hero__title">
          И это все?
        </h1>
        <p class="hero__description">
          Пока - да
          <svg-icon
            name="crying"
            width="35"
            height="35"
          />
        </p>
        <p class="hero__description">
          В скором времени ожидается
          <br />
          пополнение&nbsp;игр
        </p>
      </div>
      <img
        class="hero__img medium pressed-right"
        src="/img/index/owl.svg"
        alt=""
      >
    </div>
  </section>

  <section class="hero new">
    <div class="container hero__container">
      <img
        class="hero__img medium pressed-left"
        src="/img/index/snail.svg"
        alt=""
      >
      <div class="hero__col pressed-right">
        <h1 class="hero__title black">
          И что будет?
        </h1>
        <ul class="hero__list">
          <li class="hero__list-item">
            новые игры
          </li>
          <li class="hero__list-item">
            личный кабинет
          </li>
          <li class="hero__list-item">
            статистика
          </li>
          <li class="hero__list-item">
            прогресс
          </li>
          <li class="hero__list-item">
            и другое...
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section class="hero help">
    <div class="container hero__container">
      <div class="hero__col">
        <h1 class="hero__title">
          Вау! Помочь?
        </h1>
        <p class="hero__description">
          Буду рад
        </p>
        <p class="hero__description">
          Проект open source - вот
          <a
            class="hero__link bottom-two-line"
            href="https://github.com/ukool/brain-games"
            target="_blank"
            rel="nofollow"
          >
            github
          </a>
        </p>
      </div>
      <img
        class="hero__img pressed-right"
        src="/img/index/watch.svg"
        alt=""
      >
    </div>
  </section>

  <section class="hero communication">
    <div class="container hero__container">
      <img
        class="hero__img"
        src="/img/index/talkie.svg"
        alt=""
      >
      <div class="hero__col pressed-right">
        <h1 class="hero__title black">
          На связи? Канешн!
        </h1>
        <ul class="hero__list">
          <li class="hero__list-item">
            Эй, у тебя ошибка!
          </li>
          <li class="hero__list-item">
            Я придумал кое-что интересное!
          </li>
          <li class="hero__list-item">
            Давай запилим крутую штуку!
          </li>
        </ul>
        <p class="hero__links">
          Пишите:
          <a
            class="hero__link line-to-top"
            href="tg://resolve?domain=ukool"
            target="_blank"
            rel="nofollow"
          >
            telegram
          </a>,
          <a
            class="hero__link line-to-top"
            href="https://github.com/ukool/brain-games/issues"
            target="_blank"
            rel="nofollow"
          >
            github
          </a>,
          <a
            class="hero__link line-to-top"
            href="mailto:d_ukolov@bk.ru"
            rel="nofollow"
          >
            email
          </a>
        </p>
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
          page: '/simulators/memory',
          imageSrc: 'img/index/memory.svg',
          gameAmount: 1,
        },
        {
          title: 'Скорочтение',
          description: 'Вжух и прочитал',
          page: '/simulators/reading',
          imageSrc: '/img/index/speed.svg',
          gameAmount: 1,
        },
        {
          title: 'Устный счет',
          description: 'Вжух и посчитал',
          page: '/simulators/mind',
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
    width 100%

    &__container
      box-sizing border-box
      position relative
      display flex
      height 100%
      padding 0 8%

    &__col
      display inline-flex
      flex-direction column
      &.half-width
        width 50%
      &.pressed-right
        margin-left auto
      &.pressed-left
        margin-right auto
      &.margin-right
        margin-right 19.3%

    &__title
      font-weight 700
      font-size 60px
      padding-top 10vh
      letter-spacing 1.1px
      color white
      &.black
        color $black

    &__description
      margin-top 35px
      font-size 35px
      color white
      & + &
        margin-top 10px

    &__links
      display inline-flex
      margin-top 50px
      font-size 35px

    &__link
      font-weight 300
      &:first-of-type
        margin-left 10px

    &__list
      margin-top 35px
      &.white
        color $white

    &__list-item
      position relative
      font-size 25px
      padding-left 20px
      &::before
        content ''
        position absolute
        top 50%
        left 0
        transform translateY(-50%)
        width 10px
        height 10px
        border-radius 50%
        background-color currentColor
      & + &
        margin-top 20px

    &__image-box
      position absolute
      bottom 0
      right 0
      display flex
      width 600px
      height 100%
      justify-content flex-end

      img
        align-self flex-end

    &__img
      display block
      max-height 80%
      height 80%
      align-self center
      &.medium
        max-height 50%
        height 50%
      &.pressed-right
        margin-left auto

.about
  background-color $violet

.differences
  background-color $yellow

.games
  padding-bottom 4vh

  &__title
    margin-top 5vh
    padding-top 0
    text-align center

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
    height 420px
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
      font-size 21px
    &:hover
      box-shadow 0 10px 30px rgba(0, 0, 0, 0.4)

  &__name
    font-weight 700
    font-size 30px

  &__description
    margin-top 15px
    font-size 20px

  &__count
    margin-top auto

  &__image
    position absolute
    bottom 20px
    right 20px
    width 120px
    height 100px
    &.memory
      height 47px
    &.speed-reading
      width 120px

.it-all
  background-color #595e62

.new
  background-color $yellow

.help
  background-color $violet

.communication
  background-color $green-light
</style>
