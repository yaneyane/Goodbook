Page({
  data: {
    adminEntry_image: "https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/entry.png",
    partcipate_image: "https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/participate.png",
    logo_image:
    "https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/logo.png",
    check_image: "https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/check.png"
  },
    
  adminEntry: function(param){
    wx.navigateTo({
      url: '/pages/adminLogin/adminLogin',
    })
  },
  participate: function (param) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        //此处为获取微信信息后的业务方法
      },
      fail: function () {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../tologin/tologin',
              })
            }
          }
        })
      }
    }),
    wx.navigateTo({
      url: '/pages/userActivityDoing/userActivityDoing',
    })
  },
  check: function (param) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        //此处为获取微信信息后的业务方法
      },
      fail: function () {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../tologin/tologin',
              })
            }
          }
        })
      }
    }),
    wx.navigateTo({
      url: '/pages/awardSituation/awardSituation',
    })
  },
  onLoad: function (options) {
    var page = this;
    wx.login({
      success: function (res) {
        var code = res.code;//发送给服务器的code  
        wx.getUserInfo({
          success: function (res) {
            var userNick = res.userInfo.nickName;//用户昵称  
            var avataUrl = res.userInfo.avatarUrl;//用户头像地址  
            var gender = res.userInfo.gender;//用户性别  
            if (code) {
              wx.request({
                url: getApp().data.host_debug + '/Activity/test',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名  
                data: {
                  code: code,
                  nick: userNick,
                  avaurl: avataUrl,
                  sex: gender,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data);
                  wx.setStorageSync('name', res.data.name);//将获取信息写入本地缓存  
                  wx.setStorageSync('openid', res.data.openid);
                  wx.setStorageSync('imgUrl', res.data.imgurl);
                  wx.setStorageSync('sex', res.data.sex);
                }
              })
            }
            else {
              console.log("获取用户登录态失败！");
            }
          }
        })
      },
      fail: function (error) {
        console.log('login failed ' + error);
      }
    })
  }
})
