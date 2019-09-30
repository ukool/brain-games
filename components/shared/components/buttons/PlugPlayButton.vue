<template>
<div class="plug-play absolute">
  <button
    class="plug-play__btn"
    type="button"
    @click="handlerClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
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
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PlugPlayButton',

  computed: {
    ...mapState('plugStartGame', ['showPlugStartGame']),
  },

  methods: {
    handlerClick() {
      this.$store.commit('plugStartGame/hidePlugStartGame');
      this.$store.commit('countdown/showCountdown');

      this.$emit('play');
    },
  },
};
</script>

<style lang="stylus" scoped>
.plug-play
  display flex
  align-items center
  justify-content center
  &.absolute
    position absolute
    top 0
    left 0
    z-index 30
    width 100%
    height 100%
    background #fff

  &__btn
    display inline-block
    transition all 0.5s ease
    &:hover
      .plug-play__triangle
        stroke-dashoffset 0
        opacity 1
        stroke #f8aa28
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
    stroke #f8aa28
    stroke-dasharray 650
    stroke-dashoffset 650
    opacity 0.3
    transition all 0.5s ease-in-out

@keyframes nudge{
  0% {
    transform: translateX(0)
  }
  30% {
    transform: translateX(-5px)
  }
  50% {
    transform: translateX(5px)
  }
  70% {
    transform: translateX(-2px)
  }
  100% {
    transform: translateX(0)
  }
}
</style>
