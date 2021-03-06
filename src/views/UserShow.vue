<template>
  <div>
    <div>
      <swiper class="has-text-centered" v-if="currentUser.photos && currentUser.photos.length > 0">
        <swiperSlide v-for="photo in currentUser.photos" :key="photo.url">
          <img :src="photo.url">
        </swiperSlide>
      </swiper>
      <div class="has-text-centered" v-else>
        <i class="fas fa-user default-photo"></i>
      </div>

      <div class="columns is-mobile is-gapless is-centered action-buttons" v-if="isLoggedUser">
        <div class="column is-12">
          <router-link class="button is-pulled-left is-info" to="/profile/edit">
            <i class="fas fa-edit"></i>
          </router-link>
        </div>
      </div>

      <div class="columns is-mobile is-gapless is-centered action-buttons" v-else>
        <div class="column is-12">
          <button class="button is-pulled-right" @click="backToPreviousPage()">
            <i class="fas fa-reply"></i>
          </button>
        </div>
      </div>

      <div class="columns is-mobile is-gapless is-multiline user-info">
        <div class="column is-8">
          <h5 class="is-size-3">
            <strong>{{ currentUser.name }}</strong>
          </h5>

          <h5 class="is-size-5 has-text-grey">
            <strong>
              <i class="fas fa-building"></i>
            </strong>
            {{ currentUser.company ? currentUser.company : 'Not provided yet' }}
          </h5>

          <h5 class="is-size-5 has-text-grey">
            <strong>
              <i class="fas fa-university"></i>
            </strong>
            {{ currentUser.college ? currentUser.college : 'Not provided yet' }}
          </h5>
        </div>

        <div class="column is-4 distance" v-if="currentUser.distance">
          <h4 class="has-text-right is-size-6">
            <strong class="has-text-danger"> {{ currentUser.distance }} Km </strong>
            <i class="fas fa-map-marker-alt has-text-grey"></i>
          </h4>
        </div>

        <div class="column is-12 has-text-centered">
          <h5 class="is-size-6 has-text-grey description" v-if="currentUser.description">
            "{{ currentUser.description }}"
          </h5>
        </div>

        <div class="column is-8 is-offset-2 has-text-centered" v-if="isLoggedUser">
          <b-button type="is-primary" class="is-fullwidth button sign-out" @click="performSignOut()">
            Sign Out
            <i class="fas fa-sign-out-alt"></i>
          </b-button>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div.columns {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  div.action-buttons {
    margin-top: -2rem;
    position: absolute;
    z-index: 999999;
    width: 100%;

    button, a {
      border-radius: 9999px;
      height: 3.5rem;
      width: 3.5rem;
    }
  }

  div.user-info {
    margin-top: 2rem;
  }

  div.distance {
    h4 {
      margin-top: 0.5rem;
    }
  }

  h5.description {
    margin-top: 2em;
  }

  .sign-out {
    margin-top: 3rem;
  }

  .default-photo {
    zoom: 10.0;
    margin-top: 2px;
  }
</style>

<script>

  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { mapState, mapActions } from 'vuex'
  import router from '../router'
  import UserService from '../services/user_service'

  export default {
    components: {
      swiper,
      swiperSlide
    },

    props: ['user'],

    data() {
      return {
        currentUser: {},
        isLoggedUser: false,
      }
    },

    computed: {
      ...mapState({
        account: state => state.Account.account
      })
    },

    mounted() {
      if(!this.user) {
        this.loadLoggedUser()
      } else {
        this.currentUser = this.user
      }
    },

    watch: {
      $route () {
        if(!this.user) {
          this.loadLoggedUser()
        } else {
          this.currentUser = this.user
        }
      }
    },

    methods: {
      ...mapActions(['signOut']),
      loadLoggedUser() {
        UserService.load(this.account.id)
          .then(
            user => {
              this.currentUser = user
              this.isLoggedUser = true
            }
          )
      },

      performSignOut() {
        this.signOut()
        router.push('/login')
      },

      backToPreviousPage() {
        router.go(-1)
      }
    }
  }

</script>