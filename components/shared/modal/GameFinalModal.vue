<template>
<div class="game-modal">
  <div class="game-modal__inner">
    <svg-icon
      class="game-modal__icon"
      :name="simulatorInfo.iconName"
      width="90"
      height="90"
    />

    <h2 class="game-modal__title">
      {{ simulatorInfo.title }}
    </h2>

    <p class="game-modal__total">
      Результаты игры:
    </p>
    <ul class="game-modal__total-list">
      <li
        v-for="(data, index) in finalData"
        :key="`${index}_data`"
        class="game-modal__total-item"
      >
        {{ data.title }} : {{ data.value }}
      </li>
      <li
        v-if="time"
        class="game-modal__total-item"
      >
        Затрачено время: {{ time }}
      </li>
    </ul>

    <div class="game-modal__controls">
      <BorderButton
        text="Еще раз"
        icon-name="play"
        @click="startingGame"
      />
      <div class="game-modal__settings">
        <BorderLink
          href="/"
          text="К тренажерам"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import gameStartAndFinalModalMixin from './mixins/gameStartAndFinalModalMixin';
import BorderLink from '../components/buttons/BorderLink';

export default {
  name: 'GameFinalModal',

  components: {
    BorderLink,
  },

  mixins: [gameStartAndFinalModalMixin],

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
};
</script>

<style lang="stylus" src="./stylus/finalAndStartModal.styl"/>
