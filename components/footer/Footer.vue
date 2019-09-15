<template>
<footer class="footer">
  <div class="container">
    <div class="row footer__row">
      <p class="footer__text">
        Нашли ошибку? Пишите:
      </p>
      <ul class="footer__list">
        <li class="footer__item">
          <a
            class="footer__link"
            href="tg://resolve?domain=ukool"
          >
            <svg-icon
              class="footer__icon"
              name="telegram"
            />
          </a>
        </li>
        <li class="footer__item">
          <a
            class="footer__link"
            href="mailto:d_ukolov@bk.ru"
          >
            <svg-icon
              class="footer__icon"
              name="email"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="stylus" scoped>
.footer
  padding 20px 0
  border-top 1px solid $blue-rick

  &__row
    align-items center
    justify-content flex-end

  &__list
    display flex
    margin-left 30px

  &__item
    &:not(:last-of-type)
      margin-right 20px

  &__link
    display block
    width 30px
    height 30px
    display flex
    align-items center
    justify-content center

  &__icon
    width 25px
    height 25px
</style>
