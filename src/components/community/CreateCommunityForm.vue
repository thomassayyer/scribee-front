<template>
  <div class="create-community-form">
    <form @submit.prevent="$emit('submit', community)">
      <text-input @keyup="validatePseudo" name="pseudo" placeholder="Pseudo ..." v-model="community.pseudo" :wrong="validation.pseudo !== null" :error="validation.pseudo"/>
      <text-input name="name" placeholder="Nom ..." v-model="community.name"/>
      <text-area-input @keyup="validateDescription" name="description" placeholder="Description ..." v-model="community.description" :wrong="validation.description !== null" :error="validation.description"></text-area-input>
      <submit-button :disabled="!isEverythingValid || !isEverythingFilled" color="white">Créer la communauté</submit-button>
    </form>
  </div>
</template>

<script>
import TextInput from '@/components/utils/inputs/TextInput'
import TextAreaInput from '@/components/utils/inputs/TextAreaInput'
import SubmitButton from '@/components/utils/buttons/SubmitButton'

export default {
  components: {
    TextInput, TextAreaInput, SubmitButton
  },
  data() {
    return {
      community: {
        pseudo: null,
        name: null,
        description: null
      },
      validation: {
        pseudo: null,
        description: null
      }
    }
  },
  computed: {
    isEverythingFilled() {
      return this.community.pseudo && this.community.name && this.community.description
    },
    isEverythingValid() {
      return !this.validation.pseudo && !this.validation.description
    }
  },
  methods: {
    validatePseudo() {
      if (this.community.pseudo && this.community.pseudo.length > 15) {
        this.validation.pseudo = "Ce pseudo est trop long."
      } else {
        this.validation.pseudo = null
      }
    },
    validateDescription() {
      if (this.community.description && this.community.description.length > 40000) {
        this.validation.description = "Cette description est trop longue."
      } else {
        this.validation.description = null
      }
    },
    error(field, error) {
      this.validation[field] = error
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.create-community-form {
  .submit-button {
    margin-top: 30px;
  }
}
</style>
