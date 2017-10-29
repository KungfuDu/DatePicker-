const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)
export default class Month {
    constructor (month, year) {
        this.start = moment([year, month])
        this.end = this.start.clone().endOf('month')
        this.month = month
        this.year = year
    }
    getWeekStart () {
        return Math.abs(this.start.weekday() - 6)
    }
    getDays () {
        return Array.from(moment.range(this.start, this.end).by('days'))
    }
    getMonthFormated () {
        return this.start.format('MMMM YYYY')
    }
}
