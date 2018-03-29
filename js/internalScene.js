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
/**
 * 定义几个默认内部场景
 * 默认方法：loadData(plat),clearData(plat)
 */
LC.DefaultInternalScene = {
	/**
	 * 初始大地图界面
	 * 默认方法：loadData(plat),clearData(plat)
	 */
	internalSceneBasic : LC.Components.InternalSceneFactory.createInternalSceneBasic(null,"904px","404px"),
	/**
	 * 内部据点界面,初始隐藏
	 * 默认方法：loadData(plat),clearData(plat)
	 */
	internalSceneStronghold : LC.Components.InternalSceneFactory.createInternalSceneBasic(null,"904px","404px"),
	/**
	 * 交互对象交互界面,初始隐藏
	 * 默认方法：loadData(plat),clearData(plat)
	 */
	internalSceneInteraction : LC.Components.InternalSceneFactory.createInternalSceneBasic(null,"904px","404px"),
	/**
	 * 清空全部界面数据及监听 
	 */
	clearData : function(plat){
		if (null==plat) {
			plat = LC.GlobalVar.CURRENT_LOCATION;
		};
		LC.DefaultInternalScene.internalSceneBasic.clearData(plat);
		LC.DefaultInternalScene.internalSceneStronghold.clearData(plat);
		LC.DefaultInternalScene.internalSceneInteraction.clearData(plat);
		return plat;
	},
	/**
	 * 一键隐藏全部界面 
	 */
	hide : function(){
		LC.DefaultInternalScene.internalSceneBasic.hide();
		LC.DefaultInternalScene.internalSceneStronghold.hide();
		LC.DefaultInternalScene.internalSceneInteraction.hide();
	},
	/**
	 * 切换场景;
	 * （必须）传入即将跳转到的目标场景scene（LC.DefaultInternalScene.?），
	 * 1.隐藏全部场景；2.清除全部场景数据、监听；3.重新载入当前数据到目标场景scene
	 */
	switchScene : function(switchScene1){
		console.log(switchScene1);
		//进入，隐藏其他界面，显示-目标界面switchScene
		LC.DefaultInternalScene.hide();
		switchScene1.show();
		//移动菜单
		switchScene1.dom.append(menu.dom);
		//注意，清空监听！(默认清空当前所在plat对象)
		LC.DefaultInternalScene.clearData();
		//目标界面switchScene 载入数据
		switchScene1.loadData(LC.GlobalVar.CURRENT_LOCATION);
	},
};
/*
 * 界面切换范本
function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.??1) {//判断当前活动的场景是否为：??界面
		//当前活动的场景变更为：??1界面
		LC.GlobalVar.CURRENT_INTERNAL_SCENE = LC.CommonProperty.??2;
		//判断是否可以进入（未实现）
		//进入，隐藏其他界面，显示-??2界面
		LC.DefaultInternalScene.hide();
		LC.DefaultInternalScene.??2.show();
		//移动菜单
		//LC.DefaultInternalScene.internalSceneStronghold.dom.append(menu.dom);
		//注意，清空监听！(默认清空当前所在plat对象)
		LC.DefaultInternalScene.clearData();
		//??2界面 载入数据
		LC.DefaultInternalScene.??2.loadData(LC.GlobalVar.CURRENT_LOCATION);
	}
};
*/
