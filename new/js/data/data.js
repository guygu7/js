
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
 * 全局示例数据
 */
var exampleData = {
	interactiveObjects:[
		/**
		 * 全局临时存放点对象（用于复制的模版）|或许会有其他用处？
		 */
		{
			name:"临时存放点",
			actions:[
				{name:"对话",type:"talk",content:"临时存放点"},
				{name:"查看",type:"useWarehouse",content:"临时存放点"},
			],
			items:[
			],
		},
	],
	/**
	 * 全局任务交互动作
	 */
	actions:[
		dictionaryData.action.mission,
	],
	/**
	 * 用于显示没有任务
	 */
	missions:[
		dictionaryData.mission.none,
	],
};
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
		hp:50,
		baseMaxHp:500,
		ep:50,
		baseMaxEp:50,
		baseAtt:11,
		baseDef:1,
		baseCri:0.5,//暴击率cri的直接 增加量 或 减少量
		baseCriStrike:1.2,//暴击伤害criStrike的直接  增加量 或 减少量
		baseAvd:0.1,//闪避率avd的直接  增加量 或 减少量
		baseHit:0.9,//命中率hit的直接  增加量 或 减少量
		skills:[
			dictionaryData.skill.testDeBuff2,
			//
			dictionaryData.skill.testAttack,
			dictionaryData.skill.test3MaxHp,
			dictionaryData.skill.testHpRecoveryMaxHpPercent,
			dictionaryData.skill.testAttPercent,
			dictionaryData.skill.testOver,
			//
			dictionaryData.skill.testBuff,
			dictionaryData.skill.testBuff2,
			dictionaryData.skill.testDeBuff,
		],
		itemInfos:dictionaryData.roleItemInfo,
		items:[
			dictionaryData.item.testEquip11,
			dictionaryData.item.testEquip12,
			dictionaryData.item.testEquip21,
			dictionaryData.item.testEquip22,
			dictionaryData.item.testHpRecovery,
			dictionaryData.item.testEpRecovery,
			dictionaryData.item.testBuff,
			dictionaryData.item.test2Att,
			dictionaryData.item.test2DeBuff,
		],
		missions:[
		],
	},],
	/**
	 * 公开场景数据 
	 */
	publicMaps:[
		/**
		 * 开场局部区域（小场景） 
		 */
		{
			name:"引导场景",
			signId:"startDomain",
			interactiveObjects:[
				/**
				 * 全局临时存放点对象（用于复制的模版）|或许会有其他用处？
				 */
				{
					name:"临时存放点",
					actions:[
						{name:"对话",type:"talk",content:"临时存放点"},
						{name:"查看",type:"useWarehouse",content:"临时存放点"},
					],
					items:[
					],
				},
				{	
					name:"引导对象",
					contents:"对话",
					/*[
						["对话组合1一","对话组合1二","对话组合1三","对话组合1四",],
						["对话组合2一","对话组合2二","对话组合2三","对话组合2四",],
					],*/
					missions:[
						dictionaryData.mission.example
					],
					actions:[
						{name:"对话",type:"talk",content:"对话内容"},
						{name:"移动",type:"move",content:"移动到公共场景",target:"publicDomain"},
						//dictionaryData.action.mission,
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
					],
					actions:[
						{name:"对话",type:"talk",content:"公共场景-交流对象-对话内容"},
						{name:"交互",type:"transaction",content:"打开交易面板"},
					],
					//itemInfo:[],
				},
				{
					name:"移动-至大地图",
					actions:[
						{name:"对话",type:"talk",content:"公共场景-移动对象-对话内容"},
						{name:"去大地图",type:"move",content:"移动-至大地图",target:"map",targetX:5,targetY:5},
					],
				},
				{
					name:"对战对象",
					hp:150,
					maxHp:900,
					att:10,
					def:10,
					cri:0.5,//暴击率cri的直接 增加量 或 减少量
					criStrike:1.2,//暴击伤害criStrike的直接  增加量 或 减少量
					avd:0.1,//闪避率avd的直接  增加量 或 减少量
					hit:0.9,//命中率hit的直接  增加量 或 减少量
					items:[
						dictionaryData.item.testEquip22,
						dictionaryData.item.testHpRecovery,
					],
					actions:[
						dictionaryData.action.fight,
					],
					skills:[
						dictionaryData.skill.att2,
						dictionaryData.skill.hpRecovery,
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
					],
				},
			],
		},
	],
	/**
	 * 大地图
	 */
};
data.roles[0].items[0].totalNum=1;
data.roles[0].items[1].totalNum=1;
data.roles[0].items[2].totalNum=1;
data.roles[0].items[3].totalNum=1;
data.roles[0].items[4].totalNum=9;
data.roles[0].items[5].totalNum=9;
data.roles[0].items[6].totalNum=9;
data.roles[0].items[7].totalNum=9;
data.roles[0].items[8].totalNum=9;
data.publicMaps[1].interactiveObjects[3].items[0].dropChance=0.8;
data.publicMaps[1].interactiveObjects[3].items[0].dropChance=0.8;

/*构成大地图（随机规则未完成）*/
function newMap (mapName,mapSign,x,y){
	var map = [];
	for (var i=0; i < x; i++) {
		for (var i1=0; i1 < y; i1++) {
			var domainObj = {
				name:mapName,
				signId:mapSign,
				x:i+1,
				y:i1+1,
			};
			map.push(domainObj);
		};
	};
	return map;
};
//记录所有大地图map的命名集合
var mapIds = [
	{
		mapName:"测试大地图",
		mapId:"map",
	},
];

//执行生成map的数据
data[mapIds[0].mapId] = newMap(mapIds[0].mapName,mapIds[0].mapId,10,10);




























