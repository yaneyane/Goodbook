Page({
  data: {
    doing_image:"data:image/png;base64,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",
    done_image:"data:image/png;base64,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"
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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