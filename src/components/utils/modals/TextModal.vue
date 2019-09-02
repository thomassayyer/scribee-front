<template>
  <div class="text-modal">
    <suggestion-modal v-if="isSuggestionModalShown" :original-text="selection.toString()" @close="hideSuggestionModal" @submit="addSuggestion"/>
    <modal-wrapper>
      <modal-content @close="$emit('close')" size="large">
        <h3 slot="header" class="header">
          {{ author.name }}&nbsp;<span class="author-pseudo">{{ author.pseudo }}</span>
          <br/>
          <small>Dans {{ community.pseudo }}, {{ formattedUpdatedAt }}</small>
        </h3>
        <div slot="content" class="content">
          <horizontal-container>
            <p class="text monospace" @mouseup="showSuggestionModal">{{ text }}</p>
            <div v-if="!ownText">
              <suggestion-list v-if="newSuggestions.length" :suggestions="newSuggestions" @reject="removeSuggestion"/>
              <suggestion-list v-if="ownSuggestions.length" :suggestions="ownSuggestions" :expose="true"/>
            </div>
            <suggestion-list v-else-if="suggestions.length" :suggestions="suggestions" :own-text="true" @accept="$emit('accept-suggestion', $event)" @reject="removeSuggestion"/>
          </horizontal-container>
          <default-button v-if="ownText" color="danger" @click="$emit('remove')">Supprimer le texte</default-button>
          <default-button v-else :disabled="!newSuggestions.length" color="primary" @click="$emit('send-suggestions', newSuggestions)">Envoyer mes suggestions</default-button>
        </div>
      </modal-content>
    </modal-wrapper>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/fr'
import SuggestionModal from './SuggestionModal'
import ModalWrapper from './ModalWrapper'
import ModalContent from './ModalContent'
import HorizontalContainer from '@/components/HorizontalContainer'
import SuggestionList from '@/components/suggestion/SuggestionList'
import DefaultButton from '@/components/utils/buttons/DefaultButton'

export default {
  props: {
    author: {
      required: true,
      type: Object
    },
    community: {
      required: true,
      type: Object
    },
    text: {
      required: true,
      type: String
    },
    updatedAt: {
      required: true,
      type: Date
    },
    suggestions: {
      required: true,
      type: Array
    }
  },
  components: {
    SuggestionModal, ModalWrapper, ModalContent, HorizontalContainer, SuggestionList, DefaultButton
  },
  computed: {
    formattedUpdatedAt() {
      return moment(this.updatedAt).fromNow()
    },
    ownText() {
      return this.$store.getters.user.pseudo === this.author.pseudo
    },
    selection() {
      if (window.getSelection) {
        return window.getSelection()
      }
      return null
    },
    ownSuggestions() {
      return this.suggestions.filter(s => {
        return s.user.pseudo === this.$store.getters.user.pseudo
      })
    }
  },
  data() {
    return {
      newSuggestions: [ ],
      isSuggestionModalShown: false
    }
  },
  methods: {
    hideSuggestionModal() {
      this.isSuggestionModalShown = false
    },
    showSuggestionModal() {
      if (!this.ownText && this.selection.toString().trim()) {
        this.isSuggestionModalShown = true
      }
    },
    addSuggestion(suggestion) {
      suggestion.id = this.newSuggestions.length
      this.newSuggestions.push(suggestion)
      this.isSuggestionModalShown = false
    },
    removeSuggestion(suggestion) {
      if (this.ownText) {
        this.$emit('remove-suggestion', suggestion)
      } else {
        const index = this.newSuggestions.findIndex(s => s.id === suggestion.id)
        this.newSuggestions.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.text-modal {
  .header {
    .author-pseudo {
      color: $primary-color;
    }
    small {
      color: $secondary-color;
    }
  }
  .content {
    padding: 0 20px;
    .text {
      text-align: justify;
      white-space: pre-line;
      user-select: text;
    }
    .horizontal-container {
      align-items: flex-start;
      @media screen and (max-width: 900px) {
        flex-direction: column;
        align-items: center;
      }
      .suggestion-list {
        margin-left: 30px;
      }
    }
  }
}
</style>
