<template>
<div class="countdown">
  <p
    v-if="!showTimer"
    class="countdown__text"
  >
    Приготовьтесь
  </p>

    <p
      v-if="showTimer"
      class="countdown__text countdown__timer"
    >
      {{ timer }}
    </p>

</div>
</template>

<script>

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

  mounted() {
    setTimeout(() => {
      this.startCountdown();
    }, 1000);
  },

  methods: {
    startCountdown() {
      this.showTimer = true;

      const timer = setInterval(() => {
        this.timer -= 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        this.$emit('contdown-final');
        this.timer = 3;
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
</style>
