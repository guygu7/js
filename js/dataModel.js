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
			/**
			 * 静态建筑
			 */
			BUILDING:"building",
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
	 * 交互动作 
	 */
	ACTION : {
		/**
		 * 交互动作名称 
		 */
		ACTION_NAME : {
			TALLK : "交谈",
			ACTION : "测试动作",
		},
		/**
		 * 交互动作类型
		 */
		ACTION_TYPE :{
			TYPE1 : "类型1",
			TYPE2 : "类型2",
		},
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
	 * 交互动作 
	 */
	Action : function(){
		
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
		//定义监听对象集合
		LC.Components.ComponentFunction.listener(roleObj);
		var _name;
		/**
		 * 设置名称
		 */
		roleObj.setName = function(pram) {
			_name = pram;
			LC.Components.ComponentFunction.event.call(this,"setName",pram);
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
			LC.Components.ComponentFunction.event.call(this,"setType",pram);
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
			LC.Components.ComponentFunction.event.call(this,"setHealth",pram);
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
			LC.Components.ComponentFunction.event.call(this,"setDefense",pram);
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
			LC.Components.ComponentFunction.event.call(this,"setCrit",pram);
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
			LC.Components.ComponentFunction.event.call(this,"setCritStrike",pram);
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
			LC.Components.ComponentFunction.event.call(this,"setBuff",pram);
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
			LC.Components.ComponentFunction.event.call(this,"setFriendliness",pram);
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
			LC.Components.ComponentFunction.event.call(this,"setFriendlinessType",pram);
			return this;
		};
		/**
		 * 获取友好度状态
		 */
		roleObj.getFriendlinessType = function() {
			return _friendlinessType;
		};
		
		
		//设置可交互动作属性集合
		var _actionMap = new LC.Utils.Map();
		/**
		 * 添加交互动作(动作对象),Map(key, pram)
		 */
		roleObj.addAction = function(key, pram) {
			//（未实现）若只有一个参数，检测参数是否为交互动作(动作对象)，是则设置key=Action.getName()
			if(null == _actionMap){
				_actionMap = new LC.Utils.Map();
			}
			_actionMap.put(key, pram);
			LC.Components.ComponentFunction.event.call(this,"addAction",pram);
			return this;
		};
		/**
		 * 删除交互动作(动作对象)
		 */
		roleObj.removeAction = function(key) {
			_actionMap.removeByKey(key);
			LC.Components.ComponentFunction.event.call(this,"removeAction",pram);
			return this;
		};
		/**
		 * 获取单个交互动作(动作对象)
		 */
		roleObj.getAction = function(key) {
			return _actionMap.get(key);
		};
		/**
		 * 获取交互动作对象集合
		 */
		roleObj.getActionMap = function() {
			return _actionMap;
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
LC.Data.ActionFactory = {
	createAction : function() {
		actionObj = new LC.Data.DataModle.Action();
		//定义监听对象集合
		LC.Components.ComponentFunction.listener(actionObj);
		var _name;
		/**
		 * 设置名称
		 */
		actionObj.setName = function(pram) {
			_name = pram;
			LC.Components.ComponentFunction.event.call(this,"setName",pram);
			return this;
		};
		/**
		 * 获取名称
		 */
		actionObj.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		actionObj.setType = function(pram) {
			_type = pram;
			LC.Components.ComponentFunction.event.call(this,"setType",pram);
			return this;
		};
		/**
		 * 获取类型
		 */
		actionObj.getType = function() {
			return _type;
		};
		return actionObj;
	},
};
LC.Data.MapFactory = {
	createPlat : function() {
		var platObj = new LC.Data.DataModle.Plat();
		//定义监听对象集合
		LC.Components.ComponentFunction.listener(platObj);
		var _name;
		/**
		 * 设置名称
		 */
		platObj.setName = function(pram) {
			_name = pram;
			LC.Components.ComponentFunction.event.call(this,"setName",pram);
			return this;
		};
		/**
		 * 获取名称
		 */
		platObj.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		platObj.setType = function(pram) {
			_type = pram;
			LC.Components.ComponentFunction.event.call(this,"setType",pram);
			return this;
		};
		/**
		 * 获取类型
		 */
		platObj.getType = function() {
			return _type;
		};
		var _roleMap = new LC.Utils.Map();
		/**
		 * 添加角色(交互对象),Map(key, pram)
		 */
		platObj.addRole = function(key, pram) {
			if(null == _roleMap){
				_roleMap = new LC.Utils.Map();
			}
			_roleMap.put(key, pram);
			LC.Components.ComponentFunction.event.call(this,"addRole",pram);
			return this;
		};
		/**
		 * 删除角色(交互对象)
		 */
		platObj.removeRole = function(key) {
			_roleMap.removeByKey(key);
			LC.Components.ComponentFunction.event.call(this,"removeRole",pram);
			return this;
		};
		/**
		 * 获取单个角色(交互对象)
		 */
		platObj.getRole = function(key) {
			return _roleMap.get(key);
		};
		/**
		 * 获取角色集合(交互对象)
		 */
		platObj.getRoleMap = function() {
			return _roleMap;
		};
		var _itemMap = new LC.Utils.Map();
		/**
		 * 设置物品集合
		 */
		platObj.setItemMap = function(key,pram) {
			if(null == _itemMap){
				_itemMap = new LC.Utils.Map();
			}
			_itemMap.put(key, pram);
			LC.Components.ComponentFunction.event.call(this,"setItemMap",pram);
			return this;
		};
		/**
		 * 获取物品集合
		 */
		platObj.getItemMap = function() {
			return _itemMap;
		};
		var _positionX;
		/**
		 * 设置坐标x
		 */
		platObj.setPositionX = function(pram) {
			_positionX = pram;
			LC.Components.ComponentFunction.event.call(this,"setPositionX",pram);
			return this;
		};
		/**
		 * 获取坐标x
		 */
		platObj.getPositionX = function() {
			return _positionX;
		};
		var _positionY;
		/**
		 * 设置坐标y
		 */
		platObj.setPositionY = function(pram) {
			_positionY = pram;
			LC.Components.ComponentFunction.event.call(this,"setPositionY",pram);
			return this;
		};
		/**
		 * 获取坐标y
		 */
		platObj.getPositionY = function() {
			return _positionY;
		};
		var _link = new LC.Utils.Map();
		/**
		 * 设置道路
		 */
		platObj.setLink = function(pram, flag) {
			if (!_link) {
				_link = new LC.Utils.Map();
			}
			if (pram) {
				if (!flag) {
					flag = "true";
				}
				_link.put(pram, flag);
			}
			LC.Components.ComponentFunction.event.call(this,"setLink",pram);
			return this;
		};
		/**
		 * 获取道路
		 */
		platObj.getLink = function() {
			return _link;
		};
		return platObj;
	},
	/**
	 *	创建地图
	 * @return Map<"x,y",LC.Data.DataModle.Plat()>
	 */
	createMap : function(x, y) {
		var mapMap = new LC.Utils.Map();
		for (var i = 1; i <= x; i++) {
			for (var j = 1; j <= y; j++) {
				var plat = LC.Data.MapFactory.createPlat();
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
