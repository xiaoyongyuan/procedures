const app = getApp();
var request = require('../../utils/request.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        title:'个人中心',
        showModal: false,
    },
    submit: function () {
        this.setData({
            showModal: true
        })
    },

    preventTouchMove: function () {

    },
    go: function () {
        this.setData({
            showModal: false
        })
    },
    openToast: function () {
        wx.clearStorageSync();
        wx.clearStorage();
        this.setData({
            showModal: false,
            currentSize:0,
        });
        wx.showToast({
            title: '清除成功！',
            icon: 'success',
            duration: 2000
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/user/getone",
            {},
            function(res){
              that.setData({
                  workdate:res.data.workdate,
                  acount:res.data.acount,
                  ecount:res.data.ecount
              });
            });
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    onShow: function () {
        var that = this;
        that.setData({
            workdate:wx.getStorageSync("workdate"),
            realname:wx.getStorageSync("companyuser")
        });
        // console.log("测试切换公司2",that.data.realname);
        wx.setNavigationBarTitle({
            title: '个人中心'
        });
        var that = this;
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/user/getone",
            {},
            function(res){
                that.setData({
                    workdate:res.data.workdate,
                    acount:res.data.acount,
                    ecount:res.data.ecount
                });
            });
        wx.getStorageInfo({
            success(res) {
                that.setData({
                    currentSize: res.currentSize
                });
            }
        })
    },
    about: function (e) {
        wx.showModal({
            title: '提示',
            content: app.globalData.about || '',
            showCancel: false
        });
    }
});
