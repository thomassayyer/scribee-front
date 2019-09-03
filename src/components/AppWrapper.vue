<template>
  <div class="app-wrapper">
    <horizontal-container>
      <vertical-container class="left">
        <slot name="left"/>
      </vertical-container>
      <vertical-container class="right">
        <slot name="right"/>
      </vertical-container>
    </horizontal-container>
  </div>
</template>

<script>
import VerticalContainer from '@/components/VerticalContainer'
import HorizontalContainer from '@/components/HorizontalContainer'

export default {
  components: {
    VerticalContainer, HorizontalContainer
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.app-wrapper {
  width: 100%;
  .horizontal-container {
    align-items: flex-start;
    @media screen and (max-width: 700px) {
      flex-direction: column;
      align-items: center;
    }
    .vertical-container {
      padding: 0 50px;
      @media screen and (max-width: 970px) {
        padding: 30px;
      }
      &.left {
        width: 30%;
        @media screen and (max-width: 1200px) {
          width: 50%;
        }
        @media screen and (max-width: 700px) {
          width: 80%;
        }
        @media screen and (max-width: 610px) {
          padding: 30px 0 0 0;
        }
      }
      &.right {
        width: 70%;
        @media screen and (max-width: 1200px) {
          width: 50%;
        }
        @media screen and (max-width: 700px) {
          width: 80%;
        }
        @media screen and (max-width: 610px) {
          padding: 0;
        }
      }
    }
  }
}
</style>
