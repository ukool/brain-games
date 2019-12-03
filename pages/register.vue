<template>
<div class="container">
  <input type="text" v-model="email">
  <input type="text" v-model="password">
  <button type="button" @click="googleSignIn(email, password)">отправить</button>
</div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    googleSignIn(email, password) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    },
  },
};
</script>

<style scoped lang="stylus">
input
  width: 40px
  width: 150px
  border 1px solid $black
</style>
