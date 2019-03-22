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
        RadioItems: [
            {name: '工作日', value: 'weekday'},
            {name: '周末', value: 'playday'},
            {name: '每天', value: 'today'}
        ],
        workingtimelist:[],
        text:'设防时间',
        back: {
            type: Boolean,
            value: false
        },
        radiolist:'none',
        selecttime:'none',
        addlist:true,
        array: ['0:00', '1:00', '2:00', '3:00','4:00', '5:00', '6:00', '7:00','8:00', '9:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00','21:00', '22:00', '23:00', '24:00'],
    },
    /**
     *开始时间
     */
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
    /**
     *截止时间
     */
    bindPickerChangeend(e) {
        var that = this;
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            endtime: e.detail.value
        })
        console.log("that.data.endtime",that.data.endtime);
    },
    /**
     *单选按钮
     */
    checkboxChange: function (e) {
        var that = this;
        that.setData({
            wtype:e.detail.value
        });
        // wtype
        console.log('checkbox发生chang事件', e.detail.value);
    },
    //页面跳转图表查看
    changeTofortifytimeEchart:function(){
        wx.navigateTo({
            url:'../fortifytimeEchart/fortifytimeEchart'
        })
    },
    /**
     * 添加列表
     */
    addlist:function(){
        var that = this;
        that.setData({
            addlist:false,
            radiolist:'block',
            selecttime:'block'
        });
    },
    /**
     * 返回上一页
     */
    back: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     *保存提交
     */
    savelist:function(){
        var that = this;
        console.log("kaishi",that.data.starttime);
        console.log("jiezhi",that.data.endtime);
        if((that.data.starttime === undefined || that.data.starttime === '') || (that.data.endtime === undefined || that.data.endtime === '')){
            wx.showToast({
                title: '请确认布防的开始时间和截止时间！',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(that.data.wtype === undefined || that.data.wtype === ''){
            wx.showToast({
                title: '请选择布防类型！',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if(parseInt(that.data.starttime) > parseInt(that.data.endtime)){
            wx.showToast({
                title: '截止时间必须大于开始时间！',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        console.log("danxuan",that.data.wtype);
        if(that.data.starttime < 10){
            var savestarttime = '0'+that.data.starttime;
            console.log("starttime",savestarttime);
        }else {
            savestarttime = that.data.starttime;
            console.log("starttime",savestarttime);
        }
        if(that.data.endtime < 10){
            var saveendtime = '0'+that.data.endtime;
            console.log("endtime",saveendtime);
        }else {
            saveendtime = that.data.endtime;
            console.log("endtime",saveendtime);
        }
        /**
         * 请求添加接口
         */
        request.postReq("/api/workingtime/add",
            {
                cid:that.data.currentcode,
                cwstatus:1,
                endtime:saveendtime,
                starttime:savestarttime,
                wtype:that.data.wtype
            },
            function(res) {
                that.setData({
                    addlist:true,
                    radiolist:'none',
                    selecttime:'none'
                });
                /**
                 * 请求列表接口
                 */
                request.postReq("/api/workingtime/getlist",
                    {
                        cid:that.data.currentcode,
                    },
                    function(res){
                        that.setData({
                            workingtimelist:res.data
                        })
                    })
            });
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