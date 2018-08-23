/*
* angularjs数据绑定示例（指对象绑定，非基本数据绑定）
* ps：	1.任何绑定，绑定之后都不可在变更基本绑定对象，包括重新定义和数据覆盖，只能变更对象属性，否则将无法自动刷新数据
* 		2.属性可以任意变更
*/
/*
绑定可以接受对象类型和数组类型
定义
var viewDataModel={"viewDataModelname":"viewDataModelnamedata"};
或
var viewDataModel={viewDataModelname:"viewDataModelnamedata"};
绑定
$rootScope.viewDataModel = viewDataModel;
展示
{{viewDataModel.viewDataModelname}}

定义
var viewDataModel=["viewDataModelnamedata"];
绑定
$rootScope.viewDataModel = viewDataModel;
展示
{{viewDataModel[0]}}
*/
/**
 * 视图数据显示对象 
 */
var viewDataModel = {
	/**
	 * 交流信息面板文本
	 */
	panelText:function(){return "";},
	/**
	 * XX面板文本 
	 */
	panel2Text:function(){return "中文";},
	/**
	 * XX面板 
	 */
	panel3:{
		/**
		 * 标题文本 
		 */
		tittleText:function(){return "标题";},
		roleHp:0,
		roleMaxHp:0,
		roleAtt:0,
		roleDef:0,
	},
	/**
	 * 物品信息面板
	 */
	panel3ItemInfo:{
		name:"",
		content:"",
		buffs:function(){return [];},
	},
	/**
	 * 对比角色（装备）物品信息面板
	 */
	panel3RoleItemInfo:{
		name:"",
		content:"",
	},
	/**
	 * 人物交互面板(按钮组)
	 */
	panel4:{
		/**
		 * 按钮元素集合
		 */
		buttonElements: function(){return {};},
	},
	/**
	 * 列表菜单（自动大小_带箭头）
	 */
	menu:{
		/**
		 * 菜单标题文本 
		 */
		tittleText:function(){return "菜单标题";},
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:function(){return {};},
	},
	/**
	 * 列表菜单（包裹组件）
	 */
	menuBag:{
		/**
		 * 菜单标题文本 
		 */
		tittleText:function(){return "菜单标题";},
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:function(){return {};},
	},
	/**
	 * 仓库面板 
	 */
	panel5:{
		/**
		 * 按钮元素集合（文本）
		 */
		buttonElements:function(){return {};},
	},
	/**
	 * 数字选择器 
	 */
	numberPicker:{
		tittleText:"数字选择器文本",
		number : 1,
		confirmButton:"确认按钮",
	},
	/**
	 * 交易面板
	 */
	transactionPanel:{
		/**
		 * 出售的按钮元素集合（文本）
		 */
		sellButtonElements:function(){return transactionItems.sellItems;},
		/**
		 * 购买的按钮元素集合（文本）
		 */
		buyButtonElements:function(){return transactionItems.buyItems;},
	},
	/**
	 * 任务列表
	 */
	missionSelect:{
		/**
		 * 任务元素集合
		 */
		elements:function(){return [];},
		/**
		 * 任务内容
		 */
		content:function(){return currentMission.getContent();},
	},
	/*------------------战斗场景组件视图数据------------------*/
	/**
	 * 战斗面板
	 */
	battle:{
		enemyHP:function(){if(currentInteractiveObject){return currentInteractiveObject.getHp();}},
		enemyMaxHP:function(){if(currentInteractiveObject){return currentInteractiveObject.getMaxHp();}},
		roleHP:function(){return dataRoleObj[0].getHp();},
		roleMaxHP:function(){return dataRoleObj[0].getMaxHp();},
		roleEP:function(){return dataRoleObj[0].getEp();},
		roleMaxEP:function(){return dataRoleObj[0].getMaxEp();},
		quickButton1:function(){if(quickButton1){return quickButton1.getName();}else{return "技能栏";}},
		quickButton2:function(){if(quickButton2){return quickButton2.getName();}else{return "技能栏";}},
		quickButton3:function(){if(quickButton3){return quickButton3.getName();}else{return "技能栏";}},
		quickButton4:function(){if(quickButton1){return quickButton4.getName();}else{return "物品栏";}},
		quickButton5:function(){if(quickButton2){return quickButton5.getName();}else{return "物品栏";}},
		quickButton6:function(){if(quickButton3){return quickButton6.getName();}else{return "物品栏";}},
		
		objBuffs:function(){if(currentInteractiveObject&&currentInteractiveObject.getBuffs){return currentInteractiveObject.getBuffs();}},
		roleBuffs:function(){return dataRoleObj[0].getBuffs();},
		battleInfo:[],
	},
};
/**
 * 视图控制对象（属性为对视图的控制属性）
 */
var viewControl = {
	/**
	 * 应用全局对显示的控制(初始值)
	 */
	display:{
		/**
		 * 开始界面场景隐藏
		 */
		sceneStartHide:false,
		/**
		 * xx场景隐藏
		 */
		sceneMainHide:true,
		/**
		 * 交流信息面板隐藏
		 */
		panelHide:true,
		/**
		 * 场景名称展示条隐藏
		 */
		panel2Hide:true,
		/**
		 * 角色信息面板隐藏
		 */
		panel3Hide:true,
		/**
		 * 角色信息面板隐藏
		 */
		panel3Hide2:true,
		/**
		 * 人物交互面板(按钮组)隐藏
		 */
		panel4Hide:true,
		/**
		 * 方向盘组件隐藏
		 */
		steeringWheelHide:true,
		/**
		 * 列表菜单（自动大小_带箭头）专用遮罩层隐藏 
		 */
		menuAutoMaskLayerHide:true,
		/**
		 * 列表菜单（自动大小_带箭头）隐藏 
		 */
		menuHide:true,
		/**
		 * 列表菜单（包裹）组件隐藏 
		 */
		menuBagHide:true,
		/**
		 * 物品信息面板  组件隐藏
		 */
		panel3ItemInfoHide:true,
		/**
		 * 物品信息面板  - name属性显示隐藏
		 */
		panel3ItemInfoNameHide:true,
		/**
		 * 物品信息面板  - Content属性显示隐藏
		 */
		panel3ItemInfoContentHide:true,
		/**
		 * 物品信息面板  - 各种属性显示隐藏
		 */
		panel3ItemInfoEpHide:true,
		panel3ItemInfoHpHide:true,
		panel3ItemInfoHpPercentHide:true,
		panel3ItemInfoMaxHpHide:true,
		panel3ItemInfoMaxHpPercentHide:true,
		panel3ItemInfoAttHide:true,
		panel3ItemInfoAttPercentHide:true,
		panel3ItemInfoDefHide:true,
		panel3ItemInfoDefPercentHide:true,
		panel3ItemInfoCriHide:true,
		panel3ItemInfoCriPercentHide:true,
		panel3ItemInfoCriStrikeHide:true,
		panel3ItemInfoCriStrikePercentHide:true,
		panel3ItemInfoAvdHide:true,
		panel3ItemInfoAvdPercentHide:true,
		panel3ItemInfoHitHide:true,
		panel3ItemInfoHitPercentHide:true,
		panel3ItemInfoBuffsHide:true,
		/**
		 * 对比角色物品（装备）信息面板  组件隐藏
		 */
		panel3RoleItemInfoHide:true,
		/**
		 * 对比角色物品（装备）信息面板  - name属性显示隐藏
		 */
		panel3RoleItemInfoNameHide:true,
		/**
		 * 对比角色物品（装备）信息面板 - Content属性显示隐藏
		 */
		panel3RoleItemInfoContentHide:true,
		/**
		 * 对比角色物品（装备）信息面板  - 各种属性显示隐藏
		 */
		panel3RoleItemInfoEpRecoveryHide:true,
		panel3RoleItemInfoEpRecoveryPercentHide:true,
		panel3RoleItemInfoEpRecoveryMaxEpPercentHide:true,
		panel3RoleItemInfoMaxEpHide:true,
		panel3RoleItemInfoMaxEpPercentHide:true,
		panel3RoleItemInfoHpRecoveryHide:true,
		panel3RoleItemInfoHpRecoveryPercentHide:true,
		panel3RoleItemInfoHpRecoveryMaxHpPercentHide:true,
		panel3RoleItemInfoMaxHpHide:true,
		panel3RoleItemInfoMaxHpPercentHide:true,
		panel3RoleItemInfoAttHide:true,
		panel3RoleItemInfoAttPercentHide:true,
		panel3RoleItemInfoDamageHide:true,
		panel3RoleItemInfoDefHide:true,
		panel3RoleItemInfoDefPercentHide:true,
		panel3RoleItemInfoCriHide:true,
		panel3RoleItemInfoCriPercentHide:true,
		panel3RoleItemInfoCriStrikeHide:true,
		panel3RoleItemInfoCriStrikePercentHide:true,
		panel3RoleItemInfoAvdHide:true,
		panel3RoleItemInfoAvdPercentHide:true,
		panel3RoleItemInfoHitHide:true,
		panel3RoleItemInfoHitPercentHide:true,
		panel3RoleItemInfoBuffsHide:true,
		
		/**
		 * 仓库组件 专用遮罩层隐藏 
		 */
		panel5MaskLayerHide:true,
		/**
		 * 仓库组件隐藏
		 */
		panel5Hide:true,
		/**
		 * 数字选择器 专用遮罩层隐藏 
		 */
		numberPickerMaskLayerHide:true,
		/**
		 * 数字选择器隐藏 
		 */
		numberPickerHide:true,
		/**
		 * 交易面板 
		 */
		transactionPanelHide:true,
		/**
		 * 顶部菜单
		 */
		topFrameHide:false,
		/**
		 * 确认对话框面板 专用遮罩层隐藏 
		 */
		confirmPanleMaskLayerHide:true,
		/**
		 * 确认对话框面板
		 */
		confirmPanleHide:true,
		/**
		 * 任务列表 专用遮罩层隐藏 
		 */
		missionSelectMaskLayerHide:true,
		/**
		 * 任务列表
		 */
		missionSelectHide:true,
		/**
		 * 任务信息面板
		 */
		missionInfoHide:true,
		/*-------战斗场景-------*/
		/**
		 * 战斗场景
		 */
		sceneBattleHide:true,
		/**
		 * 快捷按钮设置菜单  专用遮罩层隐藏 
		 */
		quickMenuBagMaskLayerHide:true,
		/**
		 * 快捷按钮设置菜单
		 */
		quickMenuBagHide:true,
		
	},
	/**
	 * 当前所在场景（初始值） 
	 */
	currentScene : "scene-start",
	/**
	 * 当前交互对象类型
	 */
	currentInteractiveType : "",
	/**
	 * 层叠关系集合,固定模型:{name:index,name2:index}
	 */
	zIndexList : {},
	/**
	 * 场景名称展示条
	 */
	panel2_Style:{
		"top" : 20 + "px",
		"left" : 10 + "px",
	},
	/**
	 * 角色信息面板
	 */
	panel3_Style:{
		"top" : 80 + "px",
		"left" : 40 + "px",
	},
	/**
	 * 角色信息面板
	 */
	panel3_Style2:{
		"top" : 60 + "px",
		"left" : 600 + "px",
	},
	/**
	 * 人物交互面板(按钮组)
	 */
	panel4_Style:{
		"top" : 60 + "px",
		"left" : 330 + "px",
	},
	/**
	 * 交流信息面板 （初始值）
	 */
	panel_Style:{
		"bottom" : 5 + "px",
		"left" : 10 + "px",
	},
	/**
	 * 方向盘组件（初始值）
	 */
	steeringWheel_Style:{
		"bottom" : 55 + "px",
		"right" : 80 + "px",
	},
	/**
	 * 列表菜单（自动大小_带箭头）专用遮罩层（初始值）
	 */
	menuAutoMaskLayer_Style:{},
	/**
	 * 列表菜单（自动大小_带箭头）（初始值）
	 */
	menu_Style:{
		"top" : 30 + "px",
		"left" : 280 + "px",
		"opacity" : 0,
		"z-index":0,
	},
	/**
	 * 列表菜单（包裹）组件（初始值）
	 */
	menu_bag_Style:{
		"top" : 80 + "px",
		"left" : 180 + "px",
		"opacity" : 0,
	},
	/**
	 * 物品信息面板组件（初始值）
	 */
	panel3ItemInfo_Style:{
		"top" : 20 + "px",
		"right" : 50 + "px",
		"opacity" : 0,
	},
	/**
	 * 对比物品（装备）信息面板组件（初始值）
	 */
	panel3RoleItemInfo_Style:{
		"top" : 400 + "px",
		"right" : 50 + "px",
		"opacity" : 0,
	},
	/**
	 * 仓库组件面板 专用遮罩层（初始值）
	 */
	panel5MaskLayer_Style:{},
	/**
	 * 仓库组件面板（初始值）
	 */
	panel5_Style : {
		"top" : 60 + "px",
		"left" : 650 + "px",
		"opacity" : 0,
	},
	/**
	 * 数字选择器 专用遮罩层（初始值）
	 */
	numberPickerMaskLayer_Style:{},
	/**
	 * 数字选择器（初始值）
	 */
	numberPicker_Style:{},
	/**
	 * 交易面板（初始值）
	 */
	transactionPanel_Style:{
		"width": 500+"px",
		"top" : 50 + "px",
		"left" : 260 + "px",
		"opacity" : 0,
	},
	/**
	 * 确认对话框 专用遮罩层（初始值）
	 */
	confirmPanleMaskLayer_Style:{},
	/**
	 * 确认对话框（初始值）
	 */
	confirmPanle_Style:{
		"top":20+"%",
		"left":30+"%",
		"width": 500+"px",
		"height": 250+"px",
		"opacity" : 0,
	},
	/**
	 * 任务列表 专用遮罩层（初始值）
	 */
	missionSelectMaskLayer_Style:{},
	/**
	 * 任务列表（初始值）
	 */
	missionSelect_Style:{
		"top":80+"px",
		"right":30+"px",
		"opacity" : 0,
	},
	/**
	 * 任务信息面板（初始值）
	 */
	missionInfo_Style:{
		"top":80+"px",
		"left":60+"px",
		"opacity" : 0,
	},
	
	/*----------战斗场景面板组件----------*/
	panelFightBarColour:function(){
		sumMaxHp=dataRoleObj[0].getMaxHp();
		sumHp=dataRoleObj[0].getHp();
		percent = (sumHp/sumMaxHp);
		if(percent>0.25){
			return "grey";
		}else{
			return "red";
		}
	},
	panelFightBar_StyleFn:function(){
		if(currentInteractiveObject){
			sumMaxHp=dataRoleObj[0].getMaxHp();
			sumHp=dataRoleObj[0].getHp();
			if(sumHp<0){sumHp=0;}
			if(sumMaxHp<400){
				return {"width":sumHp+"px","right":70+"px"};
			}else if(sumMaxHp>=400){
				return {"width":(sumHp/sumMaxHp)*400+"px","right":70+"px"};
			}else{
				return {"width":0+"px","right":70+"px"};
			}
		}
	},
	panelFightBarEP_StyleFn:function(){
		if(currentInteractiveObject){
			sumMaxEp=dataRoleObj[0].getMaxEp();
			sumEp=dataRoleObj[0].getEp();
			if(sumEp<0){sumEp=0;}
			if(sumMaxEp<400){
				return {"width":sumEp+"px","right":70+"px"};
			}else if(sumMaxEp>=400){
				return {"width":(sumEp/sumMaxEp)*400+"px","right":70+"px"};
			}else{
				return {"width":0+"px","right":70+"px"};
			}
		}
	},
	panelFightBarColour2:function(){
		if(currentInteractiveObject){
			sumMaxHp=currentInteractiveObject.getMaxHp();
			sumHp=currentInteractiveObject.getHp();
			percent = (sumHp/sumMaxHp);
			if(percent>0.25){
				return "grey";
			}else{
				return "red";
			}
		}
	},
	panelFightBar_StyleFn2:function(){
		if(currentInteractiveObject){
			sumMaxHp=currentInteractiveObject.getMaxHp();
			sumHp=currentInteractiveObject.getHp();
			if(sumHp<0){sumHp=0;}
			if(sumMaxHp<400){
				return {"width":sumHp+"px","right":70+"px"};
			}else if(sumMaxHp>=400){
				return {"width":(sumHp/sumMaxHp)*400+"px","right":70+"px"};
			}else{
				return {"width":0+"px","right":70+"px"};
			}
		}
	},
	/**
	 * 快捷按钮设置菜单  专用遮罩层隐藏 
	 */
	quickMenuBagMaskLayer_Style:{},
};
