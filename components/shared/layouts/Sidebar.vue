<template>
<div class="sidebar">
  <ul
    v-if="selectableSettings"
    class="sidebar__list"
  >
    <li
      v-for="(setting, index) in selectableSettings"
      :key="`${index}_selectable`"
      class="sidebar__item"
    >
      <Dropdown
        class="sidebar__select"
        :select-list="setting.options"
        :title="setting.title"
        @click-select="changeDifficultyListener($event, setting.name)"
      />
    </li>
  </ul>

  <ul
    v-if="switchableSettings"
    class="sidebar__list"
  >
    <li
      v-for="(setting, index) in switchableSettings"
      :key="`${index}_switchable`"
      class="sidebar__item"
    >
      <Checkbox
        :value="setting.enabled"
        :item="setting"
        @change="changeHandle"
      />
    </li>
  </ul>

  <div class="sidebar__info">
    <slot name="info" />
  </div>

  <ResetButton
    class="sidebar__btn-reset"
    :text="'Начать заново'"
    @reset="resetListener"
  />

  <div class="sidebar__buttons">
    <BorderButton
      class="sidebar__button"
      size="xs"
      icon-name="ques"
    />
    <BorderButton
      class="sidebar__button"
      size="xs"
      icon-name="sound"
    />
    <BorderButton
      class="sidebar__button"
      size="xs"
      :icon-name="fullScreenMode ? 'size': 'full-screen'"
      @click="fullScreenHandler"
    />
  </div>
</div>
</template>

<script>
import Dropdown from '~/components/shared/components/Dropdown';
import ResetButton from '~/components/shared/components/buttons/ResetButton';
import Checkbox from '~/components/shared/components/Checkbox';
import BorderButton from '~/components/shared/components/buttons/BorderButton';

export default {
  name: 'Sidebar',

  components: {
    BorderButton,
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

  computed: {
    fullScreenMode() {
      return this.$store.getters['settings/getFullScreenModeStatus'];
    },

    selectableSettings() {
      const selectableSettings = {};
      Object.keys({ ...this.settings }).forEach((key) => {
        if (this.settings[key].type === 'selectable') {
          selectableSettings[key] = this.settings[key];
        }
      });

      return selectableSettings;
    },

    switchableSettings() {
      const switchableSettings = {};
      Object.keys({ ...this.settings }).forEach((key) => {
        if (this.settings[key].type === 'switchable') {
          switchableSettings[key] = this.settings[key];
        }
      });

      return switchableSettings;
    },
  },

  methods: {
    changeDifficultyListener(value, name) {
      this.$emit('change-difficulty', name, value);
    },

    changeHandle(value, name) {
      this.$emit('change-settings', value, name);
    },

    fullScreenHandler() {
      const invertFullScreenMode = !this.fullScreenMode;
      this.$store.commit('settings/setFullScreenMode', invertFullScreenMode);
    },

    resetListener() {
      this.$emit('reset');
    },
  },
};
</script>

<style scoped lang="stylus">
.sidebar
  &__title
    font-size 20px

  &__list
    &:not(:first-of-type)
      margin-top 15px

  &__item
    & + &
      margin-top 15px

  &__info
    margin-top 30px

  &__info-item
    &:not(:first-of-type)
      margin-top 10px

  &__btn-reset
    margin-top 30px

  &__buttons
    display flex
    margin-top 30px

  &__button
    &:not(:last-of-type)
      margin-right 10px
</style>
