const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'设防时间',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        checkboxItems: [
            {name: '工作日', value: '0'},
            {name: '周末', value: '1'},
            {name: '每天', value: '2'}
        ],
        workingtimelist:[],
        items: [
            { name: '工作日', value: '0' },
            { name: '周末', value: '1' },
            { name: '每天', value: '2' }
        ],
        radiolist:'none',
        selecttime:'none',
        array: ['0:00', '1:00', '2:00', '3:00','4:00', '5:00', '6:00', '7:00','8:00', '9:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00','21:00', '22:00', '23:00', '24:00'],
    },
    bindPickerChangestrat(e) {
        var that = this;
        console.log('开始时间', e);
        console.log('picker发送选择改变，携带值为', e.detail.value);
        console.log("that.data.starttime",that.data.starttime);
        this.setData({
            starttime: e.detail.value
        })
        console.log("that.data.starttime",that.data.starttime);
    },
    bindPickerChangeend(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            endtime: e.detail.value
        })
    },
    checkboxChange: function (e) {
        console.log('checkbox发生chang事件', e.detail.value)
    },
    //页面跳转图表查看
    changeTofortifytimeEchart:function(){
        wx.navigateTo({
            url:'../fortifytimeEchart/fortifytimeEchart'
        })
    },
    switch1Change(e) {
        console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    },
    radioChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].value == values[j]){
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var code = options.code;
        that.setData({
            currentcode:code
        });
        /**
         * 请求列表接口
         */
        request.postReq("/api/workingtime/getlist",
            {
                cid:code,
            },
            function(res){
                that.setData({
                    workingtimelist:res.data
                })
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})