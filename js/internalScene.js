/**
 * 组件空间中装入内部场景类
 */
LC.Components.internalScene=function(){};
LC.Utils.extend(LC.Components.internalScene,LC.Components.BasicComponent);
//添加一个内部场景集合,用于集中控制
LC.Components.internalScene.prototype.internalSceneSet=new LC.Utils.Map();
//添加一个集中控制的内部场景到集中控制集合中
LC.Components.internalScene.prototype.addInternalSceneSet=function(name,internalScene){
	LC.Components.internalScene.prototype.internalSceneSet.put(name,internalScene);
	return this;
};
//集中控制：内部场景切换，隐藏全部内部场景
LC.Components.internalScene.prototype.hideAll = function(){
	var sceneArr = LC.Components.internalScene.prototype.internalSceneSet.values();
	for (var i=0; i < sceneArr.length; i++) {
	  //清空数据
	  if(sceneArr[i].clearData){
	  	sceneArr[i].clearData();
	  }
	  //隐藏
	  sceneArr[i].hide();
	};
};
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