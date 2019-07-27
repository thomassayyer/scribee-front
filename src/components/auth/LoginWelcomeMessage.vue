<template>
  <div class="login-welcome-message">
    <p v-if="name">Content de vous revoir <span>{{ name }}</span> !</p>
    <p v-else>Déjà parmi nous ? Continuons !</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';

  .login-welcome-message {
    p {
      font-size: 18px;
      span {
        color: $primary-color;
      }
    }
  }
</style>
