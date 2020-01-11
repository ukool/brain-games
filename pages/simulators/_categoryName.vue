<template>
<SimulatorsList
  :simulators-title="simulatorsList.title"
  :simulators="simulatorsList.simulators"
/>
</template>

<script>
import firebase from 'firebase/app';
import SimulatorsList from '~/components/shared/layouts/SimulatorsList';

export default {
  components: { SimulatorsList },

  data() {
    return {
      simulatorsList: null,
    };
  },

  computed: {
    categoryName() {
      return this.$route.params.categoryName;
    },
  },

  asyncData(route) {
    return firebase.database().ref(`simulatorsList/${route.params.categoryName}`)
      .once('value')
      .then(snap => ({ simulatorsList: snap.val() }));
  },
};
</script>
