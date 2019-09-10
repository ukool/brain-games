<template>
<div class="timer">
  {{ hours }} : {{ minute }} : {{ seconds }}
</div>
</template>

<script>
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
      hours: 0,
      minute: 0,
      seconds: 0,
      miliseconds: 0,
      timer: null,
    };
  },

  watch: {
    statusTimer(value) {
      if (value === 'start') this.startWatch();
      if (value === 'stop') this.stopWatch();
      if (value === 'reset') this.resetWatch();
    },
  },

  // mounted() {
  //   this.start();
  // },

  methods: {
    add() {
      this.seconds += 1;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minute += 1;
        if (this.minute >= 60) {
          this.minute = 0;
          this.hours += 1;
        }
      }
    },

    startWatch() {
      this.timer = setInterval(() => {
        this.add();
      }, 1000);
    },

    stopWatch() {
      clearInterval(this.timer);
    },

    resetWatch() {
      this.hours = 0;
      this.minute = 0;
      this.seconds = 0;
    },
  },
};
</script>

<style>

</style>
