<template>
<main class="simulators">
  <div class="container">
    <h2 class="simulators__title">
      {{ simulatorsTitle }}
    </h2>

    <div class="row simulators__row">
      <div
        v-for="(simulator, index) in simulators"
        :key="`${index}_simulator`"
        class="simulators__item"
      >
        <GamePreviewCard
          :simulator="simulator"
        />
      </div>
    </div>
  </div>
</main>
</template>

<script>
import GamePreviewCard from '~/components/shared/layouts/GamePreviewCard';

export default {
  name: 'SimulatorsList',

  components: { GamePreviewCard },

  props: {
    simulatorsTitle: {
      type: String,
      default: null,
    },

    simulators: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style scoped lang="stylus">
.simulators
  min-height calc(100vh - 61px - 71px) // TODO костылина - переделать

  &__title
    margin-top 50px
    font-weight 700
    font-size 45px

  &__row
    margin 50px -15px 0 -15px

  &__item
    margin 0 15px

</style>
