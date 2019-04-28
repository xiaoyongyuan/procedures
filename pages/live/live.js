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
        // horizontal:'horizontal',//水平显示
        // vertical:'vertical',//竖直显示
    },
    onLoad: function () {
      var that = this;
        wx.showLoading({
            title: '加载中,请稍等...',
        });
      wx.createLivePlayerContext('player').play({
        success: res => {
          // wx.hideLoading()
            console.log("res",res);
        },
      })

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
          })
        }else{
            that.setData({
                line:'vertical',
                vidoHeight:220,
            })
        }
        console.log("line",that.data.line);
        // var fullScreenFlag = that.data.fullScreenFlag;
        // if (fullScreenFlag) {
        //     fullScreenFlag = false;
        // } else {
        //     fullScreenFlag = true;
        // }

        // if (fullScreenFlag) {
        //     //全屏
        //     that.PlayerCtx.requestFullScreen({
        //         success: res => {
        //             that.setData({
        //                 fullScreenFlag: fullScreenFlag
        //             });
        //             console.log('我要执行了');
        //         },
        //         fail: res => {
        //             console.log('fullscreen fail');
        //         }
        //     });
        //
        // } else {
        //     //缩小
        //     that.PlayerCtx.exitFullScreen({
        //         success: res => {
        //             console.log('fullscreen success');
        //             that.setData({
        //                 fullScreenFlag: fullScreenFlag
        //             });
        //         },
        //         fail: res => {
        //             console.log('exit fullscreen success');
        //         }
        //     });
        // }

    },
});