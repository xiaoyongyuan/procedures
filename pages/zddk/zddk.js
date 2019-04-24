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
                atype:12
            },
            function(res){
                if(res.data.length === 0){
                    that.setData({
                        nomessage:true
                    })
                }
                that.setData({
                    zddkmessagelist:res.data
                });
                for(var i = 0;i<res.data.length;i++){
                    that.data.zddkmessagelist[i]['messageopen']=false;
                    if(that.data.zddkmessagelist[i]['status'] === 0){
                        that.data.zddkmessagelist[i]['isshow']='block';
                    }
                    if(that.data.zddkmessagelist[i]['status'] === 1){
                        that.data.zddkmessagelist[i]['isshow']='none';
                    }
                    that.setData({
                        zddkmessagelist:that.data.zddkmessagelist
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
        var code = that.data.zddkmessagelist[Id].code;
        var status = that.data.zddkmessagelist[Id].status;
        var messageopen = that.data.zddkmessagelist[Id].messageopen;
        that.data.zddkmessagelist[Id]['messageopen']=!messageopen;
        that.data.zddkmessagelist[Id]['isshow']='none';
        that.setData({
            zddkmessagelist:that.data.zddkmessagelist
        });
        console.log("code",code);
        console.log("status",status);
        console.log("messageopen",messageopen);
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
                    that.data.zddkmessagelist[Id]['status']=1;
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