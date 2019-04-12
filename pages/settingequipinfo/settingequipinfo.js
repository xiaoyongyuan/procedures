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
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        }
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
            IP:IP === 'undefined' ? '' : IP,
            port:port === 'undefined' ? '' : port,
            currentcode:currentcode
        })
        console.log("IP",that.data.IP);
    },
    /**
     * 修改设备信息
     */
    formBindsubmit:function(){
        var that = this;
        // wxaccount(微信号)  wxtype=1
        // code,ip,authport,ausername,apassword,user,comid
        request.postReq('','',"/api/camera/camerareset",
            {
                code:that.data.currentcode,
                ip:that.data.IP,
                authport:that.data.port,
                ausername:that.data.userName,
                apassword:that.data.passWd
            },
            function(res){
                console.log("res",res);
                // prevPage.setData({
                //     "currentcode":that.data.currentcode
                // });
                wx.navigateBack({
                    delta: 1
                });
                // wx.setStorageSync("setcurrentcode",that.data.currentcode);
                // wx.navigateTo({
                //     url:'../equipdetailsettinginfo/equipdetailsettinginfo?currentcode=' + that.data.currentcode
                // });
                setTimeout(function () {
                    wx.showToast({
                        title: '设置成功,设备信息正在设置中,请稍后... ...',
                        icon: 'none',
                        duration: 2000
                    });
                }, 500) //延迟时间 这里是1秒
            })
    },
    cameraipInput:function(e){
        var that = this;
        that.setData({
            cameraip:e.detail.value
        });
        console.log("cameraip",that.data.cameraip);
    },
    cameraportnoInput:function(e){
        var that = this;
        that.setData({
            cameraport:e.detail.value
        });
        console.log("cameraport",that.data.cameraport);
    },
    userNameInput:function(e){
        var that = this;
        that.setData({
            userName:e.detail.value
        });
        console.log("userName",that.data.userName);
    },
    passWdInput:function(e){
        var that = this;
        that.setData({
            passWd:e.detail.value
        });
        console.log("passWd",that.data.passWd);
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