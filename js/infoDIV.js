/**
 * 组件空间中加入悬浮信息窗类
 */
LC.Components.InfoDIV = function() {
};
LC.Utils.extend(LC.Components.InfoDIV, LC.Components.BasicComponent);
LC.Components.Button.prototype.setText = function(text) {
	this.dom.append($("<div></div>").css({
		"margin" : "auto"
	}).append(text));
	return this;
};
/**
 * 组件空间中加入悬浮信息窗工厂
 */
LC.Components.InfoDIVFactory = {
	createButtonDropdown : function(_id) {
		var button = new LC.Components.InfoDIV();
		
	}
};