var activityArray;
var activityJson;
var activityJsonStr;
var list;
Page({
  data: {
    doingActivity:''
  }, 
  onLoad: function (options) {
    activityArray = new Array();
    var that=this
    wx.request({
      url: getApp().data.host_debug + '/Activity0/index',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        activityJson = res.data.activity;
        /*console.log('submit success activity0 create');
        console.log(activityJson);
        console.log('test activity0');*/
        activityJsonStr = JSON.stringify(activityJson);
        that.setData({
          doingActivity:activityJson
        });
      },
      fail: function (res) {
        console.log(res);
        console.log('submit fail too');
      },
      complete: function (res) {
        console.log('submit complete too');
      }
    })
  }
})
