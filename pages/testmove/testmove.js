Page({
    /**
     * 页面的初始数据
     */
    data: {
        navigationBarTitle: '版本',
        height:100,
        width:200
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        /**
         * 获取防区的宽和高
         */
        const query = wx.createSelectorQuery();
        query.select('#test').boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function (res) {
            console.log("res",res);
            that.setData({
                testHeight:res[0].height,
                testWidth:res[0].width
            });
        });

    },
    onChange(e) {
        var that = this;
        console.log("e",e);
        console.log("x1y1",e.detail.x,e.detail.y);
        console.log("x2y2",e.detail.x+that.data.testWidth,e.detail.y);
        console.log("x3y3",e.detail.x+that.data.testWidth,e.detail.y+that.data.testHeight);
        console.log("x4y4",e.detail.x,e.detail.y+that.data.testHeight);
        // that.setData({
        //     width:that.data.testWidth-20
        // })
    },
    bindscale(e){
        var that = this;
        console.log("bindscale",e);

    },
    htouchmove(e){
        console.log("htouchmove",e);
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
});