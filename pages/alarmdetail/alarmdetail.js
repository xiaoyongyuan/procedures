var myred_carvas,myblue_carvas ;
var app = getApp();
var request = require('../../utils/request.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'报警详情',
        navbar: ['报警图片'],
        currentTab: 0,
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        // list传过来的详情
        alarmdetailData:{},
        text:'报警详情',
        back: {
            type: Boolean,
            value: false
        },
        surround:true,
        alarminfo:true,
        showModal: false,
        reddisplay:'block',
        bluedisplay:'block'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that= this;
        // 字符串转json
        const code = options.code;
        const ifdanger = options.ifdanger;
        const cid = options.cid;
        that.setData({
            currentcode:code
        });
        /**
         * 获取防区的宽和高
         */
        const query = wx.createSelectorQuery();
        query.select('#alarmdetailimg').boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function (res) {
            that.setData({
                alarmdetailimgHeight:res[0].height,
                alarmdetailimgWidth:res[0].width
            });
        });
        /**
         * 请求报警详情接口
         */
        request.postReq('','',"/api/alarm/getone",
            {
                code:code,
                ifdanger:ifdanger,
                cid:cid
            },
            function(res){
                if(res.data.ifdanger === 1){
                    that.setData({
                        sign:true
                    });
                }else {
                    that.setData({
                        sign:false
                    });
                }
                if(res.data.videopath !== ''){
                    that.setData({
                        navbar: ['报警图片', '报警视频'],
                    });
                }
                that.setData({
                    alarmdetailData:res.data,
                });
                //围界信息
                var percentxw = that.data.alarmdetailimgWidth/704;
                var percentyw = that.data.alarmdetailimgHeight/576;
                if(that.data.alarmdetailData.field.length > 0){
                    myred_carvas = wx.createCanvasContext('redCanvas', this);//1.创建carvas实例对象，方便后续使用。
                    myred_carvas.beginPath(); //创建一条路径
                    myred_carvas.setStrokeStyle('red');  //设置边框为红色myblueCanvas
                    myred_carvas.setLineWidth(2);
                    for(var i = 0;i < that.data.alarmdetailData.field.length;i++){
                        const x1 = that.data.alarmdetailData.field[i][0][0];
                        const y1 = that.data.alarmdetailData.field[i][0][1];
                        const x2 = that.data.alarmdetailData.field[i][1][0];
                        const y2 = that.data.alarmdetailData.field[i][1][1];
                        const x3 = that.data.alarmdetailData.field[i][2][0];
                        const y3 = that.data.alarmdetailData.field[i][2][1];
                        const x4 = that.data.alarmdetailData.field[i][3][0];
                        const y4 = that.data.alarmdetailData.field[i][3][1];
                        myred_carvas.moveTo(x1*percentxw,y1*percentyw); //描述路径的起点为手指触摸的x轴和y轴
                        myred_carvas.lineTo(x2*percentxw,y2*percentyw);//绘制一条直线，终点坐标为手指触摸结束后的x轴和y轴
                        myred_carvas.lineTo(x3*percentxw,y3*percentyw);
                        myred_carvas.lineTo(x4*percentxw,y4*percentyw);
                        myred_carvas.lineTo(x1*percentxw,y1*percentyw);
                    }
                    myred_carvas.stroke();//画出当前路径的边框
                    myred_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
                }
                //报警信息
                if(that.data.alarmdetailData.finalresult1.length > 0){
                    var percentx = that.data.alarmdetailimgWidth/that.data.alarmdetailData.pic_width;
                    var percenty = that.data.alarmdetailimgHeight/that.data.alarmdetailData.pic_height;
                    myblue_carvas = wx.createCanvasContext('blueCanvas', this);//1.创建carvas实例对象，方便后续使用。

                    myblue_carvas.setLineWidth(2);
                    for(var i = 0;i < that.data.alarmdetailData.finalresult1.length; i++){
                        if(that.data.alarmdetailData.finalresult1[i].tag === 0){
                            myblue_carvas.setStrokeStyle('#00e8e8');
                        }else{
                            myblue_carvas.setStrokeStyle('#bebf17');
                        }
                        var x = that.data.alarmdetailData.finalresult1[i].x;
                        var y = that.data.alarmdetailData.finalresult1[i].y;
                        var w = that.data.alarmdetailData.finalresult1[i].w;
                        var h = that.data.alarmdetailData.finalresult1[i].h;
                        myblue_carvas.strokeRect(x*percentx, y*percenty, w*percentx, h*percenty);
                    }
                    myblue_carvas.draw();
                }
            })
    },

    /**
     * 请求下一条数据
     */
    next:function(){
        var that = this;
        var nextcode = that.data.alarmdetailData.next;
        if(that.data.alarmdetailData.next === ""){
            wx.showToast({
                title: '已是最后一条报警',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        request.postReq('','',"/api/alarm/getone",
            {
                code:nextcode
            },
            function (res) {
                that.setData({
                    reddisplay:'block',
                    bluedisplay:'block',
                    surround:true,
                    alarminfo:true,
                    alarmdetailData:res.data
                });
                if(that.data.alarmdetailData.ifdanger === 1){
                    that.setData({
                        sign:true
                    })
                }else {
                    that.setData({
                        sign:false
                    })
                }
                if(res.data.videopath !== ''){
                    that.setData({
                        navbar: ['报警图片', '报警视频'],
                    });
                }
                if(res.data.videopath === ''){
                    that.setData({
                        navbar: ['报警图片'],
                    });
                }
                //围界信息
                var percentxw = that.data.alarmdetailimgWidth/704;
                var percentyw = that.data.alarmdetailimgHeight/576;
                if(that.data.alarmdetailData.field.length > 0){
                    myred_carvas = wx.createCanvasContext('redCanvas', this);//1.创建carvas实例对象，方便后续使用。
                    myred_carvas.beginPath(); //创建一条路径
                    myred_carvas.setStrokeStyle('red');  //设置边框为红色myblueCanvas
                    myred_carvas.setLineWidth(2);
                    for(var i = 0;i < that.data.alarmdetailData.field.length;i++){
                        const x1 = that.data.alarmdetailData.field[i][0][0];
                        const y1 = that.data.alarmdetailData.field[i][0][1];
                        const x2 = that.data.alarmdetailData.field[i][1][0];
                        const y2 = that.data.alarmdetailData.field[i][1][1];
                        const x3 = that.data.alarmdetailData.field[i][2][0];
                        const y3 = that.data.alarmdetailData.field[i][2][1];
                        const x4 = that.data.alarmdetailData.field[i][3][0];
                        const y4 = that.data.alarmdetailData.field[i][3][1];
                        myred_carvas.moveTo(x1*percentxw,y1*percentyw); //描述路径的起点为手指触摸的x轴和y轴
                        myred_carvas.lineTo(x2*percentxw,y2*percentyw);//绘制一条直线，终点坐标为手指触摸结束后的x轴和y轴
                        myred_carvas.lineTo(x3*percentxw,y3*percentyw);
                        myred_carvas.lineTo(x4*percentxw,y4*percentyw);
                        myred_carvas.lineTo(x1*percentxw,y1*percentyw);
                    }
                    myred_carvas.stroke();//画出当前路径的边框
                    myred_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
                }
                //报警信息
                if(that.data.alarmdetailData.finalresult1.length > 0){
                    var percentx = that.data.alarmdetailimgWidth/that.data.alarmdetailData.pic_width;
                    var percenty = that.data.alarmdetailimgHeight/that.data.alarmdetailData.pic_height;
                    myblue_carvas = wx.createCanvasContext('blueCanvas', this);//1.创建carvas实例对象，方便后续使用。

                    myblue_carvas.setLineWidth(2);
                    for(var i = 0;i < that.data.alarmdetailData.finalresult1.length; i++){
                        if(that.data.alarmdetailData.finalresult1[i].tag === 0){
                            myblue_carvas.setStrokeStyle('#00e8e8');
                        }else{
                            myblue_carvas.setStrokeStyle('#bebf17');
                        }
                        var x = that.data.alarmdetailData.finalresult1[i].x;
                        var y = that.data.alarmdetailData.finalresult1[i].y;
                        var w = that.data.alarmdetailData.finalresult1[i].w;
                        var h = that.data.alarmdetailData.finalresult1[i].h;
                        myblue_carvas.strokeRect(x*percentx, y*percenty, w*percentx, h*percenty);
                    }
                    myblue_carvas.draw();
                }else{
                    myblue_carvas = wx.createCanvasContext('blueCanvas', this);//1.创建carvas实例对象，方便后续使用。
                    myblue_carvas.setLineWidth(2);
                    myblue_carvas.draw();
                }
            }
        )
    },
    /**
     * 请求上一条数据
     */
    last:function(){
        var that = this;
        var lastcode = that.data.alarmdetailData.last;
        if(that.data.alarmdetailData.last === ""){
            wx.showToast({
                title: '已是第一条报警',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        request.postReq('','',"/api/alarm/getone",
            {
                code:lastcode
            },
            function (res) {
                that.setData({
                    reddisplay:'block',
                    bluedisplay:'block',
                    surround:true,
                    alarminfo:true,
                    alarmdetailData:res.data
                });
                if(that.data.alarmdetailData.ifdanger === 1){
                    that.setData({
                        sign:true
                    })
                }else {
                    that.setData({
                        sign:false
                    })
                }
                if(res.data.videopath !== ''){
                    that.setData({
                        navbar: ['报警图片', '报警视频'],
                    });
                }
                if(res.data.videopath === ''){
                    that.setData({
                        navbar: ['报警图片'],
                    });
                }
                //围界信息
                var percentxw = that.data.alarmdetailimgWidth/704;
                var percentyw = that.data.alarmdetailimgHeight/576;
                if(that.data.alarmdetailData.field.length > 0){
                    myred_carvas = wx.createCanvasContext('redCanvas', this);//1.创建carvas实例对象，方便后续使用。
                    myred_carvas.beginPath(); //创建一条路径
                    myred_carvas.setStrokeStyle('red');  //设置边框为红色myblueCanvas
                    myred_carvas.setLineWidth(2);
                    for(var i = 0;i < that.data.alarmdetailData.field.length;i++){
                        const x1 = that.data.alarmdetailData.field[i][0][0];
                        const y1 = that.data.alarmdetailData.field[i][0][1];
                        const x2 = that.data.alarmdetailData.field[i][1][0];
                        const y2 = that.data.alarmdetailData.field[i][1][1];
                        const x3 = that.data.alarmdetailData.field[i][2][0];
                        const y3 = that.data.alarmdetailData.field[i][2][1];
                        const x4 = that.data.alarmdetailData.field[i][3][0];
                        const y4 = that.data.alarmdetailData.field[i][3][1];
                        myred_carvas.moveTo(x1*percentxw,y1*percentyw); //描述路径的起点为手指触摸的x轴和y轴
                        myred_carvas.lineTo(x2*percentxw,y2*percentyw);//绘制一条直线，终点坐标为手指触摸结束后的x轴和y轴
                        myred_carvas.lineTo(x3*percentxw,y3*percentyw);
                        myred_carvas.lineTo(x4*percentxw,y4*percentyw);
                        myred_carvas.lineTo(x1*percentxw,y1*percentyw);
                    }
                    myred_carvas.stroke();//画出当前路径的边框
                    myred_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
                }
                //报警信息
                if(that.data.alarmdetailData.finalresult1.length > 0){
                    var percentx = that.data.alarmdetailimgWidth/that.data.alarmdetailData.pic_width;
                    var percenty = that.data.alarmdetailimgHeight/that.data.alarmdetailData.pic_height;
                    myblue_carvas = wx.createCanvasContext('blueCanvas', this);//1.创建carvas实例对象，方便后续使用。

                    myblue_carvas.setLineWidth(2);
                    for(var i = 0;i < that.data.alarmdetailData.finalresult1.length; i++){
                        if(that.data.alarmdetailData.finalresult1[i].tag === 0){
                            myblue_carvas.setStrokeStyle('#00e8e8');
                        }else{
                            myblue_carvas.setStrokeStyle('#bebf17');
                        }
                        var x = that.data.alarmdetailData.finalresult1[i].x;
                        var y = that.data.alarmdetailData.finalresult1[i].y;
                        var w = that.data.alarmdetailData.finalresult1[i].w;
                        var h = that.data.alarmdetailData.finalresult1[i].h;
                        myblue_carvas.strokeRect(x*percentx, y*percenty, w*percentx, h*percenty);
                    }
                    myblue_carvas.draw();
                }else{
                    myblue_carvas = wx.createCanvasContext('blueCanvas', this);//1.创建carvas实例对象，方便后续使用。
                    myblue_carvas.setLineWidth(2);
                    myblue_carvas.draw();
                }
            }
        )
    },

    /**
     * 弹出遮罩层
     */
    submit: function () {
        this.setData({
            showModal: true,
            reddisplay:'none',
            bluedisplay:'none'
        })
    },

    preventTouchMove: function () {

    },

    go: function () {
        this.setData({
            showModal: false,
            reddisplay:'block',
            bluedisplay:'block'
        })
    },

    /**
     * 围界信息
     */
    surroundinfo:function(){
        var that = this;
        that.setData({
            surround:!that.data.surround
        });
        if(that.data.surround === true){
            that.setData({
                reddisplay:'block'
            });
        }else {
            that.setData({
                reddisplay:'none'
            });
        }
    },
    /**
     * 报警信息
     */
    alarminfo:function(){
        var that = this;
        that.setData({
            alarminfo:!that.data.alarminfo
        });
        if(that.data.alarminfo === true){
            that.setData({
                bluedisplay:'block'
            });
        }else {
            that.setData({
                bluedisplay:'none'
            });
        }
    },
    /**
     * 返回上一页
     */
    back: function () {
        var that = this;
        wx.navigateBack({
            delta: 1
        });

    },
    /**
     *切换图片视频页签
     */
    navbarTap: function(e){
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        });
    },
    /**
     * 标记和取消标记
     */
    ifsign:function(){
        var that = this;
           that.setData({
               sign:!that.data.sign
           });
        var updateifdanger ;
        if(that.data.sign){
            updateifdanger = 1
        }else {
            updateifdanger = 0
        }
        request.postReq('','',"/api/alarm/update",
            {
                code:that.data.alarmdetailData.code,
                ifdanger:updateifdanger
            },
            function (res) {
                if(res.success === 1){
                    if(res.data[0].ifdanger === 1){
                        wx.showToast({
                            title: '标记成功！',
                            icon: 'none',
                            duration: 2000
                        });
                    }else {
                        wx.showToast({
                            title: '您已取消标记！',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                }
            }
        )

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        myred_carvas = wx.createCanvasContext('redCanvas', this); //1.创建carvas实例对象，方便后续使用。
        myblue_carvas = wx.createCanvasContext('blueCanvas', this);
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
});