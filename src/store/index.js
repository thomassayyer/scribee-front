import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: null,
    quotes: [
      { author: "Isocrate", quote: "Nous voyons l'abeille se poser sur toutes les plantes et tirer de chacune le meilleur." },
      { author: "Montesquieu", quote: "Ce qui n'est point utile à l'essaim, n'est point utile à l'abeille." }
    ]
  }
})
