// pages/defenceareasetting/defenceareasetting.js
var my_carvas,strat_x,strat_y,end_x,end_y,myblue_carvas,strat_xblue,strat_yblue,end_xblue,end_yblue;
const app = getApp();
var request = require('../../utils/request.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle:'防区设置',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        dianlist:[],
        pointlist:[],
        addfield:true,
        savebtn:true,
        // reddisplay:'none',
        addone:false,
        bluedisplay:'block',
        reddisplay:'block',
        deleone:true,
        deletwo:true
    },
    //页面跳转
    changeTosettingequipinfo:function(){
        wx.navigateTo({
            url:'../settingequipinfo/settingequipinfo'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var code = options.currentcode;
        that.setData({
            currentcode:code
        });
        /**
         * 获取防区的宽和高
         */
        const query = wx.createSelectorQuery();
        query.select('#defenceareainfor').boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function (res) {
            console.log('打印demo的元素的信息', res);
            console.log('打印高度', res[0].height);
            console.log('打印高度', res[0].width);
            that.setData({
                defenceareaHeight:res[0].height,
                defenceareaWidth:res[0].width
            });
        });



        /**
         * 请求设备详情接口
         */
        request.postReq("/api/camera/getone",
            {
                code:code
            },
            function(res){
                that.setData({
                    field:res.data.field
                });
                // JSON.parse(
                console.log("自己的",that.data.field);
                console.log("自己的1",that.data.field[1]);
                console.log("自己的2",that.data.field[2]);
                /**
                 * 两个都有
                 */
                if(that.data.field[1] !== undefined && that.data.field[2] !== undefined){
                    that.setData({
                        addfield:false,
                        savebtn:false,
                        deleone:true,
                        deletwo:true
                    });
                }
                /**
                 * 两个都没有
                 */
                if(that.data.field[1] === undefined && that.data.field[2] === undefined){
                    that.setData({
                        savebtn:false,
                        deleone:false,
                        deletwo:false
                    });
                }
                /**
                 * 有2无1
                 */
                if(that.data.field[1] === undefined && that.data.field[2] !== undefined){
                    that.setData({
                        deleone:false,
                        deletwo:true,
                        savebtn:false,
                    });
                }
                /**
                 * 有1无2
                 */
                if(that.data.field[1] !== undefined && that.data.field[2] === undefined){
                    that.setData({
                        deleone:true,
                        deletwo:false,
                        savebtn:false,
                    });
                }
                /**
                 * 点进来加载蓝色防区
                 */

                if(that.data.field[1] !== undefined){
                    const x1 = JSON.parse(that.data.field[1])[0][0][0];
                    const y1 = JSON.parse(that.data.field[1])[0][0][1];
                    const x2 = JSON.parse(that.data.field[1])[0][1][0];
                    const y2 = JSON.parse(that.data.field[1])[0][1][1];
                    const x3 = JSON.parse(that.data.field[1])[0][2][0];
                    const y3 = JSON.parse(that.data.field[1])[0][2][1];
                    const x4 = JSON.parse(that.data.field[1])[0][3][0];
                    const y4 = JSON.parse(that.data.field[1])[0][3][1];
                    console.log("换算x",x1*(that.data.defenceareaWidth/704));
                    console.log("换算y",y1*(that.data.defenceareaHeight/576));
                    // defenceareaHeight:res[0].height,
                    //     defenceareaWidth:res[0].width
                    myblue_carvas = wx.createCanvasContext('myblueCanvas', this);//1.创建carvas实例对象，方便后续使用。
                    myblue_carvas.beginPath(); //创建一条路径
                    myblue_carvas.setStrokeStyle('blue');  //设置边框为红色myblueCanvas
                    myblue_carvas.setLineWidth(3);
                    myblue_carvas.moveTo(x1*(that.data.defenceareaWidth/704),y1*(that.data.defenceareaHeight/576)); //描述路径的起点为手指触摸的x轴和y轴
                    myblue_carvas.lineTo(x2*(that.data.defenceareaWidth/704),y2*(that.data.defenceareaHeight/576));//绘制一条直线，终点坐标为手指触摸结束后的x轴和y轴
                    myblue_carvas.lineTo(x3*(that.data.defenceareaWidth/704),y3*(that.data.defenceareaHeight/576));
                    myblue_carvas.lineTo(x4*(that.data.defenceareaWidth/704),y4*(that.data.defenceareaHeight/576));
                    myblue_carvas.lineTo(x1*(that.data.defenceareaWidth/704),y1*(that.data.defenceareaHeight/576));
                    myblue_carvas.stroke();//画出当前路径的边框
                    myblue_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
                }
                /**
                 * 点进来加载红色防区
                 */
                if(that.data.field[2] !== undefined){
                    const x1 = JSON.parse(that.data.field[2])[0][0][0];
                    const y1 = JSON.parse(that.data.field[2])[0][0][1];
                    const x2 = JSON.parse(that.data.field[2])[0][1][0];
                    const y2 = JSON.parse(that.data.field[2])[0][1][1];
                    const x3 = JSON.parse(that.data.field[2])[0][2][0];
                    const y3 = JSON.parse(that.data.field[2])[0][2][1];
                    const x4 = JSON.parse(that.data.field[2])[0][3][0];
                    const y4 = JSON.parse(that.data.field[2])[0][3][1];
                    my_carvas = wx.createCanvasContext('myredCanvas', this);//1.创建carvas实例对象，方便后续使用。
                    my_carvas.beginPath(); //创建一条路径
                    my_carvas.setStrokeStyle('red');  //设置边框为红色myblueCanvas
                    my_carvas.setLineWidth(3);
                    my_carvas.moveTo(x1*(that.data.defenceareaWidth/704),y1*(that.data.defenceareaHeight/576)); //描述路径的起点为手指触摸的x轴和y轴
                    my_carvas.lineTo(x2*(that.data.defenceareaWidth/704),y2*(that.data.defenceareaHeight/576));//绘制一条直线，终点坐标为手指触摸结束后的x轴和y轴
                    my_carvas.lineTo(x3*(that.data.defenceareaWidth/704),y3*(that.data.defenceareaHeight/576));
                    my_carvas.lineTo(x4*(that.data.defenceareaWidth/704),y4*(that.data.defenceareaHeight/576));
                    my_carvas.lineTo(x1*(that.data.defenceareaWidth/704),y1*(that.data.defenceareaHeight/576));
                    my_carvas.stroke();//画出当前路径的边框
                    my_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
                }
            });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady:function(){

        my_carvas = wx.createCanvasContext('myredCanvas', this); //1.创建carvas实例对象，方便后续使用。
        myblue_carvas = wx.createCanvasContext('myblueCanvas', this);

    },
    // 手指触摸事件红色
    EventHandleStart:function(e){
        var that = this;
        strat_x = Math.round(e.touches[0].x) ; // 手指开始触摸时的x轴 x轴--->相对于画布左边的距离
        strat_y = Math.round(e.touches[0].y) ;// 手指开始触摸时的y轴 y轴--->相对于画布顶部的距离strat_xblue
        console.log("strat_xstrat_y",strat_x,strat_y);
    },
    /**
     *手指触摸事件蓝色
     */
    EventHandleStartblue:function(e){
        var that = this;
        strat_xblue = Math.round(e.touches[0].x); // 手指开始触摸时的x轴 x轴--->相对于画布左边的距离
        strat_yblue = Math.round(e.touches[0].y);// 手指开始触摸时的y轴 y轴--->相对于画布顶部的距离
        // strat_yblue = Math.round(e.touches[0].y)
        console.log("e",e);
        console.log("strat_xblue",strat_xblue,strat_yblue);
    },
    /**
     *手指触摸结束时的事件蓝色
     */
    EventHandleblue:function(e){
        var that = this;
        end_xblue = Math.round(e.changedTouches[0].x); // 手指结束触摸时的x轴 x轴--->相对于画布左边的距离
        end_yblue = Math.round(e.changedTouches[0].y);// 手指结束触摸时的y轴 y轴--->相对于画布顶部的距离

        /**
         * 两个防区都没有
         */
        if(that.data.addone === true){
            if(that.data.field[1] === undefined && that.data.field[2] === undefined){
                const datapoint=that.data.pointlist;
                var point1 = [strat_xblue,strat_yblue];
                var point2 = [end_xblue,end_yblue];
                if(that.data.pointlist.length < 6) {
                    datapoint.push(point1,point2);
                }
                that.setData({
                    pointlist:datapoint
                });
                console.log("kaishi蓝色哈哈哈哈",that.data.pointlist);
                myblue_carvas.beginPath(); //创建一条路径
                myblue_carvas.setStrokeStyle('blue');  //设置边框为蓝色
                myblue_carvas.setLineWidth(3);
                myblue_carvas.moveTo(that.data.pointlist[0][0],that.data.pointlist[0][1]); //描述路径的起点为手指触摸的x轴和y轴
                myblue_carvas.lineTo(that.data.pointlist[1][0],that.data.pointlist[1][1]);//绘制一条直线，终点坐标为手指触摸结束后的x轴和y轴
                if(that.data.pointlist.length>2){
                    myblue_carvas.lineTo(that.data.pointlist[3][0],that.data.pointlist[3][1]);

                }
                if(that.data.pointlist.length>4){
                    myblue_carvas.lineTo(that.data.pointlist[5][0],that.data.pointlist[5][1]);
                    myblue_carvas.lineTo(that.data.pointlist[0][0],that.data.pointlist[0][1]);
                }
                myblue_carvas.stroke();//画出当前路径的边框
                myblue_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
            }
        }
        /**
         * 有2没有1
         */
        if(that.data.addfield === false){
            if(that.data.field[1] === undefined && that.data.field[2] !== undefined){
                const datapoint=that.data.pointlist;
                var point1 = [strat_xblue,strat_yblue];
                var point2 = [end_xblue,end_yblue];
                if(that.data.pointlist.length < 6) {
                    datapoint.push(point1,point2);
                }
                that.setData({
                    pointlist:datapoint
                });
                console.log("kaishi蓝色哈哈哈哈",that.data.pointlist);
                myblue_carvas.beginPath(); //创建一条路径
                myblue_carvas.setStrokeStyle('blue');  //设置边框为蓝色
                myblue_carvas.setLineWidth(3);
                myblue_carvas.moveTo(that.data.pointlist[0][0],that.data.pointlist[0][1]); //描述路径的起点为手指触摸的x轴和y轴
                myblue_carvas.lineTo(that.data.pointlist[1][0],that.data.pointlist[1][1]);//绘制一条直线，终点坐标为手指触摸结束后的x轴和y轴
                if(that.data.pointlist.length>2){
                    myblue_carvas.lineTo(that.data.pointlist[3][0],that.data.pointlist[3][1]);

                }
                if(that.data.pointlist.length>4){
                    myblue_carvas.lineTo(that.data.pointlist[5][0],that.data.pointlist[5][1]);
                    myblue_carvas.lineTo(that.data.pointlist[0][0],that.data.pointlist[0][1]);
                }
                myblue_carvas.stroke();//画出当前路径的边框
                myblue_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
            }
        }
    },
    //手指触摸结束时的事件红色
    EventHandle: function (e) {
        var that = this;
        end_x = Math.round(e.changedTouches[0].x); // 手指结束触摸时的x轴 x轴--->相对于画布左边的距离
        end_y = Math.round(e.changedTouches[0].y);// 手指结束触摸时的y轴 y轴--->相对于画布顶部的距离
        const data=that.data.dianlist;
        var dian1 = [strat_x,strat_y];
        var dian2 = [end_x,end_y];
        if(that.data.dianlist.length < 6) {
            data.push(dian1,dian2);
        }
        that.setData({
            dianlist:data
        });
        console.log("kaishi",that.data.dianlist);

        /**
         * 有1没有2
         */
        if(that.data.field[1] !== undefined && that.data.field[2] === undefined){
            my_carvas.beginPath(); //创建一条路径
            my_carvas.setStrokeStyle('red');  //设置边框为红色
            my_carvas.setLineWidth(3);
            my_carvas.moveTo(that.data.dianlist[0][0],that.data.dianlist[0][1]); //描述路径的起点为手指触摸的x轴和y轴
            my_carvas.lineTo(that.data.dianlist[1][0],that.data.dianlist[1][1]);//绘制一条直线，终点坐标为手指触摸结束后的x轴和y轴
            if(that.data.dianlist.length>2){
                my_carvas.lineTo(that.data.dianlist[3][0],that.data.dianlist[3][1]);

            }
            if(that.data.dianlist.length>4){
                my_carvas.lineTo(that.data.dianlist[5][0],that.data.dianlist[5][1]);
                my_carvas.lineTo(that.data.dianlist[0][0],that.data.dianlist[0][1]);
            }
            my_carvas.stroke();//画出当前路径的边框
            my_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
        }
    },
    /**
     * 增加防区按钮
     */
    addfield:function(){
        const that = this;
        that.setData({
            addfield:!that.data.addfield,
            reddisplay:'block',
            addone:!that.data.addone,
            savebtn:true
        });
        /**
         * 两个防区都没有
         */
        if(that.data.field[1] === undefined && that.data.field[2] === undefined){
            wx.showToast({
                title: '请绘制防区1',
                icon: 'none',
                duration: 2000
            });
        }
        /**
         * 有1没有2
         */
        if(that.data.field[1] !== undefined && that.data.field[2] === undefined){
            wx.showToast({
                title: '请绘制防区2',
                icon: 'none',
                duration: 2000
            });
            that.setData({
                bluedisplay:'none'
            });
        }
        /**
         * 有2没有1
         */
        if(that.data.field[1] === undefined && that.data.field[2] !== undefined){
            that.setData({
                reddisplay:'none'
            });
            wx.showToast({
                title: '请绘制防区1',
                icon: 'none',
                duration: 2000
            });
        }
    },
    // clear:function(){
    //     var that = this;
    //     console.log("qian",that.data.dianlist);
    //     that.setData({
    //         dianlist:[]
    //     });
    //     my_carvas.stroke();//画出当前路径的边框
    //     my_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
    //     console.log("hou",that.data.dianlist);
    //
    // },
    /**
     * 保存
     */
    save:function(){
        var that = this;
        /**
         * 两个都没有，保存蓝色防区
         */

        console.log("that.data.pointlist",that.data.pointlist);
        console.log("that.data.dianlist.length",that.data.dianlist.length);
        if(that.data.field[1] === undefined && that.data.field[2] === undefined){
            console.log("两个都没有，保存蓝色防区");
            console.log("测试pointlist",that.data.pointlist.length);
            console.log("测试dianlist",that.data.dianlist.length);
            // my_carvas.moveTo(x1*(that.data.defenceareaWidth/704),y1*(that.data.defenceareaHeight/576));
            const bx1 = that.data.pointlist[0][0]/(that.data.defenceareaWidth/704);
            const by1 = that.data.pointlist[0][1]/(that.data.defenceareaHeight/576);
            const bx2 = that.data.pointlist[1][0]/(that.data.defenceareaWidth/704);
            const by2 = that.data.pointlist[1][1]/(that.data.defenceareaHeight/576);
            const bx3 = that.data.pointlist[3][0]/(that.data.defenceareaWidth/704);
            const by3 = that.data.pointlist[3][1]/(that.data.defenceareaHeight/576);
            const bx4 = that.data.pointlist[5][0]/(that.data.defenceareaWidth/704);
            const by4 = that.data.pointlist[5][1]/(that.data.defenceareaHeight/576);
            const bfield = [[ [bx1,by1],[bx2,by2],[bx3,by3],[bx4,by4] ]];
            console.log("field",bfield);
            console.log("zfc",JSON.stringify(bfield));
            request.postReq("/api/camera/fieldadd",
                {
                    code:that.data.currentcode,
                    key:'1',
                    field:JSON.stringify(bfield)
                },
                function(res){
                    that.setData({
                        addfield:true,
                        savebtn:false
                    });
                    /**
                     * 请求设备详情接口
                     */
                    request.postReq("/api/camera/getone",
                        {
                            code:that.data.currentcode
                        },
                        function(res){
                            that.setData({
                                field:res.data.field,
                                deleone:true
                            });
                        });
                    wx.showToast({
                        title: '防区1保存成功',
                        icon: 'success',
                        duration: 2000
                    });
                })
        }
        /**有1没有2
         * 请求增加防区接口保存红色
         */
       if(that.data.field[1] !== undefined && that.data.field[2] === undefined){
           console.log("有1没有2保存红色");
           console.log("测试pointlist有1没有2",that.data.pointlist.length);
           console.log("测试dianlist有1没有2",that.data.dianlist.length);
           const x1 = that.data.dianlist[0][0]/(that.data.defenceareaWidth/704);
           const y1 = that.data.dianlist[0][1]/(that.data.defenceareaHeight/576);
           const x2 = that.data.dianlist[1][0]/(that.data.defenceareaWidth/704);
           const y2 = that.data.dianlist[1][1]/(that.data.defenceareaHeight/576);
           const x3 = that.data.dianlist[3][0]/(that.data.defenceareaWidth/704);
           const y3 = that.data.dianlist[3][1]/(that.data.defenceareaHeight/576);
           const x4 = that.data.dianlist[5][0]/(that.data.defenceareaWidth/704);
           const y4 = that.data.dianlist[5][1]/(that.data.defenceareaHeight/576);
           const field = [[ [x1,y1],[x2,y2],[x3,y3],[x4,y4] ]];
           console.log("field",field);
           console.log("zfc",JSON.stringify(field));
           request.postReq("/api/camera/fieldadd",
               {
                   code:'1000082',
                   key:'2',
                   field:JSON.stringify(field)
               },
               function(res){

                   that.setData({
                       bluedisplay:'block'
                   });
                   /**
                    * 请求设备详情接口
                    */
                   request.postReq("/api/camera/getone",
                       {
                           code:that.data.currentcode
                       },
                       function(res){
                           that.setData({
                               field:res.data.field
                           });
                           if(that.data.field[1] !== undefined && that.data.field[2] !== undefined){
                               that.setData({
                                   addfield:false,
                                   savebtn:false,
                                   deletwo:true
                               });
                           }
                       });
                   wx.showToast({
                       title: '防区2保存成功',
                       icon: 'success',
                       duration: 2000
                   });
               })
       }
        /**
         * 有2没有1保存蓝色
         */
        if(that.data.field[1] === undefined && that.data.field[2] !== undefined){
            console.log("有2没有1保存蓝色");
            console.log("测试pointlist",that.data.pointlist.length);
            console.log("测试dianlist",that.data.dianlist.length);
            // const bx1 = that.data.pointlist[0][0]/(that.data.defenceareaWidth/704);
            // const by1 = that.data.pointlist[0][1]/(that.data.defenceareaHeight/576);
            const bx1 = that.data.pointlist[0][0]/(that.data.defenceareaWidth/704);
            const by1 = that.data.pointlist[0][1]/(that.data.defenceareaHeight/576);
            const bx2 = that.data.pointlist[1][0]/(that.data.defenceareaWidth/704);
            const by2 = that.data.pointlist[1][1]/(that.data.defenceareaHeight/576);
            const bx3 = that.data.pointlist[3][0]/(that.data.defenceareaWidth/704);
            const by3 = that.data.pointlist[3][1]/(that.data.defenceareaHeight/576);
            const bx4 = that.data.pointlist[5][0]/(that.data.defenceareaWidth/704);
            const by4 = that.data.pointlist[5][1]/(that.data.defenceareaHeight/576);
            const bfield = [[ [bx1,by1],[bx2,by2],[bx3,by3],[bx4,by4] ]];
            console.log("field",bfield);
            console.log("zfc",JSON.stringify(bfield));
            request.postReq("/api/camera/fieldadd",
                {
                    code:that.data.currentcode,
                    key:'1',
                    field:JSON.stringify(bfield)
                },
                function(res){
                    that.setData({
                        addfield:!that.data.addfield,
                        savebtn:false
                    });
                    /**
                     * 请求设备详情接口
                     */
                    request.postReq("/api/camera/getone",
                        {
                            code:that.data.currentcode
                        },
                        function(res){
                            that.setData({
                                field:res.data.field
                            });
                            if(that.data.field[1] !== undefined && that.data.field[2] !== undefined){
                                that.setData({
                                    addfield:false,
                                    savebtn:false,
                                    reddisplay:'block',
                                    deleone:true,
                                });
                            }
                        });
                    wx.showToast({
                        title: '防区1保存成功',
                        icon: 'success',
                        duration: 2000
                    });
                })
        }
    },
    /**
     * 删除防区1
     */
    deleteone:function(){
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success(res) {
                if (res.confirm) {
                    request.postReq("/api/camera/fielddel",
                        {
                            code:that.data.currentcode,
                            key:'1'
                        },
                        function(res){
                            /**
                             * 请求设备详情接口
                             */
                            request.postReq("/api/camera/getone",
                                {
                                    code:that.data.currentcode
                                },
                                function(res){
                                    that.setData({
                                        field:res.data.field,
                                        deleone:false,
                                        pointlist:[],
                                        addone:false,
                                        addfield:true
                                    });
                                        myblue_carvas.stroke();//画出当前路径的边框
                                        myblue_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
                                        console.log("hou",that.data.pointlist);
                                });
                            wx.showToast({
                                title: '防区1删除成功',
                                icon: 'success',
                                duration: 2000
                            });
                        })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        });
    },
    /**
     * 删除防区2
     */
    deletetwo:function(){
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success(res) {
                if (res.confirm) {
                    request.postReq("/api/camera/fielddel",
                        {
                            code:that.data.currentcode,
                            key:'2'
                        },
                        function(res){
                            /**
                             * 请求设备详情接口
                             */
                            request.postReq("/api/camera/getone",
                                {
                                    code:that.data.currentcode
                                },
                                function(res){
                                    that.setData({
                                        field:res.data.field,
                                        deletwo:false,
                                        dianlist:[],
                                        addone:false,
                                        addfield:true
                                    });
                                    my_carvas.stroke();//画出当前路径的边框
                                    my_carvas.draw(); //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
                                    console.log("hou",that.data.dianlist);
                                });
                            wx.showToast({
                                title: '防区2删除成功',
                                icon: 'success',
                                duration: 2000
                            });
                        })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        });
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