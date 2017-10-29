<style lang="scss">
    $header-height: 100px;
    $day-size: 41px;
    .datepicker{
        width: 315px;
        position: absolute;
        top: 100%;
        z-index: 5;
        background-color: #fff;
        box-shadow: 0 14px 45px rgba(0,0,0,.25), 0 10px 18px rgba(0,0,0,.22);
    }
    .datepicker_header{
        background-color: #0097a7;
        color: #fff;
        padding: 20px;
        height: $header-height;
    }

    .datepicker_date {
       font-size: 28px;
       line-height: 28px;
    }

    .datepicker_year{
        opacity: .7;
        margin-bottom: 10px;
        line-height: 16px;
    }
    .datepicker_week{
        font-size: 12px;
        line-height: 12px;
        color: rgba(0, 0, 0, 0.8);
        padding: 0 14px;
    }
    .datepicker_weekday{
        float: left;
        width: $day-size;
        text-align: center;
    }
    .datepicker_days{
        margin: 14px;
    }
    .datepicker_day {
        width: $day-size;
        height: $day-size;
        float: left;
        text-align: center;
        cursor: pointer;
        position: relative;
        transition: color 450ms cubic-bezier(0.23, 1, 0.32, 1);
        &:hover{
            color: #fff;
            .datepicker_day_effect{
                transform: scale(1);
                opacity: .6;
            }
        }
        &.selected{
            color: #fff;
            .datepicker_day_effect {
                transform: scale(1);
                opacity: 1;
            }

        }
    }
    .datepicker_day_effect{
        position: absolute;
        top: -2px;
        left: 2px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgb(0, 151, 167);
        transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);
        transform: scale(0);
    }
    .datepicker_day_text{
        position: relative;
        vertical-align: sub;
    }


    .datepicker_controls{
        height: 56px;
        line-height: 56px;
        text-align: center;
        position: relative;
        .datepicker_controls_label {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        button{
            height: 56px;
            width: 56px;
            position: relative;
            border: none;
            outline: none;
            background-color: transparent;
            user-select: none;
            cursor: pointer;
            &.datepicker_controls_next{
                float: right;
            }
            &.datepicker_controls_prev {
                float: left;
            }
        }
        svg{
            width: 24px;
            height: 24px;
            fill: rgba(0, 0, 0, 0.87);
            vertical-align: middle;
        }
    }

    .datepicker-slide-enter-active,.datepicker-slide-leave-active{
        opacity: 1;
        transition: all 300ms;
        transform: translateY(0);
    }
    .datepicker-slide-leave-to, .datepicker-slide-enter{
        opacity: 0;
        transform: translateY(-15px);
    }

</style>

<template>
    <transition name="datepicker-slide">
        <div class="datepicker" v-if="isVisible" name="datepicker-slide" @click.stop>
            <div class="datepicker_header">
                <div class="datepicker_year">
                    {{ year }}
                </div>
                <div class="datepicker_date">
                    {{ date_formated }}
                </div>
            </div>
            <div class="datepicker_controls">
                <div class="datepicker_controls_label">
                    {{month_formated}}
                </div>
                <button class="datepicker_controls_next" @click="nextMonth()">
                    <svg viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                    </svg>
                </button>
                <button class="datepicker_controls_prev" @click="prevMonth()">
                    <svg viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                    </svg>
                </button>
            </div>
            <div class="datepicker_week">
                <div v-for="day in days" track-by="$index" class="datepicker_weekday">
                    {{day}}
                </div>
            </div>
            <div class="datepicker_days">
                <div class="datepicker_day" :style="{width : ((month.getWeekStart() )* 41) + 'px'}"></div>
                <div v-for="day in month.getDays()" class="datepicker_day" :class="{selected : isSelected(day)}" @click="selectDate(day)">
                    <span class="datepicker_day_effect"></span>
                    <span class="datepicker_day_text">{{day.format('D')}}</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Month from './../modules/month'
    export default {
        props: ['date', 'isVisible'],
        data () {
            console.log(this.date)
            return {
                days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                month: new Month(this.date.month(), this.date.year()),
                mutable_date: this.date.clone()
            }
        },
        methods: {
            isSelected (day) {
                console.log('nethod')
                // console.log(_date)
                return this.mutable_date.unix() === day.unix()
            },
            selectDate (day) {
                this.mutable_date = day.clone()
                this.$emit('selectDate', this.mutable_date)
            },
            nextMonth () {
                let month = this.month.month + 1
                let year = this.month.year
                if (month > 11) {
                    month = 0
                    year += 1
                }
                this.month = new Month(month, year)
            },
            prevMonth () {
              let month = this.month.month - 1
              let year = this.month.year
              if (month < 0) {
                month = 11
                year -= 1
              }
              this.month = new Month(month, year)
            }

        },
        computed: {
            year () {
                console.log('computed')
                return this.mutable_date.format('YYYY')
            },
            date_formated () {
               return this.mutable_date.format('dddd DD MMM')
            },
            month_formated () {
                return this.month.getMonthFormated()
            }
        }
    }
</script>

