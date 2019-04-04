const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log("还没有授权",res);
        if (res.authSetting['scope.userInfo']) {
            // 获取用户信息
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
                wx.navigateTo({
                    url: '/pages/register/register'
                })
              // wx.switchTab({
              //   url: '/pages/index/index'
              // })
            }
          });
        }
      }
    });
  },
    /**
     *点击授权登录按钮
     */
  bindGetUserInfo: function (e) {
    console.log("eee",e);
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      app.globalData.userInfo = e.detail.userInfo;

      //授权成功后，跳转进入小程序首页
      // wx.switchTab({
      //   url: '/pages/index/index'
      // })
      //   wx.navigateTo({
      //       url: '/pages/register/register'
      //   })
        wx.login({
            success: res => {
                console.log('loginCode:', res.code);
                var code = res.code;
                if(code){
                    console.log('获取用户登录凭证：' + code);
                    //调登录接口
                    wx.request({
                        url: 'https://api.aokecloud.cn/login/verifyforWX',
                        data: {
                            xcode :code
                        },
                        method: 'POST',
                        dataType:'json',
                        success(res) {
                            console.log("res.data",res.data);
                            if(res.data.success === 1){
                                wx.setStorageSync('user', res.data.data.account);
                                wx.setStorageSync('account', res.data.data.account);
                                wx.setStorageSync('comid', res.data.data.comid);
                                wx.setStorageSync('AUTHORIZATION', res.data.token);
                                wx.setStorageSync('companyuser', res.data.data.companyuser.cname);
                                if(res.data.data.comid === ''){
                                    wx.navigateTo({
                                        url: '/pages/newcomid/newcomid'
                                    })
                                }else {
                                    wx.switchTab({
                                        url: '/pages/index/index'
                                    });
                                }
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
    else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    // wx.request({
    //   // url: app.globalData.urlPath + 'user/userInfo',
    //   data: {
    //     openid: app.globalData.openid
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     app.globalData.userInfo = res.data;
    //   }
    // }) ;
  },
});
