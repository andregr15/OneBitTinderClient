<template>
  <div class="columns is-centered is-mobile login-area">
    <div class="column is-5-desktop is-11-mobile">
      <h1 class="title has-text-centered">Login</h1>

      <div class="card">
        <div class="card-content">
          <form @submit.prevent="performLogin({email, password})">
            <b-field label="Email">
              <b-input v-model="email" type="email"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input v-model="password" type="password"></b-input>
            </b-field>

            <input type="submit" class="button is-fullwidth is-success" value="Login">
          </form>

          <div class="has-text-centered">
            <router-link class="button is-text has-text-primary" to="/sign-up">Don't have an account? Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div.login-area {
    margin-top: 7%;
  }
</style>

<script>
  import { mapActions } from 'vuex'
  import store from '../store'
  import router from '../router'

  export default {
    data() {
      return {
        email: "",
        password: "",
      }
    },

    computed: {
      loggedIn() {
        return store.getters['isLoggedIn']
      },
    },
    
    created() {
      this.checkLogin(this.loggedIn)
    },

    watch: {
      loggedIn(newValue) {
        this.checkLogin(newValue)
      },
    },

    methods: {
      checkLogin(loggedIn) {
        if(loggedIn) {
          router.push("/")
        }
      },

      async performLogin(user) {
        this.resetAlert()

        let response = await this.login(user)

        if(response) {
          this.alert({ type: 'danger', message: 'E-mail not registered or invalid password' })
        }
      },

      ...mapActions(['login']),
      ...mapActions('Notification', ['alert', 'resetAlert'])
    }
  }
</script>