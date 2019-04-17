
Page({


    onShow:function () {
        var that = this;
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
                                        var companylist = [];
                                        if(res.data.success === 1){
                                            if(res.data.data.comid === ''){
                                                wx.navigateTo({
                                                    url: '/pages/newcomid/newcomid'
                                                })
                                            }else {
                                                wx.switchTab({
                                                    url: '/pages/alarm/alarm'
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
                else{
                    wx.reLaunch({
                        url: '/pages/authorize/authorize',
                    });
                }
            }
        });

    }
});