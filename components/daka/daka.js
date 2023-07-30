const dateUtil = require('../../utils/date-util')

Component({
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    value: '1'
                })
            }
            this.setDate()
            this.setCheckBox()
            this.setCheckBtn()
        }
    },
    data: {
        date: null,
        dateFormat: null,
        checkBox: {
            selected: [],
            options: []
        },
        checkBtn: {
            disabled: false
        }
    },
    methods: {
        setDate() {
            const today = new Date()
            // const dateFormat = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate()
            const dateFormat = dateUtil.yymmdd(today)
            this.setData({
                date: today,
                dateFormat: dateFormat
            })
        },
        setCheckBox() {
            const options = wx.getStorageSync('dakaItems').map(item => {
                return {
                    label: item,
                    value: item
                }
            })
            this.setData({
                'checkBox.selected': wx.getStorageSync('dakaItemsLastSelected') || [],
                'checkBox.options': options || []
            })
        },
        setCheckBtn() {
            this.setData({
                'checkBtn.disabled': this.data.checkBox.options.map(o => o.value).filter(i => this.data.checkBox.selected.includes(i)).length === 0
            })
        },
        check() {
            const selected = this.data.checkBox.selected || []
            console.log(selected)
            // if (selected.length === 0) {
            //     return
            // }
            // let checked = wx.getStorageSync('checked') || {}
            // checked[this.data.dateFormat] = selected
            // wx.setStorageSync('checked', checked)
            // wx.setStorageSync('dakaItemsLastSelected', selected)
        },
        onCheckChange(event) {
            this.setData({
                'checkBox.selected': event.detail.value
            })
            this.setCheckBtn()
        }
    },
});