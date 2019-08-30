<template>
  <div class="edit-profile-form">
    <form @submit.prevent="submit">
      <p class="pseudo">{{ pseudo }}</p>
      <text-input name="name" placeholder="Votre nom ..." v-model="profile.name"/>
      <text-input @keyup="validateEmail" name="email" placeholder="Votre adresse email ..." v-model="profile.email" :wrong="validation.email !== null" :error="validation.email"/>
      <password-input placeholder="Votre mot de passe actuel ..." v-model="profile.oldPassword" :wrong="validation.oldPassword !== null" :error="validation.oldPassword"/>
      <password-input @keyup="validateNewPassword" placeholder="Votre nouveau mot de passe ..." v-model="profile.newPassword" :wrong="validation.newPassword !== null" :error="validation.newPassword"/>
      <submit-button :disabled="!isEverythingValid || !isEverythingFilled" color="white">Modifier mon profil</submit-button>
    </form>
    <router-link :to="{ name: 'quit' }" id="quit">Quitter {{ appName }} :(</router-link>
  </div>
</template>

<script>
import TextInput from '@/components/utils/inputs/TextInput'
import PasswordInput from '@/components/utils/inputs/PasswordInput'
import SubmitButton from '@/components/utils/buttons/SubmitButton'

export default {
  components: {
    TextInput, PasswordInput, SubmitButton
  },
  data() {
    return {
      profile: {
        name: null,
        email: null,
        oldPassword: null,
        newPassword: null
      },
      validation: {
        email: null,
        oldPassword: null,
        newPassword: null
      }
    }
  },
  computed: {
    isEverythingFilled() {
      return this.profile.name && this.profile.email
    },
    isEverythingValid() {
      return !this.validation.email && !this.validation.newPassword
    },
    pseudo() {
      return this.$store.state.user.pseudo
    },
    appName() {
      return this.$store.state.appName
    }
  },
  methods: {
    validateEmail() {
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!regexp.test(this.profile.email)) {
        this.validation.email = "Il ne s'agit pas d'une adresse email valide."
      } else {
        this.validation.email = null
      }
    },
    validateNewPassword() {
      if (this.profile.newPassword && this.profile.newPassword.length < 8) {
        this.validation.newPassword = "Votre nouveau mot de passe est trop court."
      } else {
        this.validation.newPassword = null
      }
    },
    submit() {
      this.$emit('submit', this.profile)
      this.profile.oldPassword = null
      this.profile.newPassword = null
    },
    error(field, error) {
      this.validation[field] = error
    }
  },
  created() {
    this.$store.dispatch('retrieveCurrentUser').then(user => {
      this.profile.name = user.name
      this.profile.email = user.email
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.edit-profile-form {
  .submit-button {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  #quit {
    color: white;
  }
}
</style>
