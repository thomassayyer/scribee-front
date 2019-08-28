<template>
  <div class="modal-header">
    <a class="close" @click="$emit('close')">
      <font-awesome-icon icon="times"/>
    </a>
    <slot/>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';

  .modal-header {
    .close {
      color: $secondary-color;
      float: right;
    }
  }
</style>
