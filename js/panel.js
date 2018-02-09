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
	 * @param {String} _id 面板id
	 * @param {Number} _width 宽度
	 * @param {Number} _height 高度
	 */
	createPanel : function(_id,_width,_height) {
		if(!_width){_width = "200px";}
		if(!_height){_height = "150px";}
		var panel = new LC.Components.Panel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL).css({
			"width" : _width,
			"height" : _height
		});
		return panel;
	},
	/**
	 * 空样式面板，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} _id 面板id
	 * @param {Number} _width 宽度
	 * @param {Number} _height 高度
	 */
	createPanelEmpty : function(_id,_width,_height) {
		if(!_width){_width = "200px";}
		if(!_height){_height = "150px";}
		var panel = new LC.Components.Panel();
		panel.setSignID(_id).creatDOM("div",LC.CommonProperty.CSS_PANEL_AIR).css({
			"width" : _width,
			"height" : _height
		});
		return panel;
	},
	/**
	 * 小格子，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} _id 面板id
	 * @param {Number} _width 宽度
	 * @param {Number} _height 高度
	 */
	createPanelLattice : function(_id,_width,_height) {
		if(!_width){_width = "50px";}
		if(!_height){_height = "50px";}
		var panel = new LC.Components.Panel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL).css({
			"width" : _width,
			"height" : _height
		});
		return panel;
	}
};

