import Vue from 'vue'
import DatepickerComponent from './components/Datepicker'
import InteractiveMap from './components/InteractiveMap'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    datepicker: DatepickerComponent,
    interactivemap: InteractiveMap
  }
})
