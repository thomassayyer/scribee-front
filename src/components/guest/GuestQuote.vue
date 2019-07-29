<template>
  <div class="guest-quote">
    <p :class="size">
      &quot;&nbsp;{{ quote }}&nbsp;&quot;
      <br><small>&ndash; {{ author }}</small>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    quote: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'medium'
    }
  }
}
</script>

<style lang="scss" scoped>
  .guest-quote {
    max-width: 50%;
    min-width: 300px;
    p {
      &.small {
        font-size: .5rem;
      }
      &.large {
        font-size: 2rem;
      }
    }
  }
</style>
