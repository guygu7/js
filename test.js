/**
 * @author LC 命名空间  namespace
 */
var LC = {} ;

/**
 * 定义组件命名空间
 */
LC.Components = {};

/**
 * 组件空间中装入进度条类（传入进度条id:progressBarName,运行时间:tTime）
 */
LC.Components.ProgressBar = function(progressBarName,tTime){
	var totalTime = tTime;
	var date = new Date;
	var strTime = date.getTime();
	var endTime = strTime+totalTime;
	this.getTotalTime = function (){
		return totalTime;
	};
	this.setTotalTime = function (time){
		totalTime = time;
	};
	this.getStrTime = function (){
		return strTime;
	};
	this.getEndTime = function (){
		return endTime;
	};
	/**
	 * 设置进度条前进动画（传入进度条id:progressBarName,变量标记:setInterval）
	 */
	this.load = function (progressBarName){
		var nowDate = new Date;
		var nowTime = nowDate.getTime();//当前时间
		var usedTime = nowTime-strTime;//已经经过的时间
		var cd = usedTime / totalTime * 100;//经过时间与总时间的百分比
		if (cd>100)cd=100;
        $("#"+progressBarName).attr({
            style: "width: " + cd + "%;",
            value: "" + cd + "%"
        }).text(cd + "%");
        if (nowTime >= endTime) {
            clearInterval(this.interval);
        }
	};
};

/**
 * 组件空间中加入进度条工厂
 */
LC.Components.ProgressBarFactory = {
	/**
	 * 创建进度条方法
	 */
	createProgressBar : function(progressBarName,time){
		var progressBar = new LC.Components.ProgressBar(progressBarName,time);
		var interval = setInterval(progressBar.load,0.1,progressBarName);//设置定时器，0.05S运行一次
		progressBar.interval = interval;
		return progressBar;//返回一个进度条
	}
};



















