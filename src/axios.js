import Vue from 'vue';
import axios from 'axios';
import store from './store';

let user = store.getters["user/user"]
let api_token = window.localStorage.getItem('api_token')
Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    }
})

