// pages/bindingaccount/bindingaccount.js
import PublicFun from "../../utils/PublicFun";

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
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

    },
    formSubmit(e) {
        let that = this,
            formData = e.detail.value,
            errMsg = '';
        that.setData({
            Loading: true
        })
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
        that.timer();
        //连接服务器进行获取验证码操作
        that.setData({
            isGetCode: true
        })
    },
    timer() {//验证码倒计时
        let that = this,
            countDown = that.data.countDown;
        let clock = setInterval(() => {
            countDown--
            if (countDown >= 0) {
                that.setData({
                    countDown: countDown
                })
            } else {
                clearInterval(clock)
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
})