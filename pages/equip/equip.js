// pages/equip/equip.js
const app = getApp();
var request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:'',
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        equipListData: [],
        isFromSearch: true,   // 用于判断equipListData数组是不是空数组，默认true，空的数组
        searchPageNum: 1,   // 设置加载的第几次，默认是第一次
        callbackcount: 20,      //返回数据的个数
        searchLoading: false, //"上拉加载"的变量，默认false，隐藏
        searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
        isRefreshing: false,
        nodata:'none',
    },
    /**
     * 跳转设备详情页
     */

    changeToequipdetail:function(e){
        var that = this;
        //获取当前点击元素的id(索引值)
        var Id = e.currentTarget.id;
        //获取当前点击元素的属性值。
        var code = that.data.equipListData[Id].code;
        //获取当前设备是否离线
        var mist = that.data.equipListData[Id].ismist;
        wx.navigateTo({
            url:'../equipdetail/equipdetail?code=' + code + '&mist=' + mist
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var ctime = util.formatTime(new Date());
        /**
         * 请求列表接口
         */
        var that = this;
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        request.postReq(searchPageNum,callbackcount,"/api/camera/getlist_forAPP", {},
            function(res){
                if(res.success === 1){
                    that.setData({
                        equipListData:res.data
                    });
                    if(that.data.equipListData.length > 0){
                        that.setData({
                            nodata:'none'
                        });
                    }else{
                        that.setData({
                            nodata:'block'
                        });
                    }
                    var currenttime = new Date(ctime);
                    for(var i=0;i<res.data.length;i++){
                        /**
                         *两个时间都有
                         */
                        if(that.data.equipListData[i].atime !== '' && (that.data.equipListData[i].herattime.time !== '' || that.data.equipListData[i].herattime.time !== undefined)){
                            //两个时间相差的分钟数
                            var  mistiming =  parseInt(currenttime - new Date(that.data.equipListData[i].atime))/ 1000 / 60;
                            var  mistlastheart = parseInt(currenttime - new Date(that.data.equipListData[i].herattime.time))/ 1000 / 60;
                            if(mistiming > 1 && mistlastheart > 1){
                                that.data.equipListData[i]['ismist']=false;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }else{
                                that.data.equipListData[i]['ismist']=true;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }
                        }
                        /**
                         * 两个时间都没有
                         */
                        if(that.data.equipListData[i].atime === '' && (that.data.equipListData[i].herattime.time === '' ||  that.data.equipListData[i].herattime.time === undefined)){
                            that.data.equipListData[i]['ismist']=false;
                            that.setData({
                                equipListData:that.data.equipListData
                            });
                        }
                        /**
                         * 有报警没心跳
                         */
                        if(that.data.equipListData[i].atime !== '' && (that.data.equipListData[i].herattime.time === '' ||  that.data.equipListData[i].herattime.time === undefined)){
                            //两个时间相差的分钟数
                            var  mistiming =  parseInt(currenttime - new Date(that.data.equipListData[i].atime))/ 1000 / 60;
                            if(mistiming > 1){
                                that.data.equipListData[i]['ismist']=false;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }else{
                                that.data.equipListData[i]['ismist']=true;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }
                        }
                        /**
                         * 有心跳没报警
                         */
                        if(that.data.equipListData[i].atime === '' && (that.data.equipListData[i].herattime.time !== '' &&  that.data.equipListData[i].herattime.time !== undefined)){
                            var  mistlastheart = parseInt(currenttime - new Date(that.data.equipListData[i].herattime.time))/ 1000 / 60;
                            if(mistlastheart > 1){
                                that.data.equipListData[i]['ismist']=false;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }else{
                                that.data.equipListData[i]['ismist']=true;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }
                        }
                    }
                }
            });
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
        var ctime = util.formatTime(new Date());
        /**
         * 请求列表接口
         */
        var that = this;
        that.setData({
            title:wx.getStorageSync('companyuser')
        });
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        request.postReq(searchPageNum,callbackcount,"/api/camera/getlist_forAPP",
            {},
            function(res){
                that.setData({
                    equipListData:res.data
                });
                if(that.data.equipListData.length > 0){
                    that.setData({
                        nodata:'none'
                    });
                }else{
                    that.setData({
                        nodata:'block'
                    });
                }
                var currenttime = new Date(ctime);
                for(var i=0;i<res.data.length;i++){
                    /**
                     *两个时间都有
                     */
                    if(that.data.equipListData[i].atime !== '' && (that.data.equipListData[i].herattime.time !== '' || that.data.equipListData[i].herattime.time !== undefined)){
                        //两个时间相差的分钟数
                        var  mistiming =  parseInt(currenttime - new Date(that.data.equipListData[i].atime))/ 1000 / 60;
                        var  mistlastheart = parseInt(currenttime - new Date(that.data.equipListData[i].herattime.time))/ 1000 / 60;
                        if(mistiming > 1 && mistlastheart > 1){
                            that.data.equipListData[i]['ismist']=false;
                            that.setData({
                                equipListData:that.data.equipListData
                            })
                        }else{
                            that.data.equipListData[i]['ismist']=true;
                            that.setData({
                                equipListData:that.data.equipListData
                            })
                        }
                    }
                    /**
                     * 两个时间都没有
                     */
                    if(that.data.equipListData[i].atime === '' && (that.data.equipListData[i].herattime.time === '' ||  that.data.equipListData[i].herattime.time === undefined)){
                        that.data.equipListData[i]['ismist']=false;
                        that.setData({
                            equipListData:that.data.equipListData
                        });
                    }
                    /**
                     * 有报警没心跳
                     */
                    if(that.data.equipListData[i].atime !== '' && (that.data.equipListData[i].herattime.time === '' ||  that.data.equipListData[i].herattime.time === undefined)){
                        //两个时间相差的分钟数
                        var  mistiming =  parseInt(currenttime - new Date(that.data.equipListData[i].atime))/ 1000 / 60;
                        if(mistiming > 1){
                            that.data.equipListData[i]['ismist']=false;
                            that.setData({
                                equipListData:that.data.equipListData
                            })
                        }else{
                            that.data.equipListData[i]['ismist']=true;
                            that.setData({
                                equipListData:that.data.equipListData
                            })
                        }
                    }
                    /**
                     * 有心跳没报警
                     */
                    if(that.data.equipListData[i].atime === '' && (that.data.equipListData[i].herattime.time !== '' &&  that.data.equipListData[i].herattime.time !== undefined)){
                        var  mistlastheart = parseInt(currenttime - new Date(that.data.equipListData[i].herattime.time))/ 1000 / 60;
                        if(mistlastheart > 1){
                            that.data.equipListData[i]['ismist']=false;
                            that.setData({
                                equipListData:that.data.equipListData
                            })
                        }else{
                            that.data.equipListData[i]['ismist']=true;
                            that.setData({
                                equipListData:that.data.equipListData
                            })
                        }
                    }
                }
                that.setData({
                    isRefreshing: false,
                });
                wx.stopPullDownRefresh();
            });
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
        var that = this;
        if (that.data.isRefreshing) {
            return
        }
        that.setData({
            isRefreshing: true,
        });
        that.onShow();//数据请求
    },

    /**
     * 上滑加载
     */
    BottomLoad: function (condition) {
        var ctime = util.formatTime(new Date());
        /**
         * 请求列表接口
         */
        var that = this;
        let searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数
            callbackcount =that.data.callbackcount; //返回数据的个数
        request.postReq(searchPageNum,callbackcount,"/api/camera/getlist_forAPP", {},
            function(res){
                //判断是否有数据，有则取数据
                if(res.data.length !== 0){
                    let searchList = [];
                    //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加 equipListData
                    that.data.isFromSearch ? searchList=res.data : searchList=that.data.equipListData.concat(res.data);
                    that.setData({
                        equipListData: searchList, //获取数据数组
                        searchLoading: false   //把"上拉加载"的变量设为false，显示
                    });
                    var currenttime = new Date(ctime);
                    for(var i=0;i<res.data.length;i++){
                        /**
                         *两个时间都有
                         */
                        if(that.data.equipListData[i].atime !== '' && that.data.equipListData[i].herattime.time !== ''){
                            //两个时间相差的分钟数
                            var  mistiming =  parseInt(currenttime - new Date(that.data.equipListData[i].atime))/ 1000 / 60;
                            var  mistlastheart = parseInt(currenttime - new Date(that.data.equipListData[i].herattime.time))/ 1000 / 60;
                            if(mistiming > 1 && mistlastheart > 1){
                                that.data.equipListData[i]['ismist']=false;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }else{
                                that.data.equipListData[i]['ismist']=true;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }
                        }
                        /**
                         * 两个时间都没有
                         */
                        if(that.data.equipListData[i].atime === '' && that.data.equipListData[i].herattime.time === ''){
                            that.data.equipListData[i]['ismist']=false;
                            that.setData({
                                equipListData:that.data.equipListData
                            });
                        }
                        /**
                         * 有报警没心跳
                         */
                        if(that.data.equipListData[i].atime !== '' && that.data.equipListData[i].herattime.time === ''){
                            //两个时间相差的分钟数
                            var  mistiming =  parseInt(currenttime - new Date(that.data.equipListData[i].atime))/ 1000 / 60;
                            if(mistiming > 1){
                                that.data.equipListData[i]['ismist']=false;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }else{
                                that.data.equipListData[i]['ismist']=true;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }
                        }
                        /**
                         * 有心跳没报警
                         */
                        if(that.data.equipListData[i].atime === '' && that.data.equipListData[i].herattime.time !== ''){
                            var  mistlastheart = parseInt(currenttime - new Date(that.data.equipListData[i].herattime.time))/ 1000 / 60;
                            if(mistlastheart > 1){
                                that.data.equipListData[i]['ismist']=false;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }else{
                                that.data.equipListData[i]['ismist']=true;
                                that.setData({
                                    equipListData:that.data.equipListData
                                })
                            }
                        }
                    }
                    // 没有数据了，把“没有数据”显示，把“上拉加载”隐藏
                }else{
                    that.setData({
                        searchLoadingComplete: true, //把“没有数据”设为true，显示
                        searchLoading: false  //把"上拉加载"的变量设为false，隐藏
                    });
                }

            });
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // let that = this;
        // let searchPageNum = that.data.searchPageNum+1,//把第几次加载次数作为参数
        //     callbackcount =that.data.callbackcount; //返回数据的个数
        // console.log("到底部了");
        // if(that.data.searchLoadingComplete === false){
        //     that.setData({
        //         searchLoading: true
        //     });
        // }
        // console.log("加载数据",that.data.searchLoading);
        // console.log("加载完成",that.data.searchLoadingComplete);
        // if(that.data.searchLoading && !that.data.searchLoadingComplete){
        //     that.setData({
        //         searchPageNum: that.data.searchPageNum+1,  //每次触发上拉事件，把searchPageNum+1
        //         isFromSearch: false,  //触发到上拉事件，把isFromSearch设为为false
        //     });
        //     that.BottomLoad();
        //     console.log("that.data.searchPageNum",that.data.searchPageNum);
        //     console.log("wojiu看看",that.data.searchLoading);
        // }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});