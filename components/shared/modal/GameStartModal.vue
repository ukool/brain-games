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
    </div>
  </div>
</div>
</template>

<script>
import BorderButton from '~/components/shared/components/buttons/BorderButton';

export default {
  name: 'GameStartModal',
  components: { BorderButton },

  props: {
    title: {
      type: String,
      default: null,
    },

    iconName: {
      type: String,
      default: null,
    },

    tags: {
      type: Array,
      default: null,
    },

    text: {
      type: [Array, String],
      default: null,
    },
  },

  methods: {
    startingGame() {
      this.$emit('starting-game');
    },
  },
};
</script>

<style scoped lang="stylus">
.game-modal
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  z-index 20
  box-sizing border-box
  display flex
  flex-direction column
  height 550px
  width 700px
  padding 30px
  background-color #fff
  box-shadow 0 3px 10px 2px rgba(0, 0, 0, 0.05)

  &__icon
    position absolute
    top 20px
    right 30px

  &__title
    margin-top 50px
    font-size 25px
    font-weight 700

  &__tags
    display flex
    margin-top 20px

  &__tag
    font-weight: 300
    background-color $violet-light
    padding 2px 7px
    &:not(:last-of-type)
      margin-right: 10px

  &__description
    margin-top 30px

  &__paragraph
    font-size 18px
    & + &
      margin-top: 7px

  &__controls
    display flex
    align-items center
    justify-content space-between
    margin auto 0 20px 0

  &__settings
    display flex

  &__settings-btn
    &:not(:last-of-type)
      margin-right 10px
</style>
