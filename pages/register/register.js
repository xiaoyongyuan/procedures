// pages/register/register.js
var request = require('../../utils/request.js');
import PublicFun from '../../utils/PublicFun.js';
const  phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        navigationBarTitle: '立即注册',
        btnTxt: '获取验证码',
        isGetCode: false,
        Loading: false,
        countDown: 60,
        formData: {
            phone: '',
            code: ''
        },
        hiddenmodalput:true,
        // 这里是一些组件内部数据
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
            });
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
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
    openbindingphone:function(){
        wx.navigateTo({
            url:'../bindingaccount/bindingaccount'
        })
    },
    confirmM:function(){
        var that = this;
        that.setData({
            hiddenmodalput:true
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
            return;
        }
        if (!formData.code){
            errMsg = '验证码不能为空！';
            return;
        }
        // else {
        //     // wx.switchTab({
        //     //     url: '/pages/index/index'
        //     // })
        // }
        if (formData.phone){
            if (!phoneRexp.test(formData.phone)) {
                errMsg = '手机号格式有误！';
            }
        }
        if (errMsg){
            that.setData({
                Loading: false
            });
            PublicFun._showToast(errMsg);
            return false
        }
        //连接服务器进行验证码手机号验证操作
        setTimeout(()=>{
            that.setData({
                Loading: false
            });
        },1500)
    },
    /**
     *获取验收及验证码
     */
    getPhoneCode() {
        let that = this,
            formData = that.data.formData,
            errMsg = '' ;
            errMsg = !formData.phone ? '手机号不能为空！' :
            formData.phone && !phoneRexp.test(formData.phone) ? '手机号格式有误！' : '' ;
        if (errMsg){
            PublicFun._showToast(errMsg);
            return false
        }
        console.log("手机号",formData.phone);
        //注册发送验证码
        wx.request({
            url: 'http://api.aokecloud.cn/api/autocode/auto',
            data: {
                tel:formData.phone
            },
            method: 'POST',
            success(res) {
                console.log("注册情况",res);
                if(res.data.auth !== undefined){
                    that.setData({
                        auth:res.data.auth
                    });
                }
                if(res.data.success === 0){
                    console.log("当前手机号已被注册，请绑定");
                    wx.showToast({
                        title: '该手机号已注册',
                        icon: 'none',
                        duration: 2000
                    });
                }
                if(res.data.success === 1){
                    that.timer();
                    that.setData({
                        isGetCode: true
                    });
                }
            }
        });
    },
    /**
     * 注册
     */
    register:function(){
        var that = this;
        let formData = that.data.formData;
        // formData.code
        console.log("表单数据",formData);
        console.log("表单数据1",that.data.auth);
        console.log("表单数据2",parseInt(formData.code));
        if(parseInt(formData.code) !== that.data.auth || that.data.auth === undefined ){
            that.setData({
                hiddenmodalput:false,
            });
        }
        if(parseInt(formData.code) === that.data.auth){
            wx.login({
                success: res => {
                    console.log('loginCode:', res.code);
                    var code = res.code;
                    if(code){
                        console.log('获取用户登录凭证：' + code);
                        //调绑定接口
                        wx.request({
                            url: 'http://api.aokecloud.cn/api/Wxuser/add',
                            data: {
                                account:formData.phone,
                                xcode:code,
                                auth:formData.code
                            },
                            method: 'POST',
                            success(res) {
                                //接口疑似有问题
                                console.log("res.data注册",res.data);
                                //success为0时，该微信号已被绑定
                                //success为1时，注册成功，跳到我的首页
                                if(1 === 1){
                                    wx.switchTab({
                                        url: '/pages/index/index'
                                    })
                                }
                            }
                        });
                    }
                }
            });
        }
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