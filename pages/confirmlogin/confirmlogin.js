const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '确认登录',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
    },
    confirmlogin:function () {
        var that = this;
        /**
         * 扫码登录
         */
        request.postReq('','',"/login/qrcode",
            {
                qrcode:that.data.qrcode
            },
            function(res){
                console.log("res",res);
                if(res.success === 1){
                    console.log("1");
                    // wx.navigateTo({
                    //     url:'../confirmlogin/confirmlogin'
                    // })
                    wx.navigateBack({
                        delta: 1
                    });
                    setTimeout(function () {
                        wx.showToast({
                            title: '您已经在电脑上登录椒图平台',
                            icon: 'none',
                            duration: 2000
                        });
                    }, 1000) ;
                }
                // if(res.success === 0){
                //     console.log("0");
                //     setTimeout(function () {
                //         wx.showToast({
                //             title: '二维码失效',
                //             icon: 'none',
                //             duration: 2000
                //         });
                //     }, 500) ;//延迟时间 这里是1秒
                // }
            });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
           qrcode: wx.getStorageSync("qrcode")
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }


});