import Toast from 'tdesign-miniprogram/toast/index'
import Dialog from 'tdesign-miniprogram/dialog/index'

Component({
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    value: '2'
                })
            }
            this.setDakaItems()
            this.setChecked()
        }
    },
    data: {
        stickyProps: {
            zIndex: 2,
        },
        statistics: {
            showType: 0,
            checked: {}
        },
        config: {
            ndi: null,
            dakaItems: []
        }
    },
    methods: {
        onTabsChange(event) {
            // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
        },

        onTabsClick(event) {
            // console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
        },

        onStickyScroll(event) {
            // console.log(event.detail);
        },

        onStickyScroll(event) {
            // console.log(event.detail);
        },








        // -------------------------------------------------------------- 统计 --------------------------------------------------------------

        setChecked() {
            this.setData({
                'statistics.checked': wx.getStorageSync('checked') || {}
            })
        },

        changeStatisticsShowType() {

        },









        // -------------------------------------------------------------- 设置 --------------------------------------------------------------

        setDakaItems() {
            this.setData({
                'config.dakaItems': wx.getStorageSync('dakaItems') || []
            })
        },

        setDakaItemsByItems(items) {
            this.setData({
                'config.dakaItems': items || []
            })
        },

        addDakaItem(e) {
            let ndi = e.detail.value
            if (!ndi || ndi.trim().length === 0) {
                return
            }
            ndi = ndi.trim()
            let dakaItems = wx.getStorageSync('dakaItems')
            if (!dakaItems || dakaItems.length === 0) {
                dakaItems = [ndi]
            } else {
                if (dakaItems.includes(ndi)) {
                    Toast({
                        context: this,
                        selector: '#t-toast',
                        message: '重复项',
                        theme: 'error',
                        direction: 'column',
                    })
                    return
                }
                dakaItems.push(ndi)
            }
            wx.setStorageSync('dakaItems', dakaItems)
            this.setDakaItems()
            this.setData({
                'config.ndi': null
            })
            Toast({
                context: this,
                selector: '#t-toast',
                message: '添加成功',
                // theme: 'success',
                // direction: 'column',
            })
        },

        delDakaItemBtn(e) {
            const item = e.currentTarget.dataset.item
            Dialog.confirm({
                    context: this,
                    // title: '弹窗标题',
                    content: `${item}\n删除后不可恢复\n已打卡记录依然保留`,
                    confirmBtn: {
                        content: '确定',
                        variant: 'base',
                        theme: 'danger'
                    },
                    cancelBtn: '取消',
                })
                .then(() => {
                    this.delDakaItem(item)
                    Toast({
                        context: this,
                        selector: '#t-toast',
                        message: '删除成功'
                    })
                })
                .catch(() => {
                    // 点击了'取消'
                })
                .finally(() => Dialog.close());
        },

        delDakaItem(item) {
            let items = wx.getStorageSync('dakaItems')
            const index = items.indexOf(item)
            if (index !== -1) {
                items.splice(index, 1)
                wx.setStorageSync('dakaItems', items)
                this.setDakaItemsByItems(items)
            }
        }
    }
})