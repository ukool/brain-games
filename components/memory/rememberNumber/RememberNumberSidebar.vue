<template>
<div class="sidebar">
  <Dropdown
    class="sidebar__select"
    :title="'Сложность'"
    :select-list="difficultyLevels"
    @click-select="listenerChangeDifficulty"
  />

  <Dropdown
    class="sidebar__select"
    :title="'Количество раундов'"
    :select-list="amoundRound"
    @click-select="listenerAmountRound"
  />

  <Checkbox
    class="sidebar__checkbox"
    :title="'Бесконечная игра'"
    :value="$props.settings.infinityGame"
    :name="'infinityGame'"
    @checked="handlerChecked"
  />

  <ResetButton
    class="sidebar__btn-reset"
    :text="'Начать заново'"
    @reset="listenerReset"
  />

  <button
    class="sidebar__btn-start"
    type="button"
    @click="handlerStart"
  >
    Начать игру
  </button>
</div>
</template>

<script>
import Dropdown from '~/components/shared/components/Dropdown';
import Checkbox from '~/components/shared/components/Checkbox';
import ResetButton from '~/components/shared/components/buttons/ResetButton';

export default {
  name: 'RememberNumberSidebar',

  components: {
    Dropdown,
    Checkbox,
    ResetButton,
  },

  props: {
    settings: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
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

      amoundRound: {
        default: {
          value: 10,
          title: '10 раундов',
        },
        list: [
          { value: 10, title: '10 раундов', selected: false },
          { value: 15, title: '15 раундов', selected: false },
          { value: 20, title: '20 раундов', selected: false },
        ],
      },
    };
  },

  methods: {
    listenerChangeDifficulty(value) {
      this.$emit('change-difficulty', value);
    },

    listenerAmountRound(value) {
      this.$emit('change-amoun-round', value);
    },

    listenerReset() {
      this.$emit('reset');
    },

    handlerChecked(value, name) {
      console.log(value, name);
      this.$emit('change-settings', value, name);
    },

    handlerStart() {
      this.$emit('start-game');
    },
  },
};
</script>

<style scoped lang="stylus">
.sidebar
  background-color white
  border-radius 5px

  &__select
    & + &
      margin-top 20px

  &__checkbox
    & + &
      margin-top 30px

    ../__select + &
      margin-top 30px

  &__btn-reset
    margin-top 20px
</style>
