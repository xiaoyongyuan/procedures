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
        text:'报警详情',
        back: {
            type: Boolean,
            value: false
        },
        ifsign:null
    },

    back: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    navbarTap: function(e){
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
    },
    /**
     * 标记和取消标记
     */
    ifsign:function(){
        var that = this;
        console.log("that.data.alarmdetailData.code",that.data.alarmdetailData.code);
        console.log("that.data.alarmdetailData.ifdanger",that.data.alarmdetailData.ifdanger);
        request.postReq("api.aokecloud.cn /api/alarm/update",
            {
                code:that.data.alarmdetailData.code,
                ifdanger:that.data.alarmdetailData.ifdanger
            },
            function (res) {

            }
        )

    },
    /**
     * 请求下一条数据
     */
    next:function(){
        var that = this;
        console.log("that.data.alarmdetailData.next",that.data.alarmdetailData)
        if(that.data.alarmdetailData.next === ""){
            wx.showToast({
                title: '已是第一条报警',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        request.postReq("/api/alarm/getone",
            {
                code:that.data.alarmdetailData.next
            },
            function (res) {
                that.setData({
                    alarmdetailData:res.data
                })
            }
        )
    },
    /**
     * 请求上一条数据
     */
    last:function(){
        var that = this;
        console.log("that.data.alarmdetailData.last",that.data.alarmdetailData)
        if(that.data.alarmdetailData.last === ""){
            wx.showToast({
                title: '已是第一条报警',
                icon: 'none',
                duration: 2000
            })
            return;
        }

        request.postReq("/api/alarm/getone",
            {
                code:that.data.alarmdetailData.last
            },
            function (res) {
                that.setData({
                    alarmdetailData:res.data
                })
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