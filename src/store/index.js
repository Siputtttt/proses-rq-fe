import { createStore } from 'vuex'
import router from '../router'
import axios from './axios'

const state = {
    token: null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    userData: [],
    baseUrl: 'http://localhost:8080/'
    // baseUrl: 'http://127.0.0.1:8000/'
}

const getters = {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
}

const actions = {
    getData({ state }, data) {
        return new Promise((resolve, reject) => {
            const url = state.baseUrl + data.url
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
            let rows = []
            axios
                .get(url, config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    // Handle unauthorized (401) error
                    if (error.response.status === 401) {
                        // Assuming you have imported `router` instance from your Vue Router setup
                        router.push('/')
                    }
                    console.log(error)
                    reject(error)
                })
        })
    },
    postData({ state }, data) {
        return new Promise((resolve, reject) => {
            const url = state.baseUrl + data.url
            const config = {
                headers: {
                    Accept: 'multipart/form-data',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
            axios
                .post(url, data.params, config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    deleteData({ state }, data) {
        return new Promise((resolve, reject) => {
            const url = state.baseUrl + data.url
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
            axios
                .post(url, { _method: 'delete' }, config)
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
    }
}

export default createStore({
    state,
    getters,
    actions,
    mutations
})
