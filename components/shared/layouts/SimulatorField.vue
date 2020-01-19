<template>
<main class="simulator">
  <section class="simulator__container flex-container container">
    <div class="row simulator__row">
      <div
        class="simulator__inner"
        :class="{'full-screen': fullScreenMode }"
      >
        <transition name="fade">
          <SimulatorStartModal
            v-if="!simulatorStarted && showStartModal"
            :simulator-info="simulatorInfo"
            @start-simulator="startCountdown"
          />
        </transition>

        <transition name="fade">
          <Countdown
            v-if="showCountdown"
            @countdown-final="startSimulator"
          />
        </transition>

        <transition name="fade">
          <SimulatorFinalModal
            v-if="simulatorFinal && !showCountdown && showFinalModal"
            :simulator-info="simulatorInfo"
            :final-data="finalData"
            :time="spentTimeInSimulator"
            @start-simulator="startCountdown"
          />
        </transition>

        <div
          v-show="simulatorStarted"
          class="simulator__field"
        >
          <slot name="simulator" />

          <transition name="fade">
            <PlugPlayButton
              v-if="simulatorPause"
              @play="startSimulatorAfterPause"
            />
          </transition>
        </div>
        <div
          v-show="simulatorStarted"
          class="simulator__sidebar"
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
import SimulatorStartModal from '~/components/shared/modal/SimulatorStartModal';
import SimulatorFinalModal from '~/components/shared/modal/SimulatorFinalModal';
import StopWatch from '~/helpers/stopWatch';

export default {
  name: 'SimulatorField',

  components: {
    SimulatorStartModal,
    SimulatorFinalModal,
  },

  props: {
    simulatorInfo: {
      type: Object,
      default: null,
    },
    simulatorPause: {
      type: Boolean,
      default: false,
    },
    simulatorFinal: {
      type: Boolean,
      default: false,
    },
    finalData: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      simulatorStarted: false,
      showCountdown: false,
      showStartModal: true,
      showFinalModal: false,
      stopWatch: null,
      spentTimeInSimulator: null,
    };
  },

  computed: {
    fullScreenMode() {
      return this.$store.getters['settings/getFullScreenModeStatus'];
    },
  },

  watch: {
    simulatorFinal() {
      this.stopWatch.stopWatch();
      this.spentTimeInSimulator = this.stopWatch.getFormattedTime();
      this.stopWatch.resetWatch();
      this.showFinalModal = true;
    },
  },

  created() {
    this.stopWatch = new StopWatch();
  },

  destroyed() {
    this.$store.commit('settings/setFullScreenMode', false);
  },

  methods: {
    startCountdown() {
      this.showCountdown = true;
      this.showStartModal = false;
    },

    startSimulator() {
      this.showFinalModal = false;
      this.showCountdown = false;

      setTimeout(() => {
        this.simulatorStarted = true;
        this.stopWatch.startWatch();
        if (!this.simulatorFinal) {
          this.$emit('start-simulator');
        } else {
          this.$emit('start-simulator-after-pause');
        }
      }, 100);
    },

    startSimulatorAfterPause() {
      this.stopWatch.resetWatch();
      this.$emit('start-simulator-after-pause');
      this.simulatorStarted = true;
      this.stopWatch.startWatch();
    },
  },
};
</script>

<style scoped lang="stylus">
.simulator
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
    height 100%
    margin-right auto

  &__sidebar
    align-self center
    width 23%
    &.full-screen
      margin-right 10%
</style>
