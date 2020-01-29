import axios from 'axios'
import store from '../store'

export default {
  async login(email, password) {
    let response = await axios.post(
      'users/sign_in',
      { user: { email: email, password: password } }
    )
    return response.data
  },

  async signUp(name, email, password, passwordConfirmation, photo) {
    let formData = new FormData()    
    formData.append('user[name]', name)
    formData.append('user[email]', email)
    formData.append('user[password]', password)
    formData.append('user[password_confirmation]', passwordConfirmation)

    console.log(photo)
    if(photo)
      formData.append('user[file]', photo)

    let response = await axios.post(
      'users',
      formData,
      { headers: { ContentType: 'multipart/form-data' }}
    )

    return response
  },

  async update(id, name, college, company, description) {
    let headers = { ...store.getters['accountHeaders'], ContentType: 'application/json' }

    let response = await axios.patch(
      `users/${id}`,
      {
        user: {
          name: name,
          college: college,
          company: company,
          description: description
        }
      },
      { headers: headers }
    )

    return response.data
  },

  async setGeolocation(id, lat, lon) {
    let response = await axios.patch(
      `users/${id}`,
      { user: {
          latitude: lat,
          longitude: lon,
        }
      },
      { headers: store.getters['accountHeaders'] }
    )

    return response.data
  }
}