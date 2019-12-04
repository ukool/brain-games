<template>
<main class="authentication">
  <div class="flex-container authentication__container">
    <div class="row">
      <div class="authentication__col form">
        <div class="authentication__inner">
          <AuthenticationTabs />

          <form
            class="authentication__form"
            action=""
          >
            <label class="authentication__label">
              <input
                v-model="email"
                class="authentication__input input"
                :class="{ 'error' : errorsStatus.email }"
                type="email"
                placeholder="Введите email"
              >
              <span
                v-if="errorsStatus.email"
                class="authentication__error"
              >
                Email уже занят
              </span>
            </label>
            <label class="authentication__label">
              <input
                v-model="password"
                class="authentication__input input"
                :class="{ 'error' : errorsStatus.password }"
                type="password"
                placeholder="Введите пароль"
                autocomplete="new-password"
              >
              <span
                v-if="errorsStatus.password"
                class="authentication__error"
              >
                Пароли не совпадают
              </span>
            </label>
            <label class="authentication__label">
              <input
                v-model="confirmPassword"
                class="authentication__input input"
                :class="{ 'error' : errorsStatus.password }"
                type="password"
                placeholder="Повторите пароль"
                autocomplete="new-password"
              >
              <span
                v-if="errorsStatus.password"
                class="authentication__error"
              >
                Пароли не совпадают
              </span>
            </label>
            <FillButton
              class="authentication__btn"
              text="Регистрация"
            />
          </form>
        </div>
      </div>
      <AuthenticationInfo class="authentication__join authentication__col" />
    </div>
  </div>
</main>
</template>

<script>
import firebase from 'firebase/app';
import AuthenticationInfo from '~/components/authentication/authenticationInfo';
import AuthenticationTabs from '~/components/authentication/authenticationTabs';
import FillButton from '~/components/shared/components/buttons/FillButton';

export default {
  name: 'SignUpPage',

  components: {
    FillButton,
    AuthenticationTabs,
    AuthenticationInfo,
  },

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorsStatus: {
        email: false,
        password: false,
      },
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
.authentication
  min-height calc(100vh - 61px - 71px) // TODO костылина - переделать
  display flex
  align-items center

  &__container
    height 100%

  &__col
    width 50%
    &.form
      display flex
      flex-direction column
      align-items center

  &__inner
    width 380px

  &__form
    display flex
    flex-direction column
    justify-content center
    width 100%
    margin-top 30px

  &__label
    position relative
    padding-bottom 25px
    & + &
      margin-top 5px

  &__error
    position absolute
    bottom 0
    left 0
    width: 100%
    height 20px
    color $red
    text-align center

  &__btn
    margin-top 30px
</style>
