//依赖-js/internalScene.js
//**********大地图界面，视图构建*********
//主面板加入各种显示及按钮,同时绑定事件
/**
 * 向北移动的按钮
 */
var moveNorth = LC.Components.ButtonFactory.createButtonMove("top");
LC.DefaultInternalScene.internalSceneBasic.dom.append(moveNorth.dom);
moveNorth.dom.bind("click", function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_BASIC) {//判断当前活动的场景是否为：初始大地图界面
		if (LC.GlobalVar.CURRENT_LOCATION.getLink().get("top") == "true") {//判断是否可以移动
			//注意，清空监听！(默认清空当前所在plat对象，须在位置变更前执行)
			LC.DefaultInternalScene.clearData();
			//更新当前位置变量
			LC.GlobalVar.CURRENT_LOCATION = map.get(LC.GlobalVar.CURRENT_LOCATION.getPositionX() + "," + (Number(LC.GlobalVar.CURRENT_LOCATION.getPositionY()) - 1));
			//重新载入数据 
			LC.DefaultInternalScene.internalSceneBasic.loadData(LC.GlobalVar.CURRENT_LOCATION);
		}
	}
});
/**
 * 向东移动的按钮
 */
var moveEast = LC.Components.ButtonFactory.createButtonMove("right");
LC.DefaultInternalScene.internalSceneBasic.dom.append(moveEast.dom);
moveEast.dom.bind("click", function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_BASIC) {//判断当前活动的场景是否为：初始大地图界面
		if (LC.GlobalVar.CURRENT_LOCATION.getLink().get("right") == "true") {//判断是否可以移动
			//注意，清空监听！(默认清空当前所在plat对象，须在位置变更前执行)
			LC.DefaultInternalScene.clearData();
			//更新当前位置变量
			LC.GlobalVar.CURRENT_LOCATION = map.get((Number(LC.GlobalVar.CURRENT_LOCATION.getPositionX()) + 1) + "," + LC.GlobalVar.CURRENT_LOCATION.getPositionY());
			//重新载入数据 
			LC.DefaultInternalScene.internalSceneBasic.loadData(LC.GlobalVar.CURRENT_LOCATION);
		}
	}
});
/**
 * 向南移动的按钮
 */
var moveSouth = LC.Components.ButtonFactory.createButtonMove("bottom");
LC.DefaultInternalScene.internalSceneBasic.dom.append(moveSouth.dom);
moveSouth.dom.bind("click", function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_BASIC) {//判断当前活动的场景是否为：初始大地图界面
		if (LC.GlobalVar.CURRENT_LOCATION.getLink().get("bottom") == "true") {//判断是否可以移动
			//注意，清空监听！(默认清空当前所在plat对象，须在位置变更前执行)
			LC.DefaultInternalScene.clearData();
			//更新当前位置变量
			LC.GlobalVar.CURRENT_LOCATION = map.get(LC.GlobalVar.CURRENT_LOCATION.getPositionX() + "," + (Number(LC.GlobalVar.CURRENT_LOCATION.getPositionY()) + 1));
			//重新载入数据 
			LC.DefaultInternalScene.internalSceneBasic.loadData(LC.GlobalVar.CURRENT_LOCATION);
		}
	}
});
/**
 * 向西移动的按钮
 */
var moveWest = LC.Components.ButtonFactory.createButtonMove("left");
LC.DefaultInternalScene.internalSceneBasic.dom.append(moveWest.dom);
moveWest.dom.bind("click", function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_BASIC) {//判断当前活动的场景是否为：初始大地图界面
		if (LC.GlobalVar.CURRENT_LOCATION.getLink().get("left") == "true") {//判断是否可以移动
			//注意，清空监听！(默认清空当前所在plat对象，须在位置变更前执行)
			LC.DefaultInternalScene.clearData();
			//更新当前位置变量
			LC.GlobalVar.CURRENT_LOCATION = map.get((Number(LC.GlobalVar.CURRENT_LOCATION.getPositionX()) - 1) + "," + LC.GlobalVar.CURRENT_LOCATION.getPositionY());
			//重新载入数据
			LC.DefaultInternalScene.internalSceneBasic.loadData(LC.GlobalVar.CURRENT_LOCATION);
		}
	}
});
/**
 * 场景交互对象角色组 
 */
//创建table,并去掉小格子样式
var roleGroup = LC.Components.TableFactory.createTable(1, 10,"90px"," ");
LC.DefaultInternalScene.internalSceneBasic.dom.append(roleGroup.dom);
//定位
roleGroup.addCssClass(LC.CommonProperty.CSS_roleGroup);
role_1 = LC.Components.ButtonFactory.createButtonCircularMenu();
role_2 = LC.Components.ButtonFactory.createButtonCircularMenu();
role_3 = LC.Components.ButtonFactory.createButtonCircularMenu();
roleGroup.setCell(1,1,role_1);
roleGroup.setCell(1,2,role_2);
roleGroup.setCell(1,3,role_3);

/**
 * 坐标显示面板
 */
var info = LC.Components.PanelFactory.createPanelBasic(null, "80px", "25px");
LC.DefaultInternalScene.internalSceneBasic.dom.append(info.dom);
/**
 * 进入（内部据点界面）
 */
var enter = LC.Components.PanelFactory.createPanelBasic(null, "80px", "25px");
LC.DefaultInternalScene.internalSceneBasic.dom.append(enter.dom);
enter.dom.bind("click", function() {//点击进行位置移动
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_BASIC) {//判断当前活动的场景是否为：初始大地图界面
		//当前活动的场景变更为：内部据点界面
		LC.GlobalVar.CURRENT_INTERNAL_SCENE = LC.CommonProperty.INTERNAL_SCENE_STRONGHOLD;
		//判断是否可以进入（未实现）
		//进入，隐藏其他界面，显示-内部据点界面
		LC.DefaultInternalScene.switchScene(LC.DefaultInternalScene.internalSceneStronghold);
	}
});
/**
 *  传入plat地图实例,内部场景-大地图界面装入地图数据，同时绑定监听（用于更新界面数据）
 *  ps：由于每个场景都不一样，载入清除页面数据方法都需要单独定义
 */
LC.DefaultInternalScene.internalSceneBasic.loadData = function(plat) {
	//清除原有数据,避免数据残留
	LC.DefaultInternalScene.clearData();
	//重新载入数据
	//角色面板数据
	if (null!=plat.getRoleMap()&&0<plat.getRoleMap().size()){//判断有角色数据
		roles = plat.getRoleMap().values();
		var rolesLength = roles.length;
		if(rolesLength>3){
			rolesLength=3;
			LC.warning("角色数量超过最大显示3个");
		}
		for (var i=0; i < rolesLength; i++) {
			//遍历载入角色数据
			roleCell = roleGroup.getCell(1,i+1);
			roleCell.setText(roles[i].getName());
			//载入交互菜单数据
			roleActions = roles[i].getActionMap();
			for (var i1=0; i1 < roleActions.size(); i1++) {
				//传入动作、交互角色数据
				roleCell.add_update_Element(roleActions.values()[i1],roles[i]);//第N个环形菜单
			};
		};
	}
	//方向箭头数据
	switch(plat.getLink().get("top")){
		case "true":
	  		moveNorth.setText("向北");
	  		moveNorth.show();
	  		break;
	  	case "false":
	  		moveNorth.setText("");
	  		moveNorth.hide();
	  		break;
	  	default:
	  	LC.warning("Link\""+pram+"\"的状态出现错误,没有对应的状态:"+flag);
	}
	switch(plat.getLink().get("right")){
		case "true":
	  		moveEast.setText("向东");
	  		moveEast.show();
	  		break;
	  	case "false":
	  		moveEast.setText("");
	  		moveEast.hide();
	  		break;
	  	default:
	  	LC.warning("Link\""+pram+"\"的状态出现错误,没有对应的状态:"+flag);
	}
	switch(plat.getLink().get("bottom")){
		case "true":
	  		moveSouth.setText("向南");
	  		moveSouth.show();
	  		break;
	  	case "false":
	  		moveSouth.setText("");
	  		moveSouth.hide();
	  		break;
	  	default:
	  	LC.warning("Link\""+pram+"\"的状态出现错误,没有对应的状态:"+flag);
	}
	switch(plat.getLink().get("left")){
		case "true":
	  		moveWest.setText("向南");
	  		moveWest.show();
	  		break;
	  	case "false":
	  		moveWest.setText("");
	  		moveWest.hide();
	  		break;
	  	default:
	  	LC.warning("Link\""+pram+"\"的状态出现错误,没有对应的状态:"+flag);
	}
	info.dom.text(plat.getPositionX() + "," + plat.getPositionY());
	info.show();
	enter.dom.text("进入");
	enter.show();
	//添加监听
	plat.addListener(LC.DefaultInternalScene.internalSceneBasic);
};
//设定视图响应
LC.DefaultInternalScene.internalSceneBasic.addResponseMethod("setLink",function(pram,flag){
	if (LC.GlobalVar.CURRENT_INTERNAL_SCENE == LC.CommonProperty.INTERNAL_SCENE_BASIC) {//判断当前活动的场景是否为：初始大地图界面
		//重新载入数据
		switch(pram){
				case "top":
				  switch(flag){
				  	case "true":
				  		moveNorth.setText("向北");
				  		moveNorth.show();
				  		break;
				  	case "false":
				  		moveNorth.setText("");
				  		moveNorth.hide();
				  		break;
				  	default:
				  	LC.warning("Link\""+pram+"\"的状态出现错误,没有对应的状态:"+flag);
				  }
				  break;
				case "right":
					switch(flag){
					  	case "true":
					  		moveEast.setText("向东");
					  		moveEast.show();
					  		break;
					  	case "false":
					  		moveEast.setText("");
					  		moveEast.hide();
					  		break;
					  	default:
					  	LC.warning("Link\""+pram+"\"的状态出现错误,没有对应的状态:"+flag);
					  }
				  break;
				case "bottom":
					switch(flag){
					  	case "true":
					  		moveSouth.setText("向南");
					  		moveSouth.show();
					  		break;
					  	case "false":
					  		moveSouth.setText("");
				  			moveSouth.hide();
					  		break;
					  	default:
					  	LC.warning("Link\""+pram+"\"的状态出现错误,没有对应的状态:"+flag);
					  }
				  break;
				case "left":
					switch(flag){
				  	case "true":
				  		moveWest.setText("向西");
				  		moveWest.show();
				  		break;
				  	case "false":
				  		moveWest.setText("");
				  		moveWest.hide();
				  		break;
				  	default:
				  	LC.warning("Link\""+pram+"\"的状态出现错误,没有对应的状态:"+flag);
				  }
				  break;
				default:
				LC.warning("出现错误,没有找到对应的Link:"+pram);
			}
		
	}
});
/**
 *  清除场景中的数据,同时解绑监听
 * 	注意：必须传入plat对象解绑监听！
 *  ps：由于每个场景都不一样，载入清除页面数据方法都需要单独定义
 */
LC.DefaultInternalScene.internalSceneBasic.clearData = function(plat) {
	moveNorth.setText("");
	moveNorth.hide();
	moveEast.setText("");
	moveEast.hide();
	moveSouth.setText("");
	moveSouth.hide();
	moveWest.setText("");
	moveWest.hide();
	info.dom.text("");
	info.hide();
	enter.dom.text("");
	enter.hide();
	plat.removeListener(LC.DefaultInternalScene.internalSceneBasic);
};
