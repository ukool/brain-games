<template>
<main class="game">
  <section class="game__container flex-container container">
    <div class="row game__row">
      <div
        class="game__inner"
        :class="{'full-screen': fullScreenMode }"
      >
        <transition name="fade">
          <GameStartModal
            v-if="!gameStarted"
            :simulator-info="simulatorInfo"
            @starting-game="startCountdown"
          />
        </transition>

        <transition name="fade">
          <Countdown
            v-if="showCountdown"
            @countdown-final="startGame"
          />
        </transition>

        <transition name="fade">
          <GameFinalModal
            v-if="gameFinal"
            :simulator-info="simulatorInfo"
            :final-data="finalModalData"
            :time="spentTimeInGame"
            @starting-game="startCountdown"
          />
        </transition>

        <div class="game__field">
          <slot
            v-show="gameStarted"
            name="game"
          />

          <transition name="fade">
            <PlugPlayButton
              v-if="gamePause"
              @play="startGameAfterPause"
            />
          </transition>
        </div>
        <div
          v-show="startGame"
          class="game__sidebar"
          :class="{'full-screen': fullScreenMode }"
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
import StopWatch from '~/helpers/stopWatch';

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

    finalModalData: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      showCountdown: false,
      gameStarted: false,
      gameOnPause: false,
      stopWatch: null,
      spentTimeInGame: null,
    };
  },

  computed: {
    fullScreenMode() {
      return this.$store.getters['settings/getFullScreenModeStatus'];
    },
  },

  watch: {
    gameFinal() {
      this.stopWatch.stopWatch();
      this.spentTimeInGame = this.stopWatch.getFormattedTime();
      this.stopWatch.resetWatch();
    },
  },

  created() {
    this.stopWatch = new StopWatch();
  },

  methods: {
    startCountdown() {
      this.showCountdown = true;
    },

    startGame() {
      this.stopWatch.startWatch();
      this.showCountdown = false;
      this.gameStarted = true;
      this.$emit('start-game');
    },

    startGameAfterPause() {
      this.stopWatch.resetWatch();
      this.$emit('start-game-after-pause');
      this.gameStarted = true;
      this.stopWatch.startWatch();
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
    background-color $white
    z-index 1000
    transition all 0.2s ease-in-out

    &.full-screen
      position fixed
      top 0
      left 0
      width 100%
      height 100%

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
    top -12%
    left 50%
    transform translateX(-50%)

  &__sidebar
    align-self center
    width 23%
    &.full-screen
      margin-right 10%
</style>
