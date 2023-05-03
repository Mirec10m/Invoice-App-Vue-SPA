import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/scss/main.scss'

// FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faPlus,
    faSearch,
    faTrashCan,
    faDownload,
    faGripVertical,
    faGear,
    faRightFromBracket,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPlus, faSearch, faTrashCan, faDownload, faGripVertical, faGear, faRightFromBracket, faArrowLeft)
app.component("font-awesome-icon", FontAwesomeIcon)

// Vue 3 DatePicker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
app.component('VueDatePicker', VueDatePicker)

// Vue Select
// @ts-ignore
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
app.component('VueSelect', vSelect)

app.mount('#app')
