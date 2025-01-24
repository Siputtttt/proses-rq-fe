import axios from 'axios'

// Atur baseURL dan credentials
// axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.withCredentials = true

export default axios
