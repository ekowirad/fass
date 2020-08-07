import Vue from 'vue';
import axios from 'axios';
import store from './store';

let user = store.getters["user/user"]
let api_token = window.localStorage.getItem('api_token')
Vue.prototype.$http = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: 'https://api.yayasankasihkeluarga.com/api',
    headers: {
        'Accept': 'application/json',
    }
})

