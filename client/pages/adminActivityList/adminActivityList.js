// pages/lotteryList/lotteryList.js
Page({
  data: {
    doing_image: "https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/doing.png",
    done_image: "https://wafer-1256477980.cos.ap-guangzhou.myqcloud.com/background/end.png"
  },
  activityDoing: function (e) {
    wx.navigateTo({
      url: '/pages/adminActivityDoing/adminActivityDoing',
    })
  },
  activityDone: function (e) {
    wx.navigateTo({
      url: '/pages/adminActivityDone/adminActivityDone',
    })
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
})