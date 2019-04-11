const app = getApp();
var request = require('../../../utils/request.js');

Component({

    properties: {
        text: {
            type: String,
            value: 'Wechat'
        },
        back: {
            type: Boolean,
            value: false
        },
        home: {
            type: Boolean,
            value: false
        }
    },

    data: {
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        }
    },
    onLoad: function (options) {

    },

    methods: {
        back: function () {
            wx.navigateBack({
                delta: 1
            });
        },
        aa: function(){
            var that = this;
            var flushcode = wx.getStorageSync("flushcode");
            console.log("flushcode",flushcode);
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
                    // var currenttime = new Date(ctime);
                    //两个时间相差的分钟数
                    // var  mislastheart =  parseInt(currenttime - new Date(that.data.lastheart))/ 1000 / 60;
                    // var  mislasttime = parseInt(currenttime - new Date(that.data.equipdetailData.lasttime))/ 1000 / 60;
                    // if(mislastheart > 1 && mislasttime > 1){
                    //     that.setData({
                    //         isonline:false
                    //     })
                    // }else {
                    //     that.setData({
                    //         isonline:true
                    //     })
                    // }
                })
        },
    }
});
