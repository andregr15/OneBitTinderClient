<template>
  <section class="section">
    <div class="container" v-if="currentSelection">
      <UserMatch />
    </div>

    <div class="loading has-text-centered" v-else-if="loading">
      <i class="fas fa-spinner fa-spin fa-4x"></i>
      <h1 class="is-size-5">Loading selection list</h1>
    </div>

    <div class="empty-selection-list" v-else>
      <h1 class="is-size-4 has-text-centered">
        There aren't more users available for you to match at this time
      </h1>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  section.section {
    padding: 0.5em;

    div.loading {
      padding-top: 10em;

      h1 {
        margin-top: 1em;
      }
    }

    div.empty-selection-list {
      h1 {
        margin-top: 7em;
      }
    }
  }
</style>

<script>

  import { mapActions, mapState } from 'vuex'
  import UserMatch from '../components/UserMatch'

  export default {
    components: {
      UserMatch,
    },
    
    computed: {
      ...mapState(
        'Match',
        [
          'selectList',
          'loading',
          'currentSelection'
        ]
      )
    },

    watch: {
      loading() {
        this.setCurrentSelection(0)
      }
    },

    methods: {
      ...mapActions(
        'Match',
        [
          'loadSelectionList',
          'setCurrentSelection'
        ]
      )
    },

    mounted() {
      this.loadSelectionList()
    }
  }
</script>