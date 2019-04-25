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
        showModalHC:false,
        alarmequiplist: [],
        SFequiplist:[],
        items: [
            {name: 'USA', value: '美国'},
            {name: 'CHN', value: '中国', checked: 'true'},
            {name: 'BRA', value: '巴西'},
            {name: 'JPN', value: '日本'},
            {name: 'ENG', value: '英国'},
            {name: 'TUR', value: '法国'},
        ]
    },
    submit: function () {
        this.setData({
            showModal: true,
            showModalHC:true
        })
    },
    checkboxChange(e) {
        var that = this;
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
        that.setData({
            keySFcid:e.detail.value
        });
        console.log("keySFcid",that.data.keySFcid.join(','));
    },
    radioChange(e) {
        var that = this;
        console.log('radio发生change事件，携带value值为：', e.detail.value);
        that.setData({
            keyalarmcid:e.detail.value
        });

    },
    preventTouchMove: function () {

    },
    go: function () {
        this.setData({
            showModal: false,
            showModalalarm: false,
            showModalHC:false,
            showModSF:false,
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
        console.log("ID",Id);
        // var isselect = that.data.alarmequiplist[Id].isselect;
        // console.log("isselect",isselect);
        that.data.alarmequiplist[Id]['isselect']=true;
        console.log("that.data.alarmequiplist[Id]['isselect']",that.data.alarmequiplist[Id]['isselect']);
        that.setData({
            alarmequiplist:that.data.alarmequiplist,
            keyalarmcid:that.data.alarmequiplist[Id]['code']
        });
        console.log("keyalarmcid",that.data.keyalarmcid);
        console.log("alarmequiplist",that.data.alarmequiplist);
    },
    /**
     * 清除缓存
     */
    openToast: function () {
        wx.clearStorageSync();
        wx.clearStorage();
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
        console.log("keyalarmcid",that.data.keyalarmcid);
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/camera/getlist_working",
            {
                alarm:1
            },
            function(res){
            console.log("res",res);
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
            showModSF:true
        });
        var that = this;
        console.log("keySFcid",that.data.keySFcid);
        /**
         * 请求设备列表接口
         */
        request.postReq('','',"/api/camera/getlist_working",
            {
                if_cancel:1
            },
            function(res){
                console.log("res",res);
                that.setData({
                    SFequiplist:res.data,
                });
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
                    console.log("res",res);
                    if(res.success === 1){
                        wx.showToast({
                            title: '一键报警成功！',
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
        console.log("keySFcid",that.data.keySFcid);
        if(that.data.keySFcid === undefined ||  that.data.keySFcid ===''){
            wx.showToast({
                title: '请选择设备！',
                icon: 'none',
                duration: 2000
            });
            return
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
        // console.log("测试切换公司2",that.data.realname);
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
