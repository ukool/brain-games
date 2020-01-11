<template>
<div class="game-modal">
  <div class="game-modal__inner">
    <svg-icon
      class="game-modal__icon"
      name="sudoku"
      width="90"
      height="90"
    />

    <h2 class="game-modal__title">
      Таблица Шульте
    </h2>

    <p class="game-modal__total">
      Результаты игры:
    </p>
    <ul class="game-modal__total-list">
      <li class="game-modal__total-item">
        Время: 120 сек
      </li>
      <li class="game-modal__total-item">
        Ходов:
      </li>
      <li class="game-modal__total-item">
        Сложноость:
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

  components: { BorderLink },

  mixins: [gameStartAndFinalModalMixin],
};
</script>

<style lang="stylus" src="./stylus/finalAndStartModal.styl"/>
