<template>
  <div class="password-input">
    <input :class="inputClass" ref="input" type="password" :name="name" :placeholder="placeholder" :value="value" @keyup="$emit('keyup', $event)" @input="$emit('input', $event.target.value)" @change="$emit('change', $event)"/>
    <p v-if="wrong && error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
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
    },
    wrong: {
      type: Boolean,
      required: false
    },
    error: {
      type: String,
      required: false
    }
  },
  computed: {
    inputClass() { return this.wrong ? 'wrong' : '' }
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
    margin-bottom: 10px;
    input {
      border: 1px solid $secondary-color;
      border-radius: 20px;
      outline: 0;
      padding: 10px 20px;
      min-width: 200px;
      &:focus {
        border-color: $main-color;
      }
      &.wrong {
        border-color: $danger-color;
      }
    }
    .error {
      margin-top: 5px;
      color: $danger-color;
    }
  }
</style>
