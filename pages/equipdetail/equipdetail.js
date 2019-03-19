// pages/equipdetail/equipdetail.js
const app = getApp();
var request = require('../../utils/request.js');
const util = require('../../utils/util.js');
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
        var currentcode = that.data.currentcode;
        if(that.data.ismist === "false"){
            wx.showToast({
                title: '设备离线，无法操作！',
                icon: 'none',
                duration: 2000
            });
        }
        if(that.data.ismist === "true"){
            wx.navigateTo({
                        url:'../equipdetailsettinginfo/equipdetailsettinginfo?currentcode=' + currentcode
                    })
        }
    },
    /**
     * 页面跳转防区设置
     */
    changeTodefenceareasetting:function(){
        var that = this;
        if(that.data.ismist === "false"){
            wx.showToast({
                title: '设备离线，无法操作！',
                icon: 'none',
                duration: 2000
            });
        }
        if(that.data.ismist === "true"){
            wx.navigateTo({
                url:'../defenceareasetting/defenceareasetting'
            })
        }
    },
    /**
     * 页面跳转设防时间
     */
    changeTofortifytime:function(){
        var that = this;
        if(that.data.ismist === "false"){
            wx.showToast({
                title: '设备离线，无法操作！',
                icon: 'none',
                duration: 2000
            });
        }
        if(that.data.ismist === "true"){
            wx.navigateTo({
                url:'../fortifytime/fortifytime'
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that= this
        //当前时间
        var ctime = util.formatTime(new Date());
        //接收code
        var code = options.code;
        //接收设备是否离线
        var ismist = options.mist;
        that.setData({
            currentcode:code,
            ismist:ismist
        });
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
                    logintime:res.login.time,
                    status:res.heartdata.status
                });
                var currenttime = new Date(ctime);
                //两个时间相差的分钟数
                var  mislastheart =  parseInt(currenttime - new Date(that.data.lastheart))/ 1000 / 60;
                var  mislasttime = parseInt(currenttime - new Date(that.data.equipdetailData.lasttime))/ 1000 / 60;
                if(mislastheart > 1 && mislasttime > 1){
                    that.setData({
                        isonline:false
                    })
                }else {
                    that.setData({
                        isonline:true
                    })
                }
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