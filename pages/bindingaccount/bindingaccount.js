// pages/bindingaccount/bindingaccount.js
import PublicFun from "../../utils/PublicFun";
const  phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '绑定账号',
        btnTxt: '获取验证码',
        isGetCode: false,
        Loading: false,
        countDown: 60,
        formData: {
            phone: '',
            code: ''
        },
        hidden:true,
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
    confirmM:function(){
        var that = this;
        that.setData({
            hidden:true
        });
    },
    formSubmit(e) {
        let that = this,
            formData = e.detail.value,
            errMsg = '';
        that.setData({
            Loading: true
        });
        if (!formData.phone){
            errMsg = '手机号不能为空！';
        }
        if (!formData.code){
            errMsg = '验证码不能为空！';
        }
        if (formData.phone){
            if (!phoneRexp.test(formData.phone)) {
                errMsg = '手机号格式有误！';
            }
        }
        if (errMsg){
            that.setData({
                Loading: false
            })
            PublicFun._showToast(errMsg);
            return false
        }
        //连接服务器进行验证码手机号验证操作
        setTimeout(()=>{
            that.setData({
                Loading: false
            })
        },1500)
    },
    /**
     *绑定发送验证码
     */
    getPhoneCode() {
        let that = this,
            formData = that.data.formData,
            errMsg = '' ;
        errMsg = !formData.phone ? '手机号不能为空！' :
            formData.phone && !phoneRexp.test(formData.phone) ? '手机号格式有误！' :
                '' ;
        if (errMsg){
            PublicFun._showToast(errMsg);
            return false
        }
        wx.showLoading({
            title: '正在获取验证码,请稍后......',
        });
        //绑定发送验证码
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 用户的唯一标识（openid）, 本次登录的会话密钥（session_key）等, unionId
                // ------ 获取凭证 ------
                var code = res.code;
                if (code) {
                    // ------ 发送凭证 ------
                    wx.request({
                        url: 'https://api.aokecloud.cn/api/Wxuser/bidding_back',
                        data: {
                            account:formData.phone,
                            xcode:code
                        },
                        method: 'POST',
                        success(res) {
                            console.log("res",res);
                            wx.hideLoading();
                            if(res.data.success === 1){
                                wx.showToast({
                                    title: '验证码获取成功!',
                                    icon: 'success',
                                    duration: 2000
                                });
                                that.setData({
                                    isGetCode: true
                                });
                                that.timer();
                            }
                            if(res.data.success === 0){
                                wx.showToast({
                                    title: '该手机号未注册',
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        }
                    });
                } else {
                    console.log('获取用户登录失败：' + res.errMsg);
                }
            }
        });
    },
    /**
     * 绑定
     */
    binding:function(){
        var that = this;
        let formData = that.data.formData;
        console.log("formData.phone",formData.phone);
        wx.showLoading({
            title: '正在绑定,请稍等......',
        });
        wx.login({
            success: res => {
                var code = res.code;
                if(code){
                    //调绑定接口
                    wx.request({
                        url: 'https://api.aokecloud.cn/api/Wxuser/add',
                        data: {
                            account:formData.phone,
                            xcode:code,
                            auth:formData.code
                        },
                        method: 'POST',
                        success: function (res) {
                            console.log("res",res);
                            wx.hideLoading();
                            if(res.data.success === 1){
                                if (res.data.account !== '' && res.data.account !== undefined) {
                                    wx.showLoading({
                                        title: '正在登录',
                                    });
                                    wx.login({
                                        success: res => {
                                            var code = res.code;
                                            if (code) {
                                                //调登录接口
                                                wx.request({
                                                    url: 'https://api.aokecloud.cn/login/verifyforWX',
                                                    data: {
                                                        xcode: code
                                                    },
                                                    method: 'POST',
                                                    dataType: 'json',
                                                    success(res) {
                                                        wx.hideLoading();
                                                        var companylist = [];
                                                        if (res.data.success === 1) {
                                                            if (res.data.data.account !== '' && res.data.data.account !== undefined) {
                                                                wx.setStorageSync('user', res.data.data.account);
                                                                wx.setStorageSync('account', res.data.data.account);
                                                                wx.setStorageSync('comid', res.data.data.comid);
                                                                wx.setStorageSync('AUTHORIZATION', res.data.token);
                                                                wx.setStorageSync('companyuser', res.data.data.companyuser.cname);
                                                                console.log("companyuser",res.data.data.companyuser.cname);
                                                                wx.setStorageSync('realname', res.data.data.realname);
                                                                console.log("res.data.data.list.length",res.data.data.list.length);
                                                                if(res.data.data.list.length > 0){
                                                                    for(var i = 0;i < res.data.data.list.length;i++ ){
                                                                        companylist.push(res.data.data.list[i]);
                                                                        console.log("cnam",res.data.data.list[i]);
                                                                    }
                                                                }
                                                                console.log("companylist",companylist);
                                                                wx.setStorageSync('companylist', companylist);
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
                                                        }
                                                        if (res.data.success === 0) {
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
                            }
                            if(res.data.success === 0){
                                that.setData({
                                    hidden:false,
                                });
                            }
                        }
                    });
                }
            }
        });
    },
    /**
     * 验证码倒计时
     */
    timer() {
        let that = this,
            countDown = that.data.countDown;
        let clock = setInterval(() => {
            countDown--;
            if (countDown >= 0) {
                that.setData({
                    countDown: countDown
                })
            } else {
                clearInterval(clock);
                that.setData({
                    countDown: 60,
                    isGetCode: false,
                    btnTxt: '重新获取'
                })
            }
        }, 1000)
    },
    Input(e) {//输入检索
        let that = this,
            formData = that.data.formData,
            inputType = e.currentTarget.dataset.id,
            inputValue = e.detail.value;
        inputType === 'phone' ?
            formData.phone = inputValue : formData.code = inputValue;
        that.setData({
            formData
        })

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
});