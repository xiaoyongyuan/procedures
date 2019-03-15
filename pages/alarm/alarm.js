// pages/alarm/alarm.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'树莓派企业测试账户1',
        date: '2018-10-01',
        time: '12:00',
        dateTimeArray: null,
        dateTime: null,
        dateTimeArray1: null,
        dateTime1: null,
        startYear: 2000,
        endYear: 2050,
        select: false,
        tihuoWay: '门店自提',
        showModal: false,
        text:'树莓派企业测试账户1',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        alarmListData: [],
        scanresult:''
    },
    /**
     * 跳转报警详情页
     */
    changeToalarmdetail:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        console.log("下一条",Id);
        //获取当前点击元素的属性值。
        var code = that.data.alarmListData[Id].code;
        //因为获取到的值是个对象，url只能传字符串，所以必须把它转化为字符串。
        // mesg = JSON.stringify(mesg);
        wx.navigateTo({
            url:'../alarmdetail/alarmdetail?code=' + code + '&index=' + Id
        })
    },

    /** 监听tab切换 */
    onTabItemTap(item){
        this.setData({
            scanresult:''
        })
    },

    /**
     * 扫一扫
     */
    clicks: function (event) {
        var that = this;
        wx.scanCode({
            success: (res) => {
                that.setData({
                    scanresult:res.result
                })
                wx.showToast({
                    title: '扫描成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail: (res) => {
                wx.showToast({
                    title: '扫描失败',
                    icon: 'success',
                    duration: 2000
                })
            },
            complete: (res) => {
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success:function (res) {
                that.setData({
                    screenHeight:res.screenHeight
                })
            }
        })
        /**
         * 请求列表接口
         */

        request.postReq("/api/alarm/getlist_forAPP",
            {
                account:'18210812953',
                apptime:'2019-01-19 22:23'
            },
            function(res){
                that.setData({
                alarmListData:res.data
            })
        })
    },
    bindShowMsg: function () {
        this.setData({
            showModal: true
        })
    },
    go: function () {
        this.setData({
            showModal: false,
            select:!this.data.select
        })
    },
    mySelect(e) {
        var name = e.currentTarget.dataset.name
        this.setData({
            tihuoWay: name,
            select: false
        })
    },
    changeDate(e){
        this.setData({ date:e.detail.value});
    },
    changeTime(e){
        this.setData({ time: e.detail.value });
    },
    changeDateTime(e){
        this.setData({ dateTime: e.detail.value });
    },
    changeDateTime1(e) {
        this.setData({ dateTime1: e.detail.value });
    },
    changeDateTimeColumn(e){
        var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray: dateArr,
            dateTime: arr
        });
    },
    changeDateTimeColumn1(e) {
        var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray1: dateArr,
            dateTime1: arr
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