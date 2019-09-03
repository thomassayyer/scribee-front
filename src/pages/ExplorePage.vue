<template>
  <div class="explore-page">
    <vertical-container class="not-found" v-if="!anyCommunity">
      <h2>
        <strong>Oops !</strong><br/>
        <small>Aucune communauté n'a encore été créée.</small>
      </h2>
      <default-button color="primary" @click="$router.push({ name: 'home' })">Créer une communauté</default-button>
    </vertical-container>
    <app-wrapper v-else>
      <div slot="left" class="left" v-if="daily">
        <p>La communauté <strong>du jour</strong></p>
        <community-card color="dark" :pseudo="daily.pseudo" :name="daily.name" :description="daily.description" :created-at="new Date(daily.created_at)"/>
      </div>
      <div slot="left" class="left" v-if="weekly">
        <p>La communauté <strong>de la semaine</strong></p>
        <community-card color="dark" :pseudo="weekly.pseudo" :name="weekly.name" :description="weekly.description" :created-at="new Date(weekly.created_at)"/>
      </div>
      <div slot="left" class="left" v-if="monthly">
        <p>La communauté <strong>du mois</strong></p>
        <community-card color="dark" :pseudo="monthly.pseudo" :name="monthly.name" :description="monthly.description" :created-at="new Date(monthly.created_at)"/>
      </div>
      <card-base slot="right" class="right" color="light">
        <h2 slot="header">Les <strong>plus populaires</strong></h2>
        <horizontal-container slot="content">
          <div class="card-wrapper" v-for="community in populars" :key="community.pseudo">
            <community-card :pseudo="community.pseudo" :name="community.name" :description="community.description" :created-at="new Date(community.created_at)"/>
          </div>
        </horizontal-container>
      </card-base>
      <card-base slot="right" class="right" color="light">
        <h2 slot="header">Les <strong>plus récentes</strong></h2>
        <horizontal-container slot="content">
          <div class="card-wrapper" v-for="community in latests" :key="community.pseudo">
            <community-card :pseudo="community.pseudo" :name="community.name" :description="community.description" :created-at="new Date(community.created_at)"/>
          </div>
        </horizontal-container>
      </card-base>
    </app-wrapper>
  </div>
</template>

<script>
import DefaultButton from '@/components/utils/buttons/DefaultButton'
import AppWrapper from '@/components/AppWrapper'
import HorizontalContainer from '@/components/HorizontalContainer'
import VerticalContainer from '@/components/VerticalContainer'
import CardBase from '@/components/utils/cards/CardBase'
import CommunityCard from '@/components/utils/cards/CommunityCard'

export default {
  components: {
    DefaultButton, AppWrapper, HorizontalContainer, VerticalContainer, CardBase, CommunityCard
  },
  data() {
    return {
      daily: null,
      weekly: null,
      monthly: null,
      populars: [ ],
      latests: [ ]
    }
  },
  computed: {
    anyCommunity() {
      return this.daily || this.weekly || this.monthly || this.populars.length || this.latests.length
    }
  },
  created() {
    this.$store.dispatch('getDailyCommunity').then(community => {
      this.daily = community
    })
    this.$store.dispatch('getWeeklyCommunity').then(community => {
      this.weekly = community
    })
    this.$store.dispatch('getMonthlyCommunity').then(community => {
      this.monthly = community
    })
    this.$store.dispatch('getPopularCommunities').then(communities => {
      this.populars = communities
    })
    this.$store.dispatch('getLatestCommunities').then(communities => {
      this.latests = communities
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';

.explore-page {
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
  .left, .right {
    margin-bottom: 50px;
  }
  .right {
    max-width: none;
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
</style>
