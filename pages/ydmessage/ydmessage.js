// pages/versions/versions.js
var request = require('../../utils/request.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '异动消息',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        ydmessage:[],
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
                searchtype:1
            },
            function(res){
                console.log("res",res);
                if(res.data.length === 0){
                    that.setData({
                       nomessage:true
                    });
                }
                that.setData({
                    ydmessage:res.data
                });
                for(var i=0;i<res.data.length;i++){
                    that.data.ydmessage[i]['messageopen']=false;
                    if(that.data.ydmessage[i]['status'] === 0){
                        that.data.ydmessage[i]['isshow']='block';
                    }
                    if(that.data.ydmessage[i]['status'] === 1){
                        that.data.ydmessage[i]['isshow']='none';
                    }
                    that.setData({
                        ydmessage:that.data.ydmessage
                    })
                }
                that.setData({
                    isRefreshing: false,
                });
                wx.stopPullDownRefresh();
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
        var code = that.data.ydmessage[Id].code;
        var status = that.data.ydmessage[Id].status;
        var messageopen = that.data.ydmessage[Id].messageopen;
        that.data.ydmessage[Id]['messageopen']=!messageopen;
        that.data.ydmessage[Id]['isshow']='none';
        that.setData({
            ydmessage:that.data.ydmessage
        });
        console.log("ydmessage",that.data.ydmessage);
        console.log("messageopen",messageopen);
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
                    that.data.ydmessage[Id]['status']=1;
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