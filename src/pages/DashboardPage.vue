<template>
  <div class="dashboard-page">
    <horizontal-container>
      <vertical-container class="left">
        <card-base>
          <h2 slot="header">Modifier <strong>votre profil</strong></h2>
          <edit-profile-form slot="content" ref="editProfileForm" @submit="updateProfile"/>
        </card-base>
        <card-base>
          <h2 slot="header">Créer <strong>une communauté</strong></h2>
          <create-community-form slot="content" ref="createCommunityForm" @submit="createCommunity"/>
        </card-base>
      </vertical-container>
      <vertical-container class="right">
        <card-base>
          <h2 slot="header">Les <strong>textes</strong> que vous avez publiés</h2>
          <horizontal-container slot="content">
            <div class="card-wrapper" v-for="text in texts" :key="text.id">
              <text-card :author="text.user.pseudo" :community="text.community.pseudo" :text="text.text" :timestamp="new Date(text.updated_at)" @read="readText(text)"/>
            </div>
          </horizontal-container>
        </card-base>
        <card-base>
          <h2 slot="header">Les <strong>communautés</strong> que vous avez créées</h2>
          <horizontal-container slot="content">
            <div class="card-wrapper" v-for="community in communities" :key="community.pseudo">
              <community-card :pseudo="community.pseudo" :description="community.description" :timestamp="new Date(community.created_at)" @explore="exploreCommunity(community)"/>
            </div>
          </horizontal-container>
        </card-base>
      </vertical-container>
    </horizontal-container>
  </div>
</template>

<script>
import HorizontalContainer from '@/components/HorizontalContainer'
import VerticalContainer from '@/components/VerticalContainer'
import CardBase from '@/components/utils/cards/CardBase'
import EditProfileForm from '@/components/profile/EditProfileForm'
import CreateCommunityForm from '@/components/community/CreateCommunityForm'
import TextCard from '@/components/utils/cards/TextCard'
import CommunityCard from '@/components/utils/cards/CommunityCard'

export default {
  components: {
    HorizontalContainer, VerticalContainer, CardBase, EditProfileForm, CreateCommunityForm, TextCard, CommunityCard
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
  .horizontal-container {
    align-items: flex-start;
    @media screen and (max-width: 700px) {
      flex-direction: column;
      align-items: center;
    }
    .vertical-container {
      padding: 0 50px;
      @media screen and (max-width: 970px) {
        padding: 30px;
      }
      &.left {
        width: 30%;
        @media screen and (max-width: 1200px) {
          width: 50%;
        }
        @media screen and (max-width: 700px) {
          width: 80%;
        }
        @media screen and (max-width: 610px) {
          padding: 30px 0 0 0;
        }
      }
      &.right {
        width: 70%;
        @media screen and (max-width: 1200px) {
          width: 50%;
        }
        @media screen and (max-width: 700px) {
          width: 80%;
        }
        @media screen and (max-width: 610px) {
          padding: 0;
        }
        .card-base {
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
      .card-base {
        margin-bottom: 50px;
      }
    }
  }
}
</style>
