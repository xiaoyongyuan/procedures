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
        notime:'none',
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
        /**
         * 先查询每个状态记录多少条
         */
        request.postReq("/api/workingtime/getlist",
            {
                cid:that.data.currentcode,
            },
            function(res){
                console.log("res",res);
                var todaychecklist = [];
                var playdaychecklist = [];
                var weekdaychecklist = [];
                for(var i = 0;i<res.data.length;i++){
                    console.log("res.data[i]",res.data[i].wtype);
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
                console.log("weekdaychecklist",weekdaychecklist);
                console.log("playdaychecklist",playdaychecklist);
                console.log("todaychecklist",todaychecklist);
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
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        console.log("Id",Id);
        //获取当前点击元素的属性值。
        var code = that.data.workingtimelist[Id].code;
        console.log("code",code);
        console.log("删除",that.data.workingtimelist.code);
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success(res) {
                if (res.confirm) {
                    /**
                     * 请求删除
                     */
                    request.postReq("/api/workingtime/del",
                        {
                            code:code
                        },
                        function(res){
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
     * 阻止事件
     */
    prevent:function(){
        console.log("阻止");
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
                });
                if(that.data.workingtimelist.length === 0){
                    that.setData({
                        radiolist:'block',
                        selecttime:'block',
                        notime:'block'
                    });
                }
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