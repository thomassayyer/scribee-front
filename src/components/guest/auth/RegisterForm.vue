<template>
  <div class="register-form">
    <register-welcome-message/>
    <form @submit.prevent="$emit('submit', user)">
      <text-input @keyup="validatePseudo" ref="pseudo" name="pseudo" placeholder="Votre pseudo ..." v-model="user.pseudo" :wrong="validation.pseudo !== null" :error="validation.pseudo"/>
      <text-input ref="name" name="name" placeholder="Votre nom ..." v-model="user.name"/>
      <text-input @keyup="validateEmail" ref="email" name="email" placeholder="Votre adresse email ..." v-model="user.email" :wrong="validation.email !== null" :error="validation.email"/>
      <password-input @keyup="validatePassword" ref="password" placeholder="Votre mot de passe ..." v-model="user.password" :wrong="validation.password !== null" :error="validation.password"/>
      <submit-button :disabled="!isEverythingValid || !isEverythingFilled" color="primary">M'enregistrer</submit-button>
    </form>
    <router-link :to="cancelRedirectsTo" id="cancel">Annuler</router-link>
  </div>
</template>

<script>
import RegisterWelcomeMessage from './RegisterWelcomeMessage'
import TextInput from '@/components/utils/inputs/TextInput'
import PasswordInput from '@/components/utils/inputs/PasswordInput'
import SubmitButton from '@/components/utils/buttons/SubmitButton'

export default {
  props: {
    name: {
      type: String,
      required: false
    },
    cancelRedirectsTo: {
      type: Object,
      required: false,
      default: function () {
        return { name: 'welcome' }
      }
    }
  },
  components: {
    RegisterWelcomeMessage, TextInput, PasswordInput, SubmitButton
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
    .submit-button {
      margin-top: 20%;
      margin-bottom: 5px;
    }
    #cancel {
      color: $main-color;
    }
  }
</style>
