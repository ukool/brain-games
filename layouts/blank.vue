<template>
<div class="hero">
  <Header />
  <nuxt />
  <Footer />
</div>
</template>

<script>
import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';

export default {
  name: 'Blank',

  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="stylus">
  html
    height 100%

  body
    height: 100%

  #__nuxt
    height 100%

  #__layout
    height 100%

  .hero
    display: flex
    flex-direction: column
    height 100%
</style>
