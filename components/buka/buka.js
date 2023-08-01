const dateUtil = require('../../utils/date-util')
Component({
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    value: '0'
                })
            }
            this.setCalendarRange()
            this.setOptions()
        }
    },
    data: {
        calendar: {
            visible: false,
            select: [],
            range: {
                minDate: Date.now(),
                maxDate: Date.now()
            }
        },
        options: []
    },
    methods: {
        setCalendarRange() {
            const d = new Date()
            const lastMonthDayOne = new Date(d.getFullYear(), d.getMonth() - 1, 1).getTime()
            const yesterday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1).getTime()
            this.setData({
                'calendar.range.minDate': lastMonthDayOne,
                'calendar.range.maxDate': yesterday,
                // 'calendar.select': [yesterday],
            })
        },
        setOptions() {
            const options = wx.getStorageSync('dakaItems').map(item => {
                return {
                    label: item,
                    value: item
                }
            })
            this.setData({
                'options': options
            })
        },

        handleCalendar() {
            this.setData({
                'calendar.visible': true
            });
        },
        confirmCalendar(e) {
            console.log(e.detail.value);
        },
    },
})