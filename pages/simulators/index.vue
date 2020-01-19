<template>
<main class="simulators">
  <div class="container simulators__container">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <div class="row simulators__row">
      <aside class="simulators__sidebar">
        <ul class="simulators__sidebar-list">
          <li
            v-for="(simulator, index) in sidebarSimulators"
            :key="`${index}_sidebar-simulator`"
            class="simulators__sidebar-item"
          >
            <a
              v-scroll-to="`#${simulator.domId}`"
              class="simulators__sidebar-link bottom-two-line"
              href="#"
            >
              {{ simulator.title }}
            </a>
          </li>
        </ul>
      </aside>
      <div class="simulators__inner">
        <template>
          <div
            v-for="(simulatorItem, index) in simulatorsList"
            :key="`${index}_simulatorItem`"
            class="simulators__item"
          >
            <n-link
              :id="simulatorItem.page"
              class="simulators__title line-to-top"
              :to="`/simulators/${simulatorItem.page}`"
            >
              {{ simulatorItem.title }}
            </n-link>
            <div class="simulators__list">
              <div
                v-for="(simulator, i) in simulatorItem.simulators"
                :key="`${i}_${simulatorItem.title}_simulator`"
                class="simulators__unit"
              >
                <SimulatorPreviewCard
                  :simulator="simulator"
                  :class="simulatorItem.page"
                />
              </div>
              <div class="simulators__unit space" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import firebase from 'firebase/app';
import SimulatorPreviewCard from '~/components/shared/components/SimulatorPreviewCard';
import Breadcrumbs from '~/components/shared/components/Breadcrumbs';

export default {
  name: 'SimulatorsPage',
  components: {
    Breadcrumbs,
    SimulatorPreviewCard,
  },

  data() {
    return {
      simulatorsList: null,
      sidebarSimulators: null,
      breadcrumbs: [
        {
          name: 'Тренажеры',
          href: '/simulators',
        },
      ],
    };
  },

  asyncData() {
    return firebase.database().ref('simulatorsList')
      .once('value')
      .then((snap) => {
        const simulatorsList = snap.val();
        const sidebarSimulators = [];

        Object.keys(simulatorsList).forEach((item) => {
          sidebarSimulators.push({
            title: simulatorsList[item].title,
            domId: simulatorsList[item].page,
          });
        });

        return {
          simulatorsList,
          sidebarSimulators,
        };
      });
  },
};
</script>

<style scoped lang="stylus">
.simulators
  &__container
    margin 40px 0

  &__row
    align-items flex-start
    margin-top 40px

  &__sidebar
    width 20%
    position sticky
    top 20px

    &-item
      font-size 16px
      & + &
        margin-top 7px

  &__inner
    position relative
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
