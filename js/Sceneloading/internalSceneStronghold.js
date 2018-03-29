//依赖-js/internalScene.js
//*********内部据点界面，视图构建***********
//定义可交互对象承载视图框
//1区域（用于装实际角色）
var interactiveObject1 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveObject1.hide();
interactiveObject1.dom.bind("click", function() {
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_STRONGHOLD) {//判断当前活动的场景是否为：内部据点界面
		//当前活动的场景变更为：交互对象交互界面
		LC.GlobalVar.CURRENT_INTERNAL_SCENE = LC.CommonProperty.INTERNAL_SCENE_INTERACTION;
		//判断是否可以交互|切换界面（未实现）
		//进入，隐藏其他界面，显示-交互对象交互界面
		LC.DefaultInternalScene.switchScene(LC.DefaultInternalScene.internalSceneInteraction);
	}
});
var interactiveObject2 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveObject2.hide();
var interactiveObject3 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveObject3.hide();
//2区域（用于装静态建筑）
var interactiveObject4 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveObject4.hide();
var interactiveObject5 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveObject5.hide();
var interactiveObject6 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
interactiveObject6.hide();

LC.DefaultInternalScene.internalSceneStronghold.dom.append(interactiveObject1.dom).append(interactiveObject2.dom).append(interactiveObject3.dom).append(interactiveObject4.dom).append(interactiveObject5.dom).append(interactiveObject6.dom);
//定义移动按钮，移动到其他地方
//返回地图
var moveInternalSceneBasic = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");
LC.DefaultInternalScene.internalSceneStronghold.dom.append(moveInternalSceneBasic.dom);
moveInternalSceneBasic.dom.bind("click", function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_STRONGHOLD) {//判断当前活动的场景是否为：内部据点界面
		//当前活动的场景变更为：大地图界面
		LC.GlobalVar.CURRENT_INTERNAL_SCENE = LC.CommonProperty.INTERNAL_SCENE_BASIC;
		//判断是否可以返回（未实现）
		//返回，隐藏其他界面，显示-大地图界面
		LC.DefaultInternalScene.switchScene(LC.DefaultInternalScene.internalSceneBasic);
	}
});
//可能移动至其他地方
var move1 = LC.Components.PanelFactory.createPanelBasic("", "40px", "25px");

/**
 *  传入plat地图实例,内部场景-内部据点界面装入地图数据，同时绑定监听（用于更新界面数据）
 *  ps：由于每个场景都不一样，载入清除页面数据方法都需要单独定义
 */
LC.DefaultInternalScene.internalSceneStronghold.loadData = function(plat) {
	//清除原有数据,避免数据残留;
	LC.DefaultInternalScene.internalSceneStronghold.clearData(plat);
	//重新载入数据
	moveInternalSceneBasic.dom.text("返回大地图");
	moveInternalSceneBasic.show();
	//读取交互对象数据
	var objMap = plat.getRoleMap();
	//判断里面至少有1个交互对象
	if (null != objMap) {
		if (objMap.size() > 0) {
			//获取所有对象数组
			objarr = objMap.values();
			//遍历写入
			var i1 = 0,
			    i2 = 0;
			for (var i = 0; i < objarr.length; i++) {
				if (objarr[i].getType() == LC.Data.CommonProperty.ROLE.ROLE_TYPE.NPC) {
					switch(i1) {
					case 0:
						interactiveObject1.dom.text(objarr[i].getName());
						interactiveObject1.show();
						i1++;
						break;
					case 1:
						interactiveObject2.dom.text(objarr[i].getName());
						interactiveObject2.show();
						i1++;
						break;
					case 2:
						interactiveObject3.dom.text(objarr[i].getName());
						interactiveObject3.show();
						i1++;
						break;
					default:
					}
				} else if (objarr[i].getType() == LC.Data.CommonProperty.ROLE.ROLE_TYPE.BUILDING) {
					switch(i2) {
					case 0:
						interactiveObject4.dom.text(objarr[i].getName());
						interactiveObject4.show();
						i2++;
						break;
					case 1:
						interactiveObject5.dom.text(objarr[i].getName());
						interactiveObject5.show();
						i2++;
						break;
					case 2:
						interactiveObject6.dom.text(objarr[i].getName());
						interactiveObject6.show();
						i2++;
						break;
					default:
					}
				}
			};
		}
	}
	//添加监听
	plat.addListener(LC.DefaultInternalScene.internalSceneStronghold);
};
/**
 *  清除场景中的数据,同时解绑监听;
 * 	注意：必须传入plat对象解绑监听！
 *  ps：由于每个场景都不一样，载入清除页面数据方法都需要单独定义
 */
LC.DefaultInternalScene.internalSceneStronghold.clearData = function(plat) {
	moveInternalSceneBasic.dom.text("");
	moveInternalSceneBasic.hide();
	interactiveObject1.dom.text("");
	interactiveObject1.hide();
	interactiveObject2.dom.text("");
	interactiveObject2.hide();
	interactiveObject3.dom.text("");
	interactiveObject3.hide();
	interactiveObject4.dom.text("");
	interactiveObject4.hide();
	interactiveObject5.dom.text("");
	interactiveObject5.hide();
	interactiveObject6.dom.text("");
	interactiveObject6.hide();
	//移除监听
	plat.removeListener(LC.DefaultInternalScene.internalSceneStronghold);
};
