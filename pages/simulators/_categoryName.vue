<template>
<main class="simulators">
  <div class="container">
    <Breadcrumbs
      :breadcrumbs="breadcrumbs"
      class="simulators__breadcrumbs"
    />

    <SimulatorsList
      :simulators-title="simulatorsList.title"
      :simulators="simulatorsList.simulators"
    />
  </div>
</main>
</template>

<script>
import firebase from 'firebase/app';
import SimulatorsList from '~/components/shared/layouts/SimulatorsList';
import Breadcrumbs from '../../components/shared/components/Breadcrumbs';

export default {
  name: 'SimulatorCategory',

  components: { Breadcrumbs, SimulatorsList },

  data() {
    return {
      simulatorsList: null,
    };
  },

  computed: {
    categoryName() {
      return this.$route.params.categoryName;
    },

    breadcrumbs() {
      return [
        {
          name: 'Тренажеры',
          href: '/simulators',
        },
        {
          name: this.simulatorsList.title,
          href: '',
        },
      ];
    },
  },

  asyncData(route) {
    return firebase.database().ref(`simulatorsList/${route.params.categoryName}`)
      .once('value')
      .then(snap => ({ simulatorsList: snap.val() }));
  },
};
</script>

<style scoped lang="stylus">
.simulators
  &__breadcrumbs
    margin-top 40px
</style>
