// pages/versions/versions.js
var request = require('../../utils/request.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '整点打卡',
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        zddkmessagelist:[],
        messageopen:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        /**
         * 消息列表
         */
        request.postReq('','',"/api/alarminfo/getlist",
            {
                atype:12
            },
            function(res){
                console.log("res",res);
                that.setData({
                    zddkmessagelist:res.data
                });
            });
    },
    openclose:function(e){
        var that = this;
        that.setData({
            messageopen:!that.data.messageopen
        });
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        console.log("Id",Id);
        // that.setData({
        //     showModal: true,
        //     picpath:that.data.messageList[Id].picpath
        // });
        var code = that.data.zddkmessagelist[Id].code;
        var status = that.data.zddkmessagelist[Id].status;
        console.log("code",code);
        console.log("status",status);
        if(status === 0){
            /**
             * 已读未读
             */
            request.postReq('','',"/api/alarminfo/update",
                {
                    code:code,
                    status:1
                },
                function(res){
                    console.log("res",res);
                    /**
                     * 消息列表
                     */
                    // request.postReq('','',"/api/alarminfo/getlist",
                    //     {
                    //
                    //     },
                    //     function(res){
                    //         console.log("res",res);
                    //         that.setData({
                    //             ydmessage:res.data
                    //         });
                    //     });
                });
        }
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