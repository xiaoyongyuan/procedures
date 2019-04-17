// pages/selectcompany/selectcompany.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '我的其他企业',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log("hh",that.data.companylist);
        wx.getSystemInfo({
            success:function (res) {
                that.setData({
                    screenHeight:res.screenHeight
                })
            }
        })

    },
    /**
     * 切换公司
     */
    selectcompany:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        console.log("ID",e);
        console.log("ID",Id);
        // var code = that.data.alarmListData[Id].code;
        const account  = that.data.companylist[Id].account;
        const comid = that.data.companylist[Id].companycode;
        // const cname = that.data.companylist[Id].cname;
        console.log("account",account);
        console.log("comid",comid);
        //调登录接口
        wx.request({
            url: 'https://api.aokecloud.cn/login/verify_WX',
            data: {
                account :account,
                comid:comid
            },
            method: 'POST',
            dataType:'json',
            success(res) {
                console.log("切换公司",res);
                if(res.data.success === 1){
                    wx.setStorageSync('account', res.data.data.account);
                    wx.setStorageSync('comid', res.data.data.comid);
                    wx.setStorageSync('companyuser', res.data.data.companyuser.cname);
                    console.log("wocaotama",res.data.data.companyuser.cname);
                    wx.switchTab({
                        url: '/pages/alarm/alarm'
                    });
                    setTimeout(function () {
                        wx.showToast({
                            title: '切换公司成功！',
                            icon: 'success',
                            duration: 2000
                        });
                    }, 500) //延迟时间 这里是1秒
                }
            }
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
        var that = this;
        that.setData({
            companylist:wx.getStorageSync('companylist')
        });

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