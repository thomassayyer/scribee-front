<template>
  <div class="register-page">
    <register-form ref="form" @submit="register"/>
  </div>
</template>

<script>
import RegisterForm from '@/components/guest/auth/RegisterForm'

export default {
  components: {
    RegisterForm
  },
  methods: {
    register(user) {
      this.$store.dispatch('register', user).then(() => {
        this.$router.push('login')
      }).catch((errors) => {
        if (errors.pseudo) {
          this.$refs.form.$refs.pseudo.wrong = true
          this.$refs.form.$refs.pseudo.error = "Ce pseudo n'est pas disponible."
        }
        if (errors.email) {
          this.$refs.form.$refs.email.wrong = true
          this.$refs.form.$refs.email.error = "Cette adresse email est déjà utilisée."
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .register-page {
    .app-license {
      position: absolute;
      bottom: 10px;
      @media screen and (max-height: 800px) {
        position: relative;
      }
    }
  }
</style>
