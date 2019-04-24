// pages/addequip/addequip.js
const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '添加设备',
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
                realname:'realname',
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
                    // wx.navigateTo({
                    //     url:'../equipdetailsettinginfo/equipdetailsettinginfo'
                    // });
                    wx.login({
                        success: res =>{
                            var code = res.code;
                            if(code){
                                console.log("code",code);
                                //调登录接口
                                wx.request({
                                    url: 'https://api.aokecloud.cn/login/verifyforWX',
                                    data: {
                                        xcode :code
                                    },
                                    method: 'POST',
                                    dataType:'json',
                                    success(res) {
                                        console.log("绑定res", res);
                                        var companylist = [];
                                        if (res.data.success === 1) {
                                            console.log("hh");
                                            if (res.data.data.account !== '' && res.data.data.account !== undefined) {
                                                wx.setStorageSync('user', res.data.data.account);
                                                wx.setStorageSync('account', res.data.data.account);
                                                wx.setStorageSync('comid', res.data.data.comid);
                                                wx.setStorageSync('AUTHORIZATION', res.data.token);
                                                wx.setStorageSync('companyuser', res.data.data.companyuser.cname);
                                                wx.setStorageSync('realname', res.data.data.realname);
                                                console.log("res.data.data.list.length",res.data.data.list.length);
                                                if(res.data.data.list.length > 0){
                                                    for(var i = 0;i < res.data.data.list.length;i++ ){
                                                        companylist.push(res.data.data.list[i]);
                                                        console.log("cnam",res.data.data.list[i]);
                                                    }
                                                }
                                                console.log("companylist",companylist);
                                                wx.setStorageSync('companylist', companylist);
                                                if(res.data.data.comid === ''){
                                                    wx.navigateTo({
                                                        url: '/pages/newcomid/newcomid'
                                                    });
                                                    setTimeout(function () {
                                                        wx.showToast({
                                                            title: '设备添加成功！',
                                                            icon: 'success',
                                                            duration: 2000
                                                        });
                                                    }, 500) ;//延迟时间 这里是1秒
                                                }else {
                                                    wx.switchTab({
                                                        url: '/pages/equip/equip'
                                                    });
                                                }
                                            }
                                        }
                                    }
                                });

                            }
                        }
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
});