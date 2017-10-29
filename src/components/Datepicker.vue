<style>
  .datepicker_container{
    position: relative;
  }
</style>

<template>
    <div class="datepicker_container">
        <input type="hidden" :name="name" :value="date_raw">
        <input type="text"  :value="date_formatted" @click="showDatepicker()">
        <datepicker-agenda :isVisible="isVisible" :date="date" @selectDate="changeDate"></datepicker-agenda>
    </div>
</template>

<script>
  import moment from 'moment'
  import DatepickerAgendaComponent from './../components/DatepickerAgenda'

  export default {
    props: {
      value: { type: String, required: true },
      format: { type: String, default: '' },
      name: { type: String },
      visible: { type: Boolean, default: false }
    },
    data () {
      return {
        date: moment(this.value, 'YYYY-MM-DD'),
        isVisible: this.visible
      }
    },
    computed: {
      date_formatted () {
        return this.date.format(this.format)
      },
      date_raw () {
        return this.date.format('YYYY-MM-DD')
      }
    },
    methods: {
      changeDate (date) {
        console.log('change')
        this.date = date
      },
      showDatepicker () {
        this.isVisible = true
        setTimeout(() => document.addEventListener('click', hidefunction), 0)
      },
      hideDatepicker () {
        this.isVisible = false
        document.removeEventListener('click', this.hideDatepicker)
      }
    },
    components: {
      'datepicker-agenda': DatepickerAgendaComponent
    }
  }
</script>
