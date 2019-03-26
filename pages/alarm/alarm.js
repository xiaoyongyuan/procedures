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
        alarmListData: [],
        equipList:[],
        scanresult:'',
        nodata:'none',
        apptime:'',
        isload:false,
        reset:false
    },
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
                    // account:'17792542304',
                    account:'18210812953',
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
                    // account:'17792542304',2019-03-25 18:39
                    account:'18210812953',
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
                        account:'18210812953',
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
                        // account:'17792542304',2019-03-25 18:39
                        account:'18210812953',
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
                    account:'18210812953',
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
                    // account:'17792542304',2019-03-25 18:39
                    account:'18210812953',
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
        //获取报警截止时间
        var apptime = that.data.apptime;
        //获取下拉框的值
        var selectedvalue = that.data.selectedvalue;
        wx.navigateTo({
            url:'../alarmdetail/alarmdetail?code=' + code + '&apptime=' + apptime + '&selectedvalue=' + selectedvalue
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
                account:'18210812953',
                // account:'17792542304',
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
                // account:'17792542304',
                account:'18210812953',
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
                        // account:'17792542304',
                        account:'18210812953',
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
        console.log("我显示啦");
        if(that.data.selectedvalue === 'sign'){
            /**
             * 请求报警列表接口
             */
            request.postReq("/api/alarm/getlist_forAPP",
                {
                    // account:'17792542304',
                    account:'18210812953',
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
                    // account:'17792542304',2019-03-25 18:39
                    account:'18210812953',
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