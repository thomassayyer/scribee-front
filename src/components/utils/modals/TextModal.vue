<template>
  <div class="text-modal">
    <modal-wrapper>
      <modal-content @close="$emit('close')" size="large">
        <h3 slot="header" class="title">
          {{ author }}&nbsp;
          <small>Dans {{ community }}, {{ formattedTimestamp }}</small>
        </h3>
        <div slot="content" class="content">
          <p class="text monospace">{{ text }}</p>
        </div>
      </modal-content>
    </modal-wrapper>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/fr'
import ModalWrapper from './ModalWrapper'
import ModalContent from './ModalContent'

export default {
  props: {
    author: {
      required: true,
      type: String
    },
    community: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    timestamp: {
      required: true,
      type: Date
    }
  },
  components: {
    ModalWrapper, ModalContent
  },
  computed: {
    formattedTimestamp() {
      return moment(this.timestamp).fromNow()
    }
  }
}
</script>
