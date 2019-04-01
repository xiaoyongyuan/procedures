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
        // 这里是一些组件内部数据
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
            });
        },
        back: function () {
            wx.navigateBack({
                delta: 1
            });
            // wx.navigateTo({
            //     url:'/equip/equip'
            // });
        },
        aa: function(){
            console.log("123");
        },
    }
});
