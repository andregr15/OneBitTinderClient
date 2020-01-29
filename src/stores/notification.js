export default {
  namespaced: true,

  state: {
    alert: {
      type: '',
      message: '',
      isActive: false,
    }
  },

  mutations: {
    alert(state, { type, message }) {
      state.alert.type = type
      state.alert.message = message
      state.alert.isActive = true
    },

    resetAlert(state) {
      state.alert.type = ''
      state.alert.message = ''
      state.alert.isActive = false
    }
  },

  actions: {
    alert(context, { type, message }) {
      context.commit('alert', { type, message })
    },

    resetAlert(context) {
      context.commit('resetAlert')
    }
  }
}