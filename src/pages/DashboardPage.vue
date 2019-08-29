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
        Right
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

export default {
  components: {
    HorizontalContainer, VerticalContainer, CardBase, EditProfileForm, CreateCommunityForm
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
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  width: 100%;
  .horizontal-container {
    @media screen and (max-width: 700px) {
      flex-direction: column;
    }
    .vertical-container {
      padding: 0 50px;
      @media screen and (max-width: 970px) {
        padding: 30px;
      }
      @media screen and (max-width: 610px) {
        padding: 30px 0;
      }
      &.left {
        width: 30%;
        @media screen and (max-width: 1200px) {
          width: 50%;
        }
        @media screen and (max-width: 700px) {
          width: 80%;
        }
        .card-base {
          margin-bottom: 50px;
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
      }
    }
  }
}
</style>
