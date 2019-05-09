// pages/settingequipinfo/settingequipinfo.js
const app = getApp();
var request = require('../../utils/request.js');
var pages = getCurrentPages();
var currPage = pages[pages.length - 1];   //当前页面
var prevPage = pages[pages.length - 2];  //上一个页面
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'设置设备信息',
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        userName:'',
        passWd:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var IP = options.IP;
        var port = options.port;
        var currentcode = options.currentcode;
        that.setData({
            IP:IP === 'undefined' || IP === 'null' ? '' : IP,
            port:port === 'undefined' || port === 'null' ? 554 : port,
            currentcode:currentcode
        });
    },
    /**
     * 修改设备信息
     */
    formBindsubmit:function(){
        var that = this;
        // wxaccount(微信号)  wxtype=1
        // code,ip,authport,ausername,apassword,user,comid
        const IP = that.data.IP;
        const port = that.data.port;
        const userName = that.data.userName;
        const passWd = that.data.passWd;
        if(IP === '' || port === '' || userName === '' || passWd === ''){
            wx.showToast({
                title: '请确认每项内容都不为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }else {
            request.postReq('','',"/api/camera/camerareset",
                {
                    code:that.data.currentcode,
                    ip:that.data.IP,
                    authport:that.data.port,
                    ausername:that.data.userName,
                    apassword:that.data.passWd
                },
                function(res){
                    wx.navigateBack({
                        delta: 1
                    });
                    setTimeout(function () {
                        wx.showToast({
                            title: '设置成功,设备信息正在设置中,请稍后... ...',
                            icon: 'none',
                            duration: 2000
                        });
                    }, 500) //延迟时间 这里是1秒
                })
        }
    },
    cameraipInput:function(e){
        var that = this;
        that.setData({
            IP:e.detail.value
        });
    },
    cameraportnoInput:function(e){
        var that = this;
        that.setData({
            port:e.detail.value
        });
    },
    userNameInput:function(e){
        var that = this;
        that.setData({
            userName:e.detail.value
        });
    },
    passWdInput:function(e){
        var that = this;
        that.setData({
            passWd:e.detail.value
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