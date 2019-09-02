<template>
  <div class="login-form">
    <login-welcome-message :name="name"/>
    <form @submit.prevent="$emit('submit', { login: login || pseudo, password })">
      <p v-if="pseudo">{{ pseudo }}</p>
      <text-input ref="pseudo" name="pseudo" placeholder="Votre pseudo ..." v-model.trim="login" v-else/>
      <password-input ref="password" name="password" v-model="password"/>
      <login-invalid-credentials v-if="invalidCredentials"/>
      <default-button :disabled="!isEverythingFilled" color="primary">C'est parti !</default-button>
    </form>
    <router-link :to="{ name: 'welcome' }" id="cancel">Annuler</router-link>
  </div>
</template>

<script>
import LoginWelcomeMessage from '@/components/guest/auth/LoginWelcomeMessage'
import LoginInvalidCredentials from './LoginInvalidCredentials'
import TextInput from '@/components/utils/inputs/TextInput'
import PasswordInput from '@/components/utils/inputs/PasswordInput'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

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
    invalidCredentials: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    LoginWelcomeMessage, LoginInvalidCredentials, TextInput, PasswordInput, DefaultButton
  },
  data() {
    return {
      login: null,
      password: null
    }
  },
  computed: {
    isEverythingFilled() {
      return (this.login || this.pseudo) && this.password
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
  .default-button {
    margin-top: 30%;
    margin-bottom: 10px;
  }
  #cancel {
    color: $main-color;
  }
}
</style>
