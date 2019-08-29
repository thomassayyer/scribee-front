<template>
  <div class="modal-wrapper">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.modal-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $modal-background-color;
}
</style>
