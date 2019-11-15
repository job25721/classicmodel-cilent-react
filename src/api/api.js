import axios from 'axios'

export default axios.create({
    baseURL : 'http://localhost:9000',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
  }
})



