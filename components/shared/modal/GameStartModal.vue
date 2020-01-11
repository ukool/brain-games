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

    <ul
      v-if="simulatorInfo.tags && simulatorInfo.tags.length"
      class="game-modal__tags"
    >
      <li
        v-for="(tag, index) in simulatorInfo.tags"
        :key="`${index}_tag`"
        class="game-modal__tag"
      >
        {{ tag }}
      </li>
    </ul>

    <div
      v-if="simulatorInfo.description"
      class="game-modal__description"
    >
      <p
        v-for="(paragraph, index) in simulatorInfo.description"
        :key="`${index}_paragraph`"
        class="game-modal__paragraph"
      >
        {{ paragraph }}
      </p>
    </div>

    <div class="game-modal__controls">
      <BorderButton
        text="Начать игру"
        icon-name="play"
        @click="startingGame"
      />
      <div class="game-modal__settings">
        <BorderButton
          class="game-modal__settings-btn"
          size="xs"
          icon-name="ques"
        />
        <BorderButton
          class="game-modal__settings-btn"
          size="xs"
          icon-name="sound"
        />
        <BorderButton
          class="game-modal__settings-btn"
          size="xs"
          icon-name="full-screen"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import gameStartAndFinalModalMixin from './mixins/gameStartAndFinalModalMixin';

export default {
  name: 'GameStartModal',

  mixins: [gameStartAndFinalModalMixin],

  props: {
    simulatorInfo: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="stylus" src="./stylus/finalAndStartModal.styl"/>
