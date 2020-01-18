<template>
<div class="countdown">
  <div class="countdown__inner">
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

  beforeDestroy() {
    this.timer = 0;
  },

  methods: {
    startCountdown() {
      this.showTimer = true;

      const timer = setInterval(() => {
        this.timer -= 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        this.$emit('countdown-final');
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
  z-index 1001
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  background-color $white

  &__inner
    flex-direction column
    justify-content center
    align-items center

  &__text
    text-transform uppercase
    font-size 25px
</style>
