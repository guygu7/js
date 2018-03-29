//依赖-js/internalScene.js
//**********交互对象交互界面，视图构建*********
//internalSceneInteraction.dom.append();
//交互按钮
//返回
var moveInternalSceneStronghold = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
LC.DefaultInternalScene.internalSceneInteraction.dom.append(moveInternalSceneStronghold.dom);
moveInternalSceneStronghold.dom.bind("click", function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_INTERACTION) {//判断当前活动的场景是否为：交互对象交互界面
		//当前活动的场景变更为：内部据点界面
		LC.GlobalVar.CURRENT_INTERNAL_SCENE = LC.CommonProperty.INTERNAL_SCENE_STRONGHOLD;
		//判断是否可以返回（未实现）
		//进入，隐藏其他界面，显示-内部据点界面
		LC.DefaultInternalScene.switchScene(LC.DefaultInternalScene.internalSceneStronghold);
		/*
		LC.DefaultInternalScene.hide();
		LC.DefaultInternalScene.internalSceneStronghold.show();
		//移动菜单
		//LC.DefaultInternalScene.internalSceneStronghold.dom.append(menu.dom);
		//注意，清空监听！(默认清空当前所在plat对象)
		LC.DefaultInternalScene.clearData();
		//内部据点界面 载入数据
		LC.DefaultInternalScene.internalSceneStronghold.loadData(LC.GlobalVar.CURRENT_LOCATION);
		*/
	}
	
	
});
/**
 *  传入plat地图实例,内部场景-内部据点界面装入地图数据，同时绑定监听（用于更新界面数据）
 *  ps：由于每个场景都不一样，载入清除页面数据方法都需要单独定义
 */
LC.DefaultInternalScene.internalSceneInteraction.loadData = function(plat) {
	
};
LC.DefaultInternalScene.internalSceneInteraction.clearData = function(plat) {
};