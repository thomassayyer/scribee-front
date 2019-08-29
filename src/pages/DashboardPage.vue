<template>
  <div class="dashboard-page">
    <horizontal-container>
      <vertical-container class="left">
        <card-base>
          <h2 slot="header">Modifier <strong>votre profil</strong></h2>
          <edit-profile-form slot="content" ref="form" @submit="updateProfile"/>
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

export default {
  components: {
    HorizontalContainer, VerticalContainer, CardBase, EditProfileForm
  },
  methods: {
    updateProfile(profile) {
      this.$store.dispatch('updateProfile', profile).catch(errors => {
        if (errors.email) {
          this.$refs.form.error('email', "Cette adresse email est déjà utilisée.")
        }
        if (errors.old_password) {
          this.$refs.form.error('oldPassword', "Le mot de passe est incorrect.")
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
