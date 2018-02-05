/**
 * 组件空间中加入面板类
 */
LC.Components.Panel = function() {
};
LC.Utils.extend(LC.Components.Panel, LC.Components.BasicComponent);
LC.Components.Panel.prototype.setText = function(text) {
	this.dom.append($("<div></div>").css({
		"margin" : "auto"
	}).append(text));
	return this;
};

/**
 * 组件空间中加入面板工厂
 */
LC.Components.PanelFactory = {
	/**
	 * 半透明面板，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} panelID 面板id
	 */
	createPanelTransparent : function(_id) {
		var panel = new LC.Components.Panel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL_TRANSPARENT);
		return panel;
	},
	/**
	 * 顶部标题栏，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} panelID 面板id
	 */
	createPanelTitle : function(_id) {
		var panel = new LC.Components.Panel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL_TITTLE).css({
			"width" : "100%",
			"height" : "23px"
		});
		return panel;
	},
	/**
	 * 基本面板，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} panelID 面板id
	 */
	createPanel : function(_id) {
		var panel = new LC.Components.Panel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL).css({
			"width" : "50px",
			"height" : "50px"
		});
		return panel;
	}
};

