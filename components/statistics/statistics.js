import Toast from 'tdesign-miniprogram/toast/index'
import Dialog from 'tdesign-miniprogram/dialog/index'
import ActionSheet, {
    ActionSheetTheme
} from 'tdesign-miniprogram/action-sheet/index'

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
            showStatisticsTypeSheetHandler: null,
            showType: {
                index: 0,
                types: [{
                        label: '项目',
                        collapseActive: 0
                    },
                    {
                        label: '日期',
                        collapseActive: 0
                    },
                    {
                        label: '热力图',
                        collapseActive: 0
                    }
                ]
            },
            checked: {
                byItem: {},
                byDate: {},
                byHeatmap: {}
            }
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
            const checkedByDate = wx.getStorageSync('checked') || {}
            if (Object.keys(checkedByDate).length === 0) {
                return
            }
            let checkedByItem = {}
            Object.keys(checkedByDate).forEach(k => {
                checkedByDate[k].forEach(i => {
                    let iv = checkedByItem[i] || []
                    iv.push(k)
                    checkedByItem[i] = iv
                })
            })
            let checkedByItemSorted = {}
            // 对象按照KEY排序
            Object.keys(checkedByItem).sort().forEach(k => checkedByItemSorted[k] = checkedByItem[k])
            // let items = new Set()
            // Object.values(checkedByDate).forEach(v => {
            //     v.forEach(i => items.add(i))
            // })
            // items = Array.from(items).sort()
            // console.log(items)
            this.setData({
                'statistics.checked.byItem': checkedByItemSorted,
                'statistics.checked.byDate': checkedByDate
            })
        },

        showStatisticsTypeSheet() {
            const handler = ActionSheet.show({
                theme: ActionSheetTheme.List,
                selector: '#statisticsTypeSheet',
                items: this.data.statistics.showType.types,
            })
            this.setData({
                'statistics.showStatisticsTypeSheetHandler': handler
            })
        },
        cancelStatisticsTypeSheet() {
            this.data.statistics.showStatisticsTypeSheetHandler.close()
        },
        handleStatisticsTypeSheetSelected(e) {
            const dtl = e.detail
            this.setData({
                'statistics.showType.index': dtl.index
            })
        },

        handleCollapseChangeForItem(e) {
            this.setData({
                'statistics.showType.types[0].collapseActive': e.detail.value,
            });
        },

        handleCollapseChangeForDate(e) {
            this.setData({
                'statistics.showType.types[1].collapseActive': e.detail.value,
            });
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
                    title: item,
                    content: '删除后不可恢复\n已打卡记录依然保留',
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