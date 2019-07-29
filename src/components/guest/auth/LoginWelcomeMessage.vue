<template>
  <div class="login-welcome-message">
    <p v-if="name">Content de vous revoir <span class="primary">{{ name }}</span> !</p>
    <p v-else>Déjà parmi nous ? Continuons <span class="bold">ensemble</span> !</p>
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
        &.primary {
          color: $primary-color;
        }
        &.bold {
          font-weight: bold;
        }
      }
    }
  }
</style>
