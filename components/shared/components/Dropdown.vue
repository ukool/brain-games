<template>
<div class="select">
  <p class="select__title">
    {{ $props.title }}:
  </p>

  <div class="select__inner">
    <button
      class="select__selected"
      type="button"
      @click="toggleVisibleSelectList"
    >
      {{ selectedItem }}

      <svg-icon
        class="select__icon-arrow"
        :class="{ 'open' : visibleSelectList}"
        name="arrow-angle"
        width="9"
        height="9"
      />
    </button>

    <ul
      v-if="visibleSelectList"
      class="select__list"
      v-click-outside="hideSelectList"
    >
      <li
        v-for="item in $props.selectList.list"
        :key="item.name"
        class="select__item"
      >
        <button
          class="select__btn"
          :class="{ 'active': item.title === selectedItem }"
          type="button"
          @click="clickHandler(item)"
        >
          {{ item.title }}

          <svg-icon
            v-if="item.title === selectedItem"
            class="select__btn-icon"
            name="check"
            width="10"
            height="10"
          />
        </button>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'Dropdown',

  props: {
    title: {
      type: String,
      default: '',
    },

    selectList: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      selectedItem: this.$props.selectList.default.title,
      visibleSelectList: false,
    };
  },

  methods: {
    clickHandler(value) {
      this.$emit('click-select', value.value);
      this.visibleSelectList = false;
      this.selectedItem = value.title;
    },

    hideSelectList() {
      this.visibleSelectList = false;
    },

    toggleVisibleSelectList() {
      this.visibleSelectList = !this.visibleSelectList;
    },
  },
};
</script>

<style lang="stylus" scoped>
.select
  display flex

  &__title
    font-size 16px

  &__selected
    position relative
    display flex
    align-items center
    border-bottom 1px solid $black

  &__icon-arrow
    margin-left 10px
    transform rotate(90deg)
    fill $black
    &.open
      transform rotate(-90deg)

  &__inner
    position relative
    margin-left 15px

  &__list
    position absolute
    z-index 1
    top 25px
    left -10px
    background-color #fff
    box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.05);

  &__btn
    display flex
    align-items center
    width 100%
    padding 5px 10px
    text-align left
    transition 0.2s color ease-in-out

    &:hover
      color #8A2BE2

    &.active
      pointer-events none

  &__btn-icon
    margin-left: 10px
</style>
