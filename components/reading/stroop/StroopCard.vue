<template>
<div class="stroop-card">
  <transition name="fade">
    <div
      v-if="answers.length && roundCard"
      class="stroop-card__inner"
      :class="[difficulty]"
    >
      <p class="stroop-card__text">
        <template v-for="(item, index) in roundCard">
          <span
            :key="`${index}__item`"
            :style="{ color: item.color }"
          >
            {{ item.name }}
          </span>
        </template>
      </p>
      <div class="stroop-card__answers">
        <button
          v-for="(answer, index) in answers"
          :key="`${index}_answer-button`"
          class="stroop-card__btn"
          :class="{ 'error' : errorCardIndex === index }"
          @click="handleClick(answer, index)"
        >
          <template v-for="(color, count) in answer">
            <span :key="`${count}_color`">
              {{ color.name }}
            </span>
          </template>
        </button>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'StroopCard',
  props: {
    roundCard: {
      type: Array,
      default: null,
    },
    answers: {
      type: Array,
      default: null,
    },
    errorCardIndex: {
      type: Number,
      default: null,
    },

    difficulty: {
      type: String,
      default: 'easy',
    },
  },

  methods: {
    handleClick(answer, index) {
      const cardData = {
        answer,
        index,
      };
      this.$emit('click-to-answer', cardData);
    },
  },
};
</script>

<style lang="stylus" scoped>
.stroop-card
  display flex
  justify-content center

  &__inner
    text-align center
    padding 20px
    border 1px solid $violet-dark
    border-radius 5px
    &.easy
      width 370px
    &.medium
      width 550px
    &.hard
      width 650px

  &__text
    margin-top 50px
    font-size 25px
    text-transform uppercase

  &__answers
    display flex
    flex-wrap wrap
    justify-content space-between
    margin-top 50px
    padding 10px

  &__btn
    display block
    width calc(100% / 2 - 10px)
    margin-bottom 20px
    padding 15px
    border 1px solid $violet
    border-radius 3px
    transition 0.2s ease-in-out
    &:hover
      border-color $blue
    &.error
      animation shake 0.2s

@keyframes shake
  10%, 90%
    transform translate3d(-1px, 0, 0)
  20%, 80%
    transform translate3d(2px, 0, 0)
  30%, 50%, 70%
    transform translate3d(-4px, 0, 0)
  40%, 60%
    transform translate3d(4px, 0, 0)

.fade-enter-active,
.fade-leave-active
  transition opacity 0.2s ease-in-out

.fade-enter,
.fade-leave-to
  opacity 0
  transition opacity 0.2s ease-in-out
</style>
