// pages/versions/versions.js
var request = require('../../utils/request.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '我的消息',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        messageList:[],
        showModal: false,
        isRefreshing: false,
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

            },
            function(res){
               if(res.data.length === 0){
                   that.setData({
                       nomessage:true
                   })
               }
               that.setData({
                   messageList:res.data
               });
                that.setData({
                    isRefreshing: false,
                });
                wx.stopPullDownRefresh();
            });
    },
    detailpic:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        console.log("Id",Id);
        that.setData({
            showModal: true,
            picpath:that.data.messageList[Id].picpath
        });
        var code = that.data.messageList[Id].code;
        var status = that.data.messageList[Id].status;
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
                    request.postReq('','',"/api/alarminfo/getlist",
                        {

                        },
                        function(res){
                            console.log("res",res);
                            that.setData({
                                messageList:res.data
                            });
                        });
                });
        }
    },
    go: function () {
        this.setData({
            showModal: false
        })
    },
    goyidong:function(){
        wx.navigateTo({
            url: '/pages/ydmessage/ydmessage'
        })
    },
    gozddk:function(){
        wx.navigateTo({
            url: '/pages/zddk/zddk'
        })
    },
    gozsbb:function(){
        wx.navigateTo({
            url: '/pages/zsbb/zsbb'
        })
    },
    goother:function(){
        wx.showToast({
            title: '待开发...',
            icon: 'none',
            duration: 2000
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
        var that = this;
        if (that.data.isRefreshing) {
            return
        }
        that.setData({
            isRefreshing: true,
        });
        that.onLoad();//数据请求
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