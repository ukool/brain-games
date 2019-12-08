<template>
<main class="simulators">
  <div class="container">
    <div class="row">
      <aside class="simulators__sidebar">
        <span class="simulators__sidebar-title">
          Тренажеры:
        </span>
        <ul class="simulators__sidebar-list">
          <li class="simulators__sidebar-item">
            <a
              class="simulators__sidebar-link"
              href=""
            >
              Для памяти
            </a>
          </li>
          <li class="simulators__sidebar-item">
            <a
              class="simulators__sidebar-link"
              href=""
            >
              Для скорочтения
            </a>
          </li>
          <li class="simulators__sidebar-item">
            <a
              class="simulators__sidebar-link"
              href=""
            >
              Для мышления
            </a>
          </li>
        </ul>
      </aside>
      <div class="simulators__container">
        <div class="simulators__item">
          <h1 class="simulators__title">
            Тренажеры для памяти
          </h1>
          <div class="simulators__list">
            <div class="simulators__item">
<!--              <GamePreviewCard />-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import GamePreviewCard from '~/components/shared/layouts/GamePreviewCard';

export default {
  name: 'SimulatorsPage',
  components: { GamePreviewCard },
};
</script>

<style scoped lang="stylus">

</style>