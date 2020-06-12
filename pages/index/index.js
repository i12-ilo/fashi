// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "jodie",
    useinfo: {},
    isShow: true
  },
  handleClick(){
//点击跳转到list页面
wx.switchTab({
  url: '/pages/list/list',
})
  },
  handleParent() {
    console.log("parent")
  },
  handleChild() {
    console.log("child")
  },
  handleGetUserInfo(data){
    // 判断用户点击的是否是允许
    if(data.detail.rawData){
// 用户点击的是允许，刷新页面
this.getUserInfo();
    }
  },
getUserInfo(){
  wx.getUserInfo({
    success: (data) => {
      console.log(data);
      // 更新当前页面中data中的数据
      this.setData({
        userInfo: data.userInfo
      })
    },
    fail: (data) => {
      console.log(data)
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this是当前页面的实例对象
    // 判断用户是否授权了
    wx.getSetting({
      success: (data) => {
        console.log(data);
        if (data.authSetting['scope.userInfo']) {
          // 用户已经授权
          this.setData({
            isShow: false
          })
        } else {
          // 没有授权
        }

      }
    })
   this.getUserInfo()
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})