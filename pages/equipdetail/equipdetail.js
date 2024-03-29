// pages/equipdetail/equipdetail.js
const app = getApp();
var request = require('../../utils/request.js');
const util = require('../../utils/util.js');
var isLock = false;  //定义全局变量
var times = 0;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        text:'设备详情',
        back: {
            type: Boolean,
            value: false
        },
        // list传过来的详情
        equipdetailData:{},
        logintime:'',
        querybtn:false
    },
    /**
     * 返回上一页
     */
    back: function () {
        var that = this;
        wx.navigateBack({
            delta: 1
        });

    },
    /**
     * 刷新
     */
    flush: function(){
        var that = this;
        var flushcode = that.data.currentcode;
        /**
         * 请求设备详情接口
         */

        request.postReq('','',"/api/camera/getone",
            {
                code:flushcode
            },
            function(res){
                that.setData({
                    equipdetailData:res.data,
                    workingtime:res.workingtime.length,
                    upgrade:res.upgrade,
                    field:res.data.field,
                });
                if(res.heartdata !== ''){
                    that.setData({
                        lastheart:res.heartdata.time,
                        temp:res.heartdata.temp,
                        status:res.heartdata.status,
                    })
                }
                if(res.login.length !== 0){
                    that.setData({
                        logintime:res.login.time,
                        softversion:res.login.version,
                    })
                }
                wx.showToast({
                    title: '刷新成功',
                    icon: 'success',
                    duration: 2000
                });
            })
    },
    /**
     * 长按事件
     */
    longTap:function(e){
        var that = this;
        that.setData({
            querybtn:true
        });
    },
    /**
     * 页面跳转设置信息
     */
    changeTosettinginfo:function(){
        var that = this;
        var currentcode = that.data.currentcode;
        if(that.data.ismist === "false"){
            wx.showToast({
                title: '设备离线，无法操作！',
                icon: 'none',
                duration: 2000
            });
        }
        if(that.data.ismist === "true"){
            wx.navigateTo({
                        url:'../equipdetailsettinginfo/equipdetailsettinginfo?currentcode=' + currentcode
                    })
        }
    },
    /**
     * 页面跳转防区设置
     */
    changeTodefenceareasetting:function(){
        var that = this;
        const fieldStr = JSON.stringify(that.data.field);
        const eid = that.data.equipdetailData.eid;
        if(that.data.ismist === "false"){
            wx.showToast({
                title: '设备离线，无法操作！',
                icon: 'none',
                duration: 2000
            });
        }
        if(that.data.ismist === "true"){
            wx.navigateTo({
                url:'../defenceareasetting/defenceareasetting?fieldStr=' + fieldStr + '&currentcode=' + that.data.currentcode +'&eid='+ eid
            })
        }
    },
    // 跳到直播
    test: function () {
        wx.showToast({
            title: '暂未开放，敬请期待！',
            icon: 'none',
            duration: 2000
        });
        // var that = this;
        // const eid = that.data.equipdetailData.eid;
        // if(that.data.ismist === "false"){
        //     wx.showToast({
        //         title: '设备离线，无法操作！',
        //         icon: 'none',
        //         duration: 2000
        //     });
        // }
        // if(that.data.ismist === "true"){
        //     wx.navigateTo({
        //         url: '../live/live?eid=' + eid
        //     })
        // }
    },

    /**
     * 页面跳转设防时间
     */
    changeTofortifytime:function(){
        var that = this;
        if(that.data.ismist === "false"){
            wx.showToast({
                title: '设备离线，无法操作！',
                icon: 'none',
                duration: 2000
            });
        }
        if(that.data.ismist === "true"){
            wx.navigateTo({
                url:'../fortifytime/fortifytime?code=' + that.data.currentcode
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that= this;
        //当前时间
        var ctime = util.formatTime(new Date());
        //接收code
        var code = options.code;
        //接收设备是否离线
        var ismist = options.mist;
        that.setData({
            currentcode:code,
            ismist:ismist
        });
        /**
         * 请求设备详情接口
         */

        request.postReq('','',"/api/camera/getone",
            {
                code:code
            },
            function(res){
                that.setData({
                    equipdetailData:res.data,
                    workingtime:res.workingtime.length,
                    upgrade:res.upgrade,
                    field:res.data.field,
                });
                if(res.heartdata !== ''){
                    that.setData({
                        lastheart:res.heartdata.time,
                        temp:res.heartdata.temp,
                        status:res.heartdata.status,
                    })
                }
                if(res.login.length !== 0){
                    that.setData({
                        logintime:res.login.time,
                        softversion:res.login.version,
                    })
                }
                var currenttime = new Date(ctime);
                //两个时间相差的分钟数
                var  mislastheart =  parseInt(currenttime - new Date(that.data.lastheart))/ 1000 / 60;
                var  mislasttime = parseInt(currenttime - new Date(that.data.equipdetailData.lasttime))/ 1000 / 60;
                if(mislastheart > 1 && mislasttime > 1){
                    that.setData({
                        isonline:false
                    })
                }else {
                    that.setData({
                        isonline:true
                    })
                }
            })
    },
    /**
     * 设备闪灯
     */
    equiplight:function(options){
        var that = this;
        request.postReq('','',"/api/equipment/FlashLampV1",
            {
                eid:that.data.equipdetailData.eid
            },
            function(res){
                wx.showToast({
                    title: '请求成功',
                    icon: 'success',
                    duration: 2000
                })
            })
    },
    /**
     * 长按设备详情
     */
    equipdetail:function(){
        var that = this;
        times = 0;
        // 按钮点击事件:
        if(isLock)
        {
            wx.showToast({
                title: '操作频繁,请稍后再试......',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        /**
         * 请求设备详情接口
         */
        request.postReq2('','',"/api/equipment/get_equipmentinfo",
            {
                eid:that.data.equipdetailData.eid,
                cid:that.data.currentcode,
                apptype:1
            },
            function(res){
                if(res.success === 1){
                    that.setData({
                        taskid:res.data
                    });
                    that.getone();
                }
            });
        isLock = true;
        setTimeout(function (){
            isLock = false;
        },15000);
    },

    getone: function () {
        var that = this;
        request.postReq2('','',"/api/smptask/getone",
            {
                code:that.data.taskid,
                apptype:1,
            },
            function(res){
                if(res.success === 1){
                    if(res.data.taskstatus === 0 ){
                        if(times<120){
                            that.getone();
                            times++;
                        }else{
                            wx.hideLoading();
                            wx.showToast({
                                title: '请求超时,请稍后重试......',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    }
                    if(res.data.taskstatus === 1){
                        const jsondata = JSON.stringify(res.data.taskresult);
                        console.log("jsondata",jsondata);
                        wx.hideLoading();
                        wx.navigateTo({
                            url:'../taskequipdetail/taskequipdetail?jsondata=' + jsondata
                        });
                    }
                }
            });
    },







    // equipdetail:function(){
    //     var that = this;
    //     /**
    //      * 请求设备详情接口
    //      */
    //     request.postReq('','',"/api/equipment/get_equipmentinfo",
    //         {
    //             eid:that.data.equipdetailData.eid,
    //             cid:that.data.currentcode,
    //             apptype:1
    //         },
    //         function(res){
    //             if(res.success === 1){
    //                 request.postReq('','',"/api/smptask/getone",
    //                     {
    //                         code:res.data,
    //                         apptype:1
    //                     },
    //                     function(res){
    //                         const jsondata = JSON.stringify(res.data.taskresult);
    //                         if(res.data.taskstatus === 0){
    //                             wx.showToast({
    //                                 title: '请求超时,请稍后再试......',
    //                                 icon: 'none',
    //                                 duration: 2000
    //                             });
    //                         }
    //                         if(res.data.taskstatus === 1){
    //                             wx.navigateTo({
    //                                 url:'../taskequipdetail/taskequipdetail?jsondata=' + jsondata
    //                             })
    //                         }
    //                     });
    //             }
    //         });
    // },
    /**
     * 恢复出厂设置
     */
    restore:function(){
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确认恢复出厂设置吗？',
            success(res) {
                if(res.confirm){
                    request.postReq('','',"/api/equipment/restore_e",
                        {
                            eid:that.data.equipdetailData.eid
                        },
                        function(res){
                        console.log("res重置",res);
                        if(res.success === 1){
                            that.onShow();
                        }
                            wx.showToast({
                                title: '重置成功',
                                icon: 'success',
                                duration: 2000
                            })
                        })
                }
                else if (res.cancel)
                {

                }
            }
        });
    },
    /**
     * 重启设备
     */
    deviceEquip:function(){
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确认重启设备吗？',
            success(res) {
                if(res.confirm){
                    request.postReq('','',"/api/equipment/restart_e",
                        {
                            eid:that.data.equipdetailData.eid
                        },
                        function(res){
                            wx.showToast({
                                title: '恢复成功',
                                icon: 'success',
                                duration: 2000
                            })
                        })
                }
                else if (res.cancel)
                {}
            }
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
        var that = this;
        that.setData({
            querybtn:false
        });
        //当前时间
        var ctime = util.formatTime(new Date());
        /**
         * 请求设备详情接口
         */

        request.postReq('','',"/api/camera/getone",
            {
                code:that.data.currentcode
            },
            function(res){
                that.setData({
                    equipdetailData:res.data,
                    workingtime:res.workingtime.length,
                    upgrade:res.upgrade,
                    field:res.data.field,
                });
                if(res.heartdata !== ''){
                    that.setData({
                        lastheart:res.heartdata.time,
                        temp:res.heartdata.temp,
                        status:res.heartdata.status,
                    })
                }
                if(res.login.length !== 0){
                    that.setData({
                        logintime:res.login.time,
                        softversion:res.login.version,
                    })
                }
                var currenttime = new Date(ctime);
                //两个时间相差的分钟数
                var  mislastheart =  parseInt(currenttime - new Date(that.data.lastheart))/ 1000 / 60;
                var  mislasttime = parseInt(currenttime - new Date(that.data.equipdetailData.lasttime))/ 1000 / 60;
                if(mislastheart > 1 && mislasttime > 1){
                    that.setData({
                        isonline:false
                    })
                }else {
                    that.setData({
                        isonline:true
                    })
                }
            })
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