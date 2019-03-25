//app.js
App({
    //小程序初始化时，触发APP里的onLaunch
    onLaunch: function () {
        var that = this;
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
            console.log("res.statusBarHeight",res.statusBarHeight);
            that.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight;
            console.log("totalTopHeight - res.statusBarHeight",totalTopHeight - res.statusBarHeight)
        },
        failure() {
            that.globalData.statusBarHeight = 0;
            that.globalData.titleBarHeight = 0
        }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
        success: res => {
            console.log('loginCode:', res.code);
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            // ------ 获取凭证 ------
            var code = res.code;
            if (code) {
                // console.log('获取用户登录凭证：' + code);
                // ------ 发送凭证 ------
                wx.request({
                    // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdf00c800a21aff71&secret=e1ebe24ca1e431d2447c4cc92dfded8a&js_code=JSCODE&grant_type=authorization_code',
                    data: { code: code },
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        if (res.statusCode === 200) {
                            // console.log("获取到的openid为：" + res.data)
                            // that.globalData.openid = res.data
                            wx.setStorageSync('openid', res.data)
                        } else {
                            console.log(res.errMsg)
                        }
                    },
                })
            } else {
                console.log('获取用户登录失败：' + res.errMsg);
            }
        }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else{
            wx.reLaunch({
                url: '/pages/authorize/authorize',
            })
        }
      }
    })



  },
  globalData: {
    userInfo: null
  },
})