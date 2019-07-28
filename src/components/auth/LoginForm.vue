<template>
  <div class="login-form">
    <login-welcome-message :name="name"/>
    <form @submit.prevent="$emit('submit', { login: login || pseudo, password })">
      <p v-show="pseudo">{{ pseudo }}</p>
      <text-input ref="pseudo" name="pseudo" placeholder="Votre pseudo ..." :value="pseudo" v-model="login" v-show="!pseudo"/>
      <password-input ref="password" name="password" placeholder="Votre mot de passe ..." v-model="password"/>
      <submit-button color="primary">C'est parti !</submit-button>
    </form>
    <router-link :to="cancelRedirectsTo" id="cancel">Annuler</router-link>
  </div>
</template>

<script>
import LoginWelcomeMessage from './LoginWelcomeMessage'
import TextInput from '../TextInput'
import PasswordInput from '../PasswordInput'
import SubmitButton from '../SubmitButton'

export default {
  props: {
    name: {
      type: String,
      required: false
    },
    pseudo: {
      type: String,
      required: false
    },
    cancelRedirectsTo: {
      type: Object,
      required: false,
      default: function () {
        return { name: 'welcome' }
      }
    },
    invalidCredentials: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    LoginWelcomeMessage, TextInput, PasswordInput, SubmitButton
  },
  data() {
    return {
      login: null,
      password: null
    }
  },
  mounted() {
    if (this.pseudo) {
      this.$refs.password.focus()
    } else {
      this.$refs.pseudo.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';

  .login-form {
    padding: 50px;
    .login-welcome-message {
      margin-bottom: 30%;
    }
    .submit-button {
      margin-top: 30%;
      margin-bottom: 5px;
    }
    #cancel {
      color: $main-color;
    }
  }
</style>
