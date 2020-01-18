<template>
<div class="plug-play absolute">
  <button
    v-if="!startCountdown"
    class="plug-play__btn"
    type="button"
    @click="handleClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="213.7px"
      height="213.7px"
      viewBox="0 0 213.7 213.7"
      enable-background="new 0 0 213.7 213.7"
      xml:space="preserve"
    >
      <polygon
        class="plug-play__triangle"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        points="73.5,62.5 148.5,105.8 73.5,149.1"
      />
      <circle
        class="plug-play__circle"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        cx="106.8"
        cy="106.8"
        r="103.3"
      />
    </svg>
  </button>
  <transition name="fade">
    <Countdown
      v-if="startCountdown"
      :start-timer="startCountdown"
      @countdown-final="countdownFinalListener"
    />
  </transition>
</div>
</template>

<script>
export default {
  name: 'PlugPlayButton',

  data() {
    return {
      startCountdown: false,
    };
  },

  methods: {
    handleClick() {
      this.startCountdown = true;
    },

    countdownFinalListener() {
      this.startCountdown = false;
      this.$emit('play');
    },
  },
};
</script>

<style lang="stylus" scoped>
.plug-play
  position absolute
  top 0
  left 0
  z-index 1001
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  background-color $white

  &__btn
    display inline-block
    transition all 0.5s ease
    &:hover
      .plug-play__triangle
        stroke-dashoffset 0
        opacity 1
        stroke $violet
        animation nudge 0.7s ease-in-out

      .plug-play__circle
        stroke-dashoffset 0
        opacity 1

  &__triangle
    transition all 0.7s ease-in-out
    stroke-dasharray 240
    stroke-dashoffset 480
    stroke #000
    transform translateY(0)

  &__circle
    stroke $violet
    stroke-dasharray 650
    stroke-dashoffset 650
    opacity 0.3
    transition all 0.5s ease-in-out

@keyframes nudge{
  0% {
    transform translateX(0)
  }
  30% {
    transform translateX(-5px)
  }
  50% {
    transform translateX(5px)
  }
  70% {
    transform translateX(-2px)
  }
  100% {
    transform translateX(0)
  }
}
</style>
