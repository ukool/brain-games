<template>
<div class="content">
  <Header />
  <div class="content-space">
    <div class="content-centered">
      <nuxt />
    </div>
  </div>
  <Footer />
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

<style>
html {
  font-family: 'Futura PT', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

body {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#__nuxt{
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

#__layout {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    flex: 1 0 auto;
}

.content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    flex: 1 0 auto;
}

.content-space {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
}

.content-centered {
  min-height: 100%;
  flex: 1 0 auto;

}
</style>
