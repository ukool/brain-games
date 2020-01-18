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

    <ul
      v-if="simulatorInfo.tags && simulatorInfo.tags.length"
      class="simulator-modal__tags"
    >
      <li
        v-for="(tag, index) in simulatorInfo.tags"
        :key="`${index}_tag`"
        class="simulator-modal__tag"
      >
        {{ tag }}
      </li>
    </ul>

    <div
      v-if="simulatorInfo.description"
      class="simulator-modal__description"
    >
      <p
        v-for="(paragraph, index) in simulatorInfo.description"
        :key="`${index}_paragraph`"
        class="simulator-modal__paragraph"
      >
        {{ paragraph }}
      </p>
    </div>

    <div class="simulator-modal__controls">
      <BorderButton
        text="Начать игру"
        icon-name="play"
        @click="startingGame"
      />
      <div class="simulator-modal__settings">
        <BorderButton
          class="simulator-modal__settings-btn"
          size="xs"
          icon-name="ques"
        />
        <BorderButton
          class="simulator-modal__settings-btn"
          size="xs"
          icon-name="sound"
        />
        <BorderButton
          class="simulator-modal__settings-btn"
          size="xs"
          :icon-name="fullScreenMode ? 'size': 'full-screen'"
          @click="fullScreenHandler"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import simulatorStartAndFinalModalMixin from './mixins/simulatorStartAndFinalModalMixin';

export default {
  name: 'SimulatorStartModal',

  mixins: [simulatorStartAndFinalModalMixin],

  props: {
    simulatorInfo: {
      type: Object,
      default: null,
    },
  },

  computed: {
    fullScreenMode() {
      return this.$store.getters['settings/getFullScreenModeStatus'];
    },
  },

  methods: {
    fullScreenHandler() {
      const invertFullScreenMode = !this.fullScreenMode;
      this.$store.commit('settings/setFullScreenMode', invertFullScreenMode);
    },
  },
};
</script>

<style lang="stylus" src="./stylus/simulatorFinalAndStartModal.styl"/>
