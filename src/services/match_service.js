import axios from 'axios'
import store from '../store'

export default {
  async loadSelectionList() {
    let response = await axios.get(
      'selection_lists',
      { headers: store.getters['accountHeaders'] }
    )

    return response.data
  },

  async like(userId, liked) {
    let response = await axios.post(
      `users/${userId}/like`,
      { like: { liked: liked } },
      { headers: store.getters['accountHeaders'] }
    )

    return response.data
  },

  async loadMyMatches() {
    let response = await axios.get(
      'matches',
      { headers: store.getters['accountHeaders'] }
    )

    return response.data.matches
  },

  async unmatch(match) {
    let response = await axios.delete(
      `matches/${match.id}`,
      { headers: store.getters['accountHeaders'] }
    )

    return response
  }
}