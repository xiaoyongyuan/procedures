const app = getApp();
var request = require('../../utils/request.js');
var times = 0;
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
        that.setData({
           eid:eid
        });
        times = 0;
        /**
         * 请求设备详情接口
         */
        request.postReq('','',"/api/equipment/get_directvideo",
            {
                eid:eid,
            },
            function(res){
                if(res.success === 1){

                    that.setData({
                        taskid:res.data
                    });
                    that.getone();
                }
            });
    },

    getone: function () {
        var that = this;
        request.postReq2('','',"/api/smptask/getone",
            {
                code:that.data.taskid,
                apptype:1,
            },
            function(res){
                if(res.data.taskstatus === 0){
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
                    wx.showLoading({
                        title: '加载中,请稍等...',
                    });
                    that.setData({
                        eid:that.data.eid,
                        liveaddress:'rtmp://39.108.188.75:1935/live/'+that.data.eid
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