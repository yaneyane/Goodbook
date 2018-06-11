var activityArray;
var activityJson;
var activityJsonStr;
Page({
  data: {
    userActivitydoing:''
  },
  paticipate: function (e) {
    var that = this
    var i = e.currentTarget.dataset.index
    e.detail.value = that.data.userActivitydoing[i].ActivityID;
    wx.request({
      url: getApp().data.host_debug + '/Activity00/index',
      method: 'POST',
      data: e.detail.value,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(e.detail.value);
        console.log('test activity00');
      },
      fail: function (res) {
        console.log('submit fail too');
      },
      complete: function (res) {
        console.log('submit complete too');
      }
    })
    wx.showToast({
      title: '参加成功！',
    })
  },
  ret: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().data.host_debug + '/Activity00/index',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        activityJson = res.data.activity;
        activityJsonStr = JSON.stringify(activityJson);
        that.setData({
          userActivitydoing: activityJson
        });
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  onShareAppMessage: function () {
      return {
        title: '好书送送送不停',
        desc: '好书送不停 幸运大抽奖',
        path: '/page/userActivityDoing/userActivityDoing'
      },
        wx.showToast({
          title: '分享成功！',
        })
  }
})