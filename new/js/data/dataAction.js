//定义数据层
/*----数据----*/
/**
 * 基础字典数据 
 */
var dictionaryData = {};



/**
 * 交互动作常量数据 
 */
var ACTION={
	/**
	 * 交互动作.类型
	 */
	TYPE:{
		/**
		 * 分割、堆叠（用于唤出数字选择器） 
		 */
		split:"split",
		/**
		 * 使用消耗品 
		 */
		useConsumable:"useConsumable",
		/**
		 * 使用非消耗品 
		 */
		//useUnConsumable:"useUnConsumable",
		/**
		 * 穿上（装备）
		 */
		putOn:"putOn",
		/**
		 * 卸下（装备）
		 */
		takeOff:"takeOff",
		/**
		 * 安装（技能）
		 */
		install:"install",
		/**
		 * 卸载（技能）
		 */
		uninstall:"uninstall",
		/**
		 * 不可操作按钮（已装备）
		 */
		unOperation:"unOperation",
		/**
		 * 使用技能
		 */
		useSkill:"useSkill",
		/**
		 * 进入战斗界面
		 */
		fight:"fight",
		/**
		 * 对话
		 */
		talk:"talk",
		/**
		 * 地图移动
		 */
		move:"move",
		/**
		 * 任务
		 */
		mission:"mission",
		/**
		 * 存档
		 */
		save:"save",
	},
	/**
	 * 交互动作.目标
	 */
	TARGET:{
		/**
		 * 标识为：移动至角色包裹
		 */
		toRoleBag:"toRoleBag",
		/**
		 * 标识为：移动至交互对象（所属）
		 */
		toInteractiveObject:"toInteractiveObject",
		/**
		 * 标识为：售出返回
		 */
		sellback:"sellback",
		/**
		 * 标识为：购入返回
		 */
		buyback:"buyback",
	},
	/**
	 * 交互动作.所属归属
	 */
	BELONG:{
		/**
		 * 角色
		 */
		role:"role",
		/**
		 * 非角色
		 */
		notRole:"notRole",
		/**
		 * 交互对象
		 */
		interactiveObject:"interactiveObject",
	},
};
/**
 * 基础交互动作
 */
dictionaryData.action={
	/*---------对物品动作---------*/
	/**
	 * 物品（从交互对象）移动至角色包中
	 */
	itemToRoleBag:{
				name:"移动至包",
				type:ACTION.TYPE.split,
				target:ACTION.TARGET.toRoleBag,
				belong:ACTION.BELONG.notRole,
			},
	/**
	 * 物品（从角色包中）移动至交互对象
	 */
	role_itemToInteractiveObject:{
					name:"移动至对象",
					type:ACTION.TYPE.split,
					target:ACTION.TARGET.toInteractiveObject,
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）使用消耗品
	 */
	role_useConsumable:{
					name:"使用消耗",
					type:ACTION.TYPE.useConsumable,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）使用非消耗品
	 */
	/*
	role_useUnConsumable:{
					name:"使用非消耗",
					type:ACTION.TYPE.useUnConsumable,
					target:"",
					belong:ACTION.BELONG.role,
				},
			*/
	/**
	 * （物品）穿上装备
	 */
	role_putOn:{
					name:"装备",
					type:ACTION.TYPE.putOn,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）卸下装备
	 */
	role_takeOff:{
					name:"卸下装备",
					type:ACTION.TYPE.takeOff,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）安装技能
	 */
	role_install:{
					name:"安装",
					type:ACTION.TYPE.install,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）卸载技能
	 */
	role_uninstall:{
					name:"卸下",
					type:ACTION.TYPE.uninstall,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品） 显示已装备按钮选项（点击无效果，或不可点击）
	 */
	role_alreadyEquipped:{
					name:"已装备",
					type:ACTION.TYPE.unOperation,
					target:"",
					belong:ACTION.BELONG.role,
				},
	/**
	 * （物品）售出返回：从交易暂存面板中撤回至角色包
	 */
	sellback:{
				name:"撤回至包",
				type:ACTION.TYPE.split,
				target:ACTION.TARGET.sellback,
			},
	/**
	 * （物品）购入返回：从交易暂存面板中撤回至交互对象
	 */
	buyback:{
				name:"撤回至对象",
				type:ACTION.TYPE.split,
				target:ACTION.TARGET.buyback,
			},
	/*--------对技能动作---------*/
	/**
	 * 使用恢复类技能
	 */
	skillUse:{
				name:"使用技能",
				type:ACTION.TYPE.useSkill,
				target:ACTION.TARGET.buyback,
	},
	/**
	 * 非恢复类技能（无法使用）
	 */
	skillUnavailable:{
				name:"无法使用",
				type:ACTION.TYPE.unOperation,
				target:ACTION.TARGET.buyback,
	},
	/*--------对交互对象动作------*/
	/**
	 * 攻击动作，进入战斗界面
	 */
	fight:{
				name:"进入战斗",
				type:ACTION.TYPE.fight,
				target:ACTION.TARGET.interactiveObject
	},
	/**
	 * 打开可接取任务菜单
	 */
	mission:{
		name:"任务",
		type:ACTION.TYPE.mission,
	},
};