<template>
<div class="countdown">
  <p
    v-if="!showTimer"
    class="countdown__text"
  >
    Приготовьтесь
  </p>
  <transition name="fade">
    <p
      v-if="showTimer"
      class="countdown__text countdown__timer"
    >
      {{ timer }}
    </p>
  </transition>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Countdown',

  props: {
    startTimer: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showTimer: false,
      timer: 3,
    };
  },

  computed: {
    ...mapState('countdown', ['startCountdown']),
  },

  watch: {
    startCountdown(value) {
      if (value) this.start();
    },
  },

  mounted() {
    setTimeout(() => {
      this.$store.commit('countdown/playCountdown');
    }, 1000);
  },

  methods: {
    start() {
      this.showTimer = true;

      const timer = setInterval(() => {
        this.timer -= 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        this.timer = 3;
        this.$store.commit('countdown/hideCountdown');
        this.$store.commit('countdown/stopCountdown');
      }, 3100);
    },
  },
};
</script>

<style lang="stylus" scoped>
.countdown
  position absolute
  top 0
  left 0
  z-index 40
  width 100%
  height 100%
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color #fff

  &__text
    text-transform uppercase
    font-size 25px

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
