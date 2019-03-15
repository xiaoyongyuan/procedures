// pages/alarmdetail/alarmdetail.js
var app = getApp()
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'报警详情',
        navbar: ['报警图片', '报警视频'],
        currentTab: 0,
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        // list传过来的详情
        alarmdetailData:{},
    },

    navbarTap: function(e){
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
    },

    /**
     * 请求下一条数据
     */
    next:function(){
        var that = this;
        console.log("hhh",that.data.index);
        request.postReq("/api/alarm/getlist_forAPP",
            {
                account:'18210812953',
                apptime:'2019-01-19 22:23'
            },
            function (res) {
                that.setData({
                    alarmdetailData:res.data[that.data.index++]
                })
                console.log("请求下一条res",res.data[that.data.index++]);
            }
        )
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that= this
        // 字符串转json
        const code = options.code;
        const index = parseInt(options.index);
        console.log("index",index);
        that.setData({
            index:index
        })
        /**
         * 请求报警详情接口
         */

        request.postReq("/api/alarm/getone",
            {
                code:code
            },
            function(res){
                that.setData({
                    alarmdetailData:res.data
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
})