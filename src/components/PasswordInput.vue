<template>
  <div class="password-input">
    <input ref="input" type="password" :name="name" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)"/>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: 'password'
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Votre valeur ...'
    },
    value: {
      type: String,
      required: false
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/color.scss';
  
  .password-input {
    input {
      border: 1px solid $secondary-color;
      border-radius: 20px;
      outline: 0;
      padding: 10px 20px;
      min-width: 200px;
      margin-bottom: 10px;
      &:focus {
        border-color: $main-color;
      }
    }
  }
</style>
