<template>
<div class="schulte__sidebar">
  <VSelect
    class="schulte__select"
    :title="'Сложность'"
    :select-list="difficultyLevels"
    @click-select="changeDifficultyListener"
  />

  <VCheckbox
    class="schulte__checkbox"
    :title="'Показывать подсказку'"
    :value="$props.settings.tip"
    :name="'tip'"
    @checked="checkedHandler"
  />
  <VCheckbox
    class="schulte__checkbox"
    :title="'Подсвечивать угаданные числа'"
    :value="$props.settings.highlight"
    :name="'highlight'"
    @checked="checkedHandler"
  />
  <VCheckbox
    class="schulte__checkbox"
    :title="'Цветные карточки'"
    :value="$props.settings.coloredCards"
    :name="'coloredCards'"
    @checked="checkedHandler"
  />
  <VCheckbox
    class="schulte__checkbox"
    :title="'Устная игра'"
    :value="$props.settings.orally"
    :name="'orally'"
    @checked="checkedHandler"
  />
  <VCheckbox
    class="schulte__checkbox"
    :title="'Анимации'"
    :value="$props.settings.animation"
    :name="'animation'"
    @checked="checkedHandler"
  />

  <ResetButton
    class="schulte__btn-reset"
    :text="'Начать заново'"
    @reset="resetListener"
  />
</div>
</template>

<script>
import VSelect from '~/components/shared/components/Select';
import VCheckbox from '~/components/shared/components/Checkbox';
import ResetButton from '~/components/shared/components/buttons/ResetButton';

export default {
  name: 'SchulteSidebar',

  components: {
    VSelect,
    VCheckbox,
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

<style scoped lang="stylus">
.schulte
  &__checkbox
    & + &
      margin-top 30px

    ../__select + &
      margin-top 30px

  &__btn-reset
    margin-top 30px
</style>
