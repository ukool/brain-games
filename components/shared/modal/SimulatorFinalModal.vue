<template>
<div class="simulator-modal">
  <div class="simulator-modal__inner">
    <svg-icon
      class="simulator-modal__icon"
      :name="simulatorInfo.iconName"
      width="90"
      height="90"
    />

    <h2 class="simulator-modal__title">
      {{ simulatorInfo.title }}
    </h2>

    <p class="simulator-modal__total">
      Результаты игры:
    </p>
    <ul class="simulator-modal__total-list">
      <li
        v-for="(data, index) in finalData"
        :key="`${index}_data`"
        class="simulator-modal__total-item"
      >
        {{ data.title }} : {{ data.value }}
      </li>
      <li
        v-if="time"
        class="simulator-modal__total-item"
      >
        Затрачено время: {{ time }}
      </li>
    </ul>

    <div class="simulator-modal__controls">
      <BorderButton
        text="Еще раз"
        icon-name="play"
        @click="startSimulator"
      />
      <div class="simulator-modal__settings">
        <BorderLink
          :href="simulatorsLinks"
          text="К тренажерам"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import simulatorStartAndFinalModalMixin from './mixins/simulatorStartAndFinalModalMixin';
import BorderLink from '~/components/shared/components/buttons/BorderLink';

export default {
  name: 'SimulatorFinalModal',

  components: {
    BorderLink,
  },

  mixins: [simulatorStartAndFinalModalMixin],

  props: {
    simulatorInfo: {
      type: Object,
      default: null,
    },
    finalData: {
      type: Object,
      default: null,
    },
    time: {
      type: String,
      default: null,
    },
  },

  computed: {
    simulatorsLinks() {
      const routePath = this.$route.path;
      const removePartIndex = routePath.lastIndexOf('/');
      return routePath.slice(0, removePartIndex);
    },
  },
};
</script>

<style lang="stylus" src="./stylus/simulatorFinalAndStartModal.styl"/>
