const app = getApp();
var request = require('../../utils/request.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        title:'个人中心',
        showModal: false,
        showModalalarm:false,
        showModSF:false,
        showModCF:false,
        showModHF:false,
        showModalHC:false,
        alarmequiplist: [],
        SFequiplist:[],
        SFselseequip:[],
        SFselseequipStr:'',
        CFequiplist:[],
        CFselseequip:[],
        CFselseequipStr:'',
        HFequiplist:[],
        HFselseequip:[],
        HFselseequipStr:''
    },
    submit: function () {
        this.setData({
            showModal: true,
            showModalHC:true
        })
    },
    preventTouchMove: function () {

    },
    go: function () {
        this.setData({
            showModal: false,
            showModalalarm: false,
            showModalHC:false,
            showModSF:false,
            showModCF:false,
            showModHF:false,
            keyalarmcid:''
        })
    },
    alarmselect:function(e){
        var that = this;
        for(var i=0;i<that.data.alarmequiplist.length;i++){
            that.data.alarmequiplist[i]['isselect']=false;
        }
        that.setData({
            alarmequiplist:that.data.alarmequiplist
        });
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        that.data.alarmequiplist[Id]['isselect']=true;
        that.setData({
            alarmequiplist:that.data.alarmequiplist,
            keyalarmcid:that.data.alarmequiplist[Id]['code']
        });
    },
    /**
     *设防选择
     */
    keySFselect:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        var SFselseequip = that.data.SFselseequip;
        var isselect = that.data.SFequiplist[Id]['isselect'];
        that.data.SFequiplist[Id]['isselect']=!isselect;
        that.setData({
            SFequiplist:that.data.SFequiplist,
        });
        if(that.data.SFequiplist[Id]['isselect'] === true){
            SFselseequip.push(that.data.SFequiplist[Id]['code']);
        }
        if(that.data.SFequiplist[Id]['isselect'] === false){
            SFselseequip.splice(that.data.SFequiplist[Id],1);
        }
        that.setData({
            SFselseequipStr:SFselseequip.join(',')
        });
    },
    /**
     *撤防选择
     */
    keyCFselect:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        var CFselseequip = that.data.CFselseequip;
        var isselect = that.data.CFequiplist[Id]['isselect'];
        that.data.CFequiplist[Id]['isselect']=!isselect;
        that.setData({
            CFequiplist:that.data.CFequiplist,
        });
        if(that.data.CFequiplist[Id]['isselect'] === true){
            CFselseequip.push(that.data.CFequiplist[Id]['code']);
        }
        if(that.data.CFequiplist[Id]['isselect'] === false){
            CFselseequip.splice(that.data.CFequiplist[Id],1);
        }
        that.setData({
            CFselseequipStr:CFselseequip.join(',')
        });
    },
    /**
     *恢复选择
     */
    keyHFselect:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        var HFselseequip = that.data.HFselseequip;
        var isselect = that.data.HFequiplist[Id]['isselect'];
        that.data.HFequiplist[Id]['isselect']=!isselect;
        that.setData({
            HFequiplist:that.data.HFequiplist,
        });
        if(that.data.HFequiplist[Id]['isselect'] === true){
            HFselseequip.push(that.data.HFequiplist[Id]['code']);
        }
        if(that.data.HFequiplist[Id]['isselect'] === false){
            HFselseequip.splice(that.data.HFequiplist[Id],1);
        }
        that.setData({
            HFselseequipStr:HFselseequip.join(',')
        });
    },
    /**
     * 清除缓存
     */
    openToast: function () {
        this.setData({
            showModal: false,
            showModalHC:false,
            currentSize:0,
        });
        wx.showToast({
            title: '清除成功！',
            icon: 'success',
            duration: 2000
        });
    },
    /**
     * 一键报警设备
     */
    keyalarm:function(){
        this.setData({
            showModalalarm: true,
            showModal:true
        });
        var that = this;
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/camera/getlist_working",
            {
                alarm:1
            },
            function(res){
                that.setData({
                    alarmequiplist:res.data,
                });
                for(var i = 0;i<res.data.length;i++){
                    that.data.alarmequiplist[i]['isselect']=false;
                    that.setData({
                        alarmequiplist:that.data.alarmequiplist
                    })
                }
            });
    },
    /**
     * 一键设防设备
     */
    keySF:function(){
        var that = this;
        that.setData({
            showModal:true,
            showModSF:true,
            SFselseequip:[]
        });
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/camera/getlist_working",
            {
                if_cancel:1
            },
            function(res){
                that.setData({
                    SFequiplist:res.data,
                });
                for(var i = 0;i<res.data.length;i++){
                    that.data.SFequiplist[i]['isselect']=false;
                    that.setData({
                        SFequiplist:that.data.SFequiplist
                    })
                }
            });
    },
    /**
     * 一键撤防设备
     */
    keyCF:function(){
        var that = this;
        that.setData({
            showModal:true,
            showModCF:true,
            CFselseequip:[]
        });
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/camera/getlist_working",
            {
                if_cancel:2
            },
            function(res){
                that.setData({
                    CFequiplist:res.data,
                });
                for(var i = 0;i<res.data.length;i++){
                    that.data.CFequiplist[i]['isselect']=false;
                    that.setData({
                        CFequiplist:that.data.CFequiplist
                    })
                }
            });
    },
    /**
     * 一键恢复设备
     */
    keyHF:function(){
        var that = this;
        that.setData({
            showModal:true,
            showModHF:true,
            HFselseequip:[]
        });
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/camera/getlist_working",
            {
                if_cancel:0
            },
            function(res){
                that.setData({
                    HFequiplist:res.data,
                });
                for(var i = 0;i<res.data.length;i++){
                    that.data.HFequiplist[i]['isselect']=false;
                    that.setData({
                        HFequiplist:that.data.HFequiplist
                    })
                }
            });
    },
    /**
     * 一键报警确认
     */
    surekeyalarm:function(){
        var that = this;
        if(that.data.keyalarmcid === undefined ||  that.data.keyalarmcid ===''){
            wx.showToast({
                title: '请选择设备！',
                icon: 'none',
                duration: 2000
            });
            return
        }
        if(that.data.keyalarmcid !== undefined &&  that.data.keyalarmcid !==''){
            this.setData({
                showModalalarm: false,
                showModal:false
            });
            /**
             * 一键报警接口
             */
            request.postReq('','',"/api/alarm/givealarm",
                {
                    cid:that.data.keyalarmcid
                },
                function(res){
                    if(res.success === 1){
                        wx.showToast({
                            title: '操作成功！',
                            icon: 'success',
                            duration: 2000
                        });
                    }
                    that.setData({
                        keyalarmcid:''
                    });
                });
        }
    },
    /**
     * 一键设防确认
     */
    surekeySF:function(){
        var that = this;
        if(that.data.SFselseequipStr === undefined ||  that.data.SFselseequipStr ===''){
            wx.showToast({
                title: '请选择设备！',
                icon: 'none',
                duration: 2000
            });
            return
        }
        if(that.data.SFselseequipStr !== undefined &&  that.data.SFselseequipStr !==''){
            this.setData({
                showModSF: false,
                showModal:false
            });
            /**
             * 一键设防接口
             */
            request.postReq('','',"/iosapi/camera/setdefense",
                {
                    cid:that.data.SFselseequipStr,
                    if_cancel:1
                },
                function(res){
                    if(res.success === 1){
                        wx.showToast({
                            title: '提交成功！',
                            icon: 'success',
                            duration: 2000
                        });
                    }
                    that.setData({
                        SFselseequipStr:''
                    });
                });
        }
    },
    /**
     * 一键撤防确认
     */
    surekeyCF:function(){
        var that = this;
        if(that.data.CFselseequipStr === undefined ||  that.data.CFselseequipStr ===''){
            wx.showToast({
                title: '请选择设备！',
                icon: 'none',
                duration: 2000
            });
            return
        }
        if(that.data.CFselseequipStr !== undefined &&  that.data.CFselseequipStr !==''){
            this.setData({
                showModCF: false,
                showModal:false
            });
            /**
             * 一键撤防接口
             */
            request.postReq('','',"/iosapi/camera/setdefense",
                {
                    cid:that.data.CFselseequipStr,
                    if_cancel:2
                },
                function(res){
                    if(res.success === 1){
                        wx.showToast({
                            title: '提交成功！',
                            icon: 'success',
                            duration: 2000
                        });
                    }
                    that.setData({
                        CFselseequipStr:''
                    });
                });
        }
    },
    /**
     * 一键恢复确认
     */
    surekeyHF:function(){
        var that = this;
        if(that.data.HFselseequipStr === undefined ||  that.data.HFselseequipStr ===''){
            wx.showToast({
                title: '请选择设备！',
                icon: 'none',
                duration: 2000
            });
            return
        }
        if(that.data.HFselseequipStr !== undefined &&  that.data.HFselseequipStr !==''){
            this.setData({
                showModHF: false,
                showModal:false
            });
            /**
             * 一键恢复接口
             */
            request.postReq('','',"/iosapi/camera/setdefense",
                {
                    cid:that.data.HFselseequipStr,
                    if_cancel:0
                },
                function(res){
                    if(res.success === 1){
                        wx.showToast({
                            title: '提交成功！',
                            icon: 'success',
                            duration: 2000
                        });
                    }
                    that.setData({
                        HFselseequipStr:''
                    });
                });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/user/getone",
            {},
            function(res){
              that.setData({
                  workdate:res.data.workdate,
                  acount:res.data.acount,
                  ecount:res.data.ecount
              });
            });
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
    onShow: function () {
        var that = this;
        that.setData({
            workdate:wx.getStorageSync("workdate"),
            realname:wx.getStorageSync("companyuser")
        });
        wx.setNavigationBarTitle({
            title: '个人中心'
        });
        var that = this;
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/user/getone",
            {},
            function(res){
                that.setData({
                    workdate:res.data.workdate,
                    acount:res.data.acount,
                    ecount:res.data.ecount
                });
            });
        wx.getStorageInfo({
            success(res) {
                that.setData({
                    currentSize: res.currentSize
                });
            }
        })
    },
    about: function (e) {
        wx.showModal({
            title: '提示',
            content: app.globalData.about || '',
            showCancel: false
        });
    }
});
