<template>
  <div class="app-license">
    <p>{{ owner }}<br><small>© {{ new Date().getFullYear() }}</small></p>
  </div>
</template>

<script>
export default {
  props: {
    owner: {
      type: String,
      required: false,
      default: 'Thomas Sayer'
    }
  }
}
</script>
