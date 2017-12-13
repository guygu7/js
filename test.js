/**
 * @author LC 命名空间  namespace
 */
var LC = {} ;

/**
 * 定义组件明明空间
 */
LC.Components = {};

/**
 * 组件空间中装入进度条类
 */
LC.Components.ProgressBar = function(tTime){
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
	 * 设置进度条前进动画
	 */
	this.load = function (sign){
		var nowDate = new Date;
		var nowTime = nowDate.getTime();//当前时间
		var usedTime = nowTime-strTime;//已经经过的时间
		var cd = usedTime / totalTime * 100;//经过时间与总时间的百分比
        $("#progressBar").attr({
            style: "width: " + cd + "%;",
            value: "" + cd + "%"
        }).text(cd + "%");
        if (nowTime >= endTime) {
            clearInterval(sign);
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
	createProgressBar : function(time){
		var progressBar = new LC.Components.ProgressBar(time);
		return progressBar;//返回一个进度条
	}
};

/**
 * 调用setInterval定时执行，使对象进度条进度前进
 */
