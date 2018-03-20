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
	createPanel : function(){
		var panel = new LC.Components.Panel();
		//定义响应方法集合
		var _responseMethods = new LC.Utils.Map();
		//传入 监听方法名 和 响应方法函数 ，存入（注意：同一方法名只能有一个，再次存入会覆盖）
		panel.addResponseMethod = function(methodName,fn) {
			_responseMethods.put(methodName,fn);
			return this;
		};
		//传入 监听方法名 ，移除对应响应方法函数
		panel.removeResponseMethod = function(methodName) {
			_responseMethods.removeByKey(methodName);
			return this;
		};
		//获取所有响应方法函数的Map集合
		panel.getResponseMethods= function() {
			return _responseMethods;
		};
		//获取单个响应方法函数
		panel.getResponseMethod= function(methodName) {
			return _responseMethods.get(methodName);
		};
		return panel;
	},
	/**
	 * 半透明面板，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} panelID 面板id
	 */
	createPanelTransparent : function(_id,_width,_height) {
		if(!_width){_width = "100%";}
		if(!_height){_height = "100%";}
		var panel = new LC.Components.PanelFactory.createPanel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL_TRANSPARENT).css({
			"width" : _width,
			"height" : _height
		});
		return panel;
	},
	/**
	 * 顶部标题栏，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} panelID 面板id
	 */
	createPanelTitle : function(_id) {
		var panel = new LC.Components.PanelFactory.createPanel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL_TITTLE).css({
			"width" : "99%",
			"height" : "23px"
		});
		return panel;
	},
	/**
	 * 基本面板，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} _id 面板id
	 * @param {Number} _width 宽度
	 * @param {Number} _height 高度
	 * @param {Number} _cssStyle css样式，不传则为默认样式
	 */
	createPanelBasic : function(_id,_width,_height,_cssStyle) {
		if(!_width){_width = "98%";}
		if(!_height){_height = "98%";}
		if(!_cssStyle){_cssStyle = LC.CommonProperty.CSS_PANEL;}
		var panel = new LC.Components.PanelFactory.createPanel();
		panel.setSignID(_id).creatDOM("div", _cssStyle).css({
			"width" : _width,
			"height" : _height,
			"float":"left",
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
		if(!_width){_width = "98%";}
		if(!_height){_height = "98%";}
		var panel = new LC.Components.PanelFactory.createPanel();
		panel.setSignID(_id).creatDOM("div",LC.CommonProperty.CSS_PANEL_AIR).css({
			"width" : _width,
			"height" : _height
		});
		return panel;
	},
	/**
	 * 规范小格子，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * 参数:</br>
	 * _gridSize 格子大小("big"|"small"|像素px),_id id
	 * @param {String} _id 面板id
	 * @param {Number} _gridSize
	 */
	createGrid : function(_id,_gridSize) {
		var gridWidth = "40px";
		var gridHeight = "40px";
		if(_gridSize){
			if ("big"==_gridSize) {
				gridWidth = "60px";
				gridHeight = "60px";
			}else if("small"==_gridSize){
				var gridWidth = "25px";
				var gridHeight = "25px";
			}else {
				gridWidth = _gridSize;
				gridHeight =_gridSize;
			}
		}
		var panel = new LC.Components.PanelFactory.createPanel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL).css({
			"width" : gridWidth,
			"height" : gridHeight
		});
		return panel;
	},
	/**
	 * 自定义宽高小格子，创建并返回一个面板html对象panel，调用.append()加入页面中显示
	 * @param {String} _id 面板id
	 * @param {Number} _width 宽度
	 * @param {Number} _height 高度
	 */
	createGridDiv : function(_id,_width,_height) {
		if(!_width){_width = "50px";}
		if(!_height){_height = "50px";}
		var panel = new LC.Components.PanelFactory.createPanel();
		panel.setSignID(_id).creatDOM("div", LC.CommonProperty.CSS_PANEL).css({
			"width" : _width,
			"height" : _height
		});
		return panel;
	},
	/**
	 * 创建遮罩层
	 * @param {Object} _id
	 */
	createMaskLayer : function(_id){
		var panel = new LC.Components.PanelFactory.createPanel();
		if(!_id){panel.setSignID(_id);}
		panel.creatDOM("div",LC.CommonProperty.CSS_MASKLAYER);
		return panel;
	},
};

