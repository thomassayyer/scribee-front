<template>
  <div class="default-button">
    <button :class="color" :disabled="disabled" @click="$emit('click')"><slot/></button>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.default-button {
  button {
    background: $secondary-color;
    border: 1px solid $secondary-color;
    border-radius: 20px;
    outline: 0;
    padding: 10px 20px;
    min-width: 200px;
    color: white;
    text-align: center;
    margin-top: 10px;
    &:hover:enabled {
      background: $main-color;
      border-color: $main-color;
    }
    &:disabled {
      opacity: .7;
      cursor: not-allowed;
    }
    &.primary {
      background: $primary-color;
      border-color: $primary-color;
      &:hover:enabled {
        background: $primary-dark-color;
        border-color: $primary-dark-color;
      }
    }
    &.warning {
      background: $warning-color;
      border-color: $warning-color;
      &:hover:enabled {
        background: $warning-dark-color;
        border-color: $warning-dark-color;
      }
    }
    &.danger {
      background: $danger-color;
      border-color: $danger-color;
      &:hover:enabled {
        background: $danger-dark-color;
        border-color: $danger-dark-color;
      }
    }
    &.success {
      background: $success-color;
      border-color: $success-color;
      &:hover:enabled {
        background: $success-dark-color;
        border-color: $success-dark-color;
      }
    }
    &.white {
      background: white;
      border-color: white;
      color: $main-color;
      &:hover:enabled {
        background: $light-background-color;
        border-color: $light-background-color;
      }
    }
  }
}
</style>
