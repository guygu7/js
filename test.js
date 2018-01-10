/**
 * @author LC 命名空间  namespace
 */
var LC = {};
/**
 * 定义工具空间
 */
LC.Utils={};
/**
 * EXTEND method继承方法(子,父)
 * @param {Object} sub 子
 * @param {Object} sup 父
 */			
LC.Utils.extend=function(sub ,sup){
	 // 目的： 实现只继承父类的原型对象
	 var F = new Function();	// 1 创建一个空函数    目的：空函数进行中转
	 new sup();//父类初始化
	 F.prototype = sup.prototype; // 2 实现空函数的原型对象和超类的原型对象转换
	 sub.prototype = new F(); 	// 3 原型继承 
	 sub.prototype.constructor = sub ; // 4还原子类的构造器
	 //保存一下父类的原型对象: 一方面方便解耦  另一方面方便获得父类的原型对象
	 sub.superClass = sup.prototype; //自定义一个子类的静态属性 接受父类的原型对象
	 //判断父类的原型对象的构造器 (加保险)
	 if(sup.prototype.constructor == Object.prototype.constructor){
	 	sup.prototype.constructor = sup ; //手动欢迎父类原型对象的构造器
	 }
};
/**
 * 公共属性字典
 */
LC.CommonProperty = {
	sign : "lcsign" //通用标记属性，替代id
};
/**
 * 定义组件命名空间
 */
LC.Components = {};
/**
 * 组件所用到的公共方法集合
 */
LC.Components.ComponentFunction = {
};
/**
 * 组件空间中装入进度条类
 * @param {Object} progressID 进度条id
 */
LC.Components.ProgressBar = function(progressID) {
	//进度条自定义ID
	var signID = progressID;
	if ( typeof this.getSignID != 'function') {
		LC.Components.ProgressBar.prototype.getSignID = function() {
			return signID;
		};
	};
	if ( typeof this.setSignID != 'function') {
		LC.Components.ProgressBar.prototype.setSignID = function(ID) {
			signID = ID;
			return this;
		};
	};
	//进度条div设置从0%到100%的运行时间
	var runningTime = 0;
	if ( typeof this.getRunningTime != 'function') {
		LC.Components.ProgressBar.prototype.getRunningTime = function(time) {
			return time;
		};
	};
	/**
	 * 设置运行时间，单位s
	 * @param {Object} time 运行时间
	 */
	if ( typeof this.setRunningTime != 'function') {
		LC.Components.ProgressBar.prototype.setRunningTime = function(time) {
			runningTime = time;
			return this;
		};
	};
	/**
	 * 进度条样式修改(子类使用)
	 */
	if ( typeof this.styleAlter != 'function') {
		LC.Components.ProgressBar.prototype.styleAlter = function(progress){return progress;};
	};
	/**
	 * 获取进度条的DOM对像，通过.append()加入页面
	 * @param {Object} id 进度条id
	 */
	if ( typeof this.progressDOM != 'object') {
		//如果不存在则执行一次创建，赋值常量getProgressDOM，存在可以直接获取对象
		LC.Components.ProgressBar.prototype.progressDOM = (function() {
			var sign = LC.CommonProperty.sign;
			var progress = $("<div></div>").attr({
				sign : signID,
				"class" : "progress"
			}).append($("<div></div>").attr({
				"class" : "progress-bar progress-bar-striped active",
				"role" : "progressbar",
				"aria-valuenow" : "0",
				"aria-valuemin" : "0",
				"aria-valuemax" : "100"
			}));
			return LC.Components.ProgressBar.prototype.styleAlter(progress);
		})();
	};
	/**
	 * 设置监听，在读条完成后调用函数
	 */
	if ( typeof this.listener != 'function') {
		LC.Components.ProgressBar.prototype.listener = function(fn) {
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
			progressChilds.first()[0].addEventListener('transitionend', fn, false);
		};
	};
	/**
	 * 运行，开始读条
	 */
	if ( typeof this.start != 'function') {
		LC.Components.ProgressBar.prototype.start = function() {
			//获得组件内部div progressBar
			var progressChilds = this.progressDOM.children("div.progress-bar");
			//重新设置运行时间样式（安全设置，防止页面修改）
			progressChilds.first().css({
				"-webkit-transition" : " width " + runningTime + "s linear ",
				"-moz-transition" : " width " + runningTime + "s linear ",
				"-o-transition" : " width " + runningTime + "s linear ",
				"transition" : " width " + runningTime + "s linear "
			});
			progressChilds.first().css({
				"width" : "100%"
			});
			//影子div
			//progressChild.first().next();
			return this;
		};
	}
};
/**
 * 进度条style1样式
 */
LC.Components.ProgressBarStyle1 = function(){};
LC.Utils.extend(LC.Components.ProgressBarStyle1,LC.Components.ProgressBar);
LC.Components.ProgressBarStyle1.prototype.styleAlter=function(progress){
	//获得组件内部div progressBar
	var progressChilds = this.progressDOM.children("div.progress-bar");
	progressChilds.first().attr({"class":"progress-bar progress-bar-striped active"});
};
/**
 * 组件空间中加入进度条工厂
 */
LC.Components.ProgressBarFactory = {
	/**
	 * 创建并返回一个标识为传入name样式为style1的进度条html对象progress，请调用.append()加入页面中显示
	 * @param {Object} progressID 进度条id
	 */
	createProgressBar : function(progressID) {
		var returnProgress = new LC.Components.ProgressBar(progressID);
		return returnProgress;
	},
	createProgressBarStyle1 : function(progressID) {
		var returnProgress = new LC.Components.ProgressBarStyle1(progressID);
		return returnProgress;
	}
};
