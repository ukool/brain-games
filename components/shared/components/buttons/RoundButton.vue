<template>
<button class="round-button">
  <svg
    class="round-button__round"
    viewBox="0 0 50 50"
  >
    <circle
      class="round-button__circle"
      cx="25"
      cy="25"
      r="25"
      vector-effect="non-scaling-stroke"
    />
  </svg>
  <svg-icon
    class="round-button__icon"
    name="play"
    width="20"
    height="20"
  />
</button>
</template>

<script>
export default {
  name: 'RoundButton',
};
</script>

<style scoped lang="stylus">
.round-button
  position relative
  display flex
  justify-content center
  align-items center
  width: 50px
  height: 50px
  &:hover
    .round-button__round
      transform translate(-50%, -50%) rotate(-180deg)

  &__round
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width: 100%
    height: 100%
    transition transform 0.2s ease-in-out

  &__circle
    fill none
    stroke $black
    stroke-width 1px
    stroke-dasharray 50px 10px;
    transition transform 0.3s ease-in-out

  &__icon
    margin-top: 1px
    margin-left: 1px
</style>