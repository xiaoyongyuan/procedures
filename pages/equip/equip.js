// pages/equip/equip.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:'树莓派企业测试账户1',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        //测试模拟数据
        equipListData: [
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "yy",
                "address": "60",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000004/pic/20190119/1000004_20190119104637_320X240.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-02-12 12:43:38",
                "equip": "西安",
                "address": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312182043_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "yy",
                "address": "咸阳",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000004/pic/20190119/1000004_20190119104637_320X240.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-02-12 12:43:38",
                "equip": "西安",
                "address": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312180148_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "yy",
                "address": "渭南",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312175426_320X180.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-03-12 16:53:39",
                "equip": "西安",
                "address": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312172013_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 16:50:03",
                "equip": "yy",
                "address": "雁塔",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312163744_320X180.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-03-12 16:37:44",
                "equip": "西安",
                "address": "灞桥",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312//EFGABC019_20190312165339.jpg",
            },
        ]
    },
    //跳转详情页
    changeToequipdetail:function(){
        wx.navigateTo({
            url:'../equipdetail/equipdetail'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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