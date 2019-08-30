<template>
  <div class="login-page">
    <login-form :name="name" :pseudo="pseudo" :invalid-credentials="invalidCredentials" @submit="login"/>
  </div>
</template>

<script>
import LoginForm from '@/components/guest/auth/LoginForm'

export default {
  components: {
    LoginForm
  },
  computed: {
    name() {
      return this.$store.getters.user.name
    },
    pseudo() {
      return this.$store.getters.user.pseudo
    }
  },
  data() {
    return {
      invalidCredentials: false
    }
  },
  methods: {
    login(credentials) {
      this.$store.dispatch('login', credentials).then(() => {
        this.$router.push('home')
      }).catch(() => {
        this.invalidCredentials = true
      })
    }
  }
}
</script>
