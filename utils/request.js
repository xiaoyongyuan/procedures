/**
 *
 * 服务器域名
 */
var rootDocment = 'http://api.aokecloud.cn';
const app = getApp();

/**
 * 封装post请求
 * @param url
 * @param data
 */

function postReq(url,data,callback) {
    wx.showLoading({
        title: '加载中',
    });
    var user = wx.getStorageSync('user');
    var account = wx.getStorageSync('account');
    wx.request({
        url: rootDocment + url,
        data: Object.assign(
            {
                wxaccount: '123456',
                user:user,
                account:account,
                wxtype:'1',
                comid:'1000004',
            },data
        ),
        method: 'POST',
        success: function (res) {
            wx.hideLoading();
            //typeof callback == "function" && callback(res.data) 我的理解是
            // 利用的&&的运算规律，首先判断cb是不是一个方法，
            // 这里的==可以作为类型是否相当的判断，
            // 然后在&&中如果前面的不满足，
            // 后面的则不会执行；如果是cb是一个方法，调用cb方法，
            // 并且传入success成功回调的userinfo参数
            // 并且return 的是回调函数，而不是具体的数据
            return typeof callback === "function" && callback(res.data)
        },
        fail: function () {
            wx.hideLoading();
            wx.showModal({
                title: '网络错误',
                content: '网络出错，请刷新重试',
                showCancel: false
            });
            return typeof callback === "function" && callback(false)
        }
    })
}
module.exports = {
    postReq: postReq,
};
