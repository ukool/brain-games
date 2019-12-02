<template>
<div class="game-modal">
  <svg-icon
    class="game-modal__icon"
    name="sudoku"
    width="90"
    height="90"
  />

  <h2 class="game-modal__title">
    Таблица Шульте
  </h2>

  <ul class="game-modal__tags">
    <li class="game-modal__tag">
      Точность памяти
    </li>
    <li class="game-modal__tag">
      Объем памяти
    </li>
    <li class="game-modal__tag">
      Память
    </li>
  </ul>

  <div class="game-modal__description">
    <p class="game-modal__paragraph">
      Точность памяти — способность воспроизвести информацию без искажения. Это важное качество памяти может пригодиться во многих случаях жизни.
    </p>
    <p class="game-modal__paragraph">
      Человечество вырвалось на просторы Галактики. Но перемещаться в дальнем космосе можно только гиперпрыжками, используя строгую последовательность особых точек пространства. Секрет этих путей пока есть только у высокоразвитой расы космических пришельцев. Но только пока...
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
      <Stopwatch />
    </div>
  </div>
</div>
</template>

<script>
import gameStartAndFinalModalMixin from './mixins/gameStartAndFinalModalMixin';
import Stopwatch from '../components/Stopwatch';

export default {
  name: 'GameStartModal',
  components: { Stopwatch },
  mixins: [gameStartAndFinalModalMixin],
};
</script>

<style lang="stylus" src="./stylus/finalAndStartModal.styl"/>
