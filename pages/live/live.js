const app = getApp();
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
        biaoji: "amplify"
    },
    onLoad: function (options) {
        var that = this;
        var eid = options.eid;
        that.setData({
            eid:eid
        });
        wx.showLoading({
            title: '加载中,请稍等...',
        });
    },
    onShow:function(){

    },
    /**
     *播放状态变化事件
     */
    statechange(e) {
      if (e.detail.code === 2007){
        wx.hideLoading();
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