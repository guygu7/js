/**
 * 任务委托常量数据 
 */
var MISSION={
	/**
	 * 类型
	 */
	TYPE:{
		
	},
	/**
	 * 状态
	 */
	STATUS:{
		
	},
	
};

dictionaryData.mission={
	example:{
		name:"任务名称",
		content:"任务说明",
		type:"任务类型",//target对话、物品收集、击杀对象、到指定位置
		status:"状态",//可接取、不可接取、进行中、已完成、失败
		display:true,//是否可见
		//触发(接取)条件:
		triggerItems:[//1.需要拥有指定数量物品,数量通过totalNum表示,需要在后面修改
			dictionaryData.item.example,
			dictionaryData.item.example2,
		],
		triggerSkills:[//2.需要拥有的技能
			dictionaryData.skill.example,
		],
		triggerTalks:[//3.与某对象完成对话
			//[interactiveObject,true]
		],
		triggerBattles:[//4.需要击败指定对象[多个]；1.类型，2.固定对象
			//interactiveObject
		],
		triggerDomains:[//5.到达指定地点
			//domain
		],
		//达成条件:
		completeItems:[//1.需要拥有指定数量物品,数量通过totalNum表示,需要在后面修改
			dictionaryData.item.example,
			dictionaryData.item.example2,
		],
		completeSkills:[//2.需要拥有的技能
			dictionaryData.skill.example,
		],
		completeTalks:[//3.与某对象完成对话
			//[interactiveObject,true]
		],
		completeBattles:[//4.需要击败指定对象[多个]；1.类型，2.固定对象
			//interactiveObject
		],
		completeDomains:[//5.到达指定地点
			//domain
		],
		//任务奖励:
		rewardItems:[
			dictionaryData.item.example,
		],
		rewardSkills:[
			dictionaryData.skill.example,
		],
		rewardInformation:"",
	},
};