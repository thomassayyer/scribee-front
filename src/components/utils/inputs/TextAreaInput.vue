<template>
  <div class="text-area-input">
    <textarea ref="textarea" :class="textareaClass" :name="name" :placeholder="placeholder" :value="value" @keyup="$emit('keyup', $event)" @input="$emit('input', $event.target.value)"/>
    <p v-if="wrong && error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false
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
    textareaClass() { return this.wrong ? 'wrong' : '' }
  },
  methods: {
    focus() { this.$refs.textarea.focus() }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.text-area-input {
  margin-bottom: 10px;
  textarea {
    border: 1px solid $secondary-color;
    border-radius: 20px 20px 30px 20px;
    outline: 0;
    padding: 15px 20px;
    min-width: 200px;
    min-height: 100px;
    &:focus {
      border-color: $main-color;
      border-radius: 10px 10px 30px 10px;
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
