<template>
  <div>
    <div class="columns is-centered is-mobile login-area">
      <div class="column is-5-desktop is-11-mobile">
        <h1 class="title has-text-centered">Sign Up</h1>
        <div class="card">
          <div class="card-content">
            <form @submit.prevent="signUp(name, email, password, passwordConfirmation)">
              
              <img :src="photoLocalUrl">
              <b-field class="file is-centered">
                <b-upload v-model="photo">
                  <a class="button is-primary">
                    <b-icon icon="camera" pack="fas" size="is-mall"></b-icon>
                    <span>Select photo</span>
                  </a>
                </b-upload>
              </b-field>

              <b-field label="Name">
                <b-input v-model="name" type="text"></b-input>
              </b-field>

              <b-field label="Email" :type="getTypeOf('email')" :message="getErrorMessageOf('email')">
                <b-input v-model="email" type="email"></b-input>
              </b-field> 

              <b-field label="Password" :type="getTypeOf('password')" :message="getErrorMessageOf('password')">
                <b-input v-model="password" type="password"></b-input>
              </b-field>

              <b-field label="Password Confirmation" :type="getTypeOf('passwordConfirmation')" :message="getErrorMessageOf('passwordConfirmation')">
                <b-input v-model="passwordConfirmation" type="password"></b-input>
              </b-field>

              <input type="submit" class="button is-fullwidth is-success" value="Sing Up">
            </form>

            <div class="has-text-centered">
              <router-link class="button is-text has-text-primary" to="/login">I already have an account</router-link>
            </div>

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

  import AccountService from '../services/account_service'
  import router from '../router'
  import store from '../store'

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: {
          email: [],
          password: [],
          passwordConfirmation: [],
        },
        photo: {},
        photoLocalUrl: ''
      }
    },

    watch: {
      photo(newValue) {
        this.photoLocalUrl = URL.createObjectURL(newValue)
      }
    },

    methods: {
      signUp(name, email, password, passwordConfirmation) {
        AccountService.signUp(name, email, password, passwordConfirmation, this.photoLocalUrl == '' ? null : this.photo)
          .then(() => {
            router.push('/login')
            store.dispatch('Notification/alert', { type: 'success', message: 'Registred with success' }
          )}, (error) => {
            if(error.response) this.errors = error.response.data.errors
          })
      },

      getTypeOf(key) {
        if(!this.errors[key] || this.errors[key].length <= 0) return ''
        return 'is-danger'
      },

      getErrorMessageOf(key) {
        if(this.errors[key] && this.errors[key].length > 0) return this.errors[key].join(' | ')
        return ''
      }
    }
  }

</script>