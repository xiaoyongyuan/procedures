// pages/equipdetail/equipdetail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'设备详情',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        // list传过来的详情
        detail:{},
    },
    //页面跳转设置信息
    changeTosettinginfo:function(){
        wx.navigateTo({
            url:'../equipdetailsettinginfo/equipdetailsettinginfo'
        })
    },
    //页面跳转防区设置
    changeTodefenceareasetting:function(){
        wx.navigateTo({
            url:'../defenceareasetting/defenceareasetting'
        })
    },
    //页面跳转设防时间
    changeTofortifytime:function(){
        wx.navigateTo({
            url:'../fortifytime/fortifytime'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that= this
        // 字符串转json
        var info = JSON.parse(options.Mesgs);
        that.setData({
            // 把从list页面获取到的属性值赋给详情页的detail，供详情页使用
            detail: info
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