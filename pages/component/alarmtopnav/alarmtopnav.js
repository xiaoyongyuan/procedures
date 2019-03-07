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
    //扫一扫
    click: function (event) {
        var that = this;
        var show;
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

  onLoad: function (options) {
      // var that = this
      // wx.getSystemInfo({
      //     success: function (res) {
      //         that.globalData.platform = res.platform
      //         let totalTopHeight = 68
      //         if (res.model.indexOf('iPhone X') !== -1) {
      //             totalTopHeight = 88
      //         } else if (res.model.indexOf('iPhone') !== -1) {
      //             totalTopHeight = 64
      //         }
      //         that.globalData.statusBarHeight = res.statusBarHeight
      //         that.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
      //     },
      //     failure() {
      //         that.globalData.statusBarHeight = 0
      //         that.globalData.titleBarHeight = 0
      //     }
      // })
   },

  methods: {
    backHome: function () {
      wx.reLaunch({
        url: '../index/index',
      })
    },
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
