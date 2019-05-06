const app = getApp();
var request = require('../../utils/request.js');
Page({
    data: {
        navigationBarTitle: '实时视频',
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        fullScreenFlag:true,
        line:'vertical',
        vidoHeight:null,
        fu: "hscreen",
        biaoji: "amplify",
    },
    onLoad: function (options) {
        var that = this;
        var eid = options.eid;
        /**
         * 请求设备详情接口
         */
        request.postReq('','',"/api/equipment/get_directvideo",
            {
                eid:eid,
            },
            function(res){
                console.log("res",res);
                if(res.success === 1){
                    request.postReq('','',"/api/smptask/getone",
                        {
                            code:res.data,
                            apptype:1
                        },
                        function(res){
                            console.log("res",res);
                            console.log("jsondata",res.data);
                            if(res.data.taskstatus === 1){
                                wx.showLoading({
                                    title: '加载中,请稍等...',
                                });
                                that.setData({
                                    eid:eid,
                                    liveaddress:'rtmp://39.108.188.75:1935/live/'+eid
                                });
                                console.log("liveaddress",that.data.liveaddress);
                            }
                            if(res.data.taskstatus === 0){
                                wx.showToast({
                                    title: '请求超时,请稍后再试......',
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        });
                }
            });
    },
    onShow:function(){

    },
    /**
     *播放状态变化事件
     */
    statechange(e) {
      if (e.detail.code === 2004){
        wx.hideLoading();
      }
      if(e.detail.code === -2301){
          wx.showToast({
              title: '网络断连，稍后请重试......',
              icon: 'none',
              duration: 2000
          });
      }
      console.log("code",e.detail.code);
    },
    /**
     * 水平竖直切换
     */
    fullScreen: function() {
        var that = this;
        //全屏
        var vidoHeight = wx.getSystemInfoSync().windowHeight;
        that.setData({
            fullScreenFlag:!that.data.fullScreenFlag
        });
        if(that.data.line === 'vertical'){
          that.setData({
              line:'horizontal',
              vidoHeight:vidoHeight,
              fu:"vscreen",
              biaoji:"narrow"
          })
        }else{
            that.setData({
                line:'vertical',
                vidoHeight:220,
                fu: "hscreen",
                biaoji: "amplify"
            })
        }
    },
});