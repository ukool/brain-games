export default class StopWatch {
  constructor() {
    this.time = '00:00:00.000';
    this.timeBegan = null;
    this.timeStopped = null;
    this.stoppedDuration = 0;
    this.started = null;
    this.running = false;
  }

  startWatch() {
    if (this.running) return;

    if (this.timeBegan === null) {
      this.resetWatch();
      this.timeBegan = new Date();
    }

    if (this.timeStopped !== null) {
      this.stoppedDuration += (new Date() - this.timeStopped);
    }

    this.started = setInterval(this.watchRunning, 10);
    this.running = true;
  }

  stopWatch() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);

    this.$emit('stop-watch', this.time);
  }

  resetWatch() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = '00:00:00.000';
  }

  watchRunning() {
    const currentTime = new Date();
    const timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration);
    const hour = timeElapsed.getUTCHours();
    const min = timeElapsed.getUTCMinutes();
    const sec = timeElapsed.getUTCSeconds();
    const ms = timeElapsed.getUTCMilliseconds();

    this.time =
      `${this.zeroPrefix(hour, 2)}:${
        this.zeroPrefix(min, 2)}:${
        this.zeroPrefix(sec, 2)}.${
        this.zeroPrefix(ms, 3)}
      `;
  }

  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i += 1) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }
}
