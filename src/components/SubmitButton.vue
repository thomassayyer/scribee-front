<template>
  <div class="submit-button">
    <button type="submit" :class="color"><slot/></button>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';

  .submit-button {
    button {
      background: $secondary-color;
      border: 1px solid $secondary-color;
      border-radius: 20px;
      outline: 0;
      padding: 10px 20px;
      min-width: 200px;
      color: white;
      text-align: center;
      &:hover {
        background: $main-color;
        border-color: $main-color;
      }
      &.primary {
        background: $primary-color;
        border-color: $primary-color;
        &:hover {
          background: $primary-dark-color;
          border-color: $primary-dark-color;
        }
      }
      &.warning {
        background: $warning-color;
        border-color: $warning-color;
        &:hover {
          background: $warning-dark-color;
          border-color: $warning-dark-color;
        }
      }
      &.danger {
        background: $danger-color;
        border-color: $danger-color;
        &:hover {
          background: $danger-dark-color;
          border-color: $danger-dark-color;
        }
      }
      &.success {
        background: $success-color;
        border-color: $success-color;
        &:hover {
          background: $success-dark-color;
          border-color: $success-dark-color;
        }
      }
    }
  }
</style>
