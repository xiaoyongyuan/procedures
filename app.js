//app.js
var request = require('/utils/request.js');
App({
    //小程序初始化时，触发APP里的onLaunch
    onLaunch: function () {
        var that = this;
        // 获取系统信息
        wx.getSystemInfo({
        success: function (res) {
            that.globalData.platform = res.platform;
            let totalTopHeight = 68;
            if (res.model.indexOf('iPhone X') !== -1) {
                totalTopHeight = 88
            } else if (res.model.indexOf('iPhone') !== -1) {
                totalTopHeight = 64
            }
            that.globalData.statusBarHeight = res.statusBarHeight;
            that.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight;
        },
        failure() {
            that.globalData.statusBarHeight = 0;
            that.globalData.titleBarHeight = 0
        }
    });

    // 记录启动日志
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
            wx.login({
                success: res => {
                    var code = res.code;
                    if(code){
                        //调登录接口
                        wx.request({
                            url: 'http://login.aokecloud.cn/login/verifyforWX',
                            data: {
                                xcode :code
                            },
                            method: 'POST',
                            dataType:'json',
                            success(res) {
                                if(res.data.success === 1){
                                    if(res.data.data.account !== '' && res.data.data.account !== undefined){
                                        that.globalData.account = res.data.data.account;
                                        wx.setStorageSync('user', res.data.data.account);
                                        wx.setStorageSync('account', res.data.data.account);
                                        wx.setStorageSync('AUTHORIZATION', res.data.token);
                                    }
                                    wx.switchTab({
                                        url: '/pages/index/index'
                                    });
                                }
                                if(res.data.success === 0){
                                    wx.navigateTo({
                                        url: '/pages/register/register'
                                    })
                                }
                            }
                        });
                    }
                }
            });
        }
        else{
            wx.reLaunch({
                url: '/pages/authorize/authorize',
            });
        }
      }
    });
  },
    globalData: {
        userInfo: null
    },
});