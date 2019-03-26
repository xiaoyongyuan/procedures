// pages/equip/equip.js
const app = getApp();
var request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:'树莓派企业测试账户1',
        // 这里是一些组件内部数据
        someData: {
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
        },
        equipListData: []
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
        request.postReq("/api/camera/getlist_forAPP",
            {
                // account:'17792542304'
                account:'18210812953'
            },
            function(res){
                that.setData({
                    equipListData:res.data
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
                        })
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
        request.postReq("/api/camera/getlist_forAPP",
            {
                // account:'17792542304'
                account:'18210812953'
            },
            function(res){
                that.setData({
                    equipListData:res.data
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
                        })
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