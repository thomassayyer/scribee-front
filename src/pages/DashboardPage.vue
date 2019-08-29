<template>
  <div class="dashboard-page">
    <horizontal-container>
      <vertical-container class="left">
        <card-base>
          <h3 slot="header">Modifier <strong>votre profil</strong></h3>
          <edit-profile-form slot="content" @submit="updateProfile"/>
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
      this.$store.dispatch('updateProfile', profile)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  .horizontal-container {
    .vertical-container {
      padding: 0 50px;
      &.left {
        width: 30%;
      }
      &.right {
        width: 70%;
      }
    }
  }
}
</style>
