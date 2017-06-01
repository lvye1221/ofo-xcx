//index.js
//获取应用实例
var app = getApp()
Page({
	data: {
		scale: 18,
		latitude: 0,
		longitude: 0
	},
	onLoad: function () {
		// 1.页面初始化 options为页面跳转所带来的参数

		// 2.调用wx.getLocation系统API,获取并设置当前位置经纬度
			// ...已省略

		// 3.设置地图控件的位置及大小，通过设备宽高定位
		wx.getSystemInfo({ // 系统API,获取系统信息，比如设备宽高
			success: (res) => {
				// 定义控件数组，可以在data对象初始化为[],也可以不初始化，取决于是否需要更好的阅读
				this.setData({
					controls: [{
						id: 1,
						iconPath: "/images/location.png",
						position: { // 控件位置
							left: 20, // 单位px
							top: res.windowHeight - 80, // 根据设备高度设置top值，可以做到在不同设备上效果一致
							width: 50, // 控件宽度/px
							height: 50 // 控件高度/px
						},
						clickable: true // 是否可点击，默认为true,可点击
					}, {
						id: 2,
						iconPath: '/images/use.png',
						position: {
							left: res.windowWidth/2 - 45,
							top: res.windowHeight - 100,
							width: 90,
							height: 90
						},
						clickable: true
					}, {
						id: 3,
						iconPath: '/images/warn.png',
						position: {
							left: res.windowWidth - 70,
							top: res.windowHeight - 80,
							width: 50,
							height: 50
						},
						clickable: true
					}, {
						id: 4,
						iconPath: '/images/marker.png',
						position: {
							left: res.windowWidth/2 - 11,
							top: res.windowHeight/2 - 45,
							width: 22,
							height: 45
						},
						clickable: false
					}, {
						id: 5,
						iconPath: '/images/avatar.png',
						position: {
							left: res.windowWidth - 68,
							top: res.windowHeight - 155,
							width: 45,
							height: 45
						},
						clickable: true
					}]
				});
			}
		});
	}
})
