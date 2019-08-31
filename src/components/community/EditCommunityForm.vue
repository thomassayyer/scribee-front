<template>
  <div class="edit-community-form">
    <form @submit.prevent="$emit('submit', community)">
      <p>{{ pseudo }}</p>
      <text-input name="name" placeholder="Nom ..." v-model="community.name"/>
      <text-area-input @keyup="validateDescription" name="description" placeholder="Description ..." v-model="community.description" :wrong="validation.description !== null" :error="validation.description"></text-area-input>
      <default-button :disabled="!isEverythingValid || !isEverythingFilled" color="white">Modifier la communauté</default-button>
    </form>
    <a @click="$emit('delete')" id="delete">Supprimer la communauté :(</a>
  </div>
</template>

<script>
import TextInput from '@/components/utils/inputs/TextInput'
import TextAreaInput from '@/components/utils/inputs/TextAreaInput'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

export default {
  props: {
    pseudo: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  components: {
    TextInput, TextAreaInput, DefaultButton
  },
  data() {
    return {
      community: {
        name: this.name,
        description: this.description
      },
      validation: {
        description: null
      }
    }
  },
  computed: {
    isEverythingFilled() {
      return this.community.name && this.community.description
    },
    isEverythingValid() {
      return !this.validation.description
    }
  },
  methods: {
    validateDescription() {
      if (this.community.description && this.community.description.length > 40000) {
        this.validation.description = "Cette description est trop longue."
      } else {
        this.validation.description = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.edit-community-form {
  .default-button {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  #delete {
    color: white;
  }
}
</style>
