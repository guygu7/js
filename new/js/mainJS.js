/**
 * 伪完全复制对象，需传入创建的新对象
 * 传参： beanObj 原始被复制对象,copyObj 复制对象
 */
function copyBean (beanObj,copyObj){
	/*仅复制基本类型属性
	for (var i in copyObj) {
		if (copyObj.hasOwnProperty(i) && typeof copyObj[i] == "function") {
			if ("set"==i.substring(0,3)){
				//遍历beanObj对象所有get方法,并将值set至copyObj
				for (var j in beanObj) {
					if (beanObj.hasOwnProperty(j) && typeof beanObj[j] == "function") {
						if("get"==j.substring(0,3) && i.substring(3)==j.substring(3)){
							//copyObj.set(beanObj.get())
							copyObj[i](beanObj[j]());
						}
					}
				}
			};
		}
	}
	*/
	//复制基本类型属性  和  包含对象的数组属性（由于依赖于工厂创建对象，仅适用于本项目）
	//遍历beanObj对象所有get方法
	for (var beanObjFn in beanObj) {
		if (beanObj.hasOwnProperty(beanObjFn) && typeof beanObj[beanObjFn] == "function") {
			if("get"==beanObjFn.substring(0,3)){
				//判断beanObj.get后是否包含其他对象，需要递归
				var tempVal = beanObj[beanObjFn](0);
				//判断，为数组，且数组内有至少一个元素
				if(null != tempVal && Object.prototype.toString.call(tempVal)=="[object Array]" && tempVal.length>0){
					for (var j=0; j < tempVal.length; j++) {
						//判断数组内元素为对象
						if(Object.prototype.toString.call(tempVal[j])=="[object Object]"){
							var tempObj;
							//获取数组元素对象构造函数名，并根据名称创建新的对象
							if("domain"==tempVal[j].constructor.name){
								tempObj = DataModleFactory.createDomain();
							} else if("interactiveObject"==tempVal[j].constructor.name){
								tempObj = DataModleFactory.createInteractiveObject();
							} else if("action"==tempVal[j].constructor.name){
								tempObj = DataModleFactory.createAction();
							} else if("item"==tempVal[j].constructor.name){
								tempObj = DataModleFactory.createItem();
							} else if("role"==tempVal[j].constructor.name){
								tempObj = DataModleFactory.createRole();
							}
							//递归，复制数组内元素对象数据，获取返回复制对象
							var returnTempObj = copyBean(tempVal[j],tempObj);
							//遍历出copyObj的对应add方法调用存入
							for (var copyObjFn in copyObj) {
								if (copyObj.hasOwnProperty(copyObjFn) && typeof copyObj[copyObjFn] == "function") {
									if ("add"==copyObjFn.substring(0,3) && beanObjFn.substring(0,beanObjFn.length-1)){
										copyObj[copyObjFn](returnTempObj);
									}
								}
							}
						}else{
							//不是对象则直接存入copy对象（暂时没有这种情况）
						};
					};
				}else if(typeof tempVal=="number" || typeof tempVal=="string" || typeof tempVal=="boolean"){
					//判断为Number String Boolean
					//直接遍历出copyObj的对应set方法调用存入
					for (var copyObjFn in copyObj) {
						if (copyObj.hasOwnProperty(copyObjFn) && typeof copyObj[copyObjFn] == "function") {
							if ("set"==copyObjFn.substring(0,3) && copyObjFn.substring(3)==beanObjFn.substring(3)){
								copyObj[copyObjFn](tempVal);
							}
						}
					}
				};
			}
		}
	}
	return copyObj;
};
/**
 * 对比两个Domain场景对象是否为同一种
 */
function compareDomain(domain1,domain2){
	return (domain1.getName()==domain2.getName()
			&&domain1.getSignId()==domain2.getSignId());
};
/**
 * 对比两个InteractiveObject对象是否为同一种
 */
function compareInteractiveObject(interactiveObject1,interactiveObject2){
	return (interactiveObject1.getName()==interactiveObject2.getName());
};
/**
 * 对比两个Item物品对象是否为同一种物品
 */
function compareItem(item1,item2){
	return (item1.getName()==item2.getName()
			&&item1.getType()==item2.getType()
			&&item1.getType2()==item2.getType2()
			&&item1.getContent()==item2.getContent());
};
/**
 * 对比两个Action动作选项是否为同一种
 */
function compareAction(action1,action2){
	return (action1.getName()==action2.getName()
			&&action1.getType()==action2.getType()
			&&action1.getContent()==action2.getContent()
			&&action1.getTarget()==action2.getTarget());
};
/**
 * 对比两个Buff是否为同一种
 */
function compareBuff(buff1,buff2){
	return (buff1.getName()==buff2.getName()
			&&buff1.getType()==buff2.getType()
			&&buff1.getContent()==buff2.getContent()
			&&buff1.getRound()==buff2.getRound()
			&&buff1.getSuperposition()==buff2.getSuperposition());
}

/**
 * 读取保存数据
 */
var loadSaveGameData;
var loadSaveGameData_currentDomain;
(function(){
	if(localStorage.getItem(data.saveGameData)!=null){
		loadSaveGameData = JSON.parse(localStorage.getItem(data.saveGameData));
		loadSaveGameData_currentDomain = JSON.parse(loadSaveGameData.currentDomain);
	};
})();

/**
 * （全局级）物品信息集合（字典）[item数组]
 * //需在其他对象之前构建
 */
var publicItemInfo = loadData(dictionaryData.itemInfo,"item");
/**
 * 公开场景数据 domain数组 
 */
var dataDomainsObj = loadData(data.publicMaps,"domain");


/**
 * 大地图数据 domain数组 (一个元素为一整张大地图)
 */
var mapDomainsObj = [];
//封装一个大地图
mapDomainsObj.push(loadData(data[mapIds[0].mapId],"domain"));


/**
 * 当前选择的技能格位置（索引序号）
 */
var currentSkillPanleIndex = "";
//需定义在角色初始化之前
var currentSkillChain = newSkillModule(2);

/**
 * 暂时仅为只有一个role对象的数组
 */
var dataRoleObj = loadData(data.roles,"role");
/*-------------特殊对象-------------*/
/**
 * 全局任务交互动作
 */
var missionActionObj = loadData(exampleData.actions[0],"action");
/**
 * 全局临时存放点对象（用于复制的模版）
 */
var tempStoragePointObj = loadData(exampleData.interactiveObjects[0],"interactiveObject");
/**
 * 用于在任务栏显示没有任务
 */
var noneMissionObj = loadData(exampleData.missions[0],"mission");
/**
 * 技能对象集合（用于技能链加载）
 */
var tempSkillForChainObj = (function(){
	var skills = {};
	var keys = Object.keys(dictionaryData.skill);
	for (var i=0; i < keys.length; i++) {
		skills[keys[i]] = (loadData(dictionaryData.skill[keys[i]],"skill"));
	};
	return skills;
})();

/*--------------------------------*/
/**
 * 当前大地图
 */
var currentMapDomains = [];
/**
 * 当前场景地图
 */
var currentDomain = DataModleFactory.createDomain();
/**
 * 当前可交互对象 
 */
var currentInteractiveObject = DataModleFactory.createInteractiveObject();
/**
 * 当前的物品
 */
var currentItem = DataModleFactory.createItem();
/**
 * 当前的交互动作
 */
var currentAction = DataModleFactory.createAction();
/**
 * 当前的任务
 */
var currentMission = DataModleFactory.createMission();
/**
 * 当前交易物品信息数据（价格）[item数组]
 */
var currentItemInfo = [];

/**
 * 交易暂存物品集合
 */
var transactionItems = {
	sellItems:[],
	buyItems:[],
};
/**
 * 快捷按钮
 */
var quickButton1;
var quickButton2;
var quickButton3;
var quickButton4;
var quickButton5;
var quickButton6;
var app = angular.module("myApp", []);
app.directive('ngRightclick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightclick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});
/*滚轮事件监听*/
app.directive('ngMousewheel', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngMousewheel);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});

var deBug$RootScope = null;
app.controller("myApp", function($scope,$rootScope,$timeout,$interval) {
	$scope.viewDataModel = viewDataModel;
	$scope.viewControl = viewControl;
	$scope.data = data;
	var stop;
	$rootScope.test = function(){
		stop = $interval(function() {
			console.info("test");
		}, 70);
	};
	$rootScope.test2 = function(){
		$interval.cancel(stop);
	};
	
	$rootScope.testright = function(){
		console.info("testright");
	};
	$rootScope.testOnMousewheel = function(){
		console.info("testOnMousewheel");
	};
	
	/**
	 * 交流面板的打字效果方法
	 */
	var panelTypingSign;//全局标记，用于保持单线程运行
	var panelTypingSign2="";//全局标记，用于点击显示全部内容（需点击事件修改）
	panelTyping = function(str) {
		var i = 0;
		//修改全局sign
		panelTypingSign = Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
		var tempSign = panelTypingSign;
		panelTypingSign2="";
		function typing() {
			//判断全局sign是否修改
			if (tempSign==panelTypingSign){
				if (i <= str.length&&panelTypingSign2=="") {
					viewDataModel.panelText = str.slice(0, i++) + '_';
					$timeout(typing, 30);//递归调用
				} else {
					panelTypingSign2="";//重置
					viewDataModel.panelText = str;//结束打字,移除 _ 光标
				}
			}else{return;}
		};
		typing();
	};
	$scope.panelTypingOnClick = function(){
		panelTypingSign2="typingAll";
	};
	/**
	 * 主场景显示&数据加载
	 */
	sceneMainShow = function(str) {
		//人物交互面板(按钮组)初始数据加载
		viewDataModel.panel4.buttonElements = function (){
			return currentDomain.getInteractiveObjects();
		};
		//动态效果
		viewControl.display.sceneMainHide = false;
		$timeout(function() {
			viewControl.currentScene = "scene-main";
		}, 10);
		$timeout(function() {
			//隐藏其他场景
			viewControl.display.sceneBattleHide = true;
			viewControl.display.sceneStartHide = true;
			mainShow();
			panelTyping(str);
		}, 200);
		//动态显示开始引导文本
		//$timeout(function() {
		//}, 1000);
	};
	/**
	 * 主场景视图数据清除
	 */
	sceneMainViewDataClear = function() {
		//人物交互面板(按钮组)初始数据加载
		viewDataModel.panel4.buttonElements = function (){
			return currentDomain.getInteractiveObjects();
		};
	};
	/**
	 * 场景更新数据
	 */
	sceneMainDataLoad = function(domainData){
		//加载场景数据
		currentDomain = domainData;
	};
	//初始化
	(function () {
		//初始化数据
		sceneMainDataLoad(dataDomainsObj[0]);
	})();
});

//起始场景
app.controller("scene-start", function($scope, $rootScope, $timeout) {
	//开始按钮
	$scope.buttonStart = function(){
		sceneMainShow(data.startText);
	};
});

app.controller("scene-main", function($scope, $rootScope, $timeout) {
	/**
	 * 获取层叠关系数组中最大值
	 */
	getMaxZIndex = function(num){
		var maxZIndex=num?num:0;
		for (var i in viewControl.zIndexList) {
			if(viewControl.zIndexList[i]&&maxZIndex<viewControl.zIndexList[i]){
				maxZIndex=viewControl.zIndexList[i];
			}
		};
		return maxZIndex;
	};
	/**
	 * 主场景所有组件显示
	 */
	mainShow = function(){
		//无需控制层叠关系
		//场景名称展示条
		viewControl.display.panel2Hide = false;
		viewControl.panel2_Style.top = 30 + "px";
		viewControl.panel2_Style.left = 5 + "px";
		viewControl.panel2_Style.opacity = 0;
		//角色信息面板
		viewControl.display.panel3Hide = false;
		viewControl.panel3_Style.top = 80 + "px";
		viewControl.panel3_Style.left = 35 + "px";
		viewControl.panel3_Style.opacity = 0;
		//人物交互面板(按钮组)
		viewControl.display.panel4Hide = false;
		viewControl.panel4_Style.opacity = 0;
		//交流信息面板(基本会一直显示)
		viewControl.display.panelHide = false;
		$timeout(function() {
			//场景名称展示条
			viewControl.panel2_Style.left = 10 + "px";
			viewControl.panel2_Style.opacity = 1;
			//角色信息面板
			viewControl.panel3_Style.left = 40 + "px";
			viewControl.panel3_Style.opacity = 1;
			//人物交互面板(按钮组)
			viewControl.panel4_Style.opacity = 1;
			viewControl.panel_Style.opacity = 1;
		}, 50);
	};
	/**
	 * 主场景所有组件隐藏
	 */
	mainHide = function(pram){
		//场景名称展示条
		var panel2Left = viewControl.panel2_Style.left;
		viewControl.panel2_Style.left = Number(panel2Left.substr(0,panel2Left.length-2))-5 + "px";
		viewControl.panel2_Style.opacity = 0;
		//角色信息面板
		var panel3Left = viewControl.panel3_Style.left;
		viewControl.panel3_Style.left = Number(panel3Left.substr(0,panel3Left.length-2))-5 + "px";
		viewControl.panel3_Style.opacity = 0;
		//人物交互面板(按钮组)
		viewControl.panel4_Style.opacity = 0;
		//交流信息面板(基本会一直显示)
		if(pram=="all"){
			viewControl.panel_Style.opacity = 0;
		}
		$timeout(function() {
			//场景名称展示条
			viewControl.display.panel2Hide = true;
			//角色信息面板
			viewControl.display.panel3Hide = true;
			//人物交互面板(按钮组)
			viewControl.display.panel4Hide = true;
		}, 200);
	};
	/**
	 * 方向盘组件 显示命令
	 */
	steeringWheelShow = function(){
		viewControl.display.steeringWheelHide = false;
		var right = viewControl.steeringWheel_Style.right;
		viewControl.steeringWheel_Style.right = Number(right.substr(0,right.length-2))-20 + "px";
		viewControl.steeringWheel_Style.opacity = 0;
		$timeout(function() {
			viewControl.steeringWheel_Style.right = Number(right.substr(0,right.length-2)) + "px";
			viewControl.steeringWheel_Style.opacity = 1;
		}, 100);
	};
	/**
	 * 方向盘组件 隐藏命令 
	 */
	steeringWheelHide = function(){
		var right = viewControl.steeringWheel_Style.right;
		viewControl.steeringWheel_Style.right = Number(right.substr(0,right.length-2))-20 + "px";
		viewControl.steeringWheel_Style.opacity = 0;
		$timeout(function() {
			viewControl.display.steeringWheelHide = true;
		}, 200);
	};
	/**
	 * 列表菜单（自动大小_带箭头）显示命令（需传入点击目标）
	 */
	menuShow = function(target,model){
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["panel4"] = maxZIndex+2;
		viewControl.zIndexList["menuAutoMaskLayer"] = maxZIndex+1;
		//控制显示菜单的动画效果
		//弹出遮罩层
		viewControl.display.menuAutoMaskLayerHide = false;
		//显示菜单
		viewControl.display.menuHide = false;
		//获取相对整个场景对象的top,left
		var tempa;
		var tempb = target;
		if(model=="skillPanle"){
			tempa = document.getElementById("skillPanle").parentNode;
		}else{
			tempa = document.getElementById("menuAuto").parentNode;
		}
		var totalTop = 0;
		var totalLeft = tempb.offsetWidth;
		if (model=="3d") {
			totalTop = target.y-65;
			totalLeft = target.x-35;
		}else{
			while (tempa!=tempb){
				totalTop += tempb.offsetTop-tempb.scrollTop;
				totalLeft += tempb.offsetLeft;
				tempb = tempb.parentNode;
			};
			if(model="skillPanle"){
				totalTop -= 25;
				totalLeft += 25;
			};
		};
		
		if(totalLeft>1150){totalLeft=1150;};
		viewControl.menu_Style.top = totalTop + "px";
		viewControl.menu_Style.left = totalLeft-20 + "px";
		viewControl.menu_Style.opacity = 0;
		viewControl.menu_Style["z-index"] = viewControl.zIndexList["panel4"];
		viewControl.menuAutoMaskLayer_Style["z-index"] = viewControl.zIndexList["menuAutoMaskLayer"];
		$timeout(function() {
			viewControl.menu_Style.left = totalLeft + "px";
			viewControl.menu_Style.opacity = 1;
		}, 100);
	};
	/**
	 * 列表菜单（自动大小_带箭头）隐藏命令（包含动画效果和view数据清理） 
	 */
	menuHide = function(){
		//控制隐藏菜单的动画效果
		var left = viewControl.menu_Style.left;
		viewControl.menu_Style.left = (Number(left.substring(0, left.length - 2)) + 20) + "px";
		viewControl.menu_Style.opacity = 0;
		$timeout(function() {
			//数据清理
			viewDataModel.menu.buttonElements = null;
			//重置层叠
			viewControl.menu_Style["z-index"] = 0;
			viewControl.menuAutoMaskLayer_Style["z-index"] = 0;
			viewControl.zIndexList["panel4"] = 0;
			viewControl.zIndexList["menuAutoMaskLayer"] = 0;
			//隐藏遮罩层
			viewControl.display.menuAutoMaskLayerHide = true;
			//隐藏菜单
			viewControl.display.menuHide = true;
		},200);
	};
	
	/**
	 * 物品信息面板组件 显示命令
	 */
	panel3ItemInfoShow = function(){
		if(dataRoleObj[0].getStatus()=="transaction"){
			//判断为交易状态，变更显示位置
			viewControl.panel3ItemInfo_Style.top = 27 + "px";
			viewControl.panel3ItemInfo_Style.left = 475 + "px";
		}else if(dataRoleObj[0].getStatus()=="useWarehouse"){
			//判断为使用仓库，变更显示位置
			viewControl.panel3ItemInfo_Style.top = 27 + "px";
			viewControl.panel3ItemInfo_Style.left = 970 + "px";
		}else if(dataRoleObj[0].getStatus()=="useRoleBag"||dataRoleObj[0].getStatus()=="skill"){
			//判断为使用背包，变更显示位置
			viewControl.panel3ItemInfo_Style.top = 57 + "px";
			viewControl.panel3ItemInfo_Style.left = 350 + "px";
		}else if(dataRoleObj[0].getStatus()=="fight"){
			viewControl.panel3ItemInfo_Style.top = 57 + "px";
			viewControl.panel3ItemInfo_Style.left = 550 + "px";
		}else{
			viewControl.panel3ItemInfo_Style.top = 57 + "px";
			viewControl.panel3ItemInfo_Style.left = 970 + "px";
		}
		viewControl.panel3ItemInfo_Style.opacity = 0;
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["panel3ItemInfo"] = maxZIndex+1;
		viewControl.panel3ItemInfo_Style["z-index"] = viewControl.zIndexList["panel3ItemInfo"];
		viewControl.display.panel3ItemInfoHide = false;
		$timeout(function() {
			if(dataRoleObj[0].getStatus()=="transaction"){
				//判断为交易状态，变更显示位置
				viewControl.panel3ItemInfo_Style.top = 30 + "px";
				viewControl.panel3ItemInfo_Style.left = 475 + "px";
			}else if(dataRoleObj[0].getStatus()=="useWarehouse"){
				//判断为使用仓库，变更显示位置
				viewControl.panel3ItemInfo_Style.top = 30 + "px";
				viewControl.panel3ItemInfo_Style.left = 970 + "px";
			}else if(dataRoleObj[0].getStatus()=="useRoleBag"||dataRoleObj[0].getStatus()=="skill"){
				//判断为使用背包，变更显示位置
				viewControl.panel3ItemInfo_Style.top = 60 + "px";
				viewControl.panel3ItemInfo_Style.left = 350 + "px";
			}else if(dataRoleObj[0].getStatus()=="fight"){
				viewControl.panel3ItemInfo_Style.top = 60 + "px";
				viewControl.panel3ItemInfo_Style.left = 550 + "px";
			}else{
				viewControl.panel3ItemInfo_Style.top = 60 + "px";
				viewControl.panel3ItemInfo_Style.left = 970 + "px";
			}
			viewControl.panel3ItemInfo_Style.opacity = 1;
		}, 100);
	};
	/**
	 * 物品信息面板组件 隐藏命令
	 */
	panel3ItemInfoHide = function(){
		//实现隐藏的动画效果
		var top = viewControl.panel3ItemInfo_Style.top;
		viewControl.panel3ItemInfo_Style.top = (Number(top.substring(0, top.length - 2)) - 5) + "px";
		$timeout(function() {
			//数据清理
			//viewDataModel.panel3ItemInfo.name = null;
			//viewDataModel.panel3ItemInfo.content = null;
			//重置层叠
			viewControl.zIndexList["panel3ItemInfo"] = 0;
			viewControl.panel3ItemInfo_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.panel3ItemInfoHide = true;
		}, 200);
	};
	
	/**
	 * 对比角色物品（装备）信息面板组件 显示命令
	 */
	panel3RoleItemInfoShow = function(){
		if(dataRoleObj[0].getStatus()=="transaction"){
			//判断为交易状态，变更显示位置
			viewControl.panel3RoleItemInfo_Style.top = 277 + "px";
			viewControl.panel3RoleItemInfo_Style.left = 475 + "px";
		}else if(dataRoleObj[0].getStatus()=="useWarehouse"){
			//判断为使用仓库，变更显示位置
			viewControl.panel3RoleItemInfo_Style.top = 277 + "px";
			viewControl.panel3RoleItemInfo_Style.left = 970 + "px";
		}else if(dataRoleObj[0].getStatus()=="useRoleBag"){
			//判断为使用背包，变更显示位置
			viewControl.panel3RoleItemInfo_Style.top = 57 + "px";
			viewControl.panel3RoleItemInfo_Style.left = 640 + "px";
		}else {
			viewControl.panel3RoleItemInfo_Style.top = 57+ "px";
			viewControl.panel3RoleItemInfo_Style.left = 900 + "px";
		}
		viewControl.panel3RoleItemInfo_Style.opacity = 0;
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["panel3RoleItemInfo"] = maxZIndex+1;
		viewControl.panel3RoleItemInfo_Style["z-index"] = viewControl.zIndexList["panel3RoleItemInfo"];
		viewControl.display.panel3RoleItemInfoHide = false;
		$timeout(function() {
			if(dataRoleObj[0].getStatus()=="transaction"){
				//判断为交易状态，变更显示位置
				viewControl.panel3RoleItemInfo_Style.top = 300 + "px";
				viewControl.panel3RoleItemInfo_Style.left = 475 + "px";
			}else if(dataRoleObj[0].getStatus()=="useWarehouse"){
				//判断为使用仓库，变更显示位置
				viewControl.panel3RoleItemInfo_Style.top = 300 + "px";
				viewControl.panel3RoleItemInfo_Style.left = 970 + "px";
			}else if(dataRoleObj[0].getStatus()=="useRoleBag"){
				//判断为使用背包，变更显示位置
				viewControl.panel3RoleItemInfo_Style.top = 60 + "px";
				viewControl.panel3RoleItemInfo_Style.left = 640 + "px";
			}else {
				viewControl.panel3RoleItemInfo_Style.top = 60 + "px";
				viewControl.panel3RoleItemInfo_Style.left = 900 + "px";
			}
			viewControl.panel3RoleItemInfo_Style.opacity = 1;
		}, 100);
	};
	/**
	 * 对比角色物品（装备）信息面板组件 隐藏命令
	 */
	panel3RoleItemInfoHide = function(){
		//实现隐藏的动画效果
		var top = viewControl.panel3RoleItemInfo_Style.top;
		viewControl.panel3RoleItemInfo_Style.top = (Number(top.substring(0, top.length - 2)) - 5) + "px";
		$timeout(function() {
			//数据清理
			//重置层叠
			viewControl.zIndexList["panel3RoleItemInfo"] = 0;
			viewControl.panel3RoleItemInfo_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.panel3RoleItemInfoHide = true;
		}, 200);
	};
	
	/**
	 * 仓库组件 显示命令(同时打开包裹组件)
	 */
	panel5Show = function(model){
		//隐藏主场景
		mainHide();
		var panel5Left=0;
		var menuBagLeft=0;
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["panel5"] = maxZIndex+2;
		viewControl.zIndexList["menuBag"] = maxZIndex+2;
		viewControl.zIndexList["panel5MaskLayer"] = maxZIndex+1;
		viewControl.zIndexList["panel"] = maxZIndex+2;
		
		viewControl.panel5_Style["z-index"] = viewControl.zIndexList["panel5"];
		viewControl.menu_bag_Style["z-index"] = viewControl.zIndexList["menuBag"];
		viewControl.panel5MaskLayer_Style["z-index"] = viewControl.zIndexList["panel5MaskLayer"];
		viewControl.panel_Style["z-index"] = viewControl.zIndexList["panel"];
		//判断为交易状态，增加交易面板显示
		if(model&&model=="transaction"){
			panel5Left+=320;
			menuBagLeft-=90;
			viewControl.zIndexList["transactionPanel"] = maxZIndex+1;
			viewControl.transactionPanel_Style["z-index"] = viewControl.zIndexList["transactionPanel"];
			viewControl.display.transactionPanelHide = false;
			viewControl.transactionPanel_Style.top = 75 + "px";
			viewControl.transactionPanel_Style.opacity = 0;
		}
		//弹出遮罩层
		viewControl.display.panel5MaskLayerHide = false;
		
		viewControl.display.panel5Hide = false;
		viewControl.panel5_Style.left = 500 +panel5Left+ "px";
		viewControl.panel5_Style.opacity = 0;
		//同时打开包
		viewControl.display.menuBagHide = false;
		viewControl.menu_bag_Style.left = 55 +menuBagLeft+ "px";
		viewControl.menu_bag_Style.opacity = 0;
		$timeout(function() {
			//判断为交易状态，增加交易面板显示
			if(model&&model=="transaction"){
				viewControl.transactionPanel_Style.top = 80 + "px";
				viewControl.transactionPanel_Style.opacity = 1;
			}
			viewControl.panel5_Style.left = 450 +panel5Left+ "px";
			viewControl.panel5_Style.opacity = 1;
			//包
			viewControl.menu_bag_Style.left = 60 +menuBagLeft+ "px";
			viewControl.menu_bag_Style.opacity = 1;
		}, 100);
	};
	/**
	 * 仓库组件 隐藏命令(同时隐藏包裹组件)（包含动画效果和view数据清理） 
	 */
	panel5Hide = function(){
		//实现隐藏菜单（包裹）的动画效果
		var left = viewControl.menu_bag_Style.left;
		viewControl.menu_bag_Style.left = (Number(left.substring(0, left.length - 2)) - 50) + "px";
		viewControl.menu_bag_Style.opacity = 0;
		//实现隐藏仓库组件的动画效果
		left = viewControl.panel5_Style.left;
		viewControl.panel5_Style.left = (Number(left.substring(0, left.length - 2)) + 50) + "px";
		viewControl.panel5_Style.opacity = 0;
		//实现角色信息面板2的动画效果
		left = viewControl.panel3_Style2.left;
		viewControl.panel3_Style2.left = (Number(left.substring(0, left.length - 2)) + 30) + "px";
		viewControl.panel3_Style2.opacity = 0;
		//无论是否为交易状态，一并增加隐藏交易面板动画效果，重置角色状态
		viewControl.transactionPanel_Style.opacity = 0;
		dataRoleObj[0].setStatus("");
		dataRoleObj[0].setStatus2("");
		$timeout(function() {
			//避免操作过快，信息面板未隐藏
			panel3ItemInfoHide();
			panel3RoleItemInfoHide();
			
			//仓库组件 数据清理
			viewDataModel.panel5.buttonElements = null;
			viewDataModel.panel5.tittleText = null;
			//包裹数据清理(暂不需要)
			//重置层叠
			viewControl.zIndexList["panel5"] = 0;
			viewControl.zIndexList["menuBag"] = 0;
			viewControl.zIndexList["panel5MaskLayer"] = 0;
			viewControl.zIndexList["panel"] = 0;
			viewControl.zIndexList["panel3-2"] = 0;
			viewControl.panel5_Style["z-index"] = 0;
			viewControl.menu_bag_Style["z-index"] = 0;
			viewControl.panel5MaskLayer_Style["z-index"] = 0;
			viewControl.panel_Style["z-index"] = 0;
			viewControl.panel3_Style2["z-index"] = 0;
			//隐藏组件
			viewControl.display.panel5MaskLayerHide = true;
			viewControl.display.panel5Hide = true;
			viewControl.display.menuBagHide = true;
			viewControl.display.panel3Hide = true;
			//无论是否为交易状态，一并进行交易面板的处理
			viewControl.zIndexList["transactionPanel"] = 0;
			viewControl.transactionPanel_Style["z-index"] = 0;
			viewControl.display.transactionPanelHide = true;
			//无论是否为交易状态，一并进行交易面板的数据处理
			//待售出退回到角色包
			var roleItems = dataRoleObj[0].getItems();
			var flag = false;
			for (var j=0; j < transactionItems.sellItems.length;j) {
				var sellItem = transactionItems.sellItems[j];
				for (var i=0; i < roleItems.length; i++) {
					if(roleItems[i].getName()==sellItem.getName()&&roleItems[i].getType()==sellItem.getType()&&roleItems[i].getContent()==sellItem.getContent()){
						//遍历后发现同一物品,叠加数量
						roleItems[i].setTotalNum(roleItems[i].getTotalNum()+sellItem.getTotalNum());
						flag = true;
					}
				};
				if(!flag){
					//遍历完成，未发现同一物品，复制出一个物品对象
					var item_Obj = DataModleFactory.createItem();
					copyBean(sellItem,item_Obj);
					//存入角色包
					dataRoleObj[0].addItem(item_Obj);
				}
				//从交易面板数据中移除
				transactionItems.sellItems.shift();
				flag = false;
			}
			//待购入退回至交互对象(判断存在当前交互对象)
			if(currentInteractiveObject&&currentInteractiveObject.getItems){
				var interactiveObjectItems = currentInteractiveObject.getItems();
				var flag = false;
				for (var j=0; j < transactionItems.buyItems.length;j) {
					var buyItem = transactionItems.buyItems[j];
					for (var i=0; i < interactiveObjectItems.length; i++) {
						if(interactiveObjectItems[i].getName()==buyItem.getName()&&interactiveObjectItems[i].getType()==buyItem.getType()&&interactiveObjectItems[i].getContent()==buyItem.getContent()){
							//遍历后发现同一物品,叠加数量
							interactiveObjectItems[i].setTotalNum(interactiveObjectItems[i].getTotalNum()+buyItem.getTotalNum());
							flag = true;
						}
					};
					if(!flag){
						//遍历完成，未发现同一物品，复制出一个物品对象
						var item_Obj = DataModleFactory.createItem();
						copyBean(buyItem,item_Obj);
						//存入交互对象
						currentInteractiveObject.addItem(item_Obj);
					}
					//从交易面板数据中移除
					transactionItems.buyItems.shift();
					flag = false;
				}
			}
			//交易流程完成，清空当前交互对象
			currentInteractiveObject = null;
			mainShow();
		}, 200);
	};
	
	/**
	 * 数字选择器  显示命令（需传入top left）
	 */
	numberPickerShow = function(top,left){
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["numberPicker"] = maxZIndex+2;
		viewControl.zIndexList["numberPickerMaskLayer"] = maxZIndex+1;
		
		viewControl.numberPicker_Style["z-index"] = viewControl.zIndexList["numberPicker"];
		viewControl.numberPickerMaskLayer_Style["z-index"] = viewControl.zIndexList["numberPickerMaskLayer"];
		
		//弹出遮罩层
		viewControl.display.numberPickerMaskLayerHide = false;
		
		viewControl.display.numberPickerHide = false;
		viewControl.numberPicker_Style.top = top + "px";
		viewControl.numberPicker_Style.left = left + "px";
		viewControl.numberPicker_Style.opacity = 0;
		$timeout(function() {
			viewControl.numberPicker_Style.opacity = 1;
		}, 100);
	};
	/**
	 * 数字选择器 隐藏命令（包含动画效果和view数据清理） 
	 */
	numberPickerHide = function(){
		viewControl.numberPicker_Style.opacity = 0;
		$timeout(function() {
			//重置计数
			viewDataModel.numberPicker.number = 1;
			//重置层叠
			viewControl.zIndexList["numberPicker"] = 0;
			viewControl.zIndexList["numberPickerMaskLayer"] = 0;
			viewControl.numberPicker_Style["z-index"] = 0;
			viewControl.numberPickerMaskLayer_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.numberPickerMaskLayerHide = true;
			viewControl.display.numberPickerHide = true;
		}, 100);
	};
	
	
	/**
	 * 确认对话框 显示命令
	 */
	confirmPanleShow = function(){
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["confirmPanle"] = maxZIndex+2;
		viewControl.zIndexList["confirmPanleMaskLayer"] = maxZIndex+1;
		viewControl.confirmPanle_Style["z-index"] = viewControl.zIndexList["confirmPanle"];
		viewControl.confirmPanleMaskLayer_Style["z-index"] = viewControl.zIndexList["confirmPanleMaskLayer"];
		
		//弹出遮罩层
		viewControl.display.confirmPanleMaskLayerHide = false;
		viewControl.display.confirmPanleHide = false;
		viewControl.confirmPanle_Style.opacity = 0;
		$timeout(function() {
			viewControl.confirmPanle_Style.opacity = 1;
		}, 10);
	};
	/**
	 * 确认对话框  隐藏命令
	 */
	confirmPanleHide = function(){
		//dataRoleObj[0].setStatus("");
		//dataRoleObj[0].setStatus2("");
		viewControl.confirmPanle_Style.opacity = 0;
		$timeout(function() {
			//重置层叠
			viewControl.zIndexList["confirmPanle"] = 0;
			viewControl.confirmPanle_Style["z-index"] = 0;
			viewControl.zIndexList["confirmPanleMaskLayer"] = 0;
			viewControl.confirmPanleMaskLayer_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.confirmPanleMaskLayerHide = true;
			viewControl.display.confirmPanleHide = true;
		}, 200);
	};
	
	
	/**
	 * 任务列表 显示命令
	 */
	missionSelectShow = function(){
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["missionSelect"] = maxZIndex+2;
		viewControl.zIndexList["missionInfo"] = maxZIndex+2;
		viewControl.zIndexList["missionSelectMaskLayer"] = maxZIndex+1;
		viewControl.zIndexList["panel"] = maxZIndex+2;
		
		viewControl.missionSelect_Style["z-index"] = viewControl.zIndexList["missionSelect"];
		viewControl.missionInfo_Style["z-index"] = viewControl.zIndexList["missionInfo"];
		viewControl.missionSelectMaskLayer_Style["z-index"] = viewControl.zIndexList["missionSelectMaskLayer"];
		viewControl.panel_Style["z-index"] = viewControl.zIndexList["panel"];
		//弹出遮罩层
		viewControl.display.missionSelectMaskLayerHide = false;
		
		viewControl.display.missionSelectHide = false;
		viewControl.display.missionInfoHide = false;
		viewControl.missionSelect_Style.right = 20 + "px";
		viewControl.missionSelect_Style.opacity = 0;
		viewControl.missionInfo_Style.left = 50 + "px";
		viewControl.missionInfo_Style.opacity = 0;
		$timeout(function() {
			viewControl.missionSelect_Style.right = 30 + "px";
			viewControl.missionSelect_Style.opacity = 1;
			viewControl.missionInfo_Style.left = 60 + "px";
			viewControl.missionInfo_Style.opacity = 1;
			panelTyping("查看任务...");
		}, 400);
	};
	/**
	 * 任务列表 隐藏命令
	 */
	missionSelectHide = function(){
		viewControl.missionSelect_Style.opacity = 0;
		var right = viewControl.missionSelect_Style.right;
		viewControl.missionSelect_Style.right = (Number(right.substring(0, right.length - 2)) - 10) + "px";
		viewControl.missionInfo_Style.opacity = 0;
		var left = viewControl.missionInfo_Style.left;
		viewControl.missionInfo_Style.left = (Number(left.substring(0, left.length - 2)) - 10) + "px";
		currentMission = DataModleFactory.createMission();
		$timeout(function() {
			//重置层叠
			viewControl.zIndexList["missionSelect"] = 0;
			viewControl.missionSelect_Style["z-index"] = 0;
			viewControl.zIndexList["missionSelectMaskLayer"] = 0;
			viewControl.missionSelectMaskLayer_Style["z-index"] = 0;
			viewControl.zIndexList["missionInfo"] = 0;
			viewControl.missionInfo_Style["z-index"] = 0;
			viewControl.zIndexList["panel"] = 0;
			viewControl.panel_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.missionSelectMaskLayerHide = true;
			viewControl.display.missionSelectHide = true;
			viewControl.display.missionInfoHide = true;
			mainShow();
			panelTyping("");
		}, 200);
	};
	
	
	
	/**
	 * 读取存档界面  显示命令
	 */
	loadSaveDataShow = function(){
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["loadSaveData"] = maxZIndex+2;
		viewControl.zIndexList["loadSaveDataMaskLayer"] = maxZIndex+1;
		
		viewControl.loadSaveData_Style["z-index"] = viewControl.zIndexList["loadSaveData"];
		viewControl.loadSaveDataMaskLayer_Style["z-index"] = viewControl.zIndexList["loadSaveDataMaskLayer"];
		//弹出遮罩层
		viewControl.display.loadSaveDataMaskLayerHide = false;
		
		viewControl.display.loadSaveDataHide = false;
		viewControl.loadSaveData_Style.left = 50 + "px";
		viewControl.loadSaveData_Style.opacity = 0;
		$timeout(function() {
			viewControl.loadSaveData_Style.left = 60 + "px";
			viewControl.loadSaveData_Style.opacity = 1;
		}, 400);
	};
	/**
	 * 读取存档界面  隐藏命令
	 */
	loadSaveDataHide = function(){
		viewControl.loadSaveData_Style.opacity = 0;
		var left = viewControl.loadSaveData_Style.left;
		viewControl.loadSaveData_Style.left = (Number(left.substring(0, left.length - 2)) - 10) + "px";
		$timeout(function() {
			//重置层叠
			viewControl.zIndexList["loadSaveData"] = 0;
			viewControl.loadSaveData_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.loadSaveDataMaskLayerHide = true;
			viewControl.display.loadSaveDataHide = true;
			mainShow();
		}, 200);
	};
	

	/**
	 * 装备界面  显示命令
	 */
	equipShow = function(){
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["equip"] = maxZIndex+2;
		viewControl.zIndexList["equipMaskLayer"] = maxZIndex+1;
		
		viewControl.equip_Style["z-index"] = viewControl.zIndexList["equip"];
		viewControl.equipMaskLayer_Style["z-index"] = viewControl.zIndexList["equipMaskLayer"];
		//弹出遮罩层
		viewControl.display.equipMaskLayerHide = false;
		
		viewControl.display.equipHide = false;
		
		viewControl.equip_Style.opacity = 0;
		$timeout(function() {
			viewControl.equip_Style.opacity = 1;
		}, 200);
	};
	/**
	 * 装备界面  隐藏命令
	 */
	equipHide = function(){
		//实现隐藏菜单（包裹）的动画效果
		var left = viewControl.menu_bag_Style.left;
		//viewControl.equip_Style.left = (Number(left.substring(0, left.length - 2)) - 10) + "px";
		viewControl.equip_Style.opacity = 0;
		$timeout(function() {
			//重置层叠
			viewControl.zIndexList["equip"] = 0;
			viewControl.zIndexList["equipMaskLayer"] = 0;
			viewControl.equip_Style["z-index"] = 0;
			viewControl.equipMaskLayer_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.equipMaskLayerHide = true;
			viewControl.display.equipHide = true;
		}, 200);
	};
	
	
	/**
	 * 技能面板 显示命令
	 */
	skillPanleShow = function(){
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["skillPanle"] = maxZIndex+2;
		viewControl.zIndexList["skillPanleMaskLayer"] = maxZIndex+1;
		
		viewControl.skillPanle_Style["z-index"] = viewControl.zIndexList["skillPanle"];
		viewControl.skillPanleMaskLayer_Style["z-index"] = viewControl.zIndexList["skillPanleMaskLayer"];
		//弹出遮罩层
		viewControl.display.skillPanleMaskLayerHide = false;
		
		viewControl.display.skillPanleHide = false;
		
		viewControl.skillPanle_Style.left = 50 + "px";
		viewControl.skillPanle_Style.opacity = 0;
		
		//展示技能窗口
		//in
		var menuBagLeft = 750;
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["menuBag"] = maxZIndex+2;
		viewControl.menu_bag_Style["z-index"] = viewControl.zIndexList["menuBag"];
		
		//同时打开包
		viewControl.display.menuSkillHide = false;
		viewControl.menu_bag_Style.left = menuBagLeft+ "px";
		viewControl.menu_bag_Style.opacity = 0;
		
		$timeout(function() {
			viewControl.skillPanle_Style.left = 100 + "px";
			viewControl.skillPanle_Style.opacity = 1;
			
			viewControl.menu_bag_Style.left = 10 +menuBagLeft+ "px";
			viewControl.menu_bag_Style.opacity = 1;
		}, 200);
	};
	/**
	 * 技能面板 隐藏命令
	 */
	skillPanleHide = function(){
		viewControl.skillPanle_Style.opacity = 0;
		var left = viewControl.skillPanle_Style.left;
		viewControl.skillPanle_Style.left = (Number(left.substring(0, left.length - 2)) - 50) + "px";
		//包裹组件
		var left = viewControl.menu_bag_Style.left;
		viewControl.menu_bag_Style.left = (Number(left.substring(0, left.length - 2)) - 10) + "px";
		viewControl.menu_bag_Style.opacity = 0;
		
		$timeout(function() {
			//重置层叠
			viewControl.zIndexList["skillPanle"] = 0;
			viewControl.skillPanle_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.skillPanleMaskLayerHide = true;
			viewControl.display.skillPanleHide = true;
			
			//包裹组件
			//重置层叠
			viewControl.zIndexList["menuBag"] = 0;
			viewControl.menu_bag_Style["z-index"] = 0;
			//隐藏组件
			viewControl.display.menuSkillHide = true;
			
			mainShow();
		}, 200);
	};
	
	
	/**
	 * 包裹菜单 显示命令
	 */
	menuBagShow = function(left){
		if(isNaN(Number(left))){
			left = 0;
		}
		var menuBagLeft=left;
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["menuBag"] = maxZIndex+2;
		viewControl.zIndexList["menuBagMaskLayer"] = maxZIndex+1;
		
		viewControl.menu_bag_Style["z-index"] = viewControl.zIndexList["menuBag"];
		viewControl.menuBagMaskLayer_Style["z-index"] = viewControl.zIndexList["menuBagMaskLayer"];
		//弹出遮罩层
		viewControl.display.menuBagMaskLayerHide = false;
		
		//同时打开包
		viewControl.display.menuBagHide = false;
		viewControl.menu_bag_Style.left = menuBagLeft+ "px";
		viewControl.menu_bag_Style.opacity = 0;
		$timeout(function() {
			viewControl.display.menuSkillHide = true;
			//包
			viewControl.menu_bag_Style.left = 10 +menuBagLeft+ "px";
			viewControl.menu_bag_Style.opacity = 1;
		}, 200);
	};
	/**
	 * 包裹菜单  隐藏命令
	 */
	menuBagHide = function(){
		//实现隐藏菜单（包裹）的动画效果
		var left = viewControl.menu_bag_Style.left;
		viewControl.menu_bag_Style.left = (Number(left.substring(0, left.length - 2)) - 10) + "px";
		viewControl.menu_bag_Style.opacity = 0;
		
		//判断是技能安装状态,显示技能菜单
		if(dataRoleObj[0].getStatus()=="useSkillPanle"){
			viewControl.display.menuSkillHide = false;
		}
		$timeout(function() {
			//重置层叠
			viewControl.zIndexList["menuBagMaskLayer"] = 0;
			viewControl.menuBagMaskLayer_Style["z-index"] = 0;
			//判断是技能安装状态,显示技能菜单
			if(dataRoleObj[0].getStatus()=="useSkillPanle"){
				viewControl.menu_bag_Style.opacity = 1;
			}else{
				viewControl.zIndexList["menuBag"] = 0;
				viewControl.menu_bag_Style["z-index"] = 0;
			}
			//隐藏组件
			viewControl.display.menuBagMaskLayerHide = true;
			viewControl.display.menuBagHide = true;
		}, 200);
	};
	
	
	/**
	 * 地图交互对象按钮组 显示效果
	 */
	map3dButtonsShow = function(){
		for (var i=1; i < 17; i++) {
			var scale = viewControl["map3dButton"+i+"_Style"].transform.match(/scale\([-]*[0-9]*[.]*[0-9]*\)/)[0];
			viewControl["map3dButton"+i+"_Style"].transform = viewControl["map3dButton"+i+"_Style"].transform.replace(scale,"scale(0)");
			viewControl["map3dButton"+i+"_Style"]["transition-timing-function"] = "cubic-bezier(.14,1.52,.65,1.37)";
			viewControl["map3dButton"+i+"_Style"].opacity = 0;
		};
		$timeout(function() {
			for (var i=1; i < 17; i++) {
				var scale = viewControl["map3dButton"+i+"_Style"].transform.match(/scale\([-]*[0-9]*[.]*[0-9]*\)/)[0];
				viewControl["map3dButton"+i+"_Style"].transform = viewControl["map3dButton"+i+"_Style"].transform.replace(scale,"scale(1)");
				viewControl["map3dButton"+i+"_Style"].opacity = 1;
			};
		}, 100);
	};
	
	
	/**
	 * 展示战斗界面
	 */
	sceneFightShow = function(){
		//标记角色状态为战斗状态
		dataRoleObj[0].setStatus("fight");
		//场景切换,动态效果
		viewControl.display.sceneBattleHide = false;
		$timeout(function() {
			viewControl.currentScene = "scene-battle";
		}, 10);
		$timeout(function() {
			//隐藏其他场景
			viewControl.display.sceneMainHide = true;
			viewControl.display.sceneStartHide = true;
			mainShow();
			//panelTyping(data.startText);
		}, 200);
		//显示角色战斗状态信息面板
		
	};
	/**
	 * 隐藏战斗界面
	 */
	sceneFightHide = function(str){
		//标记角色状态
		dataRoleObj[0].setStatus("");
		//场景切换,动态效果
		viewControl.display.sceneMainHide = false;
		$timeout(function() {
			viewControl.currentScene = "scene-main";
		}, 10);
		$timeout(function() {
			viewControl.display.sceneBattleHide = true;
			viewControl.display.sceneStartHide = true;
			//隐藏其他场景
			mainShow();
			panelTyping(str);
		}, 200);
	};
});

//人物交互面板
app.controller("panel4", function($scope, $rootScope, $timeout) {
	//点击某个交互对象
	$scope.onClick = function($event,index) {
		//处理传入对象，判断 class= button2
		var tempt = $event.target.parentNode;
		while("button2"!=tempt.className){
			tempt = tempt.parentNode;
		}
		//标记交互类型为交互对象
		viewControl.currentInteractiveType = "interactiveObject";
		//传入点击目标（用于定位），显示列表菜单
		menuShow($event,"3d");
		//标记当前交互对象
		currentInteractiveObject = currentDomain.getInteractiveObject(index);
		//加载交互对象动作数据
		viewDataModel.menu.buttonElements = function () {
			return currentInteractiveObject.getActions();
		};
		//viewDataModel.menu.tittleText = currentInteractiveObject.getName();
	};
	
	
	var dragRotateFn;
	$scope.dragRotate = function($event){
		//记录原始鼠标地址
		var mouseX = $event.x;
		var mouseY = $event.y;
		dragRotateFn = function (ev) {
			//获取原始rotateZ
			var numZ = Number(viewControl.map3dFloor_Style.transform.match(/rotateZ\([-]*[0-9]*/)[0].substring(8));
			var numY = Number(viewControl.map3dFloor_Style.transform.match(/rotateX\([-]*[0-9]*/)[0].substring(8));
			var temp = (mouseX - ev.x)*0.5+numZ;
			var temp2 = (mouseY - ev.y)*0.5+numY;
			if (temp2<30) {
				temp2=30;
			} else if(temp2>70){
				temp2=70;
			};
			//记录变动后的mouseX
			mouseX = ev.x;
			mouseY = ev.y;
			viewControl.map3dFloor_Style.transform = "rotateX("+temp2+"deg) rotateZ("+temp+"deg)";
			for (var i=1; i < 17; i++) {
				var rotateZ = viewControl.map3dButton_Style.transform.match(/rotateZ\([-]*[0-9]*[.]*[0-9]*/)[0];
				var rotateX = viewControl.map3dButton_Style.transform.match(/rotateX\([-]*[0-9]*[.]*[0-9]*/)[0];
				viewControl.map3dButton_Style.transform = viewControl.map3dButton_Style.transform.replace(rotateZ,"rotateZ("+(-temp));
				viewControl.map3dButton_Style.transform = viewControl.map3dButton_Style.transform.replace(rotateX,"rotateX("+(-temp2));
			};
			$scope.$apply();
		};
		//判断是右键按下
		if ($event.button==2) {
			//绑定事件，鼠标移动时变化style
			document.getElementById("map3D").addEventListener("mousemove",dragRotateFn);
		};
	};
	$scope.dragRotateStop = function(){
		//解绑事件
		document.getElementById("map3D").removeEventListener("mousemove",dragRotateFn);
	};
});

//交互动作菜单
app.controller("menu", function($scope, $rootScope,$timeout) {
	//点击某个交互动作
	$scope.menulistClick = function(index,$event){
		//获取交互动作
		if ("interactiveObject"==viewControl.currentInteractiveType){
			currentAction = currentInteractiveObject.getActions()[index];
		}else if("item"==viewControl.currentInteractiveType){
			currentAction = currentItem.getActions(dataRoleObj[0].getStatus())[index];
		}else{
			return;
		}
		/*---------交互对象操作动作--------*/
		var flag=false;
		if(currentAction.getType()=="talk"){
			flag=true;
			//判断为对话
			var typingContent = currentAction.getContent();
			//任务校验
			//获取进行中任务
			var tempMissions = dataRoleObj[0].getMissions(MISSION.STATUS.ongoing);
			if(tempMissions.length>0){
				//遍历进行中任务
				for (var i=0; i < tempMissions.length; i++) {
					var tempInteractiveObjects = tempMissions[i].getCompleteInteractiveObjects();
					if(tempInteractiveObjects.length>0){
						//遍历任务包含的对象
						for (var i=0; i < tempInteractiveObjects.length; i++) {
							//判断是否有对话,且未完成
							if(tempInteractiveObjects[i].getCompleteTalk()==false){
								//判断当前交互对象和任务对象是否是同一对象
								if(compareInteractiveObject(currentInteractiveObject,tempInteractiveObjects[i])){
									//读取任务对话，没有则不读取
									if(tempInteractiveObjects[i].getCompleteTalkContent()!=""){
										typingContent=tempInteractiveObjects[i].getCompleteTalkContent();
									};
									//重新校验该任务完成情况
									dataRoleObj[0].checkMissions();
									break;
								};
							}
						};
					}
				};
			}
			
			panelTyping(typingContent);
			//对话动作完成，清空当前交互动作
			currentAction = null;
			//对话动作完成，清空当前交互对象
			//currentInteractiveObject = null;清空会报错
		}else if(currentAction.getType()=="move"){
			flag=true;
			//判断为移动，场景切换
			sceneMainViewDataClear();//视图数据清除
			//读取到移动目标(即signId)
			currentAction.getTarget();
			//读取坐标
			currentAction.getTargetX();
			currentAction.getTargetY();
			//判断是大地图 或是 公开场景
			if(currentAction.getTarget().substring(0,3)=="map"){//截取到map开头，则是大地图模式
				//遍历判断所有大地图
				for (var i=0; i < mapDomainsObj.length; i++) {
					//判断是目标大地图
					if(mapDomainsObj[i][0].getSignId()==currentAction.getTarget()){
						//记录当前大地图
						currentMapDomains = mapDomainsObj[i];
						//遍历该大地图中区域domain对象
						for (var i1=0; i1 < mapDomainsObj[i].length; i1++) {
							//判断区域domain对象坐标
							if(mapDomainsObj[i][i1].getX()==currentAction.getTargetX()&&mapDomainsObj[i][i1].getY()==currentAction.getTargetY()){
								//读取区域数据
								sceneMainDataLoad(mapDomainsObj[i][i1]);
								panelTyping(currentAction.getContent());
								break;
							}
						};
						break;
					}
				};
				//展示方向盘
				steeringWheelShow();
			}else{
				for (var i=0; i < dataDomainsObj.length; i++) {
					if (currentAction.getTarget()==dataDomainsObj[i].getSignId()) {
						//读取区域数据
						sceneMainDataLoad(dataDomainsObj[i]);
						panelTyping(currentAction.getContent());
						break;
					};
				};
				//隐藏方向盘
				steeringWheelHide();
			}
			//移动动作完成，清空当前交互动作
			currentAction = null;
			//任务校验
			//获取进行中任务
			var tempMissions = dataRoleObj[0].getMissions(MISSION.STATUS.ongoing);
			if(tempMissions.length>0){
				//遍历进行中任务
				for (var i=0; i < tempMissions.length; i++) {
					var tempDomains = tempMissions[i].getCompleteDomains();
					if (tempDomains.length>0) {
						//遍历任务包含的场景
						for (var i=0; i < tempDomains.length; i++) {
							//判断是否有到达条件,且未完成
							if(tempDomains[i].getArrive()==false){
								//判断当前到达场景和任务场景是否是同一场景对象
								if(compareDomain(currentDomain,tempDomains[i])){
									//将该任务属性修改为已到达
									tempDomains[i].setArrive(true);
									//重新校验该任务完成情况
									dataRoleObj[0].checkMissions();
									break;
								}
							}
						}
					};
				}
			}
			//动画效果
			map3dButtonsShow();
			//移动动作完成，清空当前交互对象
			//currentInteractiveObject = null;清空会报错
		}else if(currentAction.getType()=="useWarehouse"){
			flag=true;
			//判断为打开仓库动作
			panelTyping(currentAction.getContent());
			//加载仓库数据
			viewDataModel.panel5.buttonElements = function () {
				return currentInteractiveObject.getItems();
			};
			viewDataModel.panel5.tittleText =  function () {
				return currentInteractiveObject.getName();
			};
			//加载包裹数据,重新定位视图数据指针
			viewDataModel.menuBag.buttonElements = function () {
				return dataRoleObj[0].getItems();
			};
			panel5Show();
			//标记角色状态为使用仓库状态
			dataRoleObj[0].setStatus("useWarehouse");
			//使用建筑功能（仓库）动作完成，清空当前交互动作
			currentAction = null;
			//使用流程继续，保留当前交互对象
			currentInteractiveObject;
		}else if(currentAction.getType()=="transaction"){
			flag=true;
			//判断为打开交易动作
			panelTyping(currentAction.getContent());
			//标记角色状态为交易状态
			dataRoleObj[0].setStatus("transaction");
			//加载物品信息数据（交易价格）
			currentItemInfo = (function (){
				var tempItemInfos = [];
				(function fn (itemInfos,obj){
					if (!itemInfos) {//如果itemInfo为空，新建数组
						itemInfos = [];
					};
					//判断：1.有get方法,2.执行后获得到了itemInfos,3.itemInfos[]长度>0
					if(obj.getItemInfos&&obj.getItemInfos()!=null&&obj.getItemInfos()!=undefined&&obj.getItemInfos().length>0){
						objItemInfos = obj.getItemInfos();
						for (var i=0; i < objItemInfos.length; i++) {
							var flag = false;
							for(var j=0; j < itemInfos.length; j++){
								if(compareItem(objItemInfos[i],itemInfos[j])){
									flag = true;//标记为已有
									break;
								}
							}
							if(flag){//判断itemInfo中是否已有,有则跳过继续下一个循环
								continue;
							}
							//进行深度复制
							var tempItemInfo = DataModleFactory.createItemInfo();
							copyBean(objItemInfos[i],tempItemInfo);
							itemInfos.push(tempItemInfo);
						}
					}
					//最后判断是否有父对象
					if(obj.supper!=null&&obj.supper!=undefined){
						//有父对象则递归
						fn(itemInfos,obj.supper);
					}else{//没有父对象则读取全局数据写入
						for (var i=0; i < publicItemInfo.length; i++) {
							var flag = false;
							for(var j=0; j < itemInfos.length; j++){
								if(compareItem(publicItemInfo[i],itemInfos[j])){
									flag = true;//标记为已有
									break;
								}
							}
							if(flag){//判断itemInfo中是否已有,有则跳过继续下一个循环
								continue;
							}
							//进行深度复制
							var tempItemInfo = DataModleFactory.createItemInfo();
							copyBean(publicItemInfo[i],tempItemInfo);
							itemInfos.push(tempItemInfo);
						}
					}
				})(tempItemInfos,currentInteractiveObject);
				return tempItemInfos;
			})();
			//加载当前交互对象的物品数据
			viewDataModel.panel5.buttonElements = function () {
				return currentInteractiveObject.getItems();
			};
			viewDataModel.panel5.tittleText =  function () {
				return currentInteractiveObject.getName();
			};
			//加载包裹数据,重新定位视图数据指针
			viewDataModel.menuBag.buttonElements = function () {
				return dataRoleObj[0].getItems();
			};
			//加载交易面板数据，初始为空
			//viewDataModel.transactionPanel.sellButtonElements = function(){return {};},
			//viewDataModel.transactionPanel.buyButtonElements = function(){return {};},
			panel5Show("transaction");
			//标记角色状态为交易状态
			dataRoleObj[0].setStatus("transaction");
			//打开交易动作完成，清空当前交互动作
			currentAction = null;
			//交易流程继续，保留当前交互对象
			currentInteractiveObject;
		}else if(currentAction.getType()==ACTION.TYPE.fight){
			flag=true;
			//判断为开始战斗
			mainHide();
			sceneMainViewDataClear();
			sceneFightShow();
		}else if(currentAction.getType()==ACTION.TYPE.mission){
			//alert("任务");
			flag=true;
			viewDataModel.missionSelect.elements=function(){
				//只读取  可接取:accept|进行中:ongoing|可交付:deliverable
				if (currentInteractiveObject!=null){
					var missionArray = currentInteractiveObject.getMissions(
						MISSION.STATUS.accept
						,MISSION.STATUS.ongoing
						,MISSION.STATUS.deliverable);
					return missionArray;
				}else{
					return null;
				}
			};
			mainHide();
			missionSelectShow();
		}else if(currentAction.getType()==ACTION.TYPE.save){
			flag=true;
			//判断为存档
			//需要保存的数据
			//in
			var saveGameData = {};
			saveGameData.publicItemInfo = JSON.stringify(saveData(publicItemInfo));
			saveGameData.dataDomainsObj = JSON.stringify(saveData(dataDomainsObj));
			saveGameData.mapDomainsObj = JSON.stringify(saveData(mapDomainsObj));
			saveGameData.dataRoleObj = JSON.stringify(saveData(dataRoleObj));
			/*
		    localStorage.setItem("publicItemInfo", JSON.stringify(saveData(publicItemInfo)));
			localStorage.setItem("dataDomainsObj", JSON.stringify(saveData(dataDomainsObj)));
			localStorage.setItem("mapDomainsObj", JSON.stringify(saveData(mapDomainsObj)));
			localStorage.setItem("dataRoleObj", JSON.stringify(saveData(dataRoleObj)));
			*/
			/*-------------特殊对象-------------*/
			/**
			 * 全局任务交互动作
			 */
			//var missionActionObj = loadData(exampleData.actions[0],"action");
			/**
			 * 全局临时存放点对象（用于复制的模版）
			 */
			//var tempStoragePointObj = loadData(exampleData.interactiveObjects[0],"interactiveObject");
			/**
			 * 用于在任务栏显示没有任务
			 */
			//var noneMissionObj = loadData(exampleData.missions[0],"mission");
			/*--------------------------------*/
			/**
			 * 当前大地图
			 */
			if(currentMapDomains.length>0){
				saveGameData.currentMapDomains = JSON.stringify(scurrentMapDomains[0].getSignId());
				//localStorage.setItem("currentMapDomains", currentMapDomains[0].getSignId());
			}else{
				saveGameData.currentMapDomains = "";
				//localStorage.setItem("currentMapDomains", "");
			}
			/**
			 * 当前场景地图
			 */
			saveGameData.currentDomain = JSON.stringify(saveData(currentDomain));
			//localStorage.setItem("currentDomain", JSON.stringify(saveData(currentDomain)));
			//保存时间
			var myDate = new Date();
			var datestr = myDate.toLocaleString();
			saveGameData.saveDate = datestr;
			//localStorage.setItem("saveDate",datestr);
			console.info(saveGameData);
			console.info(JSON.stringify(saveGameData));
			
			localStorage.setItem(data.saveGameData,JSON.stringify(saveGameData));
			loadSaveGameData = JSON.parse(localStorage.getItem(data.saveGameData));
			loadSaveGameData_currentDomain = JSON.parse(loadSaveGameData.currentDomain);
			//in
			panelTyping("保存成功...");
		}
		/*---------物品操作动作--------*/
		else if(currentAction.getType()==ACTION.TYPE.split){
			flag=true;
			//判断为交易,重新定位视图数据指针
			viewDataModel.numberPicker.number = currentItem.getTotalNum();
			//打开数字选择器
			numberPickerShow(document.getElementById("menuAuto").offsetTop,document.getElementById("menuAuto").offsetLeft);
			//动作继续，不清空当前交互动作
			currentAction;
			//交易流程继续，保留当前交互对象
			currentInteractiveObject;
		}else if(currentAction.getType()==ACTION.TYPE.useConsumable){
			flag=true;
			//判断为使用(物品/消耗品)
			if(currentItem.getType2()==ITEM.TYPE.reusingConsumable){
				//判断第二类型为可复用,数量不减少
			}else{
				//数量-1
				currentItem.setTotalNum(currentItem.getTotalNum()-1);
				if(currentItem.getTotalNum()<1){
					dataRoleObj[0].delItem(currentItem);
				}
			}
			//执行使用效果
			//获取物品属性
			var tempAttr = currentItem.getAttr();
			if(tempAttr!=undefined&&tempAttr!=null){
				roleSettlement(tempAttr);
				/*
				//判断有hpPercent，则按百分比增加角色HP
				if("hpPercent" in tempAttr&&tempAttr.hpPercent!=undefined&&tempAttr.hpPercent!=null&&typeof Number(tempAttr.hpPercent) == "number"){
					dataRoleObj[0].setHp(dataRoleObj[0].getHp()+(dataRoleObj[0].getHp()*Number(tempAttr.hpPercent)));
				}
				//判断有hp，则增加角色HP
				if("hp" in tempAttr&&tempAttr.hp!=undefined&&tempAttr.hp!=null&&typeof Number(tempAttr.hp) == "number"){
					dataRoleObj[0].setHp(dataRoleObj[0].getHp()+Number(tempAttr.hp));
				}
				*/
			}
			//添加buff
			var tempBuffs = currentItem.getBuffs();//tempBuff 为  array
			if(tempBuffs&&tempBuffs!=undefined&&tempBuffs!=null&&tempBuffs.length>0){//判断有buff
				for (var i=0; i < tempBuffs.length; i++) {
					//复制一个buff对象，存入
					var tempBuff = copyBuff(tempBuffs[i]);
					dataRoleObj[0].addBuff(tempBuff);
				};
			};
		//}else if(currentAction.getType()==ACTION.TYPE.useUnConsumable){
			//判断为使用(物品/非消耗品)
			//执行使用效果
		}else if(currentAction.getType()==ACTION.TYPE.putOn){
			flag=true;
			//判断为穿上装备
			//获取当前hp的百分比
			var hpPercent = dataRoleObj[0].getHp()/dataRoleObj[0].getMaxHp();
			
			var tempItems = dataRoleObj[0].getItems();
			for (var i=0; i < tempItems.length; i++) {
				//遍历所有相同部位装备，并标记为卸下
				if(tempItems[i].getType2()==currentItem.getType2()){
					tempItems[i].setIsPutOn(false);
				}
			};
			currentItem.setIsPutOn(true);
			//按百分比重新计算当前hp
			dataRoleObj[0].setHp(dataRoleObj[0].getMaxHp()*hpPercent);
		}else if(currentAction.getType()==ACTION.TYPE.takeOff){
			flag=true;
			//获取当前hp的百分比
			var hpPercent = dataRoleObj[0].getHp()/dataRoleObj[0].getMaxHp();
			//判断为卸下装备
			currentItem.setIsPutOn(false);
			//按百分比重新计算当前hp
			dataRoleObj[0].setHp(dataRoleObj[0].getMaxHp()*hpPercent);
		}else if(currentAction.getType()==ACTION.TYPE.install){//安装技能单元
			flag=true;
			currentItem.setIndex(currentSkillPanleIndex);
		}else if(currentAction.getType()==ACTION.TYPE.uninstall){//卸下技能单元
			flag=true;
			currentItem.setIndex(null);
		}
		/*-------------使用技能-------------*/
		else if(currentAction.getType()==ACTION.TYPE.useSkill){
			flag=true;
			//获取当前技能
			var activeObjHpChange = 0;
			var activeObjEpChange = 0;
			var tempAttr = currentItem.getAttr();
			
			//如果消耗ep,计算ep是否足够
			if("epRecovery" in tempAttr
				&& typeof Number(tempAttr.epRecovery)=="number" 
				&& typeof !isNaN(Number(tempAttr.epRecovery))
				&& Number(tempAttr.epRecovery)!=0
				&& (Number(dataRoleObj[0].getEp())+Number(tempAttr.epRecovery))<0){
					//判断为ep不足
					panelTyping("ep不足,无法使用技能.");
			}else{
				if(tempAttr&&tempAttr!=undefined&&tempAttr!=null){
					//maxHp(百分比)恢复值
					if(SKILL.ATTR.hpRecoveryMaxHpPercent in tempAttr){
						activeObjHpChange+=dataRoleObj[0].getMaxHp()*tempAttr.hpRecoveryMaxHpPercent;
					}
					//当前hp(百分比)恢复值
					if(SKILL.ATTR.hpRecoveryPercent in tempAttr){
						activeObjHpChange+=dataRoleObj[0].getHp()*tempAttr.hpRecoveryPercent;
					}
					//hp直接恢复值
					if(SKILL.ATTR.hpRecovery in tempAttr){
						activeObjHpChange+=tempAttr.hpRecovery;
					}
					//maxEp(百分比)恢复值
					if(SKILL.ATTR.epRecoveryMaxEpPercent in tempAttr){
						activeObjEpChange+=dataRoleObj[0].getMaxEp()*tempAttr.epRecoveryMaxEpPercent;
					}
					//当前ep(百分比)恢复值
					if(SKILL.ATTR.epRecoveryPercent in tempAttr){
						activeObjEpChange+=dataRoleObj[0].getEp()*tempAttr.epRecoveryPercent;
					}
					//ep直接恢复值
					if(SKILL.ATTR.epRecovery in tempAttr){
						activeObjEpChange+=tempAttr.epRecovery;
					}
				}
				dataRoleObj[0].setHp(dataRoleObj[0].getHp()+activeObjHpChange);
				dataRoleObj[0].setEp(dataRoleObj[0].getEp()+activeObjEpChange);
			}
		}
		if(flag){//如果是不可使用的按钮，则不隐藏菜单
			//隐藏菜单
			menuHide();
		}
	};
});

//列表菜单:技能 组件
app.controller("menuSkill", function($scope, $rootScope,$timeout) {
	//仅注册，menulistHover menulistUnHover menulistClick1方法使用包裹组件公共方法
});
//列表菜单:包裹 组件
app.controller("menuBag", function($scope, $rootScope,$timeout) {
	$rootScope.menulistHover = function(index,pram) {
		//角色物品数组集合
		var roleItems = dataRoleObj[0].getItems(dataRoleObj[0].getStatus2());
		if(pram=="skill"){//判断为加载角色技能
			if(dataRoleObj[0].getStatus()=="fight"){
				roleItems = dataRoleObj[0].getSkills("active");
			}else{
				roleItems = dataRoleObj[0].getSkills();
			}
		}else if(dataRoleObj[0].getStatus()=="fight"){
			roleItems = dataRoleObj[0].getItems("useRoleBag-Consumable");
		}
		//标记当前交互（物品）对象
		currentItem = roleItems[index];
		$timeout(function() {
			//显示物品信息面板
			panel3ItemInfoShow();
			//判断为装备,增加对比信息面板显示
			if(currentItem.getType()==ITEM.TYPE.equip){
				//遍历角色物品集合
				for (var i=0; i < roleItems.length; i++) {
					//判断：1.已装备;2.和当前交互物品为同一类型装备
					if (roleItems[i].getIsPutOn() && roleItems[i].getType2()==currentItem.getType2()){
						//将数据写入视图
						viewDataModel.panel3RoleItemInfo.name = function () {
							if(roleItems[i]&&roleItems[i].getName){
								if(roleItems[i].getName()||roleItems[i].getName()==""){
									viewControl.display.panel3RoleItemInfoNameHide=false;
								}else{
									viewControl.display.panel3RoleItemInfoNameHide=true;
								}
								return roleItems[i].getName();
							}
						};
						viewDataModel.panel3RoleItemInfo.content = function () {
							if(roleItems[i]&&roleItems[i].getContent){
								if(roleItems[i].getContent()||roleItems[i].getContent()==""){
									viewControl.display.panel3RoleItemInfoContentHide=false;
								}else{
									viewControl.display.panel3RoleItemInfoContentHide=true;
								}
								return roleItems[i].getContent();
							}
						};
						viewDataModel.panel3RoleItemInfo.attrExplain = function(pram){
							if(roleItems[i]&&roleItems[i].getAttr){
								if(roleItems[i].getAttr()){
									if(pram in currentItem.getAttr()
										&& typeof Number(currentItem.getAttr()[pram])=="number" 
										&& typeof !isNaN(Number(currentItem.getAttr()[pram]))
										&& Number(currentItem.getAttr()[pram])!=0){
										if(pram=="maxHpPercent"){
											if(currentItem.getType()==ITEM.TYPE.equip){
												return "HP最大值增加";
											}else{
												return "恢复HP最大值";
											}
										}
									}
								}
							}
						};
						viewDataModel.panel3RoleItemInfo.attr = function (pram) {
							if(roleItems[i]&&roleItems[i].getAttr
								&&roleItems[i].getAttr()
								&&pram in roleItems[i].getAttr()
								&& typeof Number(roleItems[i].getAttr()[pram])=="number" 
								&& typeof !isNaN(Number(roleItems[i].getAttr()[pram]))
								&& Number(roleItems[i].getAttr()[pram])!=0){
								if(pram=="epRecovery"){
									viewControl.display.panel3RoleItemInfoEpRecoveryHide = false;
									return roleItems[i].getAttr().epRecovery;
								}else if(pram=="epRecoveryPercent"){
									viewControl.display.panel3RoleItemInfoEpRecoveryPercentHide = false;
									return parseInt(roleItems[i].getAttr().epRecoveryPercent*100)+"%";
								}else if(pram=="epRecoveryMaxEpPercent"){
									viewControl.display.panel3RoleItemInfoEpRecoveryMaxEpPercentHide = false;
									return parseInt(roleItems[i].getAttr().epRecoveryMaxEpPercent*100)+"%";
								}else if(pram=="maxEp"){
									viewControl.display.panel3RoleItemInfoMaxEpHide = false;
									return roleItems[i].getAttr().maxEp;
								}else if(pram=="maxEpPercent"){
									viewControl.display.panel3RoleItemInfoMaxEpPercentHide = false;
									return parseInt(roleItems[i].getAttr().maxEpPercent*100)+"%";
								}else if(pram=="hpRecovery"){
									viewControl.display.panel3RoleItemInfoHpRecoveryHide = false;
									return roleItems[i].getAttr().hpRecovery;
								}else if(pram=="hpRecoveryPercent"){
									viewControl.display.panel3RoleItemInfoHpRecoveryPercentHide = false;
									return parseInt(roleItems[i].getAttr().hpRecoveryPercent*100)+"%";
								}else if(pram=="hpRecoveryMaxHpPercent"){
									viewControl.display.panel3RoleItemInfoHpRecoveryMaxHpPercentHide = false;
									return parseInt(roleItems[i].getAttr().hpRecoveryMaxHpPercent*100)+"%";
								}else if(pram=="maxHp"){
									viewControl.display.panel3RoleItemInfoMaxHpHide = false;
									return roleItems[i].getAttr().maxHp;
								}else if(pram=="maxHpPercent"){
									viewControl.display.panel3RoleItemInfoMaxHpPercentHide = false;
									return parseInt(roleItems[i].getAttr().maxHpPercent*100)+"%";
								}else if(pram=="att"){
									viewControl.display.panel3RoleItemInfoAttHide = false;
									return roleItems[i].getAttr().att;
								}else if(pram=="attPercent"){
									viewControl.display.panel3RoleItemInfoAttPercentHide = false;
									return parseInt(roleItems[i].getAttr().attPercent*100)+"%";
								}else if(pram=="damage"){
									viewControl.display.panel3RoleItemInfoDamageHide = false;
									return roleItems[i].getAttr().damage;
								}else if(pram=="def"){
									viewControl.display.panel3RoleItemInfoDefHide = false;
									return roleItems[i].getAttr().def;
								}else if(pram=="defPercent"){
									viewControl.display.panel3RoleItemInfoDefPercentHide = false;
									return parseInt(roleItems[i].getAttr().defPercent*100)+"%";
								}else if(pram=="cri"){
									viewControl.display.panel3RoleItemInfoCriHide = false;
									return parseInt(roleItems[i].getAttr().cri*100)+"%";
								}else if(pram=="criPercent"){
									viewControl.display.panel3RoleItemInfoCriPercentHide = false;
									return roleItems[i].getAttr().criPercent+"倍";
								}else if(pram=="criStrike"){
									viewControl.display.panel3RoleItemInfoCriStrikeHide = false;
									return parseInt(roleItems[i].getAttr().criStrike*100)+"%";
								}else if(pram=="criStrikePercent"){
									viewControl.display.panel3RoleItemInfoCriStrikePercentHide = false;
									return roleItems[i].getAttr().criStrikePercent+"倍";
								}else if(pram=="avd"){
									viewControl.display.panel3RoleItemInfoAvdHide = false;
									return parseInt(roleItems[i].getAttr().avd*100)+"%";
								}else if(pram=="avdPercent"){
									viewControl.display.panel3RoleItemInfoAvdPercentHide = false;
									return roleItems[i].getAttr().avdPercent+"倍";
								}else if(pram=="hit"){
									viewControl.display.panel3RoleItemInfoHitHide = false;
									return parseInt(roleItems[i].getAttr().hit*100)+"%";
								}else if(pram=="hitPercent"){
									viewControl.display.panel3RoleItemInfoHitPercentHide = false;
									return roleItems[i].getAttr().hitPercent+"倍";
								}
							}else{
								if(pram=="epRecovery"){
									viewControl.display.panel3RoleItemInfoEpRecoveryHide = true;
								}else if(pram=="epRecoveryPercent"){
									viewControl.display.panel3RoleItemInfoEpRecoveryPercentHide = true;
								}else if(pram=="epRecoveryMaxEpPercent"){
									viewControl.display.panel3RoleItemInfoEpRecoveryMaxEpPercentHide = true;
								}else if(pram=="maxEp"){
									viewControl.display.panel3RoleItemInfoMaxEpHide = true;
								}else if(pram=="maxEpPercent"){
									viewControl.display.panel3RoleItemInfoMaxEpPercentHide = true;
								}else if(pram=="hpRecovery"){
									viewControl.display.panel3RoleItemInfoHpRecoveryHide = true;
								}else if(pram=="hpRecoveryPercent"){
									viewControl.display.panel3RoleItemInfoHpRecoveryPercentHide = true;
								}else if(pram=="hpRecoveryMaxHpPercent"){
									viewControl.display.panel3RoleItemInfoHpRecoveryMaxHpPercentHide = true;
								}else if(pram=="maxHp"){
									viewControl.display.panel3RoleItemInfoMaxHpHide = true;
								}else if(pram=="maxHpPercent"){
									viewControl.display.panel3RoleItemInfoMaxHpPercentHide = true;
								}else if(pram=="att"){
									viewControl.display.panel3RoleItemInfoAttHide = true;
								}else if(pram=="attPercent"){
									viewControl.display.panel3RoleItemInfoAttPercentHide = true;
								}else if(pram=="damage"){
									viewControl.display.panel3RoleItemInfoDamageHide = true;
								}else if(pram=="def"){
									viewControl.display.panel3RoleItemInfoDefHide = true;
								}else if(pram=="defPercent"){
									viewControl.display.panel3RoleItemInfoDefPercentHide = true;
								}else if(pram=="cri"){
									viewControl.display.panel3RoleItemInfoCriHide = true;
								}else if(pram=="criaPercent"){
									viewControl.display.panel3RoleItemInfoCriPercentHide = true;
								}else if(pram=="criStrike"){
									viewControl.display.panel3RoleItemInfoCriStrikeHide = true;
								}else if(pram=="criStrikePercent"){
									viewControl.display.panel3RoleItemInfoCriStrikePercentHide = true;
								}else if(pram=="avd"){
									viewControl.display.panel3RoleItemInfoAvdHide = true;
								}else if(pram=="avdPercent"){
									viewControl.display.panel3RoleItemInfoAvdPercentHide = true;
								}else if(pram=="hit"){
									viewControl.display.panel3RoleItemInfoHitHide = true;
								}else if(pram=="hitPercent"){
									viewControl.display.panel3RoleItemInfoHitPercentHide = true;
								}
							}
						};
						//显示装备对比信息面板
						panel3RoleItemInfoShow();
						break;
					}
				};
			}
		},200);
	};
	$rootScope.menulistUnHover = function() {
		//隐藏装备对比信息面板
		panel3RoleItemInfoHide();
		//隐藏物品信息面板
		panel3ItemInfoHide();
	};
	$rootScope.menulistClick1 = function($event,index) {
		//处理传入对象
		var tempt = $event.target.parentNode;
		while("menu-list ng-scope"!=tempt.className){
			tempt = tempt.parentNode;
		}
		//标记交互类型为物品
		viewControl.currentInteractiveType = "item";
		//传入点击目标（用于定位），显示列表菜单
		menuShow(tempt);
		//标记当前交互（物品）对象
		if("skill"==dataRoleObj[0].getStatus()){
			currentItem = dataRoleObj[0].getSkills()[index];
		}else{
			currentItem = dataRoleObj[0].getItems(dataRoleObj[0].getStatus2())[index];
		}
		//加载交互对象动作数据（同步至视图）
		viewDataModel.menu.buttonElements = function () {
			if("useRoleBag"==dataRoleObj[0].getStatus()){
				//判断是状态为打开背包，去掉堆叠选项显示
				return currentItem.getActions("useRoleBag");
			}else if("transaction"==dataRoleObj[0].getStatus()){
				//判断是状态为交易，仅堆叠选项显示
				return currentItem.getActions("transaction");
			}else if("useWarehouse"==dataRoleObj[0].getStatus()){
				//判断是状态为使用仓库，仅堆叠选项显示
				return currentItem.getActions("useWarehouse");
			}else if("useSkillPanle"==dataRoleObj[0].getStatus()){
				//判断是状态为查看技能面板
				return currentItem.getActions("useSkillPanle");
			}
			return currentItem.getActions();
		};
	};
});

//仓库组件
app.controller("panel5", function($scope, $rootScope,$timeout) {
	$scope.menulistHover = function(index) {
		$timeout(function() {
			//角色物品数组集合
			var roleItems = dataRoleObj[0].getItems(dataRoleObj[0].getStatus2());
			//标记当前交互（物品）对象
			currentItem = currentInteractiveObject.getItem(index);
			//显示物品信息面板
			panel3ItemInfoShow();
			//判断为装备,增加对比信息面板显示
			if(currentItem.getType()==ITEM.TYPE.equip){
				//遍历角色物品集合
				for (var i=0; i < roleItems.length; i++) {
					//判断：1.已装备;2.和当前交互物品为同一类型装备
					if (roleItems[i].getIsPutOn() && roleItems[i].getType2()==currentItem.getType2()){
						//将数据写入视图
						viewDataModel.panel3RoleItemInfo.name = function(){
							return roleItems[i].getName();
						};
						viewDataModel.panel3RoleItemInfo.content = function(){
							return roleItems[i].getContent();
						};
						//显示装备对比信息面板
						panel3RoleItemInfoShow();
						break;
					}
				};
			}
		},200);
	};
	$scope.menulistUnHover = function() {
		//隐藏装备对比信息面板
		panel3RoleItemInfoHide();
		//隐藏物品信息面板
		panel3ItemInfoHide();
	};
	//点击某个交互对象
	$scope.onClick = function($event,index) {
		//处理传入对象，判断 class= button2
		var tempt = $event.target.parentNode;
		while("button2 ng-scope"!=tempt.className){
			tempt = tempt.parentNode;
		}
		//标记交互类型为物品
		viewControl.currentInteractiveType = "item";
		//传入点击目标（用于定位），显示列表菜单
		menuShow(tempt);
		//标记当前交互（物品）对象
		currentItem = currentInteractiveObject.getItem(index);
		//加载交互对象动作数据（同步至视图）
		viewDataModel.menu.buttonElements = function () {
			return currentItem.getActions();
		};
		//viewDataModel.menu.tittleText = currentItem.getName();
	};
});

//交易面板组件
app.controller("transactionPanel", function($scope, $rootScope,$timeout) {
	$scope.sellsClick = function($event,index) {
		//处理传入对象
		var tempt = $event.target.parentNode;
		while("button2 ng-scope"!=tempt.className){
			tempt = tempt.parentNode;
		}
		//标记交互类型为物品
		viewControl.currentInteractiveType = "item";
		//传入点击目标（用于定位），显示列表菜单
		menuShow(tempt);
		//标记当前交互（物品）对象
		currentItem = transactionItems.sellItems[index];
		//加载交互对象动作数据（同步至视图）
		viewDataModel.menu.buttonElements = function () {
			return currentItem.getActions();
		};
	};
	$scope.buysClick = function($event,index) {
		//处理传入对象
		var tempt = $event.target.parentNode;
		while("button2 ng-scope"!=tempt.className){
			tempt = tempt.parentNode;
		}
		//标记交互类型为物品
		viewControl.currentInteractiveType = "item";
		//传入点击目标（用于定位），显示列表菜单
		menuShow(tempt);
		//标记当前交互（物品）对象
		currentItem = transactionItems.buyItems[index];
		//加载交互对象动作数据（同步至视图）
		viewDataModel.menu.buttonElements = function () {
			return currentItem.getActions();
		};
	};
	//点击确认
	$scope.confirm = function() {
		//校验是否可执行
		//遍历出售物品，计算价值
		var sellCostTotal = 0;
		var tempNum2 = 0;
		for (var i=0; i < transactionItems.sellItems.length; i++) {
			var sellItem = transactionItems.sellItems[i];
			for (var j=0; j < currentItemInfo.length; j++) {
				if(compareItem(currentItemInfo[j],sellItem)){
					sellCostTotal+=(sellItem.getTotalNum()*currentItemInfo[j].getSellCost());
				}
			};
			//计算包裹占用空间
			if(!isNaN(Number(currentInteractiveObject.getBagSpace()))){//判断是否有限制
				if(!isNaN(Number(sellItem.getBagSpace()))){
					tempNum2 += sellItem.getTotalNum()*sellItem.getBagSpace();
				}else{
					tempNum2 += sellItem.getTotalNum();
				}
			}//没有限制则不校验
		};
		if(!isNaN(Number(currentInteractiveObject.getBagSpace()))){//判断是否有限制
			//校验包裹空间
			if((currentInteractiveObject.getOccupySpace()+tempNum)>currentInteractiveObject.getBagSpace()
				&&(currentInteractiveObject.getOccupySpace()+tempNum)>currentInteractiveObject.getOccupySpace()){
				//判断超过背包空间，打印并返回，维持原样
				panelTyping("对方空间不足...");
				return;
			}
		}//没有限制则不校验
		
		
		//遍历购入物品，计算价值
		var buyCostTotal = 0;
		var tempNum = 0;
		for (var i=0; i < transactionItems.buyItems.length; i++) {
			var buyItem = transactionItems.buyItems[i];
			for (var j=0; j < currentItemInfo.length; j++) {
				if(compareItem(currentItemInfo[j],buyItem)){
					buyCostTotal+=(buyItem.getTotalNum()*currentItemInfo[j].getBuyCost());
				}
			};
			//计算包裹占用空间
			if(!isNaN(Number(buyItem.getBagSpace()))){
				tempNum += buyItem.getTotalNum()*buyItem.getBagSpace();
			}else{
				tempNum += buyItem.getTotalNum();
			}
		};
		//对比价值
		if(sellCostTotal<buyCostTotal){
			panelTyping("价格不足");
			return;
		}
		//校验包裹空间
		if((dataRoleObj[0].getOccupySpace()+tempNum)>dataRoleObj[0].getBagSpace()
			&&(dataRoleObj[0].getOccupySpace()+tempNum)>dataRoleObj[0].getOccupySpace()){
			//判断超过背包空间，打印并返回，维持原样
			panelTyping("背包空间不足...");
			return;
		}
		//待售出存入交互对象
		var interactiveObjectItems = currentInteractiveObject.getItems();
		var flag = false;
		for (var j=0; j < transactionItems.sellItems.length;j) {
			var sellItem = transactionItems.sellItems[j];
			for (var i=0; i < interactiveObjectItems.length; i++) {
				if(compareItem(interactiveObjectItems[i],sellItem)){
					//遍历后发现同一物品,叠加数量
					interactiveObjectItems[i].setTotalNum(interactiveObjectItems[i].getTotalNum()+sellItem.getTotalNum());
					flag = true;
				}
			};
			if(!flag){
				//遍历完成，未发现同一物品，复制出一个物品对象
				var item_Obj = DataModleFactory.createItem();
				copyBean(sellItem,item_Obj);
				//存入交互对象
				currentInteractiveObject.addItem(item_Obj);
			}
			//从交易面板数据中移除
			transactionItems.sellItems.shift();
			flag = false;
		}
		//待购入存入角色包 roleItems  dataRoleObj[0].getItems()
		var roleItems = dataRoleObj[0].getItems();
		var flag = false;
		for (var j=0; j < transactionItems.buyItems.length;j) {
			var buyItem = transactionItems.buyItems[j];
			for (var i=0; i < roleItems.length; i++) {
				if(compareItem(roleItems[i],buyItem)){
					//遍历后发现同一物品,叠加数量
					roleItems[i].setTotalNum(roleItems[i].getTotalNum()+buyItem.getTotalNum());
					flag = true;
				}
			};
			if(!flag){
				//遍历完成，未发现同一物品，复制出一个物品对象
				var item_Obj = DataModleFactory.createItem();
				copyBean(buyItem,item_Obj);
				//存入交互对象
				dataRoleObj[0].addItem(item_Obj);
			}
			//从交易面板数据中移除
			transactionItems.buyItems.shift();
			flag = false;
		}
		panel5Hide();
		panelTyping("交易完成");
		//交易流程完成，清空当前交互对象
		//currentInteractiveObject = null;
	};
});

//数字选择器
app.controller("numberPicker", function($scope, $rootScope,$timeout,$interval) {
	//按住数字增加
	$scope.numberUp = function() {
		numberUp_Interval = $interval(function() {
			if(viewDataModel.numberPicker.number<currentItem.getTotalNum()&&viewDataModel.numberPicker.number<99){
				viewDataModel.numberPicker.number++;
			}else{
				viewDataModel.numberPicker.number = 1;
			}
		}, 70);
	};
	//停止数字增加
	$scope.numberUpStop = function() {
		$interval.cancel(numberUp_Interval);
	};
	//按住数字减少
	$scope.numberDown = function() {
		numberDown_Interval = $interval(function() {
			if(viewDataModel.numberPicker.number>1){
				viewDataModel.numberPicker.number--;
			}else{
				viewDataModel.numberPicker.number = currentItem.getTotalNum();
			}
		}, 70);
	};
	//停止数字增加
	$scope.numberDownStop = function() {
		$interval.cancel(numberDown_Interval);
	};
	//点击确认
	$scope.confirm = function() {
		//校验
		if(viewDataModel.numberPicker.number>currentItem.getTotalNum()){
			viewDataModel.numberPicker.number=currentItem.getTotalNum();
		}
		//从当前交互动作，判断是移动至角色包裹
		if(ACTION.TYPE.split==currentAction.getType() && ACTION.TARGET.toRoleBag==currentAction.getTarget()){
			var roleItems;
			//判断是角色否交易状态
			if(dataRoleObj[0].getStatus()=="transaction"){
				//交易状态，读取交易暂存物品数组
				roleItems = transactionItems.buyItems;
			}else{//非交易状态，读取角色包物品数组
				roleItems = dataRoleObj[0].getItems();
				//校验包裹空间
				var tempNum = currentItem.getTotalNum();
				if(!isNaN(Number(currentItem.getBagSpace()))){
					tempNum = currentItem.getTotalNum()*currentItem.getBagSpace();
				}
				if((dataRoleObj[0].getOccupySpace()+tempNum)>dataRoleObj[0].getBagSpace()){
					//判断超过背包空间，打印并返回，维持原样
					panelTyping("背包空间不足...");
					return;
				}
			}
			var flag = false;
			if(roleItems){
				for (var i=0; i < roleItems.length; i++) {
					if(roleItems[i].getName()==currentItem.getName()&&roleItems[i].getType()==currentItem.getType()&&roleItems[i].getContent()==currentItem.getContent()){
						//遍历后发现同一物品,叠加数量
						roleItems[i].setTotalNum(roleItems[i].getTotalNum()+Number(viewDataModel.numberPicker.number));
						flag = true;
					}
				};
			}
			if(!flag){
				//遍历完成，未发现同一物品，复制出一个物品对象
				var item_Obj = DataModleFactory.createItem();
				copyBean(currentItem,item_Obj);
				item_Obj.setTotalNum(Number(viewDataModel.numberPicker.number));
				/*obj所拥有item中action已改为自动读取itemInfo
				//暂存action交互动作数据
				var tempItemActions = currentItem.getActions();
				if(tempItemActions){
					for (var l=0; l < tempItemActions.length; l++) {
						//action对象存入item_Obj
						item_Obj.addAction(tempItemActions.getAction(i));
					};
				};
				*/
				//判断是角色否交易状态
				if(dataRoleObj[0].getStatus()=="transaction"){
					//交易状态，修改action
					item_Obj.clearActions();
					var tempAction = loadData(dictionaryData.action.buyback,"action");
					item_Obj.addAction(tempAction);
					//将物品数据暂存至。。
					roleItems.push(item_Obj);
				}else{//非交易状态，物品数据存至角色包
					dataRoleObj[0].addItem(item_Obj);
				}
			}
			//修改数据
			currentItem.setTotalNum(currentItem.getTotalNum()-Number(viewDataModel.numberPicker.number));
			if (currentItem.getTotalNum()==0){//如果为0则从中删除物品对象
				currentInteractiveObject.delItem(currentItem);
			}
			//隐藏
			numberPickerHide();
		} else if(ACTION.TYPE.split==currentAction.getType() && ACTION.TARGET.toInteractiveObject==currentAction.getTarget()){
			//判断是从角色包裹移动至当前交互对象
			var roleItems;
			//判断是角色否交易状态
			if(dataRoleObj[0].getStatus()=="transaction"){
				//交易状态，读取交易暂存物品数组
				roleItems = transactionItems.sellItems;
			}else{//非交易状态，读取当前交互对象的物品数组
				roleItems = currentInteractiveObject.getItems();
				//校验仓库空间
				if(!isNaN(Number(currentInteractiveObject.getBagSpace()))){//判断有限制
					var tempNum = currentItem.getTotalNum();
					if(!isNaN(Number(currentItem.getBagSpace()))){
						tempNum = currentItem.getTotalNum()*currentItem.getBagSpace();
					}
					if((currentInteractiveObject.getOccupySpace()+tempNum)>currentInteractiveObject.getBagSpace()){
						//判断超过仓库空间，打印并返回，维持原样
						panelTyping("仓库空间不足...");
						return;
					}
				}//无限制则不校验
			}
			var flag = false;
			if(roleItems){
				for (var i=0; i < roleItems.length; i++) {
					if(roleItems[i].getName()==currentItem.getName()&&roleItems[i].getType()==currentItem.getType()&&roleItems[i].getContent()==currentItem.getContent()){
						//遍历后发现同一物品,叠加数量
						roleItems[i].setTotalNum(roleItems[i].getTotalNum()+Number(viewDataModel.numberPicker.number));
						flag = true;
					}
				};
			}
			if(!flag){
				//遍历完成，未发现同一物品，复制出一个物品对象
				var item_Obj = DataModleFactory.createItem();
				copyBean(currentItem,item_Obj);
				item_Obj.setTotalNum(Number(viewDataModel.numberPicker.number));
				/*role所拥有item中action已改为自动读取itemInfo
				//暂存action交互动作数据
				var tempItemActions = currentItem.getActions();
				if(tempItemActions){
					for (var l=0; l < tempItemActions.length; l++) {
						//action对象存入item_Obj
						item_Obj.addAction(tempItemActions.getAction(i));
					};
				};
				*/
				//判断是角色否交易状态
				if(dataRoleObj[0].getStatus()=="transaction"){
					//交易状态，修改action
					item_Obj.clearActions();
					var tempAction = loadData(dictionaryData.action.sellback,"action");
					item_Obj.addAction(tempAction);
					//交易状态，将物品数据暂存至。。
					roleItems.push(item_Obj);
				}else{//非交易状态，物品数据存至交互对象
					currentInteractiveObject.addItem(item_Obj);
				}
			}
			//修改数据
			currentItem.setTotalNum(currentItem.getTotalNum()-Number(viewDataModel.numberPicker.number));
			if (currentItem.getTotalNum()==0){//如果为0则从中删除物品对象
				dataRoleObj[0].delItem(currentItem);
			}
			//隐藏
			numberPickerHide();
		} else if(ACTION.TYPE.split==currentAction.getType() && ACTION.TARGET.sellback==currentAction.getTarget()){
			//判断是卖出撤回至包
			//修改数据
			currentItem.setTotalNum(currentItem.getTotalNum()-Number(viewDataModel.numberPicker.number));
			if (currentItem.getTotalNum()==0){//如果为0则从中删除物品对象
				for (var i=0; i < transactionItems.sellItems.length; i++) {
					if(transactionItems.sellItems[i]==currentItem){
						transactionItems.sellItems.splice(i,1);
					}
				};
			}
			//读取角色包物品数组
			var roleItems = dataRoleObj[0].getItems();
			var flag = false;
			if(roleItems){
				for (var i=0; i < roleItems.length; i++) {
					if(roleItems[i].getName()==currentItem.getName()&&roleItems[i].getType()==currentItem.getType()&&roleItems[i].getContent()==currentItem.getContent()){
						//遍历后发现同一物品,叠加数量
						roleItems[i].setTotalNum(roleItems[i].getTotalNum()+Number(viewDataModel.numberPicker.number));
						flag = true;
					}
				};
			}
			if(!flag){
				//遍历完成，未发现同一物品，复制出一个物品对象
				var item_Obj = DataModleFactory.createItem();
				copyBean(currentItem,item_Obj);
				item_Obj.setTotalNum(Number(viewDataModel.numberPicker.number));
				//物品数据存至角色包
				dataRoleObj[0].addItem(item_Obj);
			}
			//隐藏
			numberPickerHide();
		} else if(ACTION.TYPE.split==currentAction.getType() && ACTION.TARGET.buyback==currentAction.getTarget()){
			//判断是撤回至交互对象
			//修改数据
			currentItem.setTotalNum(currentItem.getTotalNum()-Number(viewDataModel.numberPicker.number));
			if (currentItem.getTotalNum()==0){//如果为0则从中删除物品对象
				for (var i=0; i < transactionItems.buyItems.length; i++) {
					if(transactionItems.buyItems[i]==currentItem){
						transactionItems.buyItems.splice(i,1);
					}
				};
			}
			//读取交互对象物品数组
			var roleItems  = currentInteractiveObject.getItems();
			var flag = false;
			if(roleItems){
				for (var i=0; i < roleItems.length; i++) {
					if(roleItems[i].getName()==currentItem.getName()&&roleItems[i].getType()==currentItem.getType()&&roleItems[i].getContent()==currentItem.getContent()){
						//遍历后发现同一物品,叠加数量
						roleItems[i].setTotalNum(roleItems[i].getTotalNum()+Number(viewDataModel.numberPicker.number));
						flag = true;
					}
				};
			}
			if(!flag){
				//遍历完成，未发现同一物品，复制出一个物品对象
				var item_Obj = DataModleFactory.createItem();
				copyBean(currentItem,item_Obj);
				item_Obj.setTotalNum(Number(viewDataModel.numberPicker.number));
				currentInteractiveObject.addItem(item_Obj);
			}
			//隐藏
			numberPickerHide();
		}
		
	};
});

//列表菜单（自动大小_带箭头）专用遮罩层
app.controller("menuAutoMaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.menuAutoMaskLayerClick = function($event) {
		menuHide();
	};
});
//仓库专用遮罩层
app.controller("panel5MaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.panel5MaskLayerClick = function($event) {
		//判断当前状态为使用背包（装备）,或者技能面板
		if((dataRoleObj[0].getStatus()=="useRoleBag"
			&&dataRoleObj[0].getStatus2()=="useRoleBag-Equip")
			||(dataRoleObj[0].getStatus()=="useSkillPanle"
			&&dataRoleObj[0].getStatus2()=="useRoleBag-SkillUnit")){
			menuBagHide();
		}else{
			panelTyping("");
			panel5Hide();
		}
	};
});
//数字选择器专用遮罩层
app.controller("numberPickerMaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.numberPickerMaskLayerClick = function($event) {
		numberPickerHide();
	};
});
//确认对话框专用遮罩层
app.controller("confirmPanleMaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.confirmPanleMaskLayerClick = function($event) {
		confirmPanleHide();
	};
});
//任务列表专用遮罩层
app.controller("missionSelectMaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.missionSelectMaskLayerClick = function() {
		dataRoleObj[0].setStatus("");
		dataRoleObj[0].setStatus2("");
		missionSelectHide();
	};
});
//存档读取界面 专用遮罩层
app.controller("loadSaveDataMaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.loadSaveDataMaskLayerClick = function() {
		dataRoleObj[0].setStatus("");
		dataRoleObj[0].setStatus2("");
		loadSaveDataHide();
	};
});
//装备界面 专用遮罩层
app.controller("equipMaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.equipMaskLayerClick = function() {
		dataRoleObj[0].setStatus("");
		dataRoleObj[0].setStatus2("");
		equipHide();
		mainShow();
	};
});
//技能面板界面 专用遮罩层
app.controller("skillPanleMaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.skillPanleMaskLayerClick = function() {
		dataRoleObj[0].setStatus("");
		dataRoleObj[0].setStatus2("");
		skillPanleHide();
		mainShow();
	};
});
//包裹菜单界面 专用遮罩层
app.controller("menuBagMaskLayer", function($scope, $rootScope, $timeout) {
	//点击后隐藏
	$rootScope.menuBagMaskLayerClick = function() {
		currentSkillPanleIndex=null;
		menuBagHide();
	};
});
//角色信息面板
app.controller("panel3", function($scope, $rootScope, $timeout) {
	//角色暂时只有一个，直接与角色数据绑定
	viewDataModel.panel3.tittleText=function(){return dataRoleObj[0].getName();};
	viewDataModel.panel3.roleHp=function(){return dataRoleObj[0].getHp();};
	viewDataModel.panel3.roleEp=function(){return dataRoleObj[0].getEp();};
	viewDataModel.panel3.roleMaxHp=function(){return dataRoleObj[0].getMaxHp();};
	viewDataModel.panel3.roleMaxEp=function(){return dataRoleObj[0].getMaxEp();};
	viewDataModel.panel3.roleAtt=function(){return dataRoleObj[0].getAtt();};
	viewDataModel.panel3.roleDef=function(){return dataRoleObj[0].getDef();};
	viewDataModel.panel3.roleCri=function (){
		return parseInt(dataRoleObj[0].getCri()*100)+"%";
	};
	viewDataModel.panel3.roleCriStrike=function (){
		return parseInt(dataRoleObj[0].getCriStrike()*100)+"%";
	};
	viewDataModel.panel3.roleAvd=function (){
		return parseInt(dataRoleObj[0].getAvd()*100)+"%";
	};
	viewDataModel.panel3.roleHit=function (){
		return parseInt(dataRoleObj[0].getHit()*100)+"%";
	};
});

//物品信息面板
app.controller("panel3ItemInfo", function($scope, $rootScope, $timeout) {
	viewDataModel.panel3ItemInfo.name = function () {
		if(currentItem&&currentItem.getName){
			if(currentItem.getName()||currentItem.getName()==""){
				viewControl.display.panel3ItemInfoNameHide=false;
			}else{
				viewControl.display.panel3ItemInfoNameHide=true;
			}
			return currentItem.getName();
		}
	};
	viewDataModel.panel3ItemInfo.content = function () {
		if(currentItem&&currentItem.getContent){
			if(currentItem.getContent()||currentItem.getContent()==""){
				viewControl.display.panel3ItemInfoContentHide=false;
			}else{
				viewControl.display.panel3ItemInfoContentHide=true;
			}
			return currentItem.getContent();
		}
	};
	viewDataModel.panel3ItemInfo.attrExplain = function(pram){
		if(currentItem&&currentItem.getAttr){
			if(currentItem.getAttr()){
				if(pram in currentItem.getAttr()
					&& typeof Number(currentItem.getAttr()[pram])=="number" 
					&& typeof !isNaN(Number(currentItem.getAttr()[pram]))
					&& Number(currentItem.getAttr()[pram])!=0){
					if(pram=="maxHpPercent"){
						if(currentItem.getType()==ITEM.TYPE.equip){
							return "HP最大值增加";
						}else{
							return "恢复HP最大值";
						}
					}
					if(pram=="maxEpPercent"){
						if(currentItem.getType()==ITEM.TYPE.equip){
							return "EP最大值增加";
						}else{
							return "恢复EP最大值";
						}
					}
				}
			}
		}
	};
	viewDataModel.panel3ItemInfo.attr = function (pram) {
		if(currentItem&&currentItem.getAttr
			&&currentItem.getAttr()
			&&pram in currentItem.getAttr()
			&& typeof Number(currentItem.getAttr()[pram])=="number" 
			&& typeof !isNaN(Number(currentItem.getAttr()[pram]))
			&& Number(currentItem.getAttr()[pram])!=0){
			if(pram=="epRecovery"){
				viewControl.display.panel3ItemInfoEpRecoveryHide = false;
				return currentItem.getAttr().epRecovery;
			}else if(pram=="epRecoveryPercent"){
				viewControl.display.panel3ItemInfoEpRecoveryPercentHide = false;
				return parseInt(currentItem.getAttr().epRecoveryPercent*100)+"%";
			}else if(pram=="epRecoveryMaxEpPercent"){
				viewControl.display.panel3ItemInfoEpRecoveryMaxEpPercentHide = false;
				return parseInt(currentItem.getAttr().epRecoveryMaxEpPercent*100)+"%";
			}else if(pram=="maxEp"){
				viewControl.display.panel3ItemInfoMaxEpHide = false;
				return currentItem.getAttr().maxEp;
			}else if(pram=="maxEpPercent"){
				viewControl.display.panel3ItemInfoMaxEpPercentHide = false;
				return parseInt(currentItem.getAttr().maxEpPercent*100)+"%";
			}else if(pram=="hpRecovery"){
				viewControl.display.panel3ItemInfoHpRecoveryHide = false;
				return currentItem.getAttr().hpRecovery;
			}else if(pram=="hpRecoveryPercent"){
				viewControl.display.panel3ItemInfoHpRecoveryPercentHide = false;
				return parseInt(currentItem.getAttr().hpRecoveryPercent*100)+"%";
			}else if(pram=="hpRecoveryMaxHpPercent"){
				viewControl.display.panel3ItemInfoHpRecoveryMaxHpPercentHide = false;
				return parseInt(currentItem.getAttr().hpRecoveryMaxHpPercent*100)+"%";
			}else if(pram=="maxHp"){
				viewControl.display.panel3ItemInfoMaxHpHide = false;
				return currentItem.getAttr().maxHp;
			}else if(pram=="maxHpPercent"){
				viewControl.display.panel3ItemInfoMaxHpPercentHide = false;
				return parseInt(currentItem.getAttr().maxHpPercent*100)+"%";
			}else if(pram=="att"){
				viewControl.display.panel3ItemInfoAttHide = false;
				return currentItem.getAttr().att;
			}else if(pram=="attPercent"){
				viewControl.display.panel3ItemInfoAttPercentHide = false;
				return parseInt(currentItem.getAttr().attPercent*100)+"%";
			}else if(pram=="damage"){
				viewControl.display.panel3ItemInfoDamageHide = false;
				return currentItem.getAttr().damage;
			}else if(pram=="def"){
				viewControl.display.panel3ItemInfoDefHide = false;
				return currentItem.getAttr().def;
			}else if(pram=="defPercent"){
				viewControl.display.panel3ItemInfoDefPercentHide = false;
				return parseInt(currentItem.getAttr().defPercent*100)+"%";
			}else if(pram=="cri"){
				viewControl.display.panel3ItemInfoCriHide = false;
				return parseInt(currentItem.getAttr().cri*100)+"%";
			}else if(pram=="criPercent"){
				viewControl.display.panel3ItemInfoCriPercentHide = false;
				return currentItem.getAttr().criPercent+"倍";
			}else if(pram=="criStrike"){
				viewControl.display.panel3ItemInfoCriStrikeHide = false;
				return parseInt(currentItem.getAttr().criStrike*100)+"%";
			}else if(pram=="criStrikePercent"){
				viewControl.display.panel3ItemInfoCriStrikePercentHide = false;
				return currentItem.getAttr().criStrikePercent+"倍";
			}else if(pram=="avd"){
				viewControl.display.panel3ItemInfoAvdHide = false;
				return parseInt(currentItem.getAttr().avd*100)+"%";
			}else if(pram=="avdPercent"){
				viewControl.display.panel3ItemInfoAvdPercentHide = false;
				return currentItem.getAttr().avdPercent+"倍";
			}else if(pram=="hit"){
				viewControl.display.panel3ItemInfoHitHide = false;
				return parseInt(currentItem.getAttr().hit*100)+"%";
			}else if(pram=="hitPercent"){
				viewControl.display.panel3ItemInfoHitPercentHide = false;
				return currentItem.getAttr().hitPercent+"倍";
			}
		}else{
			if(pram=="epRecovery"){
				viewControl.display.panel3ItemInfoEpRecoveryHide = true;
			}else if(pram=="epRecoveryPercent"){
				viewControl.display.panel3ItemInfoEpRecoveryPercentHide = true;
			}else if(pram=="epRecoveryMaxEpPercent"){
				viewControl.display.panel3ItemInfoEpRecoveryMaxEpPercentHide = true;
			}else if(pram=="maxEp"){
				viewControl.display.panel3ItemInfoMaxEpHide = true;
			}else if(pram=="maxEpPercent"){
				viewControl.display.panel3ItemInfoMaxEpPercentHide = true;
			}else if(pram=="hpRecovery"){
				viewControl.display.panel3ItemInfoHpRecoveryHide = true;
			}else if(pram=="hpRecoveryPercent"){
				viewControl.display.panel3ItemInfoHpRecoveryPercentHide = true;
			}else if(pram=="hpRecoveryMaxHpPercent"){
				viewControl.display.panel3ItemInfoHpRecoveryMaxHpPercentHide = true;
			}else if(pram=="maxHp"){
				viewControl.display.panel3ItemInfoMaxHpHide = true;
			}else if(pram=="maxHpPercent"){
				viewControl.display.panel3ItemInfoMaxHpPercentHide = true;
			}else if(pram=="att"){
				viewControl.display.panel3ItemInfoAttHide = true;
			}else if(pram=="attPercent"){
				viewControl.display.panel3ItemInfoAttPercentHide = true;
			}else if(pram=="damage"){
				viewControl.display.panel3ItemInfoDamageHide = true;
			}else if(pram=="def"){
				viewControl.display.panel3ItemInfoDefHide = true;
			}else if(pram=="defPercent"){
				viewControl.display.panel3ItemInfoDefPercentHide = true;
			}else if(pram=="cri"){
				viewControl.display.panel3ItemInfoCriHide = true;
			}else if(pram=="criPercent"){
				viewControl.display.panel3ItemInfoCriPercentHide = true;
			}else if(pram=="criStrike"){
				viewControl.display.panel3ItemInfoCriStrikeHide = true;
			}else if(pram=="criStrikePercent"){
				viewControl.display.panel3ItemInfoCriStrikePercentHide = true;
			}else if(pram=="avd"){
				viewControl.display.panel3ItemInfoAvdHide = true;
			}else if(pram=="avdPercent"){
				viewControl.display.panel3ItemInfoAvdPercentHide = true;
			}else if(pram=="hit"){
				viewControl.display.panel3ItemInfoHitHide = true;
			}else if(pram=="hitPercent"){
				viewControl.display.panel3ItemInfoHitPercentHide = true;
			}
		}
	};
	viewDataModel.panel3ItemInfo.buffs = function() {
		if(currentItem&&currentItem.getBuffs
			&&currentItem.getBuffs()
			&&currentItem.getBuffs().length>0){
			viewControl.display.panel3ItemInfoBuffsHide = false;
			return currentItem.getBuffs();
		}else{
			viewControl.display.panel3ItemInfoBuffsHide = true;
		}
	};
});

//对比角色装备物品信息
app.controller("panel3RoleItemInfo", function($scope, $rootScope, $timeout) {
	//视图在对比时实时写入
	viewDataModel.panel3RoleItemInfo.name = null;
	viewDataModel.panel3RoleItemInfo.content = null;
});

//顶部菜单
app.controller("topFrame", function($scope, $rootScope, $timeout) {
	$scope.clickButton1 = function(pram,pram2){
		mainHide();
		if(dataRoleObj[0].getStatus()=="fight"){
			//判断为战斗状态，不可操作
			alert("当前为战斗状态不可操作!");
			return;
		}
		//设置当前状态为使用背包
		dataRoleObj[0].setStatus(pram);
		//设置第二状态（过滤条件）
		dataRoleObj[0].setStatus2(pram2);
		//清空当前对象
		currentInteractiveObject=null;
		currentItem=null;
		currentAction=null;
		//打开背包功能
		if(pram=="skill"){//判断为查看技能
			viewDataModel.menuBag.buttonElements = function () {
				return dataRoleObj[0].getSkills();
			};
			panelTyping("查看技能...");
		}else{
			//加载包裹数据,重新定位视图数据指针
			viewDataModel.menuBag.buttonElements = function () {
				return dataRoleObj[0].getItems(pram2);
			};
			panelTyping("查看物品...");
		}
		var menuBagLeft=0;
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["menuBag"] = maxZIndex+2;
		viewControl.zIndexList["panel"] = maxZIndex+2;
		viewControl.zIndexList["panel3-2"] = maxZIndex+2;
		viewControl.zIndexList["panel5MaskLayer"] = maxZIndex+1;
		viewControl.menu_bag_Style["z-index"] = viewControl.zIndexList["menuBag"];
		viewControl.panel_Style["z-index"] = viewControl.zIndexList["panel"];
		viewControl.panel3_Style2["z-index"] = viewControl.zIndexList["panel3-2"];
		viewControl.panel5MaskLayer_Style["z-index"] = viewControl.zIndexList["panel5MaskLayer"];
		//弹出遮罩层
		viewControl.display.panel5MaskLayerHide = false;
		//同时打开包
		viewControl.display.menuBagHide = false;
		viewControl.menu_bag_Style.left = 55 +menuBagLeft+ "px";
		viewControl.menu_bag_Style.opacity = 0;
		//显示角色信息面板
		viewControl.panel3_Style2.top = 60 + "px";
		viewControl.panel3_Style2.left =  950 + "px";
		viewControl.panel3_Style2.opacity = 0;
		$timeout(function() {
			//包
			viewControl.menu_bag_Style.left = 60 +menuBagLeft+ "px";
			viewControl.menu_bag_Style.opacity = 1;
			//角色信息面板
			viewControl.display.panel3Hide2 = false;
			viewControl.panel3_Style2.left =  930 + "px";
			viewControl.panel3_Style2.opacity = 1;
		}, 200);
	};
	$scope.clickButton4 = function(pram,pram2){
		mainHide();
		if(dataRoleObj[0].getStatus()=="fight"){
			//判断为战斗状态，不可操作
			alert("当前为战斗状态不可操作!");
			return;
		}
		//设置当前状态为使用背包
		dataRoleObj[0].setStatus(pram);
		//设置第二状态（过滤条件）
		dataRoleObj[0].setStatus2(pram2);
		equipShow();
	};
	$scope.clickButton5 = function(pram){
		mainHide("all");
		if(dataRoleObj[0].getStatus()=="fight"){
			//判断为战斗状态，不可操作
			alert("当前为战斗状态不可操作!");
			return;
		}
		//设置当前状态为查看技能面板
		dataRoleObj[0].setStatus(pram);
		//设置第二状态（过滤条件）
		dataRoleObj[0].setStatus2("useRoleBag-SkillUnit");
		
		skillPanleShow();
	};
	$scope.clickButton2 = function(pram,pram2){
		if(dataRoleObj[0].getStatus()=="fight"){
			//判断为战斗状态，不可操作
			alert("当前为战斗状态不可操作!");
			return;
		}
		mainHide();
		dataRoleObj[0].setStatus("checkMission");
		viewDataModel.missionSelect.elements=function(){
			//这里全读取(只读取  可接取:accept|进行中:ongoing|可交付:deliverable)
			var missionArray = dataRoleObj[0].getMissions(
						MISSION.STATUS.accept
						,MISSION.STATUS.ongoing
						,MISSION.STATUS.deliverable);
			return missionArray;
		};
		$timeout(function() {
			missionSelectShow();
		}, 200);
	};
	$scope.clickButton3 = function(pram,pram2){
		if(dataRoleObj[0].getStatus()=="fight"){
			//判断为战斗状态，不可操作
			alert("当前为战斗状态不可操作!");
			return;
		}
		mainHide();
		$timeout(function() {
			loadSaveDataShow();
		}, 200);
	};
});

app.controller("missionSelect", function($scope, $rootScope){
	$scope.missionSelectHover=function($index){
		if(dataRoleObj[0].getStatus()=="checkMission"){
			//是在查看任务界面
			currentMission = dataRoleObj[0].getMissions(
						MISSION.STATUS.accept
						,MISSION.STATUS.ongoing
						,MISSION.STATUS.deliverable)[$index];
		}else{//是在交互界面
			//只读取  可接取:accept|进行中:ongoing|可交付:deliverable
			currentMission = currentInteractiveObject.getMissions(
						MISSION.STATUS.accept
						,MISSION.STATUS.ongoing
						,MISSION.STATUS.deliverable)[$index];
		}
	};
	$scope.missionSelectClick=function($index){
		viewDataModel.confirmPanle.tittle="任务";
		if(dataRoleObj[0].getStatus()=="checkMission"){
			//是在查看任务界面
			//可接取、进行中，弹出确认框
			if(currentMission.getStatus()==MISSION.STATUS.accept){
				viewDataModel.confirmPanle.textContent="接受任务？";
				//展示确认框
				confirmPanleShow();
			}else if(currentMission.getStatus()==MISSION.STATUS.ongoing){
				viewDataModel.confirmPanle.textContent="放弃任务？";
				//展示确认框
				confirmPanleShow();
			}
			//其他状态不可操作
		}else{//是在交互界面
			//可接取、进行中、可交付，弹出确认框
			if(currentMission.getStatus()==MISSION.STATUS.accept){
				viewDataModel.confirmPanle.textContent="接受任务？";
				//展示确认框
				confirmPanleShow();
			}else if(currentMission.getStatus()==MISSION.STATUS.ongoing){
				viewDataModel.confirmPanle.textContent="放弃任务？";
				//展示确认框
				confirmPanleShow();
			}else if(currentMission.getStatus()==MISSION.STATUS.deliverable){
				viewDataModel.confirmPanle.textContent="完成任务？";
				//展示确认框
				confirmPanleShow();
			}
			//其他状态不可操作
		}
	};
});

app.controller("confirmPanle", function($scope, $rootScope){
	$scope.confirmPanleButtonSureClick = function(){
		if(currentMission.getStatus()==MISSION.STATUS.accept){
			//判断为可接取accept，修改为进行中ongoing，并存入角色
			currentMission.setStatus(MISSION.STATUS.ongoing);
			dataRoleObj[0].addMission(currentMission);
			panelTyping("已接取:  "+currentMission.getName());
		}else if(currentMission.getStatus()==MISSION.STATUS.ongoing){
			//判断为进行中ongoing，修改为可接取accept，并从角色中删除
			currentMission.setStatus(MISSION.STATUS.accept);
			dataRoleObj[0].delMission(currentMission);
			panelTyping("已放弃:  "+currentMission.getName());
		}else if(currentMission.getStatus()==MISSION.STATUS.deliverable){
			//----判断包裹空间是否足够-未完成-----
			//判断为可交付deliverable，修改为已完成
			currentMission.setStatus(MISSION.STATUS.completed);
			panelTyping("已完成:  "+currentMission.getName());
			currentMission = noneMissionObj;
		}
		confirmPanleHide();
	};
});

app.controller("steeringWheel",function($scope, $rootScope, $timeout) {
	//方向盘箭头生成以及点击动画控制
	//生成上下左右4个箭头
	$scope.arrows=["1","2","3","4"];
	//点击效果控制
	var sign = "-1";
	$scope.arrowOnClick = function(i) {
		if (sign=="-1"){
			sign="-2";
		}else{
			sign="-1";
		}
		$scope.animation = (i+1) + sign;
		mapMove(i+1);
	};
	//地图移动
	function mapMove (sign){
		var x = currentDomain.getX();
		var y = currentDomain.getY();
		if(sign=="1"){
			//向上移动
			y-=1;
		}else if(sign=="2"){
			//向右移动
			x+=1;
		}else if(sign=="3"){
			//向下移动
			y+=1;
		}else if(sign=="4"){
			//向左移动
			x-=1;
		}
		for (var i=0; i < currentMapDomains.length; i++) {
			if(currentMapDomains[i].getX()==x
			&&currentMapDomains[i].getY()==y){
				currentDomain = currentMapDomains[i];
				map3dButtonsShow();
				break;
			}
		};
	};
}); 

app.controller("loadSaveData", function($scope, $rootScope){
	$scope.loadSaveDataClick=function(){
		//读取存档
		//in
		var saveGameData = JSON.parse(localStorage.getItem("saveGameData"));
		publicItemInfo = loadData(JSON.parse(saveGameData.publicItemInfo),"item");
		dataDomainsObj = loadData(JSON.parse(saveGameData.dataDomainsObj),"domain");
		mapDomainsObj = loadData(JSON.parse(saveGameData.mapDomainsObj),"domain");
		dataRoleObj = loadData(JSON.parse(saveGameData.dataRoleObj),"role");
		//获取当前大地图数据
		var mapId = saveGameData.currentMapDomains;
		if(mapId==""){//当前没有大地图
			currentMapDomains = [];
		}else{
			var flag = false;
			for (var i=0; i < mapDomainsObj.length; i++) {
				if(mapId == mapDomainsObj[i][0].getSignId()){
					currentMapDomains=mapDomainsObj[i];
					flag = true;
					break;
				}
			};
			if(!flag){//遍历完成后未找到对应大地图
				alert("error-0001:存档读取出错!");
				return;
				//处理（未完成）
			}
		}
		//获取当前所在场景数据
		var tempDomain = JSON.parse(saveGameData.currentDomain);
		if(!isNaN(Number(tempDomain.x))&&!isNaN(Number(tempDomain.y))){//判断有x/y值，则从大地图找
			var flag = false;
			for (var i=0; i < currentMapDomains.length; i++) {
				if(currentMapDomains[i].getX()==Number(tempDomain.x)&&currentMapDomains[i].getY()==Number(tempDomain.y)){
					currentDomain = currentMapDomains[i];
					flag = true;
					break;
				}
			};
			if(!flag){//遍历完成后未找到对应大地图
				alert("error-0002:存档读取出错!");
				return;
				//处理（未完成）
			}
		}else{//否则在公共地图中找
			var flag = false;
			for (var i=0; i < publicItemInfo.length; i++) {
				if(dataDomainsObj[i].getSignId()==tempDomain.signId){
					currentDomain = dataDomainsObj[i];
					flag = true;
					break;
				}
			}
			if(!flag){//遍历完成后未找到对应公共地图
				alert("error-0003:存档读取出错!");
				return;
				//处理（未完成）
			}
		}
		panelTyping("读取存档...");
		loadSaveDataHide();
	};
});

app.controller("equipPanle", function($scope, $rootScope){
	$scope.equipElementClick=function(num){
		//加载包裹数据,重新定位视图数据指针
		viewDataModel.menuBag.buttonElements = function () {
			return dataRoleObj[0].getItems(dataRoleObj[0].getStatus2(),num);
		};
		menuBagShow(900);
	};;
});

app.controller("skillPanle", function($scope, $rootScope){
	$scope.skillUnitClick=function(index,$event){
		//加载包裹数据,重新定位视图数据指针
		//读取该位置装备情况数据
		var tempItem = dataRoleObj[0].getItem(index,"useRoleBag-SkillUnit");
		if(tempItem==null){//该位置为空，显示安装菜单
			viewDataModel.menuBag.buttonElements = function () {
				return dataRoleObj[0].getItems("useRoleBag-SkillUnit");
			};
			currentSkillPanleIndex = index;
			menuBagShow(750);
		}else{//该位置不为空，则显示卸下按钮
			//加载交互对象(技能单元)动作数据（卸下按钮）
			viewDataModel.menu.buttonElements = function () {
				return tempItem.getActions("useSkillPanle");
			};
			currentItem = tempItem;
			//处理传入对象
			var tempt = $event.target.parentNode;
			while("skillUnitPosition ng-scope"!=tempt.className){
				tempt = tempt.parentNode;
			}
			//标记交互类型为物品
			viewControl.currentInteractiveType = "item";
			//显示列表菜单
			menuShow(tempt,"skillPanle");
		}
	};;
});
