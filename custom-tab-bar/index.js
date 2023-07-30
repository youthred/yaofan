Component({
    data: {
        value: '1',
        list: [{
                value: '0',
                label: '补卡',
                path: '/components/buka/buka'
            },
            {
                value: '1',
                label: '打卡',
                path: '/components/daka/daka'
            },
            {
                value: '2',
                label: '统计',
                path: '/components/statistics/statistics'
            }
        ],
    },
    methods: {
        onChange(e) {
            const arr = this.data.list.filter(i => i.value == e.detail.value)
            const url = arr[0].path
            wx.switchTab({url})
            this.setData({
                value: e.detail.value
            })
        },
    },
});