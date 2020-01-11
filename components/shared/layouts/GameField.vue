<template>
<main class="game">
  <section class="game__container flex-container container">
    <div class="row game__row">
      <div class="game__inner">
        <transition name="fade">
          <GameStartModal
            v-if="!startGame"
            :simulator-info="simulatorInfo"
            @starting-game="startingCountdown"
          />
        </transition>

        <transition name="fade">
          <Countdown
            v-if="showCountdown"
            @countdown-final="startingGame"
          />
        </transition>

        <transition name="fade">
          <GameFinalModal
            v-if="gameFinal"
            @starting-game="startingCountdown"
          />
        </transition>

        <div class="game__field">
          <slot
            v-show="startGame"
            name="game"
          />

          <transition name="fade">
            <PlugPlayButton
              v-if="gamePause"
              @play="startingGameAfterPause"
            />
          </transition>
        </div>
        <div
          v-show="startGame"
          class="game__sidebar"
        >
          <slot name="sidebar" />
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<script>
import GameStartModal from '~/components/shared/modal/GameStartModal';
import GameFinalModal from '~/components/shared/modal/GameFinalModal';

export default {
  name: 'GameField',

  components: {
    GameStartModal,
    GameFinalModal,
  },

  props: {
    modalData: {
      type: Object,
      default: null,
    },

    simulatorInfo: {
      type: Object,
      default: null,
    },

    gamePause: {
      type: Boolean,
      default: false,
    },

    gameFinal: {
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
      this.$emit('start-game-after-pause');
      this.startGame = true;
    },
  },
};
</script>

<style scoped lang="stylus">
.game
  position relative
  height 100%
  display flex
  align-items center

  &__container
    height 100%
    min-height 100%

  &__row
    height 100%
    min-height 100%

  &__inner
    position relative
    width 100%
    display flex
    align-items flex-start

  &__field
    position relative
    display flex
    justify-content center
    align-self center
    flex-wrap wrap
    width 75%
    margin-right auto

  &__tip
    position absolute
    top 0
    left 50%
    transform translateX(-50%)

  &__sidebar
    align-self center
    width 23%
</style>
