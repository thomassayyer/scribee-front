<template>
  <div class="login-invalid-credentials">
    <p class="message">Votre pseudo ou votre mot de passe est invalide</p>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/color.scss';

  .login-invalid-credentials {
    .message {
      color: $danger-color;
    }
  }
</style>
