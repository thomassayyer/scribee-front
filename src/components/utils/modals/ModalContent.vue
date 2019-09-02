<template>
  <div :class="'modal-content ' + size">
    <modal-header @close="$emit('close')"><slot name="header"/><hr class="separator"/></modal-header>
    <div class="content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
import ModalHeader from './ModalHeader'

export default {
  props: {
    size: {
      required: false,
      type: String,
      default: ''
    }
  },
  components: {
    ModalHeader
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.modal-content {
  width: 20%;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid $secondary-color;
  margin: 30px 0;
  min-width: 300px;
  &.large {
    width: 50%;
  }
  .modal-header {
    .separator {
      margin: 20px 0;
    }
  }
}
</style>
