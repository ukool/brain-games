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
                :class="{ 'error' : getError.status }"
                type="email"
                placeholder="Введите email"
              >
              <span
                v-if="getError.status"
                class="authentication__error"
              >
                {{ getError.message }}
              </span>
            </label>
            <label class="authentication__label">
              <input
                v-model="password"
                class="authentication__input input"
                :class="{ 'error' : getError.status }"
                type="password"
                placeholder="Введите пароль"
                autocomplete="new-password"
              >
              <span
                v-if="getError.status"
                class="authentication__error"
              >
                {{ getError.message }}
              </span>
            </label>
            <FillButton
              class="authentication__btn"
              text="Регистрация"
              :loading="getLoadingStatus"
              @click="registerUser"
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
import { mapGetters } from 'vuex';
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
    };
  },

  computed: {
    ...mapGetters(
      'user', [
        'getLoadingStatus',
        'getError',
      ],
    ),
  },

  methods: {
    registerUser() {
      const user = {
        email: this.email,
        password: this.password,
      };

      console.log(user);
      this.$store.dispatch('user/registerUser', user)
        .then(() => {
          // this.submitStatus = 'OK'
          this.$router.push('/');
        })
        .catch(err => {
          console.log(err);
          // this.submitStatus = err.message;
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
