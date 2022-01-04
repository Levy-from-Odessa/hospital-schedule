import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowDown, faCalendar, faChevronDown, faClock, faEuroSign, faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
library.add(faTimes, faPen, faCalendar, faClock, faArrowDown, faEuroSign, faChevronDown)
Vue.component('FAIcon', FontAwesomeIcon)
