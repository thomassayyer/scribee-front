<template>
  <div class="register-form">
    <register-welcome-message/>
    <form @submit.prevent="$emit('submit', user)">
      <text-input @keyup="validatePseudo" ref="pseudo" name="pseudo" placeholder="Votre pseudo ..." v-model.trim="user.pseudo" :wrong="validation.pseudo !== null" :error="validation.pseudo"/>
      <text-input name="name" placeholder="Votre nom ..." v-model.trim="user.name"/>
      <text-input @keyup="validateEmail" name="email" placeholder="Votre adresse email ..." v-model.trim="user.email" :wrong="validation.email !== null" :error="validation.email"/>
      <password-input @keyup="validatePassword" v-model="user.password" :wrong="validation.password !== null" :error="validation.password"/>
      <default-button :disabled="!isEverythingValid || !isEverythingFilled" color="primary">M'enregistrer</default-button>
    </form>
    <router-link :to="{ name: 'welcome' }" id="cancel">Annuler</router-link>
  </div>
</template>

<script>
import RegisterWelcomeMessage from './RegisterWelcomeMessage'
import TextInput from '@/components/utils/inputs/TextInput'
import PasswordInput from '@/components/utils/inputs/PasswordInput'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

export default {
  components: {
    RegisterWelcomeMessage, TextInput, PasswordInput, DefaultButton
  },
  data() {
    return {
      user: {
        pseudo: null,
        name: null,
        email: null,
        password: null
      },
      validation: {
        pseudo: null,
        email: null,
        password: null
      }
    }
  },
  mounted() {
    this.$refs.pseudo.focus()
  },
  computed: {
    isEverythingFilled() {
      return this.user.pseudo && this.user.name && this.user.email && this.user.password
    },
    isEverythingValid() {
      return !this.validation.email && !this.validation.password && !this.validation.pseudo
    }
  },
  methods: {
    validatePseudo() {
      if (this.user.pseudo && this.user.pseudo.length > 15) {
        this.validation.pseudo = "Votre pseudo est trop long."
      } else {
        this.validation.pseudo = null
      }
    },
    validateEmail() {
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!regexp.test(this.user.email)) {
        this.validation.email = "Il ne s'agit pas d'une adresse email valide."
      } else {
        this.validation.email = null
      }
    },
    validatePassword() {
      if (this.user.password && this.user.password.length < 8) {
        this.validation.password = "Votre mot de passe est trop court."
      } else {
        this.validation.password = null
      }
    },
    error(field, error) {
      this.validation[field] = error
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.register-form {
  padding: 50px;
  .register-welcome-message {
    margin-bottom: 20%;
  }
  .default-button {
    margin-top: 20%;
    margin-bottom: 10px;
  }
  #cancel {
    color: $main-color;
  }
}
</style>
