<template>
  <div class="submit-button">
    <button type="submit" :class="color" :disabled="disabled"><slot/></button>
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
      default: false,
      formatter: disabled => {
        return disabled ? 'disabled' : null
      }
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
  }
}
</style>
