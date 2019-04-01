// pages/addequip/addequip.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '添加设备',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        scanresult:''
    },
    /**
     *临时解绑微信号
     */
    testdel:function(){
        wx.login({
            success: res => {
                console.log('loginCode:', res.code);
                // 发送 res.code 到后台换取 用户的唯一标识（openid）, 本次登录的会话密钥（session_key）等, unionId
                // ------ 获取凭证 ------
                var code = res.code;
                if (code) {
                    console.log('获取用户登录凭证：' + code);
                    /**
                     * 临时解绑微信号
                     */
                    wx.request({
                        url: 'http://api.aokecloud.cn/api/wxuser/del',
                        data: {
                            xcode:code
                        },
                        method: 'POST',
                        success(res) {
                            //接口疑似有问题
                            //1、注册了没绑定
                            //2、注册了也绑定了
                            //3、没注册
                            console.log("解绑",res);
                        }
                    });
                } else {
                    console.log('获取用户登录失败：' + res.errMsg);
                }
            }
        });
        // wx.request({
        //     url: 'http://api.aokecloud.cn/api/equipment/e_initialize',
        //     data: {
        //         ecode:'EFGABC026'
        //     },
        //     method: 'POST',
        //     success(res) {
        //         //接口疑似有问题
        //         //1、注册了没绑定
        //         //2、注册了也绑定了
        //         //3、没注册
        //         console.log("解绑",res);
        //     }
        // });
    },
    //扫一扫
    click: function (event) {
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