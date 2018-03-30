//依赖-js/internalScene.js
//**********交互对象交互界面，视图构建*********
//internalSceneInteraction.dom.append();
//交互按钮
//1区域
var interactiveAction1 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveAction1.hide();
interactiveAction1.dom.bind("click", function() {
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_INTERACTION) {//判断当前活动的场景是否为：交互对象交互界面
		//判断是否可以交互
		//进入，隐藏其他界面，显示-交互对象交互界面
		alert("进行交互操作1");
	}
});
var interactiveAction2 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveAction2.hide();
var interactiveAction3 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveAction3.hide();
//2区域
var interactiveAction4 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveAction4.hide();
var interactiveAction5 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveAction5.hide();
var interactiveAction6 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveAction6.hide();

LC.DefaultInternalScene.internalSceneInteraction.dom.append(interactiveAction1.dom).append(interactiveAction2.dom).append(interactiveAction3.dom).append(interactiveAction4.dom).append(interactiveAction5.dom).append(interactiveAction6.dom);


//返回按钮
var moveInternalSceneStronghold = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
LC.DefaultInternalScene.internalSceneInteraction.dom.append(moveInternalSceneStronghold.dom);
moveInternalSceneStronghold.dom.bind("click", function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_INTERACTION) {//判断当前活动的场景是否为：交互对象交互界面
		//当前活动的场景变更为：内部据点界面
		LC.GlobalVar.CURRENT_INTERNAL_SCENE = LC.CommonProperty.INTERNAL_SCENE_STRONGHOLD;
		//判断是否可以返回（未实现）
		//进入，隐藏其他界面，显示-内部据点界面
		LC.DefaultInternalScene.switchScene(LC.DefaultInternalScene.internalSceneStronghold);
	}
});
/**
 *  传入role交互对象实例,内部场景-交互对象交互界面装入交互对象数据，同时绑定监听（用于更新界面数据）
 *  ps：由于每个场景都不一样，载入清除页面数据方法都需要单独定义
 */
LC.DefaultInternalScene.internalSceneInteraction.loadData = function(role) {
	//清除原有数据,避免数据残留;
	LC.DefaultInternalScene.internalSceneInteraction.clearData(role);
	//重新载入数据
	moveInternalSceneStronghold.dom.text("返回");
	moveInternalSceneStronghold.show();
	//读取可交互动作数据
	var objMap = role.getActionMap();
	//判断里面至少有1个交互动作对象
	if (null != objMap) {
		if (objMap.size() > 0) {
			//获取所有对象数组
			objarr = objMap.values();
			//遍历写入
			var i1 = 0,
			    i2 = 0;
			for (var i = 0; i < objarr.length; i++) {
				if (objarr[i].getType() == LC.Data.CommonProperty.ACTION.ACTION_TYPE.TYPE1) {
					switch(i1) {
					case 0:
						interactiveAction1.dom.text(objarr[i].getName());
						//暂存对象
						//interactiveAction1.role = objarr[i];
						interactiveAction1.show();
						i1++;
						break;
					case 1:
						interactiveAction2.dom.text(objarr[i].getName());
						//暂存对象
						//interactiveAction2.role = objarr[i];
						interactiveAction2.show();
						i1++;
						break;
					case 2:
						interactiveAction3.dom.text(objarr[i].getName());
						//暂存对象
						//interactiveAction3.role = objarr[i];
						interactiveAction3.show();
						i1++;
						break;
					default:
					}
				} else if (objarr[i].getType() == LC.Data.CommonProperty.ACTION.ACTION_TYPE.TYPE2) {
					switch(i2) {
					case 0:
						interactiveAction4.dom.text(objarr[i].getName());
						//暂存对象
						//interactiveAction4.role = objarr[i];
						interactiveAction4.show();
						i2++;
						break;
					case 1:
						interactiveAction5.dom.text(objarr[i].getName());
						//暂存对象
						//interactiveAction5.role = objarr[i];
						interactiveAction5.show();
						i2++;
						break;
					case 2:
						interactiveAction6.dom.text(objarr[i].getName());
						//暂存对象
						//interactiveAction6.role = objarr[i];
						interactiveAction6.show();
						i2++;
						break;
					default:
					}
				}
			};
		}
	}
	//添加监听
	role.addListener(LC.DefaultInternalScene.internalSceneInteraction);
};
LC.DefaultInternalScene.internalSceneInteraction.clearData = function(role) {
	moveInternalSceneBasic.dom.text("");
	moveInternalSceneBasic.hide();
	interactiveAction1.dom.text("");
	interactiveAction1.hide();
	interactiveAction2.dom.text("");
	interactiveAction2.hide();
	interactiveAction3.dom.text("");
	interactiveAction3.hide();
	interactiveAction4.dom.text("");
	interactiveAction4.hide();
	interactiveAction5.dom.text("");
	interactiveAction5.hide();
	interactiveAction6.dom.text("");
	interactiveAction6.hide();
	//清除暂存对象
	/*
	interactiveObject1.role = null;
	interactiveObject2.role = null;
	interactiveObject3.role = null;
	interactiveObject4.role = null;
	interactiveObject5.role = null;
	interactiveObject6.role = null;
	*/
	//移除监听
	role.removeListener(LC.DefaultInternalScene.internalSceneInteraction);
};