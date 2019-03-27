const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        title:'个人中心',
        showModal: false,
        cache:93.45
    },
    submit: function () {
        this.setData({
            showModal: true
        })
    },

    preventTouchMove: function () {

    },
    go: function () {
        this.setData({
            showModal: false
        })
    },
    openToast: function () {
        this.setData({
            showModal: false,
            cache:0.0,
        })
        wx.showToast({
            title: '清除成功！',
            icon: 'success',
            duration: 2000
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        // wx.request({
        //     url: 'http://api.aokecloud.cn/api/camera/getlist_forAPP', //这里填写你的接口路径
        //     header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        //         'Content-Type': 'application/json'
        //     },
        //     method:"POST",
        //     data: {//这里写你要请求的参数
        //         x: '' ,
        //         y: ''
        //     },
        //     success: function(res) {
        //         //这里就是请求成功后，进行一些函数操作
        //         that.setData({
        //             alarm:res.data.stories[0].ga_prefix
        //         })
        //         console.log(res.data.stories[0].ga_prefix)
        //     },
        //     fail: function (res) {
        //         console.log(res);
        //     }
        // })
    },
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '个人中心'
        });
    },
    about: function (e) {
        wx.showModal({
            title: '提示',
            content: app.globalData.about || '',
            showCancel: false
        });
    }
});
