// pages/equipdetail/equipdetail.js
const app = getApp();
var request = require('../../utils/request.js');
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
        equipdetailData:{},
    },
    /**
     * 页面跳转设置信息
     */
    changeTosettinginfo:function(){
        var that = this;
        // var IP = that.data.equipdetailData.ip;
        // var port = that.data.equipdetailData.authport;
        // var version = that.data.softversion;
        // var temp = that.data.temp;
        // var password = that.data.equipdetailData.apassword;
        // var username = that.data.equipdetailData.ausername;
        var currentcode = that.data.currentcode;

        //因为获取到的值是个对象，url只能传字符串，所以必须把它转化为字符串。
        // equipdetailData = JSON.stringify(equipdetailData);
        wx.navigateTo({
            // url:'../equipdetailsettinginfo/equipdetailsettinginfo?IP=' + IP +
            //     '&port=' + port +'&version=' + version + '&temp=' + temp
            //     +'&password=' + password + '&username=' + username
            url:'../equipdetailsettinginfo/equipdetailsettinginfo?currentcode=' + currentcode
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
        //接收
        var code = options.code;
        that.setData({
            currentcode:code
        })
        console.log("currentcode",that.data.currentcode);
        /**
         * 请求设备详情接口
         */

        request.postReq("/api/camera/getone",
            {
                code:code
            },
            function(res){
                that.setData({
                    equipdetailData:res.data,
                    workingtime:res.workingtime.length,
                    lastheart:res.heartdata.time,
                    temp:res.heartdata.temp,
                    softversion:res.login.version,
                    upgrade:res.upgrade,
                    logintime:res.login.time
                })
            })
    },
    /**
     * 设备闪灯
     */
    equiplight:function(options){
        var that = this;
        console.log("eid",that.data.equipdetailData.eid)
        request.postReq("/api/equipment/FlashLampV1",
            {
                eid:that.data.equipdetailData.eid
            },
            function(res){
                wx.showToast({
                    title: '请求成功',
                    icon: 'success',
                    duration: 2000
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