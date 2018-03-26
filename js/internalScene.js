/**
 * 组件空间中装入内部场景类
 */
LC.Components.internalScene=function(){};
LC.Utils.extend(LC.Components.internalScene,LC.Components.BasicComponent);
/**
 * 组件空间中加入内部场景工厂
 */
LC.Components.InternalSceneFactory = {
	createInternalScene : function(sceneID) {
		var scene = new LC.Components.internalScene();
		//定义监听响应方法集合
		LC.Components.ComponentFunction.responseMethod(scene);
		return scene;
	},
	/**
	 * 内部场景基本样式，创建并返回一个场景html对象scene，调用.append()加入页面中显示
	 * @param {Object} sceneID 场景id
	 */
	createInternalSceneBasic : function(_id,_width,_height,_cssStyle) {
		if(!_width){_width = "98%";}
		if(!_height){_height = "98%";}
		if(!_cssStyle){_cssStyle = LC.CommonProperty.CSS_PANEL;}
		var scene = new LC.Components.InternalSceneFactory.createInternalScene();
		scene.setSignID(_id).creatDOM("div", _cssStyle).css({
			"width" : _width,
			"height" : _height,
			"float":"left",
		});
		scene.addPositionMode("absolute");
		return scene;
	},
};