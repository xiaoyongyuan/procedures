const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'设防时间',
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
        notime:'none',
        array: ['0:00', '1:00', '2:00', '3:00','4:00', '5:00', '6:00', '7:00','8:00', '9:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00','21:00', '22:00', '23:00', '24:00'],
    },
    /**
     *开始时间
     */
    bindPickerChangestrat(e) {
        var that = this;
        this.setData({
            starttime: e.detail.value
        });
    },
    /**
     *截止时间
     */
    bindPickerChangeend(e) {
        var that = this;
        this.setData({
            endtime: e.detail.value
        });
    },
    /**
     *单选按钮
     */
    checkboxChange: function (e) {
        var that = this;
        that.setData({
            wtype:e.detail.value
        });
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
        /**
         * 先查询每个状态记录多少条
         */
        request.postReq('','',"/api/workingtime/getlist",
            {
                cid:that.data.currentcode,
            },
            function(res){
                var todaychecklist = [];
                var playdaychecklist = [];
                var weekdaychecklist = [];
                for(var i = 0;i<res.data.length;i++){
                    if(res.data[i].wtype === 'weekday'){
                        weekdaychecklist.push(res.data[i].wtype);
                    }
                    if(res.data[i].wtype === 'playday'){
                        playdaychecklist.push(res.data[i].wtype);
                    }
                    if(res.data[i].wtype === 'today'){
                        todaychecklist.push(res.data[i].wtype);
                    }
                }
                if(that.data.wtype === 'weekday'){
                    if(weekdaychecklist.length >= 3){
                        wx.showToast({
                            title: '工作日的设防已经上限！',
                            icon: 'none',
                            duration: 2000
                        });
                        return;
                    }
                    if(that.data.starttime < 10){
                        var savestarttime = '0'+that.data.starttime;
                    }else {
                        savestarttime = that.data.starttime;
                    }
                    if(that.data.endtime < 10){
                        var saveendtime = '0'+that.data.endtime;
                    }else {
                        saveendtime = that.data.endtime;
                    }
                    /**
                     * 请求添加接口
                     */
                    request.postReq('','',"/api/workingtime/add",
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
                            request.postReq('','',"/api/workingtime/getlist",
                                {
                                    cid:that.data.currentcode,
                                },
                                function(res){
                                    that.setData({
                                        workingtimelist:res.data
                                    });
                                    if(that.data.workingtimelist.length > 0){
                                        that.setData({
                                            notime:'none'
                                        });
                                    }
                                    wx.showToast({
                                        title: '提交成功！',
                                        icon: 'success',
                                        duration: 2000
                                    });
                                })
                        });
                }
                if(that.data.wtype === 'playday'){
                    if(playdaychecklist.length >= 3){
                        wx.showToast({
                            title: '休息日的设防已经上限！',
                            icon: 'none',
                            duration: 2000
                        });
                        return;
                    }
                    if(that.data.starttime < 10){
                        var savestarttime = '0'+that.data.starttime;
                    }else {
                        savestarttime = that.data.starttime;
                    }
                    if(that.data.endtime < 10){
                        var saveendtime = '0'+that.data.endtime;
                    }else {
                        saveendtime = that.data.endtime;
                    }
                    /**
                     * 请求添加接口
                     */
                    request.postReq('','',"/api/workingtime/add",
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
                            request.postReq('','',"/api/workingtime/getlist",
                                {
                                    cid:that.data.currentcode,
                                },
                                function(res){
                                    that.setData({
                                        workingtimelist:res.data
                                    });
                                    if(that.data.workingtimelist.length > 0){
                                        that.setData({
                                            notime:'none'
                                        });
                                    }
                                    wx.showToast({
                                        title: '提交成功！',
                                        icon: 'success',
                                        duration: 2000
                                    });
                                })
                        });
                }
                if(that.data.wtype === 'today'){
                    if(todaychecklist.length >= 3){
                        wx.showToast({
                            title: '当天的设防已经上限！',
                            icon: 'none',
                            duration: 2000
                        });
                        return;
                    }
                    if(that.data.starttime < 10){
                        var savestarttime = '0'+that.data.starttime;
                    }else {
                        savestarttime = that.data.starttime;
                    }
                    if(that.data.endtime < 10){
                        var saveendtime = '0'+that.data.endtime;
                    }else {
                        saveendtime = that.data.endtime;
                    }
                    /**
                     * 请求添加接口
                     */
                    request.postReq('','',"/api/workingtime/add",
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
                            request.postReq('','',"/api/workingtime/getlist",
                                {
                                    cid:that.data.currentcode,
                                },
                                function(res){
                                    that.setData({
                                        workingtimelist:res.data
                                    });
                                    if(that.data.workingtimelist.length > 0){
                                        that.setData({
                                            notime:'none'
                                        });
                                    }
                                    wx.showToast({
                                        title: '提交成功！',
                                        icon: 'success',
                                        duration: 2000
                                    });
                                })
                        });
                }
            })
    },
    /**
     *布防时间删除
     */
    deleteworkingtime:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        //获取当前点击元素的属性值。
        var code = that.data.workingtimelist[Id].code;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success(res) {
                if (res.confirm) {
                    /**
                     * 请求删除
                     */
                    request.postReq('','',"/api/workingtime/del",
                        {
                            code:code
                        },
                        function(res){
                            /**
                             * 请求列表接口
                             */
                            request.postReq('','',"/api/workingtime/getlist",
                                {
                                    cid:that.data.currentcode,
                                },
                                function(res){
                                    that.setData({
                                        workingtimelist:res.data
                                    });
                                    if(that.data.workingtimelist.length === 0){
                                        that.setData({
                                            radiolist:'block',
                                            selecttime:'block',
                                            notime:'block'
                                        });
                                    }
                                    wx.showToast({
                                        title: '删除成功！',
                                        icon: 'success',
                                        duration: 2000
                                    });
                                })
                        });
                }
                else if (res.cancel)
                {}
            }
        });
    },
    /**
     *切换状态
     */
    switch1Change(e) {
        var that = this;
        var Id = e.currentTarget.id;
        //获取当前点击元素的属性值。
        var code = that.data.workingtimelist[Id].code;
        if(e.detail.value === true){
            var cwstatus = 1;
        }else {
            cwstatus = 0;
        }
        /**
         * 修改状态接口
         */
        request.postReq('','',"/api/workingtime/update",
            {
                code:code,
                cwstatus:cwstatus
            },
            function(res){
                if(cwstatus === 0){
                    wx.showToast({
                        title: '已关闭',
                        icon: 'success',
                        duration: 2000
                    });
                }else {
                    wx.showToast({
                        title: '已打开',
                        icon: 'success',
                        duration: 2000
                    });
                }
            })

    },
    /**
     *单选按钮
     */
    radioChange: function (e) {
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
     * 阻止事件
     */
    prevent:function(){
        // console.log("阻止");
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
        request.postReq('','',"/api/workingtime/getlist",
            {
                cid:code,
            },
            function(res){
                that.setData({
                    workingtimelist:res.data
                });
                if(that.data.workingtimelist.length === 0){
                    that.setData({
                        radiolist:'block',
                        selecttime:'block',
                        notime:'block'
                    });
                }
                // if(that.data.workingtimelist){
                //
                // }
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