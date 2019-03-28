var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'树莓派企业测试账户1',
        select: false,
        selected: '全部',
        selectedvalue:'',
        showModal: false,
        text:'树莓派企业测试账户1',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        alarmListData: [],//放置返回数据的数组
        isFromSearch: true,   // 用于判断alarmListData数组是不是空数组，默认true，空的数组
        searchPageNum: 1,   // 设置加载的第几次，默认是第一次
        callbackcount: 8,      //返回数据的个数
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏
        searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
        equipList:[],
        scanresult:'',
        nodata:'none',
        apptime:'',
        isload:false,
        reset:false,
    },
    //搜索，访问网络
    // fetchSearchList: function () {
    //     let that = this;
    //      let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
    //          callbackcount = that.data.callbackcount; //返回数据的个数
    //     //访问网络
    //     request.postReq(searchPageNum, callbackcount,"/api/alarm/getlist_forAPP",
    //         {
    //             // account:'17792542304',
    //             apptime:''
    //         },
    //         function (res) {
    //         console.log(data);
    //         //判断是否有数据，有则取数据
    //         if (res.data.song.curnum != 0) {
    //             let searchList = [];
    //             //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
    //             that.data.isFromSearch ? searchList = data.data.song.list : searchList = that.data.searchSongList.concat(data.data.song.list)
    //             that.setData({
    //                 searchSongList: searchList, //获取数据数组
    //                 zhida: data.data.zhida, //存放歌手属性的对象
    //                 searchLoading: true   //把"上拉加载"的变量设为false，显示
    //             });
    //             //没有数据了，把“没有数据”显示，把“上拉加载”隐藏
    //         } else {
    //             that.setData({
    //                 searchLoadingComplete: true, //把“没有数据”设为true，显示
    //                 searchLoading: false  //把"上拉加载"的变量设为false，隐藏
    //             });
    //         }
    //     });
    // },
    /**
     * 重置查询时间
     */
    reset:function(){
        var that = this;
        that.setData({
            reset:false,
            apptime:''
        });
        if(that.data.selectedvalue === 'sign'){
            /**
             * 请求报警列表接口
             */
            request.postReq("/api/alarm/getlist_forAPP",
                {
                    account:'17792542304',
                    // account:app.globalData.account,
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
            request.postReq("/api/alarm/getlist_forAPP",
                {
                    account:'17792542304',
                    // account:app.globalData.account,
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
            apptime: e.detail.dateString
        });
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
                request.postReq("/api/alarm/getlist_forAPP",
                    {
                        // account:'17792542304',
                        account:app.globalData.account,
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
                request.postReq("/api/alarm/getlist_forAPP",
                    {
                        // account:'17792542304',
                        account:app.globalData.account,
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
        this.setData({
            selected: name,
            selectedvalue:value,
            select: false
        });
        if(value === 'sign'){
            /**
             * 请求报警列表接口
             */
            request.postReq("/api/alarm/getlist_forAPP",
                {
                    // account:'17792542304',
                    account:app.globalData.account,
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
            request.postReq("/api/alarm/getlist_forAPP",
                {
                    // account:'17792542304',
                    account:app.globalData.account,
                    apptime:that.data.apptime,
                    cid:value,
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
    /**
     * 跳转报警详情页
     */
    changeToalarmdetail:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        //获取当前点击元素的属性值。selectedvalue apptime
        var code = that.data.alarmListData[Id].code;
        wx.navigateTo({
            url:'../alarmdetail/alarmdetail?code=' + code
        });
    },

    /** 监听tab切换 */
    onTabItemTap(item){
        var that = this;
        this.setData({
            scanresult:''
        });
        request.postReq("/api/alarm/getlist_forAPP",
            {
                // account:app.globalData.account,
                account:'17792542304',
                apptime:that.data.apptime
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
                })
                wx.showToast({
                    title: '扫描成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail: (res) => {
                wx.showToast({
                    title: '扫描失败',
                    icon: 'success',
                    duration: 2000
                })
            },
            complete: (res) => {
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
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
        request.postReq("/api/camera/getlist_forAPP",
            {
                account:'17792542304',
                // account:app.globalData.account,
            },
            function(res){
                var temp = res.data;
                temp.unshift({code:'',name:'全部'},{code:'sign',name:'收藏列表'});
                that.setData({
                    equipList:temp
                });
                /**
                 * 请求报警列表接口
                 */
                request.postReq("/api/alarm/getlist_forAPP",
                    {
                        account:'17792542304',
                        // account:app.globalData.account,
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
        if(that.data.selectedvalue === 'sign'){
            /**
             * 请求报警列表接口
             */
            request.postReq("/api/alarm/getlist_forAPP",
                {
                    account:'17792542304',
                    // account:app.globalData.account,
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
            request.postReq("/api/alarm/getlist_forAPP",
                {
                    account:'17792542304',
                    // account:app.globalData.account,
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