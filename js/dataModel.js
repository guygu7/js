/**
 *	数据模型
 */
LC.Data = {
	/**
	 *	角色（可交互对象）
	 */
	Role : function() {
		var _name;
		/**
		 * 设置名称
		 */
		LC.Components.BasicComponent.prototype.setName = function(pram) {
			_name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Components.BasicComponent.prototype.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		LC.Components.BasicComponent.prototype.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Components.BasicComponent.prototype.getType = function() {
			return _type;
		};
		var _health;
		/**
		 * 设置生命值
		 */
		LC.Components.BasicComponent.prototype.setHealth = function(pram) {
			_health = pram;
			return this;
		};
		/**
		 * 获取生命值
		 */
		LC.Components.BasicComponent.prototype.getHealth = function() {
			return _health;
		};
		var _defense;
		/**
		 * 设置防御
		 */
		LC.Components.BasicComponent.prototype.setDefense = function(pram) {
			_defense = pram;
			return this;
		};
		/**
		 * 获取防御
		 */
		LC.Components.BasicComponent.prototype.getDefense = function() {
			return _defense;
		};
		var crit;
		/**
		 * 设置暴击
		 */
		LC.Components.BasicComponent.prototype.setCrit = function(pram) {
			_crit = pram;
			return this;
		};
		/**
		 * 获取暴击
		 */
		LC.Components.BasicComponent.prototype.getCrit = function() {
			return _crit;
		};
		var critStrike;
		/**
		 * 设置暴击伤害
		 */
		LC.Components.BasicComponent.prototype.setCritStrike = function(pram) {
			_critStrike = pram;
			return this;
		};
		/**
		 * 获取暴击伤害
		 */
		LC.Components.BasicComponent.prototype.getCritStrike = function() {
			return _critStrike;
		};
		var buff;
		/**
		 * 设置buff状态
		 */
		LC.Components.BasicComponent.prototype.setBuff = function(pram) {
			_buff = pram;
			return this;
		};
		/**
		 * 获取buff状态
		 */
		LC.Components.BasicComponent.prototype.getBuff = function() {
			return _buff;
		};
		var _friendliness;
		/**
		 * 设置友好度
		 */
		LC.Components.BasicComponent.prototype.setFriendliness = function(pram) {
			_friendliness = pram;
			return this;
		};
		/**
		 * 获取友好度
		 */
		LC.Components.BasicComponent.prototype.getFriendliness = function() {
			return _friendliness;
		};
		var _friendlinessType;
		/**
		 * 设置友好度状态
		 */
		LC.Components.BasicComponent.prototype.setFriendlinessType = function(pram) {
			_friendlinessType = pram;
			return this;
		};
		/**
		 * 获取友好度状态
		 */
		LC.Components.BasicComponent.prototype.getFriendlinessType = function() {
			return _friendlinessType;
		};
	},
	/**
	 * 物品
	 */
	Item : function() {
		var _name;
		/**
		 * 设置名称
		 */
		LC.Components.BasicComponent.prototype.setName = function(pram) {
			_name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Components.BasicComponent.prototype.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		LC.Components.BasicComponent.prototype.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Components.BasicComponent.prototype.getType = function() {
			return _type;
		};
		var _num;
		/**
		 * 设置数量
		 */
		LC.Components.BasicComponent.prototype.setNum = function(pram) {
			_num = pram;
			return this;
		};
		/**
		 * 获取数量
		 */
		LC.Components.BasicComponent.prototype.getNum = function() {
			return _num;
		};
		var _maxNum;
		/**
		 * 设置最大数量（1为不可叠加）
		 */
		LC.Components.BasicComponent.prototype.setMaxNum = function(pram) {
			_maxNum = pram;
			return this;
		};
		/**
		 * 获取最大数量（1为不可叠加）
		 */
		LC.Components.BasicComponent.prototype.getMaxNum = function() {
			return _maxNum;
		};
	},
	/**
	 * 技能
	 */
	Skill : function() {
		var _name;
		/**
		 * 设置名称
		 */
		LC.Components.BasicComponent.prototype.setName = function(pram) {
			_name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Components.BasicComponent.prototype.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		LC.Components.BasicComponent.prototype.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Components.BasicComponent.prototype.getType = function() {
			return _type;
		};
		var _level;
		/**
		 * 设置等级
		 */
		LC.Components.BasicComponent.prototype.setLevel = function(pram) {
			_level = pram;
			return this;
		};
		/**
		 * 获取等级
		 */
		LC.Components.BasicComponent.prototype.getLevel = function() {
			return _level;
		};
	},
	/**
	 * 地图（区域地图）
	 */
	Plat : function() {
		var _name;
		/**
		 * 设置名称
		 */
		LC.Components.BasicComponent.prototype.setName = function(pram) {
			_name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Components.BasicComponent.prototype.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		LC.Components.BasicComponent.prototype.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Components.BasicComponent.prototype.getType = function() {
			return _type;
		};
		var roleMap = new LC.Utils.Map();
		/**
		 * 设置角色集合
		 */
		LC.Components.BasicComponent.prototype.setRoleMap = function(key, pram) {
			_roleMap.put(key, pram);
			return this;
		};
		/**
		 * 获取角色集合
		 */
		LC.Components.BasicComponent.prototype.getRoleMap = function() {
			return _roleMap;
		};
		var itemMap = new LC.Utils.Map();
		/**
		 * 设置物品集合
		 */
		LC.Components.BasicComponent.prototype.setItemMap = function(pram) {
			_itemMap.put(key, pram);
			return this;
		};
		/**
		 * 获取物品集合
		 */
		LC.Components.BasicComponent.prototype.getItemMap = function() {
			return _itemMap;
		};
		var _position;
		/**
		 * 设置位置（坐标）
		 */
		LC.Components.BasicComponent.prototype.setPosition = function(pram) {
			_position = pram;
			return this;
		};
		/**
		 * 获取位置（坐标）
		 */
		LC.Components.BasicComponent.prototype.getPosition = function() {
			return _position;
		};
	},
	Player : function() {
		var _role;
		/**
		 * 设置角色
		 */
		LC.Components.BasicComponent.prototype.setRole = function(pram) {
			_role = pram;
			return this;
		};
		/**
		 * 获取角色
		 */
		LC.Components.BasicComponent.prototype.getRole = function() {
			return _role;
		};
	}
};
/**
 * 公共属性字典
 */
LC.Data.CommonProperty = {
	/**
	 *  角色
	 */
	ROLE : {
		/**
		 * 角色名称
		 */
		ROLE_NAME : {
			PLAYER : "玩家",
		},
		/**
		 * 角色类型
		 */
		ROLE_TYPE : {
			/**
			 * 玩家角色
			 */
			PLAYER : "player",
			/**
			 * NPC
			 */
			NPC : "NPC",

		},
		/**
		 * 角色友好状态
		 */
		ROLE_FriendlinessType : {
			FRIENDLY : "友好",
			NEUTRAL : "中立",
			HOSTILE : "敌对"
		},
		/**
		 * 角色buff状态
		 */
		ROLE_BUFF : {

		}
	},
	/**
	 *  物品
	 */
	ITEM : {
		/**
		 * 物品名称
		 */
		ITEM_NAME : {

		},
		/**
		 * 物品类型
		 */
		ITEM_TYPE : {
			EQUIPMENT : "装备",
			CONSUMABLE : "消耗品",
			MATERIAL : "材料"
		}
	},
	/**
	 *	技能
	 */
	SKILL : {
		/**
		 * 技能名称
		 */
		ITEM_NAME : {

		},
		/**
		 * 技能类型
		 */
		ITEM_TYPE : {

		}
	},
	PLAT : {
		/**
		 * 地图名称
		 */
		PLAT_NAME : {

		},
		/**
		 * 地图类型
		 */
		PLAT_TYPE : {
			SAFEZONE : "安全区",
		}
	}
};
/**
 *	数据工厂，用于组装基础数据
 */
LC.Data.RoleFactory = {
	/**
	 * 创建玩家角色 
	 */
	createPlayer : function() {
		var role = new LC.Data.Role();
		role.setName("玩家角色").setType(LC.Data.CommonProperty.ROLE.ROLE_TYPE.PLAYER);
		role.setHealth(10);
		role.setDefense(0);
		role.setCrit(0);
		role.setCritStrike(125);
		return role;
	},
};

LC.Data.PlatFactory = {
	/**
	 *	创建营地
	 */
	createCampsite : function() {
		var plat = new LC.Data.Plat();
		plat.setName("出生营地").setType(LC.Data.CommonProperty.PLAT.PLAT_TYPE.SAFEZONE);
		
	},
};
