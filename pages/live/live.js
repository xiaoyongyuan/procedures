Page({
  data: {
    navigationBarTitle: '实时视频'
  },
onShow(){
  wx.showLoading({
    title: '加载中',
  });
},
  onLoad: function () {
    var that = this;
    wx.createLivePlayerContext('player').play({
      success: res => {
        // wx.hideLoading()
      },
    })
   
  },

 
  statechange(e) {
   
    console.log('live-player code:', e.detail.code)
    if (e.detail.code==2007){
      wx.hideLoading();
    }
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
   bindPlay() {
    this.ctx.play({
      success: res => {
        wx.hideLoading();
        console.log('play success')
      },
      fail: res => {
        console.log('play fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },




  
})