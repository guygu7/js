/**
 * 组件空间中加入角标类
 */
LC.Components.CornerSign = function() {
};
LC.Utils.extend(LC.Components.CornerSign, LC.Components.BasicComponent);
LC.Components.CornerSign.prototype.setText = function(text) {
	this.dom.append($("<div></div>").css({
		"margin" : "auto"
	}).append(text));
	return this;
};
/**
 * 组件空间中加入角标工厂
 */
LC.Components.CornerSignFactory = {
	/**
	 * 右上角标，创建并返回一个关闭按钮html对象CornerSign，调用.append()加入页面中显示
	 * @param {Object} buttonID 菜单id
	 */
	createCornerSign : function(_id) {
		var cornerSign = new LC.Components.CornerSign();
		cornerSign.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_CORNERSIGN+LC.CommonProperty.CSS_POSITION_UPPERRIGHT);
		return cornerSign;
	}
};