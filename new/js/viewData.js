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
	panel2Text:function(){
		var str = currentDomain.getName();
		if(!isNaN(Number(currentDomain.getX()))){
			str += " ( "+Number(currentDomain.getX())+" , "+Number(currentDomain.getY())+" )";
		}
		return str;
	},
	/**
	 * XX面板 
	 */
	panel3:{
		/**
		 * 标题文本 
		 */
		tittle:function(){
			if(dataRoleObj[0].getStatus()=="skill"){
				return "技能";
			}else{
				return "包裹";
			}
		},
		roleHp:0,
		roleMaxHp:0,
		roleAtt:0,
		roleDef:0,
		roleBagSpace:function(){
			if(dataRoleObj[0].getStatus()=="skill"){
				return "";
			}else{
				return dataRoleObj[0].getOccupySpace()+"/"+dataRoleObj[0].getBagSpace();
			}
		},
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
		bagSpace:function(){
				if (isNaN(Number(currentInteractiveObject.getBagSpace()))) {
					return "";
				} else{
					return currentInteractiveObject.getOccupySpace()+"/"+currentInteractiveObject.getBagSpace();
				};
			},
		//返回交互对象包裹空间 ':0/0'
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
	confirmPanle:{
		tittle:"",
		textContent:"",
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
		/**
		 * 任务
		 */
		completeItems:function(){return currentMission.getCompleteItems();},
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
		quickButton4:function(){if(quickButton4){return quickButton4.getName();}else{return "物品栏";}},
		quickButton5:function(){if(quickButton5){return quickButton5.getName();}else{return "物品栏";}},
		quickButton6:function(){if(quickButton6){return quickButton6.getName();}else{return "物品栏";}},
		
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
	/**
	 * 按钮组在3d地图的定位
	 */
	map3d_button1:{
		"transform": "translateX(400px) translateY(350px) translateZ(0px)",
	},
	map3d_button2:{
		"transform": "translateX(550px) translateY(350px) translateZ(0px)",
	},
	map3d_button3:{
		"transform": "translateX(520px) translateY(550px) translateZ(0px)",
	},
	map3d_button4:{
		"transform": "translateX(530px) translateY(440px) translateZ(0px)",
	},
	map3d_button5:{
		"transform": "translateX(620px) translateY(535px) translateZ(0px)",
	},
	map3d_button6:{
		"transform": "translateX(700px) translateY(320px) translateZ(0px)",
	},
	map3d_button7:{
		"transform": "translateX(340px) translateY(420px) translateZ(0px)",
	},
	map3d_button8:{
		"transform": "translateX(340px) translateY(520px) translateZ(0px)",
	},
	map3d_button9:{
		"transform": "translateX(340px) translateY(520px) translateZ(0px)",
	},
	map3d_button10:{
		"transform": "translateX(440px) translateY(620px) translateZ(0px)",
	},
	map3d_button11:{
		"transform": "translateX(550px) translateY(630px) translateZ(0px)",
	},
	map3d_button12:{
		"transform": "translateX(650px) translateY(730px) translateZ(0px)",
	},
	map3d_button13:{
		"transform": "translateX(700px) translateY(650px) translateZ(0px)",
	},
	map3d_button14:{
		"transform": "translateX(710px) translateY(450px) translateZ(0px)",
	},
	map3d_button15:{
		"transform": "translateX(410px) translateY(270px) translateZ(0px)",
	},
	map3d_button16:{
		"transform": "translateX(550px) translateY(270px) translateZ(0px)",
	},
	map3d_button17:{
		"transform": "translateX(290px) translateY(580px) translateZ(0px)",
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
	map3dFloor_Style:{"transform":"rotateX(45deg) rotateZ(-30deg)"},
	map3d_Style:null,
	map3dButton_Style:{"transform":"translateX(-50%) translateY(-50%) translateZ(50px) rotateZ(30deg) rotateX(-45deg)"},
};
var map3dData = [
	{
		cubeLong:3000,
		cubeWidth:1020,
		cubeHeight:100,
		coordinateX:500,
		coordinateY:-490,
		colorGroup:1,
	},
	{
		cubeLong:3000,
		cubeWidth:1020,
		cubeHeight:100,
		coordinateX:500,
		coordinateY:1490,
		colorGroup:1,
	},
	{
		cubeLong:1020,
		cubeWidth:3000,
		cubeHeight:100,
		coordinateX:-490,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:1020,
		cubeWidth:3000,
		cubeHeight:100,
		coordinateX:1490,
		coordinateY:500,
		colorGroup:1,
	},
	/*第二层*/
	{
		cubeLong:980,
		cubeWidth:10,
		cubeHeight:105,
		coordinateX:500,
		coordinateY:10,
		colorGroup:1,
	},
	{
		cubeLong:980,
		cubeWidth:10,
		cubeHeight:105,
		coordinateX:500,
		coordinateY:990,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:980,
		cubeHeight:105,
		coordinateX:10,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:980,
		cubeHeight:105,
		coordinateX:990,
		coordinateY:500,
		colorGroup:1,
	},
	/*第三层*/
	{
		cubeLong:960,
		cubeWidth:10,
		cubeHeight:110,
		coordinateX:500,
		coordinateY:25,
		colorGroup:1,
	},
	{
		cubeLong:960,
		cubeWidth:10,
		cubeHeight:110,
		coordinateX:500,
		coordinateY:975,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:960,
		cubeHeight:110,
		coordinateX:25,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:960,
		cubeHeight:110,
		coordinateX:975,
		coordinateY:500,
		colorGroup:1,
	},
	/*第4层*/
	{
		cubeLong:940,
		cubeWidth:10,
		cubeHeight:105,
		coordinateX:500,
		coordinateY:35,
		colorGroup:1,
	},
	{
		cubeLong:940,
		cubeWidth:10,
		cubeHeight:105,
		coordinateX:500,
		coordinateY:965,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:940,
		cubeHeight:105,
		coordinateX:35,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:940,
		cubeHeight:105,
		coordinateX:965,
		coordinateY:500,
		colorGroup:1,
	},
	/*第5层*/
	{
		cubeLong:920,//-20
		cubeWidth:10,
		cubeHeight:100,
		coordinateX:500,
		coordinateY:45,//+10
		colorGroup:1,
	},
	{
		cubeLong:920,//-20
		cubeWidth:10,
		cubeHeight:100,
		coordinateX:500,
		coordinateY:955,//-10
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:920,
		cubeHeight:100,
		coordinateX:45,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:920,
		cubeHeight:100,
		coordinateX:955,
		coordinateY:500,
		colorGroup:1,
	},
	/*第6层*/
	{
		cubeLong:900,//-20
		cubeWidth:10,
		cubeHeight:95,
		coordinateX:500,
		coordinateY:55,//+10
		colorGroup:1,
	},
	{
		cubeLong:900,//-20
		cubeWidth:10,
		cubeHeight:90,
		coordinateX:500,
		coordinateY:945,//-10
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:900,
		cubeHeight:85,
		coordinateX:55,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:900,
		cubeHeight:80,
		coordinateX:945,
		coordinateY:500,
		colorGroup:1,
	},
	/*第7层*/
	{
		cubeLong:880,//-20
		cubeWidth:10,
		cubeHeight:80,
		coordinateX:500,
		coordinateY:65,//+10
		colorGroup:1,
	},
	{
		cubeLong:880,//-20
		cubeWidth:10,
		cubeHeight:75,
		coordinateX:500,
		coordinateY:935,//-10
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:880,
		cubeHeight:70,
		coordinateX:65,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:880,
		cubeHeight:65,
		coordinateX:935,
		coordinateY:500,
		colorGroup:1,
	},
	/*第8层*/
	{
		cubeLong:860,//-20
		cubeWidth:10,
		cubeHeight:65,
		coordinateX:500,
		coordinateY:75,//+10
		colorGroup:1,
	},
	{
		cubeLong:860,//-20
		cubeWidth:10,
		cubeHeight:60,
		coordinateX:500,
		coordinateY:925,//-10
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:860,
		cubeHeight:55,
		coordinateX:75,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:860,
		cubeHeight:50,
		coordinateX:925,
		coordinateY:500,
		colorGroup:1,
	},
	/*第9层*/
	{
		cubeLong:840,//-20
		cubeWidth:10,
		cubeHeight:50,
		coordinateX:500,
		coordinateY:85,//+10
		colorGroup:1,
	},
	{
		cubeLong:840,//-20
		cubeWidth:10,
		cubeHeight:45,
		coordinateX:500,
		coordinateY:915,//-10
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:840,
		cubeHeight:40,
		coordinateX:85,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:840,
		cubeHeight:35,
		coordinateX:915,
		coordinateY:500,
		colorGroup:1,
	},
	/*第10层*/
	{
		cubeLong:820,//-20
		cubeWidth:10,
		cubeHeight:30,
		coordinateX:500,
		coordinateY:95,//+10
		colorGroup:1,
	},
	{
		cubeLong:820,//-20
		cubeWidth:10,
		cubeHeight:30,
		coordinateX:500,
		coordinateY:905,//-10
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:820,
		cubeHeight:30,
		coordinateX:95,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:10,
		cubeWidth:820,
		cubeHeight:30,
		coordinateX:905,
		coordinateY:500,
		colorGroup:1,
	},
	/*--外围墙饰（一侧）--*/
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:150,
		coordinateY:52,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:850,
		coordinateY:52,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:300,
		coordinateY:52,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:700,
		coordinateY:52,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:450,
		coordinateY:52,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:60,
		cubeHeight:103,
		coordinateX:550,
		coordinateY:52,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:100,
		coordinateX:550,
		coordinateY:52,
		colorGroup:1,
	},
	/*--外围墙饰（一侧）--*/
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:150,
		coordinateY:948,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:850,
		coordinateY:948,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:300,
		coordinateY:948,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:700,
		coordinateY:948,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:103,
		coordinateX:450,
		coordinateY:948,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:60,
		cubeHeight:103,
		coordinateX:550,
		coordinateY:948,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:80,
		cubeHeight:100,
		coordinateX:550,
		coordinateY:948,
		colorGroup:1,
	},
	/*--外围墙饰（一侧）--*/
	//一个立方体
	{
		cubeLong:83,
		cubeWidth:60,
		cubeHeight:100,
		coordinateX:55,
		coordinateY:305,
		colorGroup:1,
	},
	{
		cubeLong:83,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:58,
		coordinateY:275,
		colorGroup:1,
	},
	{
		cubeLong:83,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:58,
		coordinateY:285,
		colorGroup:1,
	},
	{
		cubeLong:83,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:58,
		coordinateY:295,
		colorGroup:1,
	},
	{
		cubeLong:83,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:58,
		coordinateY:305,
		colorGroup:1,
	},
	{
		cubeLong:83,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:58,
		coordinateY:315,
		colorGroup:1,
	},
	{
		cubeLong:83,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:58,
		coordinateY:325,
		colorGroup:1,
	},
	{
		cubeLong:83,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:58,
		coordinateY:335,
		colorGroup:1,
	},
	//一个立方体
	{
		cubeLong:83,
		cubeWidth:100,
		cubeHeight:100,
		coordinateX:55,
		coordinateY:705,
		colorGroup:1,
	},
	/*--外围墙饰（一侧）--*/
	//一个立方体
	{
		cubeLong:100,
		cubeWidth:60,
		cubeHeight:100,
		coordinateX:945,
		coordinateY:315,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:295,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:305,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:315,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:325,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:335,
		colorGroup:1,
	},
	//一个立方体
	{
		cubeLong:83,
		cubeWidth:100,
		cubeHeight:100,
		coordinateX:945,
		coordinateY:505,
		colorGroup:1,
	},
	//一个立方体
	{
		cubeLong:100,
		cubeWidth:60,
		cubeHeight:100,
		coordinateX:945,
		coordinateY:705,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:675,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:685,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:695,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:705,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:715,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:725,
		colorGroup:1,
	},
	{
		cubeLong:103,
		cubeWidth:5,
		cubeHeight:103,
		coordinateX:942,
		coordinateY:735,
		colorGroup:1,
	},
	/*内部建筑*/
	/*-一个建筑-*/
	{
		cubeLong:80,
		cubeWidth:50,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:145,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:90,
		cubeWidth:40,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:145,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:40,
		cubeHeight:55,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:145,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:225,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:225,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:225,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:225,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:225,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:225,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑-*/
	{
		cubeLong:80,
		cubeWidth:50,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:305,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:90,
		cubeWidth:40,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:305,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:40,
		cubeHeight:55,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:305,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:385,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:385,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:385,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:385,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:385,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:385,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑-*/
	{
		cubeLong:80,
		cubeWidth:50,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:465,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:90,
		cubeWidth:40,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:465,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:40,
		cubeHeight:55,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:465,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:545,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:545,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:545,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:545,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:545,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:545,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑-*/
	{
		cubeLong:80,
		cubeWidth:50,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:625,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:90,
		cubeWidth:40,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:625,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:40,
		cubeHeight:55,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:625,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:705,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:705,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:705,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:705,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:705,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:705,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑-*/
	{
		cubeLong:80,
		cubeWidth:50,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:785,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:90,
		cubeWidth:40,
		cubeHeight:50,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:785,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:40,
		cubeHeight:55,
		coordinateX:155,//中心点：100（基础）+Long/2，
		coordinateY:785,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:865,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:865,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:130,//中心点：100（基础）+Long/2，
		coordinateY:865,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-一个建筑2-*/
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:865,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:865,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:180,//中心点：100（基础）+Long/2，
		coordinateY:865,//中心点：100（基础）+Width/2，
		colorGroup:1,
	},
	/*-------------------*/
	/*一组建筑*/
	/*一个*/
	{
		cubeLong:45,
		cubeWidth:80,
		cubeHeight:40,
		coordinateX:795,
		coordinateY:160,
		colorGroup:1,
	},
	{
		cubeLong:55,
		cubeWidth:80,
		cubeHeight:35,
		coordinateX:795,
		coordinateY:160,
		colorGroup:1,
	},
	{
		cubeLong:45,
		cubeWidth:90,
		cubeHeight:35,
		coordinateX:795,
		coordinateY:160,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:870,
		coordinateY:130,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:870,
		coordinateY:130,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:870,
		coordinateY:130,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:45,
		cubeWidth:80,
		cubeHeight:40,
		coordinateX:860,
		coordinateY:220,
		colorGroup:1,
	},
	{
		cubeLong:55,
		cubeWidth:80,
		cubeHeight:35,
		coordinateX:860,
		coordinateY:220,
		colorGroup:1,
	},
	{
		cubeLong:45,
		cubeWidth:90,
		cubeHeight:35,
		coordinateX:860,
		coordinateY:220,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:785,
		coordinateY:250,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:785,
		coordinateY:250,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:785,
		coordinateY:250,
		colorGroup:1,
	},
	/*一组建筑*/
	/*一个*/
	{
		cubeLong:45,
		cubeWidth:80,
		cubeHeight:40,
		coordinateX:795,
		coordinateY:330,
		colorGroup:1,
	},
	{
		cubeLong:55,
		cubeWidth:80,
		cubeHeight:35,
		coordinateX:795,
		coordinateY:330,
		colorGroup:1,
	},
	{
		cubeLong:45,
		cubeWidth:90,
		cubeHeight:35,
		coordinateX:795,
		coordinateY:330,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:870,
		coordinateY:300,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:870,
		coordinateY:300,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:870,
		coordinateY:300,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:45,
		cubeWidth:80,
		cubeHeight:40,
		coordinateX:860,
		coordinateY:390,
		colorGroup:1,
	},
	{
		cubeLong:55,
		cubeWidth:80,
		cubeHeight:35,
		coordinateX:860,
		coordinateY:390,
		colorGroup:1,
	},
	{
		cubeLong:45,
		cubeWidth:90,
		cubeHeight:35,
		coordinateX:860,
		coordinateY:390,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:785,
		coordinateY:420,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:785,
		coordinateY:420,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:785,
		coordinateY:420,
		colorGroup:1,
	},
	/*一组建筑*/
	/*一个*/
	{
		cubeLong:45,
		cubeWidth:80,
		cubeHeight:40,
		coordinateX:795,
		coordinateY:610,
		colorGroup:1,
	},
	{
		cubeLong:55,
		cubeWidth:80,
		cubeHeight:35,
		coordinateX:795,
		coordinateY:610,
		colorGroup:1,
	},
	{
		cubeLong:45,
		cubeWidth:90,
		cubeHeight:35,
		coordinateX:795,
		coordinateY:610,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:870,
		coordinateY:580,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:870,
		coordinateY:580,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:870,
		coordinateY:580,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:45,
		cubeWidth:80,
		cubeHeight:40,
		coordinateX:860,
		coordinateY:670,
		colorGroup:1,
	},
	{
		cubeLong:55,
		cubeWidth:80,
		cubeHeight:35,
		coordinateX:860,
		coordinateY:670,
		colorGroup:1,
	},
	{
		cubeLong:45,
		cubeWidth:90,
		cubeHeight:35,
		coordinateX:860,
		coordinateY:670,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:785,
		coordinateY:700,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:785,
		coordinateY:700,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:785,
		coordinateY:700,
		colorGroup:1,
	},
	/*一组建筑*/
	/*一个*/
	{
		cubeLong:45,
		cubeWidth:80,
		cubeHeight:40,
		coordinateX:795,
		coordinateY:780,
		colorGroup:1,
	},
	{
		cubeLong:55,
		cubeWidth:80,
		cubeHeight:35,
		coordinateX:795,
		coordinateY:780,
		colorGroup:1,
	},
	{
		cubeLong:45,
		cubeWidth:90,
		cubeHeight:35,
		coordinateX:795,
		coordinateY:780,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:870,
		coordinateY:750,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:870,
		coordinateY:750,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:870,
		coordinateY:750,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:45,
		cubeWidth:80,
		cubeHeight:40,
		coordinateX:860,
		coordinateY:840,
		colorGroup:1,
	},
	{
		cubeLong:55,
		cubeWidth:80,
		cubeHeight:35,
		coordinateX:860,
		coordinateY:840,
		colorGroup:1,
	},
	{
		cubeLong:45,
		cubeWidth:90,
		cubeHeight:35,
		coordinateX:860,
		coordinateY:840,
		colorGroup:1,
	},
	/*一个*/
	{
		cubeLong:20,
		cubeWidth:20,
		cubeHeight:85,
		coordinateX:785,
		coordinateY:870,
		colorGroup:1,
	},
	{
		cubeLong:20,
		cubeWidth:30,
		cubeHeight:80,
		coordinateX:785,
		coordinateY:870,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:20,
		cubeHeight:80,
		coordinateX:785,
		coordinateY:870,
		colorGroup:1,
	},
	/*-----------*/
	{
		cubeLong:260,
		cubeWidth:80,
		cubeHeight:50,
		coordinateX:350,
		coordinateY:160,
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:180,
		cubeHeight:50,
		coordinateX:260,
		coordinateY:210,
		colorGroup:1,
	},
	/*-----------*/
	{
		cubeLong:80,
		cubeWidth:80,
		cubeHeight:70,
		coordinateX:560,
		coordinateY:160,
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:80,
		cubeHeight:70,
		coordinateX:680,
		coordinateY:160,
		colorGroup:1,
	},
	/*--------------*/
	{
		cubeLong:80,
		cubeWidth:80,
		cubeHeight:70,
		coordinateX:560,
		coordinateY:840,
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:80,
		cubeHeight:70,
		coordinateX:680,
		coordinateY:840,
		colorGroup:1,
	},
	/*--------------*/
	{
		cubeLong:80,
		cubeWidth:80,
		cubeHeight:70,
		coordinateX:280,
		coordinateY:840,
		colorGroup:1,
	},
	{
		cubeLong:80,
		cubeWidth:80,
		cubeHeight:70,
		coordinateX:420,
		coordinateY:840,
		colorGroup:1,
	},
	/*-------中间-------*/
	{
		cubeLong:100,
		cubeWidth:5,
		cubeHeight:5,
		coordinateX:500,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:5,
		cubeWidth:100,
		cubeHeight:5,
		coordinateX:500,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:30,
		cubeWidth:30,
		cubeHeight:5,
		coordinateX:500,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:15,
		cubeWidth:15,
		cubeHeight:5,
		coordinateX:450,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:15,
		cubeWidth:15,
		cubeHeight:5,
		coordinateX:550,
		coordinateY:500,
		colorGroup:1,
	},
	{
		cubeLong:15,
		cubeWidth:15,
		cubeHeight:5,
		coordinateX:500,
		coordinateY:450,
		colorGroup:1,
	},
	{
		cubeLong:15,
		cubeWidth:15,
		cubeHeight:5,
		coordinateX:500,
		coordinateY:550,
		colorGroup:1,
	},
];
function creat3dMap(){
	function creatCube(cubeLong,cubeWidth,cubeHeight,coordinateX,coordinateY,colorGroup){
		var tempObj = {
				cube:{
					"transform-origin": "50% 50%",
					"transform-style": "preserve-3d",
					/*全地图定位*/
					"transform": "translateX("+coordinateX+"px) translateY("+coordinateY+"px) translateZ("+(cubeHeight/2)+"px)",
				},
				front:{
					"width": cubeLong+"px",
					"height": cubeHeight+"px",
					"transform":"translateX(-50%) translateY(-50%) rotateX(-90deg) translateZ("+(cubeWidth/2)+"px)",
				},
				back:{
					"width": cubeLong+"px",
					"height": cubeHeight+"px",
					"transform":"translateX(-50%) translateY(-50%) rotateY(180deg) rotateX(90deg) translateZ("+(cubeWidth/2)+"px)",
				},
				right:{
					"width": cubeWidth+"px",
					"height": cubeHeight+"px",
					"transform":"translateX(-50%) translateY(-50%) rotateX(-90deg) rotateY(90deg) translateZ("+(cubeLong/2)+"px)",
				},
				left:{
					"width": cubeWidth+"px",
					"height": cubeHeight+"px",
					"transform":"translateX(-50%) translateY(-50%) rotateX(-90deg) rotateY(-90deg) translateZ("+(cubeLong/2)+"px)",
				},
				top:{
					"width": cubeLong+"px",
					"height": cubeWidth+"px",
					"transform":"translateX(-50%) translateY(-50%) translateZ("+(cubeHeight/2)+"px)",
				},
				color:colorGroup,
			};
		return tempObj;
	};
	var map3d = [];
	for (var i=0; i < map3dData.length; i++) {
		map3d.push(creatCube(map3dData[i].cubeLong,map3dData[i].cubeWidth,map3dData[i].cubeHeight,map3dData[i].coordinateX,map3dData[i].coordinateY,map3dData[i].colorGroup));
	};
	viewControl.map3d_Style=map3d;
};
creat3dMap();
