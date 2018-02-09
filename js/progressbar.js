/**
 * 组件空间中加入按钮类
 */
LC.Components.Progressbar = function() {
};
LC.Utils.extend(LC.Components.Progressbar, LC.Components.BasicComponent);
//获取进度条长度过渡效果运行时间Map
LC.Components.Progressbar.prototype.getRunningTime;
//(time, num) 设置进度条长度过渡效果运行时间，单位s（一次只能设置一个子进度条）
LC.Components.Progressbar.prototype.setRunningTime;
//获取进度条要运行到的百分比Map
LC.Components.Progressbar.prototype.getRunWidth;
//(width, num) 设置进度条要运行到的百分比（一次只能设置一个子进度条）
LC.Components.Progressbar.prototype.setRunWidth;
//(fn, num) 设置监听，在读条完成后调用函数（只能设置一个子进度条）
LC.Components.Progressbar.prototype.addListener;
//(fn, num) 移除监听，移除在读条完成后调用函数（只能设置一个子进度条）
LC.Components.Progressbar.prototype.removeListener;
//(str, num) 修改过渡效果(一次只能设置一个，除长度外，可以在尾部添加其他过渡效果)
//LC.Components.Progressbar.prototype.setTransition;
// 获取进度条过渡效果Map
//LC.Components.Progressbar.prototype.getTransition;
//(str, num) 还原过渡效果(一次只能设置一个)
//LC.Components.Progressbar.prototype.removeTransition;
//创建进度条的DOM对像,传入需要创建的子进度条的个数
LC.Components.Progressbar.prototype.creatDOM = function() {
	var sign = LC.CommonProperty.SIGN;
	//创建容器
	var progress = $("<div></div>").attr({
		sign : this.getSignID(),
		"class" : LC.CommonProperty.CSS_PROGRESS,
	});
	//创建显示进度
	var progressBar = $("<div></div>").attr({
		"class" : LC.CommonProperty.CSS_PROGRESS_BAR,
	});
	//创建影子
	var progressShadow = $("<div></div>").attr({
		"class" : LC.CommonProperty.CSS_PROGRESS_SHADOW,
	});
	progress.append(progressShadow).append(progressBar);
	this.dom = this.styleAlter(progress);
	this.dom.self = this;
	return this.dom;
};
//运行，开始读条到设定百分比
LC.Components.Progressbar.prototype.start;

/**
 * 组件空间中加入菜单工厂
 */
LC.Components.ProgressbarFactory = {
	/**
	 * 菜单，创建并返回一个关闭按钮html对象Menu，调用.append()加入页面中显示
	 * @param {String} _id 菜单id
	 * @param {String} _cssClass 菜单样式
	 */
	createProgressbar : function(_id,_cssClass) {
		var progressbar = new LC.Components.Progressbar();
		if (_cssClass){
			progressbar.setSignID(_id).creatDOM("div",_cssClass);
		}else{
			progressbar.setSignID(_id).creatDOM("div",null);
		}
		return progressbar;
	},
};