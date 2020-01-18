<template>
<div class="timer">
  {{ stopWatch.time }}
</div>
</template>

<script>
import StopWatch from '~/helpers/stopWatch';

export default {
  name: 'Stopwatch',

  props: {
    statusTimer: {
      type: String,
      default: 'stop',
    },
    startPosition: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      stopWatch: null,
    };
  },

  watch: {
    statusTimer(value) {
      if (value === 'start') {
        this.stopWatch.startWatch();
      }
      if (value === 'stop') {
        this.stopWatch.stopWatch();
        this.$emit('stop-watch', this.stopWatch.time);
      }
      if (value === 'reset') {
        this.stopWatch.resetWatch();
      }
    },
  },

  created() {
    this.stopWatch = new StopWatch();
  },
};
</script>

<style>

</style>
