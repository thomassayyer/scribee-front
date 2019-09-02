<template>
  <div class="edit-community-form">
    <confirm-modal v-if="isConfirmDeleteModalShown" question="Êtes-vous certain de vouloir supprimer cette communauté ?" button-color="danger" @close="hideConfirmDeleteModal" @submit="$emit('delete')"/>
    <form @submit.prevent="$emit('submit', community)">
      <p>{{ pseudo }}</p>
      <text-input name="name" placeholder="Nom ..." v-model.trim="community.name"/>
      <text-area-input @keyup="validateDescription" name="description" placeholder="Description ..." v-model.trim="community.description" :wrong="validation.description !== null" :error="validation.description"></text-area-input>
      <default-button :disabled="!isEverythingValid || !isEverythingFilled" color="white">Modifier la communauté</default-button>
    </form>
    <a @click="showConfirmDeleteModal" id="delete">Supprimer la communauté :(</a>
  </div>
</template>

<script>
import ConfirmModal from '@/components/utils/modals/ConfirmModal'
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
    ConfirmModal, TextInput, TextAreaInput, DefaultButton
  },
  data() {
    return {
      community: {
        name: this.name,
        description: this.description
      },
      validation: {
        description: null
      },
      isConfirmDeleteModalShown: false,
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
    hideConfirmDeleteModal() {
      this.isConfirmDeleteModalShown = false
    },
    showConfirmDeleteModal() {
      this.isConfirmDeleteModalShown = true
    },
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
