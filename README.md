# ofo-xcx
用微信小程序实现的OFO共享单车界面


参考：


http://www.jianshu.com/p/3f9b78c68887?utm_campaign=hugo&utm_medium=reader_share&utm_content=note&utm_source=weixin-friends#


# 地图功能实现 #

## 1. 创建新的空白项目 ##

在创建的默认程序中，出现如下错误信息:
```
编译 .wxml 文件错误，错误信息：未找到页面 pages/index/index 对应的wxml文件

```

注意要选择文件目录，确保此文件目录为空







# 知识点 #


---------
rpx 是什么意思？

【答】rpx单位是微信小程序中css的尺寸单位，rpx可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

---------
vh 是什么意思？

【答】CSS中相对长度单位，表示相对视口高度（Viewport Height），1vh = 1% * 视口高度。


---------
CSS3 display: flex;

【答】 弹性盒模型（多栏多列）布局

flex-flow:   row  / column


1. display:flex 多栏多列布局
http://www.360doc.com/content/14/0811/01/2633_400926000.shtml


2. 浅谈CSS3中display属性
http://www.cnblogs.com/xuyuntao/articles/6391728.html

```
 

justify-content

 1 .box { 2 justify-content: flex-start | flex-end | center | space-between | space-around; 3 } 

项目在主轴上的对齐方式(主轴究竟是哪个轴要看属性flex-direction的设置了)

flex-start：在主轴上由左或者上开始排列

flex-end：在主轴上由右或者下开始排列

center：在主轴上居中排列

space-between：在主轴上左右两端或者上下两端开始排列

space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

```
