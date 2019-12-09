<template>
<main class="simulators">
  <div class="container simulators__container">
    <div class="row simulators__row">
      <aside class="simulators__sidebar">
        <span class="simulators__sidebar-title">
          Тренажеры:
        </span>
        <ul class="simulators__sidebar-list">
          <li class="simulators__sidebar-item">
            <a
              class="simulators__sidebar-link bottom-two-line"
              href="#"
              v-scroll-to="'#memory'"
            >
              Для памяти
            </a>
          </li>
          <li class="simulators__sidebar-item">
            <a
              class="simulators__sidebar-link bottom-two-line"
              href="#"
              v-scroll-to="'#reading'"
            >
              Для скорочтения
            </a>
          </li>
          <li class="simulators__sidebar-item">
            <a
              class="simulators__sidebar-link bottom-two-line"
              href="#"
              v-scroll-to="'#math'"
            >
              Для мышления
            </a>
          </li>
        </ul>
      </aside>
      <div class="simulators__inner">
        <div class="simulators__item">
          <n-link
            id="memory"
            class="simulators__title line-to-top"
            to="simulators/memory"
          >
            Тренажеры для памяти
          </n-link>
          <div class="simulators__list">
            <div
              v-for="(simulator, index) in simulatorsMemory"
              :key="`${index}_memory`"
              class="simulators__unit"
            >
              <GamePreviewCard :simulator="simulator" />
            </div>
            <div class="simulators__unit space" />
          </div>
        </div>

        <div class="simulators__item">
          <n-link
            id="reading"
            class="simulators__title line-to-top"
            to="simulators/speed-reading"
          >
            Тренажеры для скорочтения
          </n-link>
          <div class="simulators__list">
            <div
              v-for="(simulator, index) in simulatorsSpeedReading"
              :key="`${index}_read`"
              class="simulators__unit"
            >
              <GamePreviewCard :simulator="simulator" />
            </div>
          </div>
        </div>

        <div class="simulators__item">
          <n-link
            id="math"
            class="simulators__title line-to-top"
            to="simulators/math"
          >
            Тренажеры для мышления
          </n-link>
          <div class="simulators__list">
            <div
              v-for="(simulator, index) in simulatorsMath"
              :key="`${index}_math`"
              class="simulators__unit"
            >
              <GamePreviewCard :simulator="simulator" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import GamePreviewCard from '~/components/shared/components/GamePreviewCard';

export default {
  name: 'SimulatorsPage',
  components: { GamePreviewCard },

  data() {
    return {
      simulatorsMemory: [
        {
          iconName: 'pair',
          name: 'Найди пару',
          description: 'На игровом поле имеются переврнутые карточки, под каждой из которой, находится изображение. При клике на карточку появляется изображение. Карточке следует найти пару',
          target: 'Найди всем картам пару',
          page: 'simulators/memory/pair',
        },
        {
          iconName: 'number',
          name: 'Запомни число',
          description: 'На игровом поле на несколько секунд появляются и затем исчезают цифры',
          target: 'Запомни как можно больше чисел',
          page: 'simulators/memory/remember-number',
        },
      ],
      simulatorsSpeedReading: [
        {
          iconName: 'sudoku',
          name: 'Таблица Шульте',
          description: 'Таблица Шульте представляет собой таблицу, в ячейках которой хаотичным образом размещены последовательно идущие числа',
          target: 'Найди все числа по порядку',
          page: 'simulators/speed-reading/schulte',
        },
        {
          iconName: 'stroop',
          name: 'Тест струпа',
          description: 'На игровом поле на несколько секунд появляются и затем исчезают цифры',
          target: 'Запомни как можно больше чисел',
          page: 'simulators/speed-reading/stroop',
        },
        {
          iconName: 'homophones',
          name: 'Омофоны',
          description: 'На игровом поле на несколько секунд появляются и затем исчезают цифры.',
          target: 'Найди все омофоны',
          page: 'simulators/speed-reading/homophones',
        },
      ],
      simulatorsMath: [
        {
          iconName: 'calculator',
          name: 'Усный счет',
          description: 'Таблица Шульте представляет собой таблицу, в ячейках которой хаотичным образом размещены последовательно идущие числа.',
          target: 'Найди все числа по порядку',
          page: 'simulators/math/consider',
        },
      ],
    };
  },
};
</script>

<style scoped lang="stylus">
.simulators
  &__container
    margin 50px 0

  &__row
    align-items flex-start

  &__sidebar
    width 20%
    position sticky
    top 20px

    &-title
      font-size 18px

    &-list
      margin-top 15px

    &-item
      font-size 16px
      & + &
        margin-top 7px

  &__inner
    width 75%
    margin-left auto

  &__item
    width 100%
    & + &
      margin-top 70px

  &__title
    font-weight 700
    font-size 45px

  &__list
    display flex
    flex-wrap wrap
    width 100%
    margin-top 40px
    justify-content space-between

  &__unit
    width calc(100% / 3 - 10px)
    margin-bottom 15px
</style>
