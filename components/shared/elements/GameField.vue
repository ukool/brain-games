<template>
<main class="game">
  <section class="game__container flex-container container">
    <div class="row game__row">
      <div class="game__field">
        <slot
          v-show="startGame"
          name="game"
        />
        <GameStartModal
          v-if="!startGame"
          @starting-game="startingCountdown"
        />

        <PlugPlayButton
          v-if="gamePause"
          @play="startingGameAfterPause"
        />

        <Countdown
          v-if="showCountdown"
          @contdown-final="startingGame"
        />
      </div>
      <div
        v-show="startGame"
        class="game-sidebar"
      >
        <slot name="sidebar" />
      </div>
    </div>
  </section>
</main>
</template>

<script>
import GameStartModal from '~/components/shared/modal/GameStartModal';

export default {
  name: 'GameField',

  components: { GameStartModal },

  props: {
    modalData: {
      type: Object,
      default: null,
    },

    gamePause: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showCountdown: false,
      startGame: false,
      gameOnPause: false,
    };
  },

  methods: {
    startingCountdown() {
      this.showCountdown = true;
    },

    startingGame() {
      this.showCountdown = false;
      this.startGame = true;
      this.$emit('start-game');
    },

    startingGameAfterPause() {
      this.$emit('start-game');
      this.startGame = true;
    },
  },
};
</script>

<style scoped lang="stylus">
.game
  position relative
  min-height calc(100vh - 61px - 71px) // TODO костылина - переделать
  display flex
  align-items center

  &__container
    height 100%
    min-height 100%

  &__row
    height: 100%
    min-height 100%

  &__field
    position relative
    display flex
    justify-content center
    flex-wrap wrap
    width 75%
    margin-right auto

  &__tip
    position absolute
    top 0
    left 50%
    transform translateX(-50%)

  &__sidebar
    width 23%
</style>
