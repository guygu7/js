/**
 * 组件空间中加入悬浮信息窗类
 */
LC.Components.InfoDIV = function() {
};
LC.Utils.extend(LC.Components.InfoDIV, LC.Components.BasicComponent);
LC.Components.InfoDIV.prototype.setText = function(text) {
	this.dom.append($("<div></div>").css({
		"margin" : "auto"
	}).append(text));
	return this;
};
/**
 * 组件空间中加入悬浮信息窗工厂
 */
LC.Components.InfoDIVFactory = {
	createInfoDIV : function(_id) {
		var infoDIV = new LC.Components.InfoDIV();
		infoDIV.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL).css({
			"pointer-events":"none",
			"width":"150px",
			"height":"235px"
		});
		//默认隐藏
		infoDIV.hide();
		infoDIV.addPositionMode("relative");
		return infoDIV;
	}
};
/**
 * 设定一个全局的信息窗口 
 */
LC.infoObj = LC.Components.InfoDIVFactory.createInfoDIV();

