<template>
  <div :class="'card-base ' + color">
    <vertical-container>
      <div class="header">
        <slot name="header"/>
      </div>
      <div class="content">
        <slot name="content"/>
      </div>
    </vertical-container>
  </div>
</template>

<script>
import VerticalContainer from '@/components/VerticalContainer'

export default {
  props: {
    color: {
      required: false,
      type: String,
      default: 'dark'
    }
  },
  components: {
    VerticalContainer
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.card-base {
  width: 100%;
  max-width: 500px;
  border: 1px solid $secondary-color;
  border-radius: 20px;
  padding: 50px 0;
  @media screen and (max-width: 700px) {
    padding: 30px 0;
  }
  &.dark  {
    background: $secondary-color;
    color: white;
  }
  &.light {
    background: white;
    color: $main-color;
  }
  .header {
    padding-bottom: 30px;
  }
}
</style>
