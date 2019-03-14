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
                "alarmtype": "123",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "测试",
                defenceareasetting:1,
                fortifytime:2,
                lastheart:'2019-03-09 19:22:11',
                equiptemp:59,
                equipIP:'',
                port:'',
                equipstate:1,
                softversion:'1.1.1',
                hardversion:'1.1.1',
                upgradetime:'2019-02-22 19:19:20',
                logintime:'2019-03-09 10:10:12',
                currentstate:0,
                "address": "503",
                "imgUrl": "http://txt15.book118.com/2017/0421/book100393/100392726.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-02-12 12:43:38",
                "equip": "西安",
                defenceareasetting:2,
                fortifytime:1,
                lastheart:'2019-02-09 13:12:22',
                equiptemp:33,
                equipIP:'192.134.1.23',
                port:7876,
                equipstate:0,
                softversion:'1.1.1',
                hardversion:'1.1.1',
                upgradetime:'2019-02-22 19:19:20',
                logintime:'2019-03-09 10:10:12',
                currentstate:1,
                "address": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312182043_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "yy",
                defenceareasetting:2,
                fortifytime:3,
                lastheart:'2019-03-04 22:12:34',
                equiptemp:36,
                equipIP:'192.134.1.81',
                port:786,
                equipstate:1,
                softversion:'1.1.1',
                hardversion:'1.1.1',
                upgradetime:'2019-02-22 19:19:20',
                logintime:'2019-03-09 10:10:12',
                currentstate:0,
                "address": "咸阳",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000004/pic/20190119/1000004_20190119104637_320X240.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-02-12 12:43:38",
                "equip": "西安",
                defenceareasetting:3,
                fortifytime:4,
                lastheart:'2019-03-05 19:22:11',
                equiptemp:44,
                equipIP:'192.134.2.23',
                port:9089,
                equipstate:1,
                softversion:'1.1.1',
                hardversion:'1.1.1',
                upgradetime:'2019-02-22 19:19:20',
                logintime:'2019-03-09 10:10:12',
                currentstate:1,
                "address": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312180148_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 18:01:38",
                "equip": "yy",
                defenceareasetting:2,
                fortifytime:5,
                lastheart:'2019-03-09 19:22:11',
                equiptemp:47,
                equipIP:'192.134.1.23',
                port:8080,
                equipstate:0,
                softversion:'1.1.1',
                hardversion:'1.1.1',
                upgradetime:'2019-02-22 19:19:20',
                logintime:'2019-03-09 10:10:12',
                currentstate:1,
                "address": "渭南",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312175426_320X180.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-03-12 16:53:39",
                "equip": "西安",
                defenceareasetting:4,
                fortifytime:5,
                lastheart:'2019-03-12 09:34:43',
                equiptemp:55,
                equipIP:'192.134.1.23',
                port:489,
                equipstate:1,
                softversion:'1.1.1',
                hardversion:'1.1.1',
                upgradetime:'2019-02-22 19:19:20',
                logintime:'2019-03-09 10:10:12',
                currentstate:1,
                "address": "人",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312172013_320X180.jpg",
            },
            {
                "alarmtype": "入侵报警",
                "alarmtime": "2019-03-12 16:50:03",
                "equip": "yy",
                defenceareasetting:4,
                fortifytime:2,
                lastheart:'2019-02-27 21:34:43',
                equiptemp:49,
                equipIP:'192.134.1.23',
                port:990,
                equipstate:1,
                softversion:'1.1.1',
                hardversion:'1.1.1',
                upgradetime:'2019-02-22 19:19:20',
                logintime:'2019-03-09 10:10:12',
                currentstate:1,
                "address": "雁塔",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312/EFGABC019_20190312163744_320X180.jpg",
            },
            {
                "alarmtype": "整点打卡",
                "alarmtime": "2019-03-12 16:37:44",
                "equip": "西安",
                defenceareasetting:2,
                fortifytime:3,
                lastheart:'2018-12-19 12:12:43',
                equiptemp:52,
                equipIP:'192.134.1.23',
                port:443,
                equipstate:0,
                softversion:'1.1.1',
                hardversion:'1.1.1',
                upgradetime:'2019-02-22 19:19:20',
                logintime:'2019-03-09 10:10:12',
                currentstate:1,
                "address": "灞桥",
                "imgUrl": "http://pic01.aokecloud.cn/alarm/1000019/pic/20190312//EFGABC019_20190312165339.jpg",
            },
        ]
    },
    /**
     * 跳转设备详情页
     */
    changeToequipdetail:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        //获取当前点击元素的属性值。
        var mesg = that.data.equipListData[Id];
        //因为获取到的值是个对象，url只能传字符串，所以必须把它转化为字符串。
        mesg = JSON.stringify(mesg);
        wx.navigateTo({
            url:'../equipdetail/equipdetail?Mesgs=' + mesg
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