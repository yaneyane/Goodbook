var activityArray;
var activityJson;
var activityJsonStr;
Page({
  data: {
    adminActivityDone:''
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().data.host_debug + '/Activity1/index',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log('submit success activity1 create');
        console.log(res.data);
        console.log('test activity1');
      },
      fail: function (res) {
        console.log('submit fail too');
      },
      complete: function (res) {
        console.log('submit complete too');
      }
    })
  }
})