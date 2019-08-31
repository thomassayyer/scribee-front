<template>
  <div class="community-page">
    <confirm-modal v-if="isConfirmDeleteModalShown" question="Êtes-vous certain de vouloir supprimer cette communauté ?" button-color="danger" @close="hideConfirmDeleteModal" @submit="deleteCommunity"/>
    <text-modal v-if="modalText" :author="modalText.user" :community="modalText.community" :text="modalText.text" :updated-at="new Date(modalText.updated_at)" :suggestions="modalText.suggestions" @close="hideTextModal"/>
    <vertical-container class="not-found" v-if="notFound">
      <h2>
        <strong>Oops !</strong><br/>
        <small>Cette communauté n'existe pas</small>
      </h2>
      <default-button color="primary" @click="$router.push({ name: 'home' })">Créer une communauté</default-button>
    </vertical-container>
    <app-wrapper v-else>
      <card-base slot="left" class="left" v-if="ownCommunity">
        <h2 slot="header">Modifier <strong>la communauté</strong></h2>
        <edit-community-form slot="content" :pseudo="pseudo" :name="name || ''" :description="description || ''" @delete="showConfirmDeleteModal" @submit="updateCommunity"></edit-community-form>
      </card-base>
      <card-base slot="left" class="left" v-else>
        <h2 slot="header">
          <strong>{{ name }}</strong>&nbsp;<span class="pseudo">{{ pseudo }}</span><br/>
          <small>Créée {{ createdAt }}</small>
        </h2>
        <p slot="content" class="description monospace">
          {{ description }}
        </p>
      </card-base>
      <card-base slot="right" class="right">
        <h2 slot="header">Les <strong>textes</strong> de la communauté</h2>
        <horizontal-container slot="content">
          <p v-if="!texts.length">
            Cette communauté <strong>ne contient aucun texte</strong>.<br/>
            <small>
              Pour cela, ça se passe juste au dessus. <font-awesome-icon icon="paper-plane" size="sm"/>
            </small>
          </p>
          <div class="card-wrapper" v-for="text in texts" :key="text.id">
            <text-card :author="text.user" :community="text.community" :text="text.text" :updated-at="new Date(text.updated_at)" @read="readText(text)"/>
          </div>
        </horizontal-container>
      </card-base>
    </app-wrapper>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/fr'
import AppWrapper from '@/components/AppWrapper'
import CardBase from '@/components/utils/cards/CardBase'
import TextCard from '@/components/utils/cards/TextCard'
import HorizontalContainer from '@/components/HorizontalContainer'
import VerticalContainer from '@/components/VerticalContainer'
import DefaultButton from '@/components/utils/buttons/DefaultButton'
import EditCommunityForm from '@/components/community/EditCommunityForm'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ConfirmModal from '@/components/utils/modals/ConfirmModal'
import TextModal from '@/components/utils/modals/TextModal'
import { bus } from '@/bus'

export default {
  components: {
    AppWrapper, CardBase, TextCard, HorizontalContainer, VerticalContainer, DefaultButton, EditCommunityForm, FontAwesomeIcon, ConfirmModal, TextModal
  },
  data() {
    return {
      notFound: false,
      name: null,
      description: null,
      createdAt: null,
      ownerPseudo: null,
      texts: [ ],
      isConfirmDeleteModalShown: false,
      modalText: null
    }
  },
  computed: {
    pseudo() {
      return this.$route.params.pseudo
    },
    ownCommunity() {
      return this.ownerPseudo === this.$store.getters.user.pseudo
    }
  },
  watch: {
    '$route.params.pseudo': () => this.reload()
  },
  created() {
    this.reload()
    bus.$on('textPublished', text => {
      if (text.community.pseudo === this.pseudo) {
        this.texts.push(text)
      }
    })
  },
  methods: {
    reload() {
      this.$store.dispatch('getCommunity', this.pseudo).then(community => {
        this.notFound = false
        this.name = community.name
        this.description = community.description
        this.createdAt = moment(community.created_at).fromNow()
        this.ownerPseudo = community.user_pseudo
        this.texts = community.texts
      }).catch(() => {
        this.notFound = true
      })
    },
    hideConfirmDeleteModal() {
      this.isConfirmDeleteModalShown = false
    },
    showConfirmDeleteModal() {
      this.isConfirmDeleteModalShown = true
    },
    deleteCommunity() {
      this.$store.dispatch('deleteCommunity', this.pseudo).then(() => {
        this.$router.push({ name: 'explore' })
      })
    },
    updateCommunity(community) {
      this.$store.dispatch('updateCommunity', {
        pseudo: this.pseudo,
        name: community.name,
        description: community.description
      })
    },
    hideTextModal() {
      this.modalText = null
    },
    readText(text) {
      this.modalText = text
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.community-page {
  width: 100%;
  .not-found {
    h2 {
      small {
        color: $secondary-color;
      }
    }
    .default-button {
      margin: 30px 0;
    }
  }
  .card-base {
    margin-bottom: 50px;
    &.left {
      .pseudo {
        color: $warning-color;
      }
      .description {
        text-align: left;
        padding: 0 50px;
      }
    }
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
