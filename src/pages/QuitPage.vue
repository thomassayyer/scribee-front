<template>
  <div class="quit-page">
    <vertical-container>
      <h2 class="header">
        Êtes-vous certain de vouloir <strong>quitter {{ appName }}</strong> ?<br/>
        <small>Cette action supprimera votre profil, les communautés que vous avez créées et les textes que vous avez publiés</small>
      </h2>
      <form @submit.prevent="quit">
        <password-input v-model="password" :wrong="passwordError !== null" :error="passwordError"/>
        <default-button :disabled="!password" color="danger">Quitter {{ appName }} :(</default-button>
      </form>
      <router-link :to="{ name: 'home' }" id="cancel">Annuler</router-link>
    </vertical-container>
  </div>
</template>

<script>
import VerticalContainer from '@/components/VerticalContainer'
import PasswordInput from '@/components/utils/inputs/PasswordInput'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

export default {
  components: {
    VerticalContainer, PasswordInput, DefaultButton
  },
  computed: {
    appName() {
      return this.$store.getters.appName
    }
  },
  data() {
    return {
      password: null,
      passwordError: null
    }
  },
  methods: {
    quit() {
      this.$store.dispatch('quit', this.password).then(() => {
        this.$router.push({ name: 'welcome' })
      }).catch(() => {
        this.passwordError = "Mot de passe incorrect."
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.quit-page {
  .header {
    small {
      color: $secondary-color;
    }
  }
  .password-input {
    margin: 20px 0;
  }
  #cancel {
    color: $main-color;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
