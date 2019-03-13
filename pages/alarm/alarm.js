// pages/alarm/alarm.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp();
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
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        //测试模拟数据
        alarmListData: [
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "yy",
                "alarmobj": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000004/pic/20190119/1000004_20190119104637_320X240.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-02-12 12:43:38",
                "equip": "西安",
                "alarmobj": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312182043_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "yy",
                "alarmobj": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000004/pic/20190119/1000004_20190119104637_320X240.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-02-12 12:43:38",
                "equip": "西安",
                "alarmobj": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312180148_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "yy",
                "alarmobj": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312175426_320X180.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-03-12 16:53:39",
                "equip": "西安",
                "alarmobj": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312172013_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 16:50:03",
                "equip": "yy",
                "alarmobj": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312163744_320X180.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-03-12 16:37:44",
                "equip": "西安",
                "alarmobj": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312//EFGABC019_20190312165339.jpg",
            },
        ]
    },
    //跳转详情页
    changeToalarmdetail:function(){
        wx.navigateTo({
            url:'../alarmdetail/alarmdetail'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();

        this.setData({
            dateTime: obj.dateTime,
            dateTimeArray: obj.dateTimeArray,
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime
        });

        var that = this;
        wx.getSystemInfo({
            success:function (res) {
                console.log(res.brand);//手机品牌
                console.log(res.model);//手机型号
                console.log(res.screenWidth)//手机屏幕宽度
                console.log("手机屏幕高度其他企业",res.screenHeight)//手机屏幕高度
                that.setData({
                    screenHeight:res.screenHeight
                })
            }
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
    // bindShowMsg() {
    //     this.setData({
    //         select:!this.data.select
    //     })
    // },
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