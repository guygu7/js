
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
				tempActions.splice(i,1);
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
				tempActions.splice(i,1);
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
	saveGameData:"saveGameData",
	/**
	 * 开始引导文本
	 */
	startText:"开始引导文本。。",
	/**
	 * 角色数据 
	 */
	roles:[{
		name:"角色",
		bagSpace:100,
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
			//任务测试
			dictionaryData.skill.example,
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
			//任务测试
			dictionaryData.item.example,
			dictionaryData.item.example2,
			//技能单元测试
			dictionaryData.item.example4,
			dictionaryData.item.example4,
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
						dictionaryData.mission.example,
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
						{name:"存档",type:"save"},
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
					disappear:true,
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
					bagSpace:10,
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
	 * 技能模块
	 */
	skillModule:[
	/*
		{
			index:"D4",
		},
		{
			index:"D5",
			link:[
				viewControl.skillLink.link4,
			],
		},
		{
			index:"D3",
			link:[
				viewControl.skillLink.link1,
			],
		},
		*/
	],
	/**
	 * 大地图
	 */
};

/**
 * 构成随机技能模块：参数：num 分支数
 */
function newSkillModule(num){
	data.skillModule=[];
	//圆心核心链路
	data.skillModule.push({index:"D4",unlock:true,link:[]});
	//校验四周
	//传入当前索引，返回该索引四周6个索引和link
	function fn(index){
		var sign;
		if(index.slice(0,1).charCodeAt()%2==0){
			sign=0;
		}else{
			sign=1;
		}
		//得到四周6个位置的索引
		var link1 = index.slice(0,1)+(Number(index.slice(1,2))+1);
		var link2 = String.fromCharCode(index.slice(0,1).charCodeAt()+1)+(Number(index.slice(1,2))+sign);
		var link3 = String.fromCharCode(index.slice(0,1).charCodeAt()+1)+(Number(index.slice(1,2))+sign-1);
		var link4 = index.slice(0,1)+(Number(index.slice(1,2))-1);
		var link5 = String.fromCharCode(index.slice(0,1).charCodeAt()-1)+(Number(index.slice(1,2))+sign-1);
		var link6 = String.fromCharCode(index.slice(0,1).charCodeAt()-1)+(Number(index.slice(1,2))+sign);
		//构建参与即将随机的数组
		var objArr = [{index:link1,link:viewControl.skillLink.link1},
						{index:link2,link:viewControl.skillLink.link2},
						{index:link3,link:viewControl.skillLink.link3},
						{index:link4,link:viewControl.skillLink.link4},
						{index:link5,link:viewControl.skillLink.link5},
						{index:link6,link:viewControl.skillLink.link6}];
		for (var i=0; i < objArr.length; i++) {
			var flag = false;
			for (var i2=0; i2 < data.skillModule.length; i2++) {
				if(objArr[i].index == data.skillModule[i2].index){
					flag = true;
					break;
				}
			};
			//判断索引是否是超出边缘的
			if(objArr[i].index=="A2"||objArr[i].index=="A5"||objArr[i].index=="D1"||objArr[i].index=="D7"||objArr[i].index=="G2"||objArr[i].index=="G5"){
				flag = true;
			}		
			if(flag){
				//如果已存在，则从随机数组去掉
				objArr.splice(i,1);
				i--;
			}
		};
		return objArr;
	}
	/**
	 * 随机方法
	 * 参数：index:中心的索引;objArr2：随机对象；num：分支数量
	 * return 被随机到的index数组(随机完成后直接存入data.skillModule中)
	 */
	function fn2(index,objArr2,num){
		var returnIndexArr = [];
		if(objArr2.length-1<num){
			num = objArr2.length-1;
		}
		for (var i=0; i < num; i++) {
			var arr2 = [];
			for (var i2=0; i2 < objArr2.length; i2++) {
				arr2.push(1/objArr2.length);
			};
			var obj = null;
			while(obj==null){//为避免概率不足1的情况，未随机到，则重新随机
				obj = random(objArr2,arr2);
			}
			for (var i3=0; i3 < objArr2.length; i3++) {//去掉已经随机到的索引，以便于下次循环
				if(objArr2[i3] == obj){
					objArr2.splice(i3,1);
					break;
				}
			};
			for (var i4=0; i4 < data.skillModule.length; i4++) {//遍历data.skillModule取出传入的中心索引index,并存入link
				if(data.skillModule[i4].index == index){
					data.skillModule[i4].link.push(obj.link);
					break;
				}
			};
			data.skillModule.push({index:obj.index,unlock:false,link:[]});
			returnIndexArr.push(obj.index);
		};
		return returnIndexArr;
	}
	//第一次(第一圈)
	var objArr1 = fn("D4");
	var indexArr = fn2("D4",objArr1,num);
	//暂存路径索引链
	var skillChain = [{index:"D4",link:[]}];
	//第二次(第二圈)
	for (var i=0; i < indexArr.length; i++) {
		var objArr2 = fn(indexArr[i]);
		var indexArr2 = fn2(indexArr[i],objArr2,num);
		skillChain[0].link.push({index:indexArr[i],link:[]});
		//第三次(第三圈)
		for (var i2=0; i2 < indexArr2.length; i2++) {
			var objArr3 = fn(indexArr2[i2]);
			var indexArr3 = fn2(indexArr2[i2],objArr3,num);
			skillChain[0].link[i].link.push({index:indexArr2[i2],link:[]});
			for (var i3=0; i3 < indexArr3.length; i3++) {
				skillChain[0].link[i].link[i2].link.push({index:indexArr3[i3]});
			};
		};
	};
	return skillChain;
	//随机链路
}

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
				interactiveObjects:[],
			};
			//随机内部对象
			for (var i2=0; i2 < 16; i2++) {
				var tempObj = random([dictionaryData.interactiveObject.example1,dictionaryData.interactiveObject.example2],[0.8,0.2]);
				//console.info("tempObj");
				//console.info(tempObj);
				domainObj.interactiveObjects.push(JSON.parse(JSON.stringify(tempObj)));
				//console.info(domainObj.interactiveObjects);
			};
			//console.info(domainObj.interactiveObjects);
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
var dataMapTemp = mapIds[0].mapId;
data[dataMapTemp] = newMap(mapIds[0].mapName,mapIds[0].mapId,10,10);




























