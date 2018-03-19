LC.Data = {};
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
			HOME : "出生地-据点",
		},
		/**
		 *  地图连接道路（位置）
		 */
		PLAT_LINK : {
			TOP : "top",
			LEFT : "left",
			BOTTOM : "bottom",
			RIGHT : "right",
		}
	}
};
/**
 *	数据模型
 */
LC.Data.DataModle = {
	/**
	 *	角色（可交互对象）
	 */
	Role : function() {
		/**
		 * 初始化数据 
		 * 生命100，防御0，暴击5%，暴击伤害120%，友好度0，友好状态_中立
		 */
		LC.Data.DataModle.Role.prototype.init = function() {
			this.setHealth(100).setDefense(0).setCrit(5).setCritStrike(120).setFriendliness(0).setFriendlinessType(LC.Data.CommonProperty.ROLE.ROLE_FriendlinessType.NEUTRAL);
			return this;
		};
	},
	/**
	 * 物品
	 */
	Item : function() {
		var name;
		/**
		 * 设置名称
		 */
		LC.Data.DataModle.Item.prototype.setName = function(pram) {
			this.name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Data.DataModle.Item.prototype.getName = function() {
			return this.name;
		};
		var type;
		/**
		 * 设置类型
		 */
		LC.Data.DataModle.Item.prototype.setType = function(pram) {
			this.type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Data.DataModle.Item.prototype.getType = function() {
			return this.type;
		};
		var num;
		/**
		 * 设置数量
		 */
		LC.Data.DataModle.Item.prototype.setNum = function(pram) {
			this.num = pram;
			return this;
		};
		/**
		 * 获取数量
		 */
		LC.Data.DataModle.Item.prototype.getNum = function() {
			return this.num;
		};
		var maxNum;
		/**
		 * 设置最大数量（1为不可叠加）
		 */
		LC.Data.DataModle.Item.prototype.setMaxNum = function(pram) {
			this.maxNum = pram;
			return this;
		};
		/**
		 * 获取最大数量（1为不可叠加）
		 */
		LC.Data.DataModle.Item.prototype.getMaxNum = function() {
			return this.maxNum;
		};
	},
	/**
	 * 技能
	 */
	Skill : function() {
		var name;
		/**
		 * 设置名称
		 */
		LC.Data.DataModle.Skill.prototype.setName = function(pram) {
			this.name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Data.DataModle.Skill.prototype.getName = function() {
			return this.name;
		};
		var type;
		/**
		 * 设置类型
		 */
		LC.Data.DataModle.Skill.prototype.setType = function(pram) {
			this.type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Data.DataModle.Skill.prototype.getType = function() {
			return type;
		};
		var level;
		/**
		 * 设置等级
		 */
		LC.Data.DataModle.Skill.prototype.setLevel = function(pram) {
			this.level = pram;
			return this;
		};
		/**
		 * 获取等级
		 */
		LC.Data.DataModle.Skill.prototype.getLevel = function() {
			return this.level;
		};
	},
	/**
	 * 地图（区域地图）
	 */
	Plat : function() {
		var name;
		/**
		 * 设置名称
		 */
		LC.Data.DataModle.Plat.prototype.setName = function(pram) {
			this.name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Data.DataModle.Plat.prototype.getName = function() {
			return this.name;
		};
		var type;
		/**
		 * 设置类型
		 */
		LC.Data.DataModle.Plat.prototype.setType = function(pram) {
			this.type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Data.DataModle.Plat.prototype.getType = function() {
			return this.type;
		};
		var roleMap = new LC.Utils.Map();
		/**
		 * 设置角色集合
		 */
		LC.Data.DataModle.Plat.prototype.setRoleMap = function(_key, pram) {
			if(null == this.roleMap){
				this.roleMap = new LC.Utils.Map();
			}
			this.roleMap.put(_key, pram);
			return this;
		};
		/**
		 * 获取角色集合
		 */
		LC.Data.DataModle.Plat.prototype.getRoleMap = function() {
			return this.roleMap;
		};
		var itemMap = new LC.Utils.Map();
		/**
		 * 设置物品集合
		 */
		LC.Data.DataModle.Plat.prototype.setItemMap = function(_key,pram) {
			if(null == this.itemMap){
				this.itemMap = new LC.Utils.Map();
			}
			this.itemMap.put(_key, pram);
			return this;
		};
		/**
		 * 获取物品集合
		 */
		LC.Data.DataModle.Plat.prototype.getItemMap = function() {
			return this.itemMap;
		};
		var positionX;
		/**
		 * 设置坐标x
		 */
		LC.Data.DataModle.Plat.prototype.setPositionX = function(_x) {
			this.positionX = _x;
			return this;
		};
		/**
		 * 获取坐标x
		 */
		LC.Data.DataModle.Plat.prototype.getPositionX = function() {
			return this.positionX;
		};
		var positionY;
		/**
		 * 设置坐标y
		 */
		LC.Data.DataModle.Plat.prototype.setPositionY = function(_y) {
			this.positionY = _y;
			return this;
		};
		/**
		 * 获取坐标y
		 */
		LC.Data.DataModle.Plat.prototype.getPositionY = function() {
			return this.positionY;
		};
		var link = new LC.Utils.Map();
		/**
		 * 设置道路
		 */
		LC.Data.DataModle.Plat.prototype.setLink = function(pram, _flag) {
			if (!this.link) {
				this.link = new LC.Utils.Map();
			}
			if (pram) {
				if (!_flag) {
					_flag = "true";
				}
				this.link.put(pram, _flag);
			}
			return this;
		};
		/**
		 * 获取道路
		 */
		LC.Data.DataModle.Plat.prototype.getLink = function() {
			return this.link;
		};
	},
	Player : function() {
		var role;
		/**
		 * 设置角色
		 */
		LC.Data.DataModle.Player.prototype.setRole = function(pram) {
			role = pram;
			return this;
		};
		/**
		 * 获取角色
		 */
		LC.Data.DataModle.Player.prototype.getRole = function() {
			return role;
		};
	}
};

/**
 *	数据工厂，用于组装基础数据
 */
LC.Data.RoleFactory = {
	createRole : function() {
		roleObj = new LC.Data.DataModle.Role();
		//定义监听数组集合
		var _listeners=[];
		//传入监听者（订阅者、观察者），存入
		roleObj.addListener = function(obj) {
			_listeners.push(obj);
			return this;
		};
		//传入监听者（订阅者、观察者），移除
		roleObj.removeListener = function(obj) {
			//遍历对比移除
			for (var i=0; i < _listeners.length; i++) {
				if(_listeners[i] == obj){
					_listeners.splice(i,1);
					break;
				}
			};
			return this;
		};
		//获取监听者（订阅者、观察者）对象
		roleObj.getListeners= function() {
			return _listeners;
		};
		
		var _name;
		/**
		 * 设置名称
		 */
		roleObj.setName = function(pram) {
			_name = pram;
			//遍历监听者（订阅者、观察者）对象，并执行默认的监听方法
			listeners = this.getListeners();
			for (var i=0; i < listeners.length; i++) {
			  listeners[i].listenerFunction(_name);
			};
			return this;
		};
		
		/**
		 * 获取名称
		 */
		roleObj.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		roleObj.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		roleObj.getType = function() {
			return _type;
		};
		var _health;
		/**
		 * 设置生命值
		 */
		roleObj.setHealth = function(pram) {
			_health = pram;
			return this;
		};
		/**
		 * 获取生命值
		 */
		roleObj.getHealth = function() {
			return _health;
		};
		var _defense;
		/**
		 * 设置防御
		 */
		roleObj.setDefense = function(pram) {
			_defense = pram;
			return this;
		};
		/**
		 * 获取防御
		 */
		roleObj.getDefense = function() {
			return _defense;
		};
		var _crit;
		/**
		 * 设置暴击
		 */
		roleObj.setCrit = function(pram) {
			_crit = pram;
			return this;
		};
		/**
		 * 获取暴击
		 */
		roleObj.getCrit = function() {
			return _crit;
		};
		var _critStrike;
		/**
		 * 设置暴击伤害
		 */
		roleObj.setCritStrike = function(pram) {
			_critStrike = pram;
			return this;
		};
		/**
		 * 获取暴击伤害
		 */
		roleObj.getCritStrike = function() {
			return _critStrike;
		};
		var _buff;
		/**
		 * 设置buff状态
		 */
		roleObj.setBuff = function(pram) {
			_buff = pram;
			return this;
		};
		/**
		 * 获取buff状态
		 */
		roleObj.getBuff = function() {
			return _buff;
		};
		var _friendliness;
		/**
		 * 设置友好度
		 */
		roleObj.setFriendliness = function(pram) {
			_friendliness = pram;
			return this;
		};
		/**
		 * 获取友好度
		 */
		roleObj.getFriendliness = function() {
			return _friendliness;
		};
		var _friendlinessType;
		/**
		 * 设置友好度状态
		 */
		roleObj.setFriendlinessType = function(pram) {
			_friendlinessType = pram;
			return this;
		};
		/**
		 * 获取友好度状态
		 */
		roleObj.getFriendlinessType = function() {
			return _friendlinessType;
		};
		return roleObj;
	},
	/**
	 * 创建玩家角色
	 */
	createPlayer : function() {
		var role = new LC.Data.RoleFactory.createRole();
		role.setName("玩家角色").setType(LC.Data.CommonProperty.ROLE.ROLE_TYPE.PLAYER);
		role.setHealth(10);
		role.setDefense(0);
		role.setCrit(0);
		role.setCritStrike(125);
		return role;
	},
};
LC.Data.MapFactory = {
	/**
	 *	创建地图
	 * @return Map<"x,y",LC.Data.DataModle.Plat()>
	 */
	createMap : function(x, y) {
		var mapMap = new LC.Utils.Map();
		for (var i = 1; i <= x; i++) {
			for (var j = 1; j <= y; j++) {
				var plat = new LC.Data.DataModle.Plat();
				plat.setPositionX(i).setPositionY(j);
				//该位置效率低下
				plat.setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.TOP).setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.LEFT).setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.BOTTOM).setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.RIGHT);
				if (i == 1) {
					plat.setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.LEFT, "false");
				} else if (i == x) {
					plat.setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.RIGHT, "false");
				}
				if (j == 1) {
					plat.setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.TOP, "false");
				} else if (j == x) {
					plat.setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.BOTTOM, "false");
				}
				mapMap.put(i + "," + j, plat);
			};
		};
		//采用默认墙壁生成算法
		this.setWall(x, y, mapMap);
		return mapMap;
	},
	/**
	 * 给传入的地图生成墙壁（默认算法） 
	 */
	setWall : function(x, y, mapMap) {
		//开始创建墙壁
		var stack = {};
		var startKey = "1,1," + x + "," + y;
		if ((x - 1) >= 2 && (y - 1) >= 2) {//初次判断，初次计算
			//计算该区域的子区域xy上下限值，生成新的一组数据并放入stack
			var startValue = {
				0 : 1 + "," + 1 + "," + (1 + Math.floor((x - 1) / 2)) + "," + (1 + Math.floor((y - 1) / 2)),
				1 : (1 + Math.ceil((x - 1) / 2)) + "," + 1 + "," + x + "," + (1 + Math.floor((y - 1) / 2)),
				2 : 1 + "," + (1 + Math.ceil((y - 1) / 2)) + "," + (1 + Math.floor((x - 1) / 2)) + "," + y,
				3 : (1 + Math.ceil((x - 1) / 2)) + "," + (1 + Math.ceil((y - 1) / 2)) + "," + x + "," + y
			};
		}
		stack[startKey] = startValue;
		var minX,
		    minY,
		    maxX,
		    maxY,
		    tempStartX,
		    tempEndX,
		    tempStartY,
		    tempEndY,
		    nowKey,
		    nowValue,
		    stackKeys,
		    linka,
		    tempa,
		    key,
		    value,
		    arr,
		    nowKey2;
		stackKeys = Object.keys(stack);
		while (stackKeys.length >= 1) {
			stackKeys = Object.keys(stack);
			for (var i = 0; i < stackKeys.length; i++) {
				nowKey = stackKeys[i];
				nowValue = stack[nowKey];
				//是一个array [下一级4各区域]
				for (var j = 0; j < Object.keys(nowValue).length; j++) {//处理下一级4个区域
					nowKey2 = j;
					arr = nowValue[nowKey2].split(",");
					//分割字符串得到区域xy上下限值
					minX = Number(arr[0]);
					minY = Number(arr[1]);
					maxX = Number(arr[2]);
					maxY = Number(arr[3]);
					//开始设置墙
					linka = LC.Components.ComponentFunction.random([LC.Data.CommonProperty.PLAT.PLAT_LINK.TOP, LC.Data.CommonProperty.PLAT.PLAT_LINK.LEFT, LC.Data.CommonProperty.PLAT.PLAT_LINK.BOTTOM, LC.Data.CommonProperty.PLAT.PLAT_LINK.RIGHT], [0.25, 0.25, 0.25, 0.25]);
					tempa;
					if (linka == LC.Data.CommonProperty.PLAT.PLAT_LINK.TOP) {
						tempStartX = minX + Math.floor((maxX - minX) / 2);
						tempEndX = tempStartX;
						tempStartY = minY;
						tempEndY = minY + Math.floor((maxY - minY) / 2);
					} else if (linka == LC.Data.CommonProperty.PLAT.PLAT_LINK.LEFT) {
						tempStartX = minX;
						tempEndX = minX + Math.floor((maxX - minX) / 2);
						tempStartY = minY + Math.floor((maxY - minY) / 2);
						tempEndY = tempStartY;
					} else if (linka == LC.Data.CommonProperty.PLAT.PLAT_LINK.BOTTOM) {
						tempStartX = minX + Math.floor((maxX - minX) / 2);
						tempEndX = tempStartX;
						tempStartY = minY + Math.ceil((maxY - minY) / 2);
						tempEndY = maxY;
					} else if (linka == LC.Data.CommonProperty.PLAT.PLAT_LINK.RIGHT) {
						tempStartX = minX + Math.ceil((maxX - minX) / 2);
						tempEndX = maxX;
						tempStartY = minY + Math.floor((maxY - minY) / 2);
						tempEndY = tempStartY;
					}
					if (tempStartX == tempEndX) {
						for (var i1 = tempStartY; i1 <= tempEndY; i1++) {
							mapMap.get((tempEndX) + "," + i1).setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.RIGHT, "false");
							if (mapMap.get((tempEndX + 1) + "," + i1)) {
								mapMap.get((tempEndX + 1) + "," + i1).setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.LEFT, "false");
							}
						};
					} else if (tempStartY == tempEndY) {
						for (var i1 = tempStartX; i1 <= tempEndX; i1++) {
							mapMap.get(i1 + "," + (tempEndY )).setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.BOTTOM, "false");
							if (mapMap.get(i1 + "," + (tempEndY + 1))) {
								mapMap.get(i1 + "," + (tempEndY + 1)).setLink(LC.Data.CommonProperty.PLAT.PLAT_LINK.TOP, "false");
							}
						};
					}
					//判断是否满足继续生成子区域数据
					if ((maxX - minX) >= 2 && (maxY - minY) >= 2) {
						//计算该区域的子区域xy上下限值，生成新的一组数据并放入stack
						key = nowValue[nowKey2];
						value = {
							0 : minX + "," + minY + "," + (minX + Math.floor((maxX - minX) / 2)) + "," + (minY + Math.floor((maxY - minY) / 2)),
							1 : (minX + Math.ceil((maxX - minX) / 2)) + "," + minY + "," + maxX + "," + (minY + Math.floor((maxY - minY) / 2)),
							2 : minX + "," + (minY + Math.ceil((maxY - minY) / 2)) + "," + (minX + Math.floor((maxX - minX) / 2)) + "," + maxY,
							3 : (minX + Math.ceil((maxX - minX) / 2)) + "," + (minY + Math.ceil((maxY - minY) / 2)) + "," + maxX + "," + maxY
						};
						stack[key] = value;
					} else {
					}
				};
				//该组数据处理完后，将该组数据从stack中移除
				delete stack[nowKey];
			};
		};
	},
	drawMap : function(map) {
		var t = document.createElement("div");
		//$("<div></div>");
		var map = map;
		var i1 = 1;
		var top,
		    right,
		    bottom,
		    left,
		    key,
		    str,
		    link;		while (i1) {
			var j1 = 1;
			var plat;
			if (!map.get(j1 + "," + i1) || null == map.get(j1 + "," + i1)) {
				break;
			}
			while (j1) {
				plat = map.get(j1 + "," + i1);
				if (plat || null != plat) {
					top = "#ffffff";
					right = "#ffffff";
					bottom = "#ffffff";
					left = "#ffffff";
					//link = plat.getLink();
					key = "top";
					if (plat.getLink().get(LC.Data.CommonProperty.PLAT.PLAT_LINK.TOP) == "false") {
						//if (link[key] == "false") {
						top = "#000000";
					}
					key = "right";
					if (plat.getLink().get(LC.Data.CommonProperty.PLAT.PLAT_LINK.RIGHT) == "false") {
						//if (link[key] == "false") {
						right = "#000000";
					}
					key = "bottom";
					if (plat.getLink().get(LC.Data.CommonProperty.PLAT.PLAT_LINK.BOTTOM) == "false") {
						//if (link[key] == "false") {
						bottom = "#000000";
					}
					key = "left";
					if (plat.getLink().get(LC.Data.CommonProperty.PLAT.PLAT_LINK.LEFT) == "false") {
						//if (link[key] == "false") {
						left = "#000000";
					}
					str = top + " " + right + " " + bottom + " " + left;
					var t1 = document.createElement("div");
					t1.style = "width:20px;height:20px;border-style:solid;border-color:" + str + ";display:inline-block;position:relative;overflow:hidden;margin:-2px 0px ";
					t.appendChild(t1);
					j1++;
				} else {
					break;
				}
			}
			t.appendChild(document.createElement("br"));
			i1++;
		}
		console.log("绘制div 执行完毕");
		//t.css({"transform":"rotateX(55deg) rotateY(0deg) rotateZ(40deg)",});
		return t;
	}
};
/*
 LC.Data.PlatFactory = {
 *	创建营地
 createCampsite : function() {
 var plat = new LC.Data.DataModle.Plat();
 plat.setName("出生营地").setType(LC.Data.CommonProperty.PLAT.PLAT_TYPE.SAFEZONE);

 },
 };
 */
