const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '确认登录',
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
                if(res.success === 1){
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
                }else {
                    wx.showToast({
                        title: '二维码已失效',
                        icon: 'none',
                        duration: 2000
                    });
                }
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