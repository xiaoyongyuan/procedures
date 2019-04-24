const app = getApp()

Component({

    properties: {
        text: {
            type: String,
            value: 'Wechat'
        },
        back: {
            type: Boolean,
            value: false
        },
        home: {
            type: Boolean,
            value: false
        }
    },

    data: {
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        }
    },
    onLoad: function (options) {

    },

    methods: {
        backHome: function () {
            wx.reLaunch({
                url: '../index/index',
            })
        },
        back: function () {
            wx.navigateBack({
                delta: 1
            })
        },
        addequip: function(){
            wx.navigateTo({
                url: '/pages/newcomidaddequip/newcomidaddequip'
            })
        },
    }
})
