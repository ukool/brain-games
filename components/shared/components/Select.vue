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
    </button>

    <ul
      v-if="visibleSelectList"
      class="select__list"
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
        </button>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'VSelect',

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

    toggleVisibleSelectList() {
      this.visibleSelectList = !this.visibleSelectList;
    },
  },
};
</script>

<style lang="stylus" scoped>
.select
  &__title
    font-size 16px

  &__selected
    padding 5px
    border 1px solid #000
    border-radius 3px

  &__inner
    position relative
    margin-top 5px

  &__selected
    position relative
    width 250px

  &__list
    position absolute
    z-index 1
    top 35px
    left 0
    width 250px
    background-color #fff

  &__btn
    width 100%
    padding 5px
    text-align left
    transition 0.2s color ease-in-out

    &:hover
      color #8A2BE2

    &.active
      color #8A2BE2
      pointer-events none
</style>
