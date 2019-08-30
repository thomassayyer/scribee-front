<template>
  <div class="dashboard-page">
    <app-wrapper>
      <card-base slot="left">
        <h2 slot="header">Modifier <strong>votre profil</strong></h2>
        <edit-profile-form slot="content" ref="editProfileForm" @submit="updateProfile"/>
      </card-base>
      <card-base slot="left">
        <h2 slot="header">Créer <strong>une communauté</strong></h2>
        <create-community-form slot="content" ref="createCommunityForm" @submit="createCommunity"/>
      </card-base>
      <card-base slot="right" class="right">
        <h2 slot="header">Les <strong>textes</strong> que vous avez publiés</h2>
        <horizontal-container slot="content">
          <div class="card-wrapper" v-for="text in texts" :key="text.id">
            <text-card :author="text.user" :community="text.community" :text="text.text" :timestamp="new Date(text.updated_at)" @read="readText(text)"/>
          </div>
        </horizontal-container>
      </card-base>
      <card-base slot="right" class="right">
        <h2 slot="header">Les <strong>communautés</strong> que vous avez créées</h2>
        <horizontal-container slot="content">
          <div class="card-wrapper" v-for="community in communities" :key="community.pseudo">
            <community-card :pseudo="community.pseudo" :name="community.name" :description="community.description" :timestamp="new Date(community.created_at)" @explore="exploreCommunity(community)"/>
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

export default {
  components: {
    AppWrapper, HorizontalContainer, CardBase, EditProfileForm, CreateCommunityForm, TextCard, CommunityCard
  },
  data() {
    return {
      texts: [ ]
    }
  },
  computed: {
    communities() {
      return this.$store.getters.communities
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
    exploreCommunity({ pseudo }) {
      this.$router.push({
        name: 'community',
        params: { pseudo }
      })
    },
    readText(text) {
      console.log(text)
    }
  },
  created() {
    this.$store.dispatch('getTexts').then(texts => {
      this.texts = texts
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.dashboard-page {
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
