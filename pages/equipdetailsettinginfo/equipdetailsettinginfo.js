// pages/equipdetailsettinginfo/equipdetailsettinginfo.js
const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'设置信息',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        text:'设置信息',
        back: {
            type: Boolean,
            value: false
        }
    },
    backequipdetail: function () {
        wx.navigateBack({
            delta: 1
        })
        // wx.navigateTo({
        //     url:'../equipdetail/equipdetail'
        // });
    },
    //页面跳转
    changeTosettingequipinfo:function(){
        var that = this;
        var IP = that.data.camerainfo.cameraip;
        var port = that.data.camerainfo.cameraportno;
        wx.navigateTo({
            url:'../settingequipinfo/settingequipinfo?IP=' + IP + '&port=' + port
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that= this;
        //字符串转json
        var currentcode = options.currentcode;
        /**
         *  获取查看设备信息
         */
        request.postReq('','',"/api/camera/camerainfo",
            {
                code:currentcode
            },
            function(res){
                console.log("res.data",res.data);
               that.setData({
                   camerainfo:res.data,
                   version:res.login.version,
                   temp:res.heartdata.temp,
                   status:res.heartdata.status
               })
            })

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