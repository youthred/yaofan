const dateUtil = require('../../utils/date-util')
import Toast from 'tdesign-miniprogram/toast/index'
import Dialog from 'tdesign-miniprogram/dialog/index'

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
        onCheckChange(event) {
            this.setData({
                'checkBox.selected': event.detail.value
            })
            this.setCheckBtn()
        },
        check() {
            const selected = this.data.checkBox.selected || []
            console.log(selected)
            if (selected.length === 0) {
                return
            }
            let checked = wx.getStorageSync('checked') || {}
            checked[this.data.dateFormat] = selected
            wx.setStorageSync('checked', checked)
            wx.setStorageSync('dakaItemsLastSelected', selected)
            Toast({
                context: this,
                selector: '#t-toast',
                message: '打卡成功',
                theme: 'success',
                direction: 'column',
            })
        },
    },
});