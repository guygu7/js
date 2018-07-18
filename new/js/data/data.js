//定义数据层
/*----数据----*/
/**
 * 基础字典数据 
 */
var dictionaryData = {};
dictionaryData.action={
	action1:{name:"移动至包",type:"split",target:"toRoleBag",belong:"notRole"},
	roleAction1:{name:"移动至对象",type:"split",target:"toInteractiveObject",belong:"role"},
	roleAction2:{name:"使用消耗",type:"useConsumable",target:""},
	roleAction3:{name:"使用非消耗",type:"useUnConsumable",target:""},
	roleAction4:{name:"实装",type:"putOn",target:""},
	roleAction5:{name:"卸下实装",type:"takeOff",target:""},
	
	roleAction6:{name:"已实装",type:"NaN",target:""},
	sellback:{name:"撤回至包",type:"split",target:"sellback"},
	buyback:{name:"撤回至对象",type:"split",target:"buyback"},
};
/**
 * 物品字典 
 */
dictionaryData.item={
	item1:{name:"消耗品1",type:"",content:"消耗品1说明",totalNum:1,sellCost:1,buyCost:2,
		actions:[
			dictionaryData.action.action1,
			dictionaryData.action.roleAction1,
			dictionaryData.action.roleAction2,
		],
	},
	item2:{name:"消耗品2",type:"",content:"消耗品2说明",totalNum:1,sellCost:1,buyCost:2,
		actions:[
			dictionaryData.action.action1,
			dictionaryData.action.roleAction1,
			dictionaryData.action.roleAction3,
		],
	},
	item3:{name:"消耗品3",type:"",content:"消耗品3说明",totalNum:1,sellCost:5,buyCost:10,
		actions:[
			dictionaryData.action.action1,
			dictionaryData.action.roleAction1,
		],
	},
	item4:{name:"实装物体1",type:"head",content:"物体1说明",totalNum:1,sellCost:5,buyCost:10,isPutOn:false,
		actions:[
			dictionaryData.action.action1,
			dictionaryData.action.roleAction1,
			dictionaryData.action.roleAction4,
			dictionaryData.action.roleAction5,
			dictionaryData.action.roleAction6,
		],
	},
	item5:{name:"实装物体2",type:"head",content:"物体2说明",totalNum:1,sellCost:5,buyCost:10,isPutOn:false,
		actions:[
			dictionaryData.action.action1,
			dictionaryData.action.roleAction1,
			dictionaryData.action.roleAction4,
			dictionaryData.action.roleAction5,
			dictionaryData.action.roleAction6,
		],
	},
	item6:{name:"物体3超长物品名字",type:"",content:"物体3说明",totalNum:1,sellCost:5,buyCost:10,
		actions:[
			dictionaryData.action.action1,
			dictionaryData.action.roleAction1,
		],
	},
};
//对原始物品字典数据备份（暂不使用）
dictionaryData.itemBak = JSON.parse(JSON.stringify(dictionaryData.item));
//深度复制
dictionaryData.roleItemInfo = [];
dictionaryData.itemInfo = [];
(function (){
	//roleItemInfo数据处理
	var tempRoleItemInfo = JSON.parse(JSON.stringify(dictionaryData.item));
	for (var tempitem in tempRoleItemInfo) {
		//遍历获取每个item 记为 tempitem
		//获取item中的actions数组
		var tempActions = tempRoleItemInfo[tempitem].actions;
		for (var i=0; i < tempActions.length; i++) {
			if("notRole"==tempActions[i].belong){
				//判断不属于role,去掉该动作
				tempActions.splice(i,i+1);
				i--;
			}
		};
		dictionaryData.roleItemInfo.push(tempRoleItemInfo[tempitem]);
	};
	//itemInfo数据处理,同时重构物品字典，去掉role的动作
	for (var tempitem in dictionaryData.item) {
		//遍历获取每个item 记为 tempitem
		//获取item中的actions数组
		var tempActions =  dictionaryData.item[tempitem].actions;
		for (var i=0; i < tempActions.length; i++) {
			if("role"==tempActions[i].belong){
				//判断属于role,去掉该动作
				tempActions.splice(i,i+1);
				i--;
			}
		};
		dictionaryData.itemInfo.push(dictionaryData.item[tempitem]);
	};
})();
/**
 * 初始数据 
 */
var data = {
	/**
	 * 开始引导文本
	 */
	startText:"开始引导文本。。",
	/**
	 * 角色数据 
	 */
	roles:[{
		name:"角色",
		hp:100,
		maxHp:100,
		att:10,
		def:1,
		itemInfos:dictionaryData.roleItemInfo,
		items:[
			dictionaryData.item.item1,
			dictionaryData.item.item2,
			dictionaryData.item.item4,
			dictionaryData.item.item5,
		],
	},],
	/**
	 * 场景数据 
	 */
	domains:[
		/**
		 * 开场局部区域（小场景） 
		 */
		{
			name:"引导场景",
			signId:"startDomain",
			interactiveObjects:[
				{	
					name:"引导对象",
					actions:[
						{name:"对话",type:"talk",content:"对话内容"},
						{name:"移动",type:"move",content:"移动到公共场景",target:"publicDomain"},
					],
				},
			],
			
		},
		/**
		 * 公共场景
		 */
		{
			name:"公共场景",
			signId:"publicDomain",
			interactiveObjects:[
				{
					name:"移动-私有据点场景",
					actions:[
						{name:"对话",type:"talk",content:"公共场景-移动对象-对话内容"},
						{name:"移动",type:"move",content:"移动-私有据点场景",target:"homeDomain"},
					],
				},
				{
					name:"交流对象",
					items:[
						dictionaryData.item.item1,
						//dictionaryData.item.item3,
						//dictionaryData.item.item4,
					],
					actions:[
						{name:"对话",type:"talk",content:"公共场景-交流对象-对话内容"},
						{name:"交互",type:"transaction",content:"打开交易面板"},
					],
					//itemInfo:[],
				},
			],
			//itemInfo:[],
		},
		/**
		 * 私有据点场景
		 */
		{
			name:"私有据点场景",
			signId:"homeDomain",
			interactiveObjects:[
				{
					name:"移动-公共场景",
					actions:[
						{name:"对话",type:"talk",content:"私有据点-移动对象-对话内容"},
						{name:"移动",type:"move",content:"移动-公共场景",target:"publicDomain"},
					],
				},
				{
					name:"私有建筑",
					actions:[
						{name:"对话",type:"talk",content:"私有据点-私有建筑-对话内容"},
						{name:"使用",type:"useWarehouse",content:"私有据点-私有建筑-使用"},
					],
					items:[
						//dictionaryData.item.item5,
						//dictionaryData.item.item6,
					],
				},
			],
		},
	],
};
data.roles[0].items[0].totalNum=99;
data.roles[0].items[1].totalNum=1;
data.roles[0].items[2].totalNum=1;
data.roles[0].items[3].totalNum=1;
