<template>
<Sidebar>
  <template v-slot:content>
    <h1 class="sidebar__title">
      Найди пару
    </h1>

    <Dropdown
      class="sidebar__select"
      :title="'Сложность'"
      :select-list="difficultyLevels"
      @click-select="changeDifficultyListener"
    />

    <Dropdown
      class="sidebar__select"
      :title="'Изображения'"
      :select-list="cardsImage"
      @click-select="changeCardsImage"
    />

    <ul class="sidebar__info-list">
      <li class="sidebar__item">
        Ходов: {{ $props.moves }}
      </li>
      <li class="sidebar__info-item">
        Время:
        <Stopwatch
          :status-timer="statusTimer"
        />
      </li>
    </ul>

    <ResetButton
      class="sidebar__btn-reset"
    />
  </template>
</Sidebar>
</template>

<script>
import Dropdown from '~/components/shared/components/Dropdown';
import Stopwatch from '~/components/shared/components/Stopwatch';
import ResetButton from '~/components/shared/components/buttons/ResetButton';
import Sidebar from '~/components/shared/layouts/Sidebar';

export default {
  name: 'PairSidebar',

  components: {
    Sidebar,
    Dropdown,
    Stopwatch,
    ResetButton,
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
