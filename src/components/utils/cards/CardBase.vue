<template>
  <div class="card-base">
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
  background: $secondary-color;
  color: white;
  border-radius: 20px;
  padding: 50px 0;
  @media screen and (max-width: 700px) {
    padding: 30px 0;
  }
  .header {
    padding-bottom: 30px;
  }
}
</style>
