// pages/detail/detail.js
let datas = require("../../datas/list-data.js");
let appDates = getApp();
console.log(appDates,typeof appDates)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  handleCollection() {
    let isCollected = !this.data.isCollected;
    // 更新状态
    this.setData({
      isCollected
    });
    // 提示用户
    let title = isCollected ? "收藏成功" : "取消收藏";
    wx.showToast({
      title,
      icon: "success"
    });
    // 缓存数据到本地
    let {
      index
    } = this.data;
    wx.getStorage({
      key: 'isCollected',
      success: function(datas) {
        let obj = datas.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log("缓存成功")
          }
        })
      },
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    // 获取参数值
    let index = options.index;
    // 更新data中的detailObj的状态值
    this.setData({
      detailObj: datas.list_data[index],
      index
    })
    // 根据本地缓存的数据判断用户是否收藏了当前文章
    let deatilStorage = wx.getStorageSync('isCollected');
    console.log(deatilStorage);
    if (!deatilStorage) {
      wx.setStorage({
        key: 'isCollected',
        data: {},
      })
    }
    // 判断用户是否收藏了
    if (deatilStorage[index]) { // 收藏过
      this.setData({
        isCollected: true
      })
    }
    // 监听音乐播放
    wx.onBackgroundAudioPlay(()=>{
      console.log("音乐播放");
      // 修改isMusicPlay状态值
      this.setData({
        isMusicPlay:true
      });
      // 修改appDatas中的数据
      appDates.data.isPlay = true;
      appDates.data.pageIndex = index;
    })
    // 监听音乐暂停
    wx.onBackgroundAudioPause(()=>{
      console.log("音乐暂停");
      this.setData({
        isMusicPlay:false
      })
      appDates.data.isPlay = false;
      // appDates.data.pageIndex = index;
    });
    // 判断音乐是否在播放
    if(appDates.data.isPlay&&appDates.data.pageIndex===index){
      this.setData({
        isMusicPlay:true
      })
    }
  },
  // 处理点击分享
  handleShare(){
    wx.showActionSheet({
      itemList: ["分享到朋友圈","分享到qq空间","分享到微博"],
    })
  },
  handleMusicPlay() {
    // 处理音乐播放
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    })
    // 控制音乐播放
    if (isMusicPlay) {
      // 播放音乐
      let {
        dataUrl,
        title
      } = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      // 暂停音乐
      wx.pauseBackgroundAudio();
    }
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