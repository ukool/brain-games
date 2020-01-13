<template>
<Sidebar>
  <template v-slot:content>
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
  </template>
</Sidebar>
</template>

<script>
import Stopwatch from '~/components/shared/components/Stopwatch';
import Sidebar from '~/components/shared/layouts/Sidebar';

export default {
  name: 'PairSidebar',

  components: {
    Sidebar,
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
