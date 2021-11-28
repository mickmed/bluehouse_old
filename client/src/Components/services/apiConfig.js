import Axios from 'axios'

// Grab the JSON Web Token (JWT) from localStorage and set to a variable so we can send the token in the HTTP Header

let apiUrl

const apiUrls = {
  production: 'https://sei-items-api.herokuapp.com/api',
  development: 'http://localhost:3000/api'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

const api = Axios.create({
  baseURL: apiUrl,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer keyo8sUlHJDXOMBml'
  }
})

export default api
