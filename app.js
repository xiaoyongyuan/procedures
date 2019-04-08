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

    // 登录
    //  wx.login({
    //         success: res => {
    //             // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //             var code = res.code;
    //             console.log("code",res.code);
    //             wx.request({
    //                 url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxdf00c800a21aff71&secret=53bddca18ba4dbceb9026176b2cacc05&js_code='+ code +'&grant_type=authorization_code',
    //                 data: {},
    //                 header: {
    //                     'content-type': 'application/json'
    //                 },
    //                 success: function(res) {
    //                     // openid = res.data.openid //返回openid
    //                     console.log("openid",res);
    //                     wx.setStorageSync('openid', res.data.openid);
    //                 }
    //             })
    //         }
    //     });

    // 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
            wx.login({
                success: res => {
                    var code = res.code;
                    if(code){
                        console.log("code",code);
                        //调登录接口
                        wx.request({
                            url: 'https://api.aokecloud.cn/login/verifyforWX',
                            data: {
                                xcode :code
                            },
                            method: 'POST',
                            dataType:'json',
                            success(res) {
                                console.log("登录",res);
                                if(res.data.success === 1){
                                    if(res.data.data.account !== '' && res.data.data.account !== undefined){
                                        that.globalData.account = res.data.data.account;
                                        wx.setStorageSync('user', res.data.data.account);
                                        wx.setStorageSync('account', res.data.data.account);
                                        wx.setStorageSync('comid', res.data.data.comid);
                                        wx.setStorageSync('AUTHORIZATION', res.data.token);
                                        wx.setStorageSync('companyuser', res.data.data.companyuser.cname);
                                        console.log("woleigerqu",res.data.data.companyuser.cname);
                                        wx.setStorageSync('realname', res.data.data.realname);
                                        // realname
                                    }
                                    if(res.data.data.comid === ''){
                                        wx.navigateTo({
                                            url: '/pages/newcomid/newcomid'
                                        })
                                    }else {
                                        wx.switchTab({
                                            url: '/pages/index/index'
                                        });
                                    }
                                    // wx.request({
                                    //     url:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxdf00c800a21aff71&secret=53bddca18ba4dbceb9026176b2cacc05',
                                    //     method: 'POST',
                                    //     dataType:'json',
                                    //     success(res) {
                                    //         console.log("access_token ",res.data.access_token);
                                    //         wx.setStorageSync('access_token', res.data.access_token);
                                    //     }
                                    // });
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
        userInfo: null,
    },
});