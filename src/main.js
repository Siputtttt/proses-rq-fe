import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FontAwesomeIcon from './fontAwesome'
import store from './store'
import Swal from 'sweetalert2'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import drilldown from 'highcharts/modules/drilldown'
import exporting from 'highcharts/modules/exporting'
import accessibility from 'highcharts/modules/accessibility'
import highcharts3d from 'highcharts/highcharts-3d'

import 'select2/dist/css/select2.min.css'
import $ from 'jquery'
import 'select2'

window.$ = $

// Initialize Highcharts modules
drilldown(Highcharts)
exporting(Highcharts)
accessibility(Highcharts)
highcharts3d(Highcharts)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import { BootstrapVue3 } from 'bootstrap-vue-3'

// Tambahkan styling SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(HighchartsVue)
// app.use(bootstrap)
app.config.globalProperties.$swal = Swal
app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
