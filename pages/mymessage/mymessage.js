// pages/versions/versions.js
var request = require('../../utils/request.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '我的消息',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        messageList:[],
        isFromSearch: true,   // 用于判断messageList数组是不是空数组，默认true，空的数组
        searchPageNum: 1,   // 设置加载的第几次，默认是第一次
        callbackcount: 15,      //返回数据的个数
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏
        searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
        showModal: false,
        isRefreshing: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        /**
         * 消息列表
         */
        request.postReq('','',"/api/alarminfo/getlist",
            {

            },
            function(res){
               if(res.data.length === 0){
                   that.setData({
                       nomessage:true
                   })
               }
               that.setData({
                   messageList:res.data
               });
                that.setData({
                    isRefreshing: false,
                });
                wx.stopPullDownRefresh();
            });
    },
    detailpic:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        console.log("Id",Id);
        that.setData({
            showModal: true,
            picpath:that.data.messageList[Id].picpath,
            memo:that.data.messageList[Id].memo
        });
        var code = that.data.messageList[Id].code;
        var status = that.data.messageList[Id].status;
        console.log("code",code);
        console.log("status",status);
        if(status === 0){
            /**
             * 已读未读
             */
            request.postReq('','',"/api/alarminfo/update",
                {
                    code:code,
                    status:1
                },
                function(res){
                    console.log("res",res);
                    /**
                     * 消息列表
                     */
                    request.postReq('','',"/api/alarminfo/getlist",
                        {

                        },
                        function(res){
                            console.log("res",res);
                            that.setData({
                                messageList:res.data
                            });
                        });
                });
        }
    },
    go: function () {
        this.setData({
            showModal: false
        })
    },
    goyidong:function(){
        wx.navigateTo({
            url: '/pages/ydmessage/ydmessage'
        })
    },
    gozddk:function(){
        wx.navigateTo({
            url: '/pages/zddk/zddk'
        })
    },
    gozsbb:function(){
        wx.navigateTo({
            url: '/pages/zsbb/zsbb'
        })
    },
    goother:function(){
        wx.showToast({
            title: '待开发...',
            icon: 'none',
            duration: 2000
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
        var that = this;
        if (that.data.isRefreshing) {
            return
        }
        that.setData({
            isRefreshing: true,
        });
        that.onLoad();//数据请求
    },

    /**
     * 上滑加载
     */
    BottomLoad: function () {
        var that = this;
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        /**
         * 请求列表接口
         */
        request.postReq(searchPageNum,callbackcount,"/api/alarminfo/getlist",
            {},
            function(res){
                //判断是否有数据，有则取数据
                if(res.data.length !== 0){
                    let searchList = [];
                    //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
                    that.data.isFromSearch ? searchList=res.data : searchList=that.data.messageList.concat(res.data);
                    that.setData({
                        messageList: searchList, //获取数据数组
                        searchLoading: false   //把"上拉加载"的变量设为false，显示
                    });
                    //没有数据了，把“没有数据”显示，把“上拉加载”隐藏
                }else{
                    that.setData({
                        searchLoadingComplete: true, //把“没有数据”设为true，显示
                        searchLoading: false  //把"上拉加载"的变量设为false，隐藏
                    });
                }
            });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        if(that.data.searchLoadingComplete === false){
            that.setData({
                searchLoading: true
            });
        }
        if(that.data.searchLoading && !that.data.searchLoadingComplete){
            that.setData({
                searchPageNum: that.data.searchPageNum+1,  //每次触发上拉事件，把searchPageNum+1
                isFromSearch: false,  //触发到上拉事件，把isFromSearch设为为false
            });
            that.BottomLoad();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});