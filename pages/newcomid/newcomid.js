Page({
    // /**
    //  * 临时解绑
    //  */
    // delwx:function(){
    //     wx.login({
    //         success: res => {
    //             console.log('loginCode:', res.code);
    //             // 发送 res.code 到后台换取 用户的唯一标识（openid）, 本次登录的会话密钥（session_key）等, unionId
    //             // ------ 获取凭证 ------
    //             var code = res.code;
    //             if (code) {
    //                 console.log('获取用户登录凭证：' + code);
    //                 /**
    //                  * 临时解绑微信号
    //                  */
    //                 wx.request({
    //                     url: 'https://api.aokecloud.cn/api/wxuser/del',
    //                     data: {
    //                         xcode:code
    //                     },
    //                     method: 'POST',
    //                     success(res) {
    //                         //接口疑似有问题
    //                         //1、注册了没绑定
    //                         //2、注册了也绑定了
    //                         //3、没注册
    //                         console.log("解绑",res);
    //                     }
    //                 });
    //             } else {
    //                 console.log('获取用户登录失败：' + res.errMsg);
    //             }
    //         }
    //     });
    // },
});