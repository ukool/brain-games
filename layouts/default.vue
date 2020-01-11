<template>
<div class="content">
  <Header class="content__header" />
  <div class="content__main">
    <nuxt />
  </div>
  <Footer class="content__footer" />
</div>
</template>

<script>
import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="stylus">
#__nuxt
  min-height 100%
  height 100%

#__layout
  min-height 100%
  height 100%
.content
  display flex
  flex-direction column
  min-height 100%
  height 100%

  &__header
    flex 0 0 auto

  &__main
    flex 1 0 auto

  &__footer
    flex 0 0 auto
</style>
