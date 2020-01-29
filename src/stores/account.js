import AccountService from '../services/account_service'

export default {
  state: {
    account: "",
    coordinates: {
      lat: 0,
      lon: 0,
    },
    geolocationEnabled: false,
  },

  mutations: {
    performLogin(state, user) {
      state.account = user
      localStorage.setItem('account', JSON.stringify(user))
    },

    performSignOut(state) {
      state.account = ''
      localStorage.removeItem('account')
    },

    loadLocalStorageAccount(state) {
      let account = localStorage.getItem('account')
      if(account) {
        state.account = JSON.parse(account)
      } else {
        state.account = ""
      }
    },

    update(state, user) {
      user.authentication_token = state.account.authentication_token
      user.email = state.account.email
      state.account = user
      localStorage.setItem('account', JSON.stringify(user))
    },

    async setGeolocation(state) {
      await navigator.geolocation.getCurrentPosition(
        data => {
          state.geolocationEnabled = true
          AccountService.setGeolocation(
            state.account.id,
            data.coords.latitude,
            data.coords.longitude
          )
          state.coordinates.lat = data.coords.latitude
          state.coordinates.lon = data.coords.longitude
        }
      )
    }
  },

  actions: {
    login({ commit }, { email, password }) {
      return AccountService.login(email, password)
        .then(user => commit('performLogin', user))
        .catch(error => error)
    },

    loadLocalAccount({ commit }) {
      commit('loadLocalStorageAccount')
    },

    updateAccount({ commit, state }, { name, college, company, description }) {
      AccountService.update(state.account.id, name, college, company, description)
        .then(
          user => commit('update', user)
        )
    },

    loadGeolocation({ commit }) {
      commit('setGeolocation')
    },

    signOut({ commit }) {
      commit('performSignOut')
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.account != ""
    },

    accountHeaders(state) {
      return {
        'X-User-Email': state.account.email,
        'X-User-Token': state.account.authentication_token
      }
    },

    accountToken(state) {
      return state.account.authentication_token
    },

    isGeolocationEnabled(state) {
      return state.geolocationEnabled
    }
  }
}