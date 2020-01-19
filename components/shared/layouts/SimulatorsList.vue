<template>
<div class="simulators">
  <h2 class="simulators__title">
    {{ simulatorsTitle }}
  </h2>

  <div class="row simulators__row">
    <div
      v-for="(simulator, index) in simulators"
      :key="`${index}_simulator`"
      class="simulators__item"
    >
      <SimulatorPreviewCard
        :simulator="simulator"
        :class="SimulatorPreviewCardClass"
      />
    </div>
  </div>
</div>
</template>

<script>
import SimulatorPreviewCard from '~/components/shared/components/SimulatorPreviewCard';

export default {
  name: 'SimulatorsList',

  components: { SimulatorPreviewCard },

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

  computed: {
    SimulatorPreviewCardClass() {
      return this.$route.path.replace('/simulators/', '');
    },
  },
};
</script>

<style scoped lang="stylus">
.simulators
  &__title
    margin-top 50px
    font-weight 700
    font-size 45px

  &__row
    margin-top 50px

  &__item
    width calc(100% / 4 - 10px)
    margin 0 15px
</style>
