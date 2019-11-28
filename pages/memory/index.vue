<template>
<div class="container memory">
  <div class="row">
    <GamePreviewCard />
<!--    <ul class="memory__list">-->
<!--      <li-->
<!--        v-for="(link, index) in links"-->
<!--        :key="`${index}_menu`"-->
<!--        class="memory__item"-->
<!--      >-->
<!--        <div class="memory__inner">-->
<!--          <nuxt-link-->
<!--            class="memory__link"-->
<!--            :to="link.page"-->
<!--          >-->
<!--            {{ link.name }}-->
<!--            <svg-icon-->
<!--              class="memory__icon"-->
<!--              :name="link.icon"-->
<!--            />-->
<!--          </nuxt-link>-->
<!--        </div>-->
<!--      </li>-->
<!--    </ul>-->
  </div>
</div>
</template>

<script>
import GamePreviewCard from '~/components/shared/GamePreviewCard';

export default {
  components: { GamePreviewCard },
  data() {
    return {
      links: [
        { name: 'Найди пару', page: 'memory/pair', icon: 'pair' },
        { name: 'Запомни число', page: 'memory/remember-number', icon: 'number' },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.memory
  &__list
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between

  &__item
    width calc(100% / 2 - 20px)
    margin-bottom 20px

  &__inner
    position relative
    padding-top 50%

  &__link
    position absolute
    top 0
    left 0
    display flex
    flex-direction column
    justify-content center
    align-items center
    width 100%
    height 100%
    font-size 30px
    text-transform uppercase
    border 1px solid $violet-dark
    border-radius 5px

  &__icon
    width 60px
    height 60px
    margin-top 20px
</style>
