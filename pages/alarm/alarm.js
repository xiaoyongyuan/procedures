const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:wx.getStorageSync('companyuser'),
        select: false,
        tihuoWay: '门店自提',
        selected: '全部',
        selectedvalue:'',
        showModal: false,
        text:'',
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        alarmListData: [],//放置返回数据的数组
        isFromSearch: true,   // 用于判断alarmListData数组是不是空数组，默认true，空的数组
        searchPageNum: 1,   // 设置加载的第几次，默认是第一次
        callbackcount: 15,      //返回数据的个数
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏
        searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
        equipList:[],
        scanresult:'',
        nodata:'none',
        apptime:'',
        isload:false,
        reset:false,
        isRefreshing: false,
    },
    /**
     * 重置查询时间
     */
    reset:function(){
        var that = this;
        that.setData({
            reset:false,
            apptime:'',
            searchPageNum:1
        });
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        if(that.data.selectedvalue === 'sign'){
            /**
             * 请求报警列表接口
             */
            request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                {
                    apptime:that.data.apptime,
                    ifdanger:1
                },
                function(res){
                    that.setData({
                        alarmListData:res.data
                    });
                    if(that.data.alarmListData.length > 0){
                        that.setData({
                            nodata:'none'
                        });
                    }else{
                        that.setData({
                            nodata:'block'
                        });
                    }
                });
        }else{
            /**
             * 请求报警列表接口
             */
            request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                {
                    apptime:that.data.apptime,
                    cid:that.data.selectedvalue,
                },
                function(res){
                    that.setData({
                        alarmListData:res.data
                    });
                    if(that.data.alarmListData.length > 0){
                        that.setData({
                            nodata:'none'
                        });
                    }else{
                        that.setData({
                            nodata:'block'
                        });
                    }
                });
        }
    },
    isload:function(){
        var that = this;
        that.setData({
            isload:true
        });
    },
    /**
     * 日历控件绑定函数
     * 点击日期返回
     */
    onPickerChange: function (e) {
        var that = this;
        this.setData({
            apptime: e.detail.dateString,
            searchPageNum:1
        });
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数

        /**
         * 请求报警列表接口
         */
        if(that.data.isload === true){
            that.setData({
                reset:true
            });
            if(that.data.selectedvalue === 'sign'){
                /**
                 * 请求报警列表接口
                 */
                request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                    {
                        apptime:that.data.apptime,
                        ifdanger:1
                    },
                    function(res){
                        that.setData({
                            alarmListData:res.data
                        });
                        if(that.data.alarmListData.length > 0){
                            that.setData({
                                nodata:'none'
                            });
                        }else{
                            that.setData({
                                nodata:'block'
                            });
                        }
                    });
            }else{
                /**
                 * 请求报警列表接口
                 */
                request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                    {
                        apptime:that.data.apptime,
                        cid:that.data.selectedvalue,
                    },
                    function(res){
                        that.setData({
                            alarmListData:res.data
                        });
                        if(that.data.alarmListData.length > 0){
                            that.setData({
                                nodata:'none'
                            });
                        }else{
                            that.setData({
                                nodata:'block'
                            });
                        }
                    });
            }
        }
    },
    /**
     * 下拉框选择
     */
    mySelect(e) {
        var that = this;
        var name = e.currentTarget.dataset.name;
        var value = e.currentTarget.dataset.value;
        that.setData({
            selected: name,
            selectedvalue:value,
            select: false,
            searchPageNum:1
        });
        if(that.data.reset === false){
            that.setData({
                apptime:''
            });
        }
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        if(value === 'sign'){
            /**
             * 请求报警列表接口
             */
            request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                {
                    apptime:that.data.apptime,
                    ifdanger:1
                },
                function(res){
                    that.setData({
                        alarmListData:res.data
                    });
                    if(that.data.alarmListData.length > 0){
                        that.setData({
                            nodata:'none',
                            searchLoadingComplete:false
                        });
                    }else{
                        that.setData({
                            nodata:'block'
                        });
                    }
                });
        }else{
            /**
             * 请求报警列表接口
             */
            request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                {
                    apptime:that.data.apptime,
                    cid:value,
                },
                function(res){
                    that.setData({
                        alarmListData:res.data
                    });
                    if(that.data.alarmListData.length > 0){
                        that.setData({
                            nodata:'none',
                            searchLoadingComplete:false
                        });
                    }else{
                        that.setData({
                            nodata:'block'
                        });
                    }
                });
        }
    },
    /**
     * 跳转报警详情页
     */
    changeToalarmdetail:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        //获取当前点击元素的属性值。selectedvalue apptime
        var code = that.data.alarmListData[Id].code;
        if(that.data.selectedvalue === 'sign'){
            wx.navigateTo({
                url:'../alarmdetail/alarmdetail?code=' + code +'&ifdanger=1'
            });
        }else {
            wx.navigateTo({
                url:'../alarmdetail/alarmdetail?code=' + code +'&cid=' + that.data.selectedvalue
            });
        }
    },
    /**
     * 扫一扫
     */
    clicks: function (event) {
        var that = this;
        wx.scanCode({
            success: (res) => {
                that.setData({
                    scanresult:res.result
                });
                wx.setStorageSync("qrcode",res.result);
                wx.showToast({
                    title: '扫描成功',
                    icon: 'success',
                    duration: 2000
                });
                /**
                 * 判断二维码是否存在
                 */
                request.postReq('','',"/login/qrcode_exits",
                    {
                        qrcode:res.result
                    },
                    function(res){
                       if(res.success === 1){
                           wx.navigateTo({
                               url:'../confirmlogin/confirmlogin'
                           })
                       }
                       if(res.success === 0){
                           setTimeout(function () {
                               wx.showToast({
                                   title: '二维码失效',
                                   icon: 'none',
                                   duration: 2000
                               });
                           }, 500) ;//延迟时间 这里是1秒
                       }
                    });
            },
            fail: (res) => {
                wx.showToast({
                    title: '扫描失败',
                    icon: 'success',
                    duration: 2000
                });
            },
            complete: (res) => {
            }
        })
    },
    qrcodeInput:function(e){
        var that = this;
        that.setData({
            qrcode:e.detail.value
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        wx.getSystemInfo({
            success:function (res) {
                that.setData({
                    screenHeight:res.screenHeight
                })
            }
        });
        /**
         * 请求设备列表
         */
        request.postReq(searchPageNum,callbackcount,"/api/camera/getlist_forAPP", {},
            function(res){
            if(res.success === 1){
                var temp = res.data;
                temp.splice(0, 0, {code:'sign',name:'收藏列表'});
                temp.splice(0, 0, {code:'',name:'全部'});
                that.setData({
                    equipList:temp
                });
                /**
                 * 请求报警列表接口
                 */
                request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                    {
                        apptime:''
                    },
                    function(res){
                        that.setData({
                            alarmListData:res.data
                        });
                        if(that.data.alarmListData.length > 0){
                            that.setData({
                                nodata:'none'
                            });
                        }else{
                            that.setData({
                                nodata:'block'
                            });
                        }
                    });
            }
            });
    },
    bindShowMsg: function () {
        var that = this;
        this.setData({
            showModal: !that.data.showModal
        })
    },
    go: function () {
        this.setData({
            showModal: false,
            select:!this.data.select
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
        var that = this;
        /**
         * 请求设备列表
         */
        request.postReq('','',"/api/camera/getlist_forAPP", {},
            function(res){
                if(res.success === 1){
                    var temp = res.data;
                    temp.splice(0, 0, {code:'sign',name:'收藏列表'});
                    temp.splice(0, 0, {code:'',name:'全部'});
                    that.setData({
                        equipList:temp
                    });
                }
            });
        that.setData({
            text:wx.getStorageSync('companyuser'),
            searchPageNum:1
        });
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        if(that.data.selectedvalue === 'sign'){
            /**
             * 请求报警列表接口
             */
            request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                {
                    apptime:that.data.apptime,
                    ifdanger:1,
                },
                function(res){
                    that.setData({
                        alarmListData:res.data
                    });
                    if(that.data.alarmListData.length > 0){
                        that.setData({
                            nodata:'none'
                        });
                    }else{
                        that.setData({
                            nodata:'block'
                        });
                    }
                });
        }else{
            /**
             * 请求报警列表接口
             */
            request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                {
                    apptime:that.data.apptime,
                    cid:that.data.selectedvalue,
                },
                function(res){
                    that.setData({
                        alarmListData:res.data
                    });
                    if(that.data.alarmListData.length > 0){
                        that.setData({
                            nodata:'none'
                        });
                    }else{
                        that.setData({
                            nodata:'block'
                        });
                    }
                    that.setData({
                        isRefreshing: false,
                    });
                    wx.stopPullDownRefresh();
                });
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    catchtouchmove:function(){
        return;
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
            apptime:''
        });
        that.onShow();//数据请求
    },

    /**
     * 上滑加载
     */
    BottomLoad: function (condition) {
        var that = this;
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        wx.getSystemInfo({
            success:function (res) {
                that.setData({
                    screenHeight:res.screenHeight
                })
            }
        });
        /**
         * 请求报警列表接口
         */
        if(condition === 'sign'){
            request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                {
                    apptime:'',
                    ifdanger:1
                },
                function(res){
                    //判断是否有数据，有则取数据
                    if(res.data.length !== 0){
                        let searchList = [];
                        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
                        that.data.isFromSearch ? searchList=res.data : searchList=that.data.alarmListData.concat(res.data);
                        that.setData({
                            alarmListData: searchList, //获取数据数组
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
        }else{
            request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                {
                    apptime:'',
                    cid:that.data.selectedvalue,
                },
                function(res){
                    //判断是否有数据，有则取数据
                    if(res.data.length !== 0){
                        let searchList = [];
                        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
                        that.data.isFromSearch ? searchList=res.data : searchList=that.data.alarmListData.concat(res.data);
                        that.setData({
                            alarmListData: searchList, //获取数据数组
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
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        let searchPageNum = that.data.searchPageNum+1,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
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
            if(that.data.apptime === ''){
                if(that.data.selectedvalue === 'sign'){
                    var condition = 'sign';
                    that.BottomLoad(condition);
                }else{
                    that.BottomLoad();
                }
            }
            if(that.data.apptime !== ''){
                if(that.data.selectedvalue === 'sign'){
                    request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                        {
                            apptime:that.data.apptime,
                            ifdanger:1
                        },
                        function(res){
                            //判断是否有数据，有则取数据
                            if(res.data.length !== 0){
                                let searchList = [];
                                //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
                                that.data.isFromSearch ? searchList=res.data : searchList=that.data.alarmListData.concat(res.data);
                                that.setData({
                                    alarmListData: searchList, //获取数据数组
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
                }
                else {
                    request.postReq(searchPageNum,callbackcount,"/api/alarm/getlist_forAPP",
                        {
                            apptime:that.data.apptime,
                            cid:that.data.selectedvalue,
                        },
                        function(res){
                            //判断是否有数据，有则取数据
                            if(res.data.length !== 0){
                                let searchList = [];
                                //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
                                that.data.isFromSearch ? searchList=res.data : searchList=that.data.alarmListData.concat(res.data);
                                that.setData({
                                    alarmListData: searchList, //获取数据数组
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
                }
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});