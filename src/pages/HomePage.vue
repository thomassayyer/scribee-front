<template>
  <div class="home-page">
    <app-wrapper>
      <card-base slot="left">
        <h2 slot="header">Modifier <strong>votre profil</strong></h2>
        <edit-profile-form slot="content" ref="editProfileForm" :pseudo="currentPseudo" :name="currentName" :email="currentEmail" @submit="updateProfile"/>
      </card-base>
      <card-base slot="left">
        <h2 slot="header">Créer <strong>une communauté</strong></h2>
        <create-community-form slot="content" ref="createCommunityForm" @submit="createCommunity"/>
      </card-base>
      <card-base slot="right" class="right">
        <h2 slot="header">Les <strong>textes</strong> que vous avez publiés</h2>
        <horizontal-container slot="content">
          <p v-if="texts.length === 0">
            Vous n'avez encore <strong>jamais publié de texte</strong>.<br/>
            <small>
              Pour cela, ça se passe juste au dessus. <font-awesome-icon icon="paper-plane" size="sm"/>
            </small>
          </p>
          <div class="card-wrapper" v-for="text in texts" :key="text.id">
            <text-card :author="text.user" :community="text.community" :text="text.text" :updated-at="new Date(text.updated_at)" :suggestions="text.suggestions" @send-suggestions="sendSuggestions($event, text)" @accept-suggestion="acceptSuggestion($event, text)" @reject-suggestion="rejectSuggestion($event, text)" @remove="removeText(text)"/>
          </div>
        </horizontal-container>
      </card-base>
      <card-base slot="right" class="right">
        <h2 slot="header">Les <strong>communautés</strong> que vous avez créées</h2>
        <horizontal-container slot="content">
          <p v-if="!communities.length">
            Vous n'avez encore <strong>jamais créé de communauté</strong>.<br/>
            <small>
              Pour cela, vous êtes au bon endroit, <font-awesome-icon icon="thumbs-up" size="sm"/>
            </small>
          </p>
          <div class="card-wrapper" v-for="community in communities" :key="community.pseudo">
            <community-card :pseudo="community.pseudo" :name="community.name" :description="community.description" :created-at="new Date(community.created_at)"/>
          </div>
        </horizontal-container>
      </card-base>
    </app-wrapper>
  </div>
</template>

<script>
import AppWrapper from '@/components/AppWrapper'
import HorizontalContainer from '@/components/HorizontalContainer'
import CardBase from '@/components/utils/cards/CardBase'
import EditProfileForm from '@/components/profile/EditProfileForm'
import CreateCommunityForm from '@/components/community/CreateCommunityForm'
import TextCard from '@/components/utils/cards/TextCard'
import CommunityCard from '@/components/utils/cards/CommunityCard'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { bus } from '@/bus'

export default {
  components: {
    AppWrapper, HorizontalContainer, CardBase, EditProfileForm, CreateCommunityForm, TextCard, CommunityCard, FontAwesomeIcon
  },
  data() {
    return {
      communities: [ ],
      texts: [ ]
    }
  },
  computed: {
    currentPseudo() {
      return this.$store.getters.user.pseudo
    },
    currentName() {
      return this.$store.getters.user.name
    },
    currentEmail() {
      return this.$store.getters.user.email
    }
  },
  methods: {
    updateProfile(profile) {
      this.$store.dispatch('updateProfile', profile).catch(errors => {
        if (errors.email) {
          this.$refs.editProfileForm.error('email', "Cette adresse email est déjà utilisée.")
        }
        if (errors.old_password) {
          this.$refs.editProfileForm.error('oldPassword', "Le mot de passe est incorrect.")
        }
      })
    },
    createCommunity(community) {
      this.$store.dispatch('createCommunity', community).then(({ pseudo }) => {
        this.$router.push({ name: 'community', params: { pseudo } })
      }).catch(errors => {
        if (errors.pseudo) {
          this.$refs.createCommunityForm.error('pseudo', "Ce pseudo n'est pas disponible.")
        }
      })
    },
    sendSuggestions(suggestions, text) {
      this.$store.dispatch('sendSuggestions', {
        suggestions,
        textId: text.id
      }).then(createdSuggestions => {
        const index = this.texts.findIndex(t => t.id === text.id)
        this.texts[index].suggestions = this.texts[index].suggestions.concat(createdSuggestions)
        this.texts.unshift(this.texts[index])
        this.texts.splice(index + 1, 1)
        bus.$emit('suggestions-sent')
      })
    },
    acceptSuggestion(suggestion, text) {
      this.$store.dispatch('acceptSuggestion', {
        suggestionId: suggestion.id,
        textId: text.id
      }).then(correctedText => {
        const textIndex = this.texts.findIndex(t => t.id === text.id)
        this.texts[textIndex].text = correctedText
        const suggestionIndex = this.texts[textIndex].suggestions.findIndex(s => s.id === suggestion.id)
        this.texts[textIndex].suggestions.splice(suggestionIndex, 1)
        this.texts.unshift(this.texts[textIndex])
        this.texts.splice(textIndex + 1, 1)
      })
    },
    rejectSuggestion(suggestion, text) {
      this.$store.dispatch('rejectSuggestion', {
        suggestionId: suggestion.id
      }).then(() => {
        const textIndex = this.texts.findIndex(t => t.id === text.id)
        const suggestionIndex = this.texts[textIndex].suggestions.findIndex(s => s.id === suggestion.id)
        this.texts[textIndex].suggestions.splice(suggestionIndex, 1)
        this.texts.unshift(this.texts[textIndex])
        this.texts.splice(textIndex + 1, 1)
      })
    },
    removeText(text) {
      this.$store.dispatch('deleteText', text.id).then(() => {
        const index = this.texts.findIndex(t => t.id === text.id)
        this.texts.splice(index, 1)
      })
    }
  },
  created() {
    this.$store.dispatch('getTexts').then(texts => {
      this.texts = texts
    })
    this.$store.dispatch('getCommunities').then(communities => {
      this.communities = communities
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.home-page {
  width: 100%;
  .card-base {
    margin-bottom: 50px;
    &.right {
      max-width: none;
      background: white;
      color: $main-color;
      h2 {
        padding: 0 20px;
      }
      .horizontal-container {
        flex-wrap: wrap;
        .card-wrapper {
          padding: 20px;
        }
      }
    }
  }
}
</style>
