// pages/addequip/addequip.js
const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '添加设备',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        scanresult:''
    },
    locationInput:function(e){
        var that = this;
        that.setData({
            location:e.detail.value
        });
        console.log("location",that.data.location);
    },
    equipIDInput:function(e){
        var that = this;
        that.setData({
            ecode:e.detail.value
        });
        console.log("ecode",that.data.ecode);
    },
    /**
     *绑定设备
     */
    addequip:function(e){
        var that = this;
        console.log("location",that.data.location);
        console.log("ecode",that.data.ecode);
       const  account =  wx.getStorageSync('account');
       const  realname = wx.getStorageSync('realname');
        console.log("account",account);
        console.log("realname",realname);
        request.postReq('','',"/api/equipment/bidding_first",
            {
                realname:realname,
                location:that.data.location,
                ecode:that.data.ecode
            },
            function (res) {
                console.log("res",res);
                if(res.success === 0){
                    wx.showToast({
                        title: '该设备已被绑定或者设备不存在',
                        icon: 'none',
                        duration: 2000
                    });
                }
                if(res.success === 1){
                    wx.showToast({
                        title: '设备绑定成功',
                        icon: 'none',
                        duration: 2000
                    });
                    var that = this;
                    /**
                     * 请求设备列表接口
                     */
                    request.postReq('','',"/api/user/getone",
                        {},
                        function(res){
                            // that.setData({
                            //     workdate:res.data.workdate,
                            //     acount:res.data.acount,
                            //     ecount:res.data.ecount
                            // });
                            wx.setStorageSync('workdate');
                            wx.switchTab({
                                url: '/pages/index/index'
                            });
                        });
                }
            });
    },
    //扫一扫
    click: function (event) {
        var that = this;
        wx.scanCode({
            success: (res) => {
                that.setData({
                    scanresult:res.result
                });
                wx.showToast({
                    title: '扫描成功',
                    icon: 'success',
                    duration: 2000
                });
            },
            fail: (res) => {
                wx.showToast({
                    title: '扫描失败',
                    icon: 'success',
                    duration: 2000
                })
            },
            complete: (res) => {
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
})