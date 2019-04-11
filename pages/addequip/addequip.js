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
    biddingequip:function(){
        var that = this;
        let location = that.data.location;
        let ecode = that.data.ecode;
        console.log("location",location);
        console.log("ecode",ecode);
        if(ecode === '' || ecode === undefined){
            wx.showToast({
                title: '设备ID不能为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(location === '' || location === undefined){
            wx.showToast({
                title: '设备安装地址不能为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(ecode !== undefined && location !== undefined){
            console.log("ceshi");
            /**
             * 请求绑定设备接口
             */
            request.postReq('','',"/api/equipment/bidding",
                {
                    location:location,
                    ecode:ecode
                },
                function(res){
                    console.log("绑定设备res",res);
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
                        wx.navigateTo({
                            url:'../equipdetailsettinginfo/equipdetailsettinginfo'
                        })
                    }
                });
        }
    },
    /**
     *消息推送
     */
    testSubmit:function(e){
        // console.log("e",e);
        // var self= this;
        // let _access_token = wx.getStorageSync('access_token');
        // let openid = wx.getStorageSync('openid');
        // console.log("点击_access_token",_access_token);
        // console.log("点击openid",openid);
        // let url='https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='+_access_token;
        // let _jsonData = {
        //     access_token: _access_token,
        //     touser: openid,
        //     template_id: 'EU2DJS8nELQMuZ78CSIqppuSjzjnb3t3jwbJ62NONoQ',
        //     form_id: e.detail.formId,
        //     page: "pages/index/index",
        //     data: {
        //         "keyword1": { "value": "测试数据一", "color": "#173177" },
        //         "keyword2": { "value": "测试数据二", "color": "#173177" },
        //         "keyword3": { "value": "测试数据三", "color": "#173177" },
        //         "keyword4": { "value": "测试数据四", "color": "#173177" },
        //         "keyword5": { "value": "测试数据五", "color": "#173177" },
        //         "keyword6": { "value": "测试数据六", "color": "#173177" },
        //         "keyword7": { "value": "测试数据七", "color": "#173177" },
        //     }
        // };
        // wx.request({
        //     url: url,
        //     data: {
        //         value: _jsonData, access_token: _access_token
        //     },
        //     method: 'POST',
        //     success: function (res) {
        //         console.log("哈哈哈",res);
        //     },
        //     fail: function (err) {
        //         console.log('request fail ', err);
        //     },
        //     complete: function (res) {
        //         console.log("request completed!");
        //     }
        //
        // });
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
                });
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