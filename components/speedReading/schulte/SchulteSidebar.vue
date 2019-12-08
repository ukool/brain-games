<template>
<Sidebar>
  <template v-slot:content>
    <Dropdown
      class="sidebar__select"
      :title="'Сетка'"
      :select-list="difficultyLevels"
      @click-select="changeDifficultyListener"
    />

    <Checkbox
      class="sidebar__checkbox"
      :title="'Показывать подсказку'"
      :value="$props.settings.tip"
      name="tip"
      @checked="checkedHandler"
    />
    <Checkbox
      class="sidebar__checkbox"
      title="Закрашивать угаданные карточки"
      :value="$props.settings.highlight"
      :name="'highlight'"
      @checked="checkedHandler"
    />
    <Checkbox
      class="sidebar__checkbox"
      :title="'Цветные карточки'"
      :value="$props.settings.coloredCards"
      :name="'coloredCards'"
      @checked="checkedHandler"
    />
    <Checkbox
      class="sidebar__checkbox"
      :title="'Устная игра'"
      :value="$props.settings.orally"
      :name="'orally'"
      @checked="checkedHandler"
    />
    <Checkbox
      class="sidebar__checkbox"
      :title="'Анимации'"
      :value="$props.settings.animation"
      :name="'animation'"
      @checked="checkedHandler"
    />

    <ResetButton
      class="sidebar__btn-reset"
      :text="'Начать заново'"
      @reset="resetListener"
    />
  </template>
</Sidebar>
</template>

<script>
import Dropdown from '~/components/shared/components/Dropdown';
import ResetButton from '~/components/shared/components/buttons/ResetButton';
import Checkbox from '~/components/shared/components/Checkbox';
import Sidebar from '~/components/shared/layouts/Sidebar';

export default {
  name: 'SchulteSidebar',

  components: {
    Sidebar,
    Checkbox,
    Dropdown,
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
          value: '5x5',
          title: '5x5',
        },
        list: [
          { value: '5x5', title: '5x5', selected: false },
          { value: '6x6', title: '6x6', selected: false },
          { value: '7x7', title: '7x7', selected: false },
          { value: '8x8', title: '8x8', selected: false },
          { value: '9x9', title: '9x9', selected: false },
        ],
      },
    };
  },

  methods: {
    changeDifficultyListener(value) {
      this.$emit('change-difficulty', value);
    },

    checkedHandler(value, name) {
      this.$emit('change-settings', value, name);
    },

    resetListener() {
      this.$emit('reset');
    },
  },
};
</script>
