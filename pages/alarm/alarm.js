var dateTimePicker = require('../../utils/dateTimePicker.js');
const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'树莓派企业测试账户1',
        date: '2018-10-01',
        time: '12:00',
        dateTimeArray: null,
        dateTime: null,
        dateTimeArray1: null,
        dateTime1: null,
        startYear: 2000,
        endYear: 2050,
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
        nodata:'none'
    },
    /**
     * 下拉框选择
     */
    mySelect(e) {
        var that = this;
        console.log("e",e);
        var name = e.currentTarget.dataset.name;
        var value = e.currentTarget.dataset.value;
        this.setData({
            selected: name,
            selectedvalue:value,
            select: false
        })
        console.log("value",that.data.selectedvalue);
        if(value === 'sign'){
            /**
             * 请求报警列表接口
             */

            request.postReq("/api/alarm/getlist_forAPP",
                {
                    // account:'17792542304',
                    account:'18210812953',
                    apptime:'2019-03-21 17:13',
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
                    account:'18210812953',
                    apptime:'2019-03-21 17:13',
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
        //获取当前点击元素的属性值。
        var code = that.data.alarmListData[Id].code;
        wx.navigateTo({
            url:'../alarmdetail/alarmdetail?code=' + code
        })
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
                apptime:'2019-03-21 17:13'
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
        })
        /**
         * 请求列表接口
         */

        request.postReq("/api/alarm/getlist_forAPP",
            {
                // account:'17792542304',
                account:'18210812953',
                apptime:'2019-03-21 17:13'
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
        /**
         * 请求设备列表
         */
        request.postReq("/api/camera/getlist_forAPP",
            {
                // account:'17792542304',
                account:'18210812953',
            },
            function(res){
                console.log("res",res.data);
                // for(var i = 0;i < res.data.length;i++){
                //     that.data.equipList.push(res.data[i].name);
                // }
                // that.data.equipList.unshift("全部","收藏列表");

                var temp = res.data;
                temp.unshift({code:'',name:'全部'},{code:'sign',name:'收藏列表'});
                that.setData({
                    equipList:temp
                });

                console.log("equipList",that.data.equipList);
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