const app = getApp()

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
    //返回
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    //扫一扫
    clicks: function (event) {
          var that = this;
          wx.scanCode({
              success: (res) => {
                  this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
                  that.setData({
                      show: this.show
                  })
                  wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 2000
                  })
              },
              fail: (res) => {
                  wx.showToast({
                      title: '失败',
                      icon: 'success',
                      duration: 2000
                  })
              },
              complete: (res) => {
              }
          })
      },

  }
})
