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
		/**
		 * 可接取
		 */
		accept:"accept",
		/**
		 * 不可接取
		 */
		unAccept:"unAccept",
		/**
		 * 进行中
		 */
		ongoing:"ongoing",
		/**
		 * 可交付
		 */
		deliverable:"deliverable",
		/**
		 * 已完成
		 */
		completed:"completed",
		/**
		 * 失败
		 */
		failed:"failed",
	},
	
};

dictionaryData.mission={
	example:{
		name:"任务名称",
		content:"任务说明",
		type:"任务类型",//target对话、物品收集、击杀对象、到指定位置
		status:MISSION.STATUS.accept,//状态:可接取、不可接取、进行中、可交付、已完成、失败
		display:true,//是否可见
		//触发(接取)条件:
		triggerItems:[//1.需要拥有指定数量物品,数量通过totalNum表示,需要在后面修改
			dictionaryData.item.example,
			dictionaryData.item.example2,
		],
		triggerSkills:[//2.需要拥有的技能
			dictionaryData.skill.example,
		],
		triggerTalks:[//3.与某对象完成对话/对战
			//interactiveObject.triggerTalk=true/false//需对话
			//interactiveObject.triggerBattleTotalNum=1//需击败次数
		],
		triggerDomains:[//4.到达指定地点
			//domain.arrive=true/false//需到达
		],
		//达成条件:
		completeItems:[//1.需要拥有指定数量物品,数量通过totalNum表示,需要在后面修改
			dictionaryData.item.example,
			dictionaryData.item.example2,
		],
		completeSkills:[//2.需要拥有的技能
			dictionaryData.skill.example,
		],
		completeInteractiveObjects:[//3.与某对象完成对话/对战
			//interactiveObject.completeTalk=true/false//需对话
			//interactiveObject.completeTalkContent=""//对话内容
			//interactiveObject.completeBattleTotalNum=1//需击败次数
		],
		completeDomains:[//4.到达指定地点
			//domain.arrive=true/false//需到达
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
	/**
	 * 用于在任务栏显示没有任务
	 */
	none:{
		name:"无任务",
		content:"",
		status:MISSION.STATUS.unAccept,//状态:不可接取
		display:true,//是否可见
	}
};