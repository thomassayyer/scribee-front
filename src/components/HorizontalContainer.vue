<template>
  <div class="horizontal-container">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.horizontal-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
