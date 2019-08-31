<template>
  <div class="community-page">
    <vertical-container class="not-found" v-if="notFound">
      <h2>
        <strong>Oops !</strong><br/>
        <small>Cette communauté n'existe pas</small>
      </h2>
      <default-button color="primary" @click="$router.push({ name: 'dashboard' })">Créer une communauté</default-button>
    </vertical-container>
    <app-wrapper v-else>
      <card-base slot="left" class="left">
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
          <div class="card-wrapper" v-for="text in texts" :key="text.id">
            <text-card :author="text.user" :community="text.community" :text="text.text" :timestamp="new Date(text.updated_at)" @read="readText(text)"/>
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
import { bus } from '@/bus'

export default {
  components: {
    AppWrapper, CardBase, TextCard, HorizontalContainer, VerticalContainer, DefaultButton
  },
  data() {
    return {
      notFound: false,
      pseudo: null,
      name: null,
      description: null,
      createdAt: null,
      texts: [ ]
    }
  },
  watch: {
    '$route.params.pseudo' (pseudo) {
      this.reload(pseudo)
    }
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
    reload(pseudo) {
      this.$store.dispatch('getCommunity', pseudo || this.$route.params.pseudo).then(community => {
        this.notFound = false
        this.pseudo = community.pseudo
        this.name = community.name
        this.description = community.description
        this.createdAt = moment(community.created_at).fromNow()
        this.texts = community.texts
      }).catch(() => {
        this.notFound = true
      })
    },
    readText(text) {
      console.log(text)
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
