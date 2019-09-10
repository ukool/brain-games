<template>
<div class="sidebar">
  <h1 class="sidebar__title">
    Найди пару
  </h1>

  <VSelect
    class="sidebar__select"
    :title="'Сложность'"
    :select-list="difficultyLevels"
    @click-select="changeDifficultyListener"
  />

  <VSelect
    class="sidebar__select"
    :title="'Изображения'"
    :select-list="cardsImage"
    @click-select="changeCardsImage"
  />

  <ul class="sidebar__list">
    <li class="sidebar__item">
      Ходов: {{ $props.moves }}
    </li>
    <li class="sidebar__item">
      Время:
      <Stopwatch
        :status-timer="statusTimer"
      />
    </li>
  </ul>

  <button
    class="sidebar__btn"
    type="button"
  >
    Сбросить
  </button>
</div>
</template>

<script>
import VSelect from '~/components/shared/components/Select';
import Stopwatch from '~/components/shared/components/Stopwatch';

export default {
  name: 'PairSidebar',

  components: {
    VSelect,
    Stopwatch,
  },

  props: {
    moves: {
      type: Number,
      default: 0,
    },

    gameSuccess: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      statusTimer: 'stop',
      difficultyLevels: {
        default: {
          value: 'easy',
          title: 'легкий',
        },
        list: [
          { value: 'easy', title: 'легкий', selected: false },
          { value: 'medium', title: 'средний', selected: false },
          { value: 'hard', title: 'сложный', selected: false },
        ],
      },
      cardsImage: {
        default: {
          value: 'animal',
          title: 'животные',
        },
        list: [
          { value: 'pokemon', title: 'покемоны', selected: false },
          { value: 'animal', title: 'животные', selected: false },
          { value: 'fruit', title: 'фрукты', selected: false },
          { value: 'bird', title: 'птицы', selected: false },
          { value: 'flag', title: 'флаги', selected: false },
        ],
      },
    };
  },

  watch: {
    moves(value) {
      if (value === 1) this.statusTimer = 'start';
    },

    gameSuccess(value) {
      if (value === true) this.statusTimer = 'stop';
    },
  },

  methods: {
    changeDifficultyListener(value) {
      this.$emit('change-difficulty', value);
    },

    changeCardsImage(value) {
      this.$emit('change-images', value);
    },
  },
};
</script>

<style lang="stylus" scoped>
.sidebar
  &__title
    font-size 20px

  &__select
    & + &
      margin-top 25px

    .sidebar__title + &
      margin-top 15px

  &__list
    margin-top 30px

  &__item
    &:not(:first-of-type)
      margin-top 10px
</style>
