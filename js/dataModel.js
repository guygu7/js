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
		LC.Data.Role.prototype.setName = function(pram) {
			_name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Data.Role.prototype.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		LC.Data.Role.prototype.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Data.Role.prototype.getType = function() {
			return _type;
		};
		var _health;
		/**
		 * 设置生命值
		 */
		LC.Data.Role.prototype.setHealth = function(pram) {
			_health = pram;
			return this;
		};
		/**
		 * 获取生命值
		 */
		LC.Data.Role.prototype.getHealth = function() {
			return _health;
		};
		var _defense;
		/**
		 * 设置防御
		 */
		LC.Data.Role.prototype.setDefense = function(pram) {
			_defense = pram;
			return this;
		};
		/**
		 * 获取防御
		 */
		LC.Data.Role.prototype.getDefense = function() {
			return _defense;
		};
		var crit;
		/**
		 * 设置暴击
		 */
		LC.Data.Role.prototype.setCrit = function(pram) {
			_crit = pram;
			return this;
		};
		/**
		 * 获取暴击
		 */
		LC.Data.Role.prototype.getCrit = function() {
			return _crit;
		};
		var critStrike;
		/**
		 * 设置暴击伤害
		 */
		LC.Data.Role.prototype.setCritStrike = function(pram) {
			_critStrike = pram;
			return this;
		};
		/**
		 * 获取暴击伤害
		 */
		LC.Data.Role.prototype.getCritStrike = function() {
			return _critStrike;
		};
		var buff;
		/**
		 * 设置buff状态
		 */
		LC.Data.Role.prototype.setBuff = function(pram) {
			_buff = pram;
			return this;
		};
		/**
		 * 获取buff状态
		 */
		LC.Data.Role.prototype.getBuff = function() {
			return _buff;
		};
		var _friendliness;
		/**
		 * 设置友好度
		 */
		LC.Data.Role.prototype.setFriendliness = function(pram) {
			_friendliness = pram;
			return this;
		};
		/**
		 * 获取友好度
		 */
		LC.Data.Role.prototype.getFriendliness = function() {
			return _friendliness;
		};
		var _friendlinessType;
		/**
		 * 设置友好度状态
		 */
		LC.Data.Role.prototype.setFriendlinessType = function(pram) {
			_friendlinessType = pram;
			return this;
		};
		/**
		 * 获取友好度状态
		 */
		LC.Data.Role.prototype.getFriendlinessType = function() {
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
		LC.Data.Item.prototype.setName = function(pram) {
			_name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Data.Item.prototype.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		LC.Data.Item.prototype.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Data.Item.prototype.getType = function() {
			return _type;
		};
		var _num;
		/**
		 * 设置数量
		 */
		LC.Data.Item.prototype.setNum = function(pram) {
			_num = pram;
			return this;
		};
		/**
		 * 获取数量
		 */
		LC.Data.Item.prototype.getNum = function() {
			return _num;
		};
		var _maxNum;
		/**
		 * 设置最大数量（1为不可叠加）
		 */
		LC.Data.Item.prototype.setMaxNum = function(pram) {
			_maxNum = pram;
			return this;
		};
		/**
		 * 获取最大数量（1为不可叠加）
		 */
		LC.Data.Item.prototype.getMaxNum = function() {
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
		LC.Data.Skill.prototype.setName = function(pram) {
			_name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Data.Skill.prototype.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		LC.Data.Skill.prototype.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Data.Skill.prototype.getType = function() {
			return _type;
		};
		var _level;
		/**
		 * 设置等级
		 */
		LC.Data.Skill.prototype.setLevel = function(pram) {
			_level = pram;
			return this;
		};
		/**
		 * 获取等级
		 */
		LC.Data.Skill.prototype.getLevel = function() {
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
		LC.Data.Plat.prototype.setName = function(pram) {
			_name = pram;
			return this;
		};
		/**
		 * 获取名称
		 */
		LC.Data.Plat.prototype.getName = function() {
			return _name;
		};
		var _type;
		/**
		 * 设置类型
		 */
		LC.Data.Plat.prototype.setType = function(pram) {
			_type = pram;
			return this;
		};
		/**
		 * 获取类型
		 */
		LC.Data.Plat.prototype.getType = function() {
			return _type;
		};
		var roleMap = new LC.Utils.Map();
		/**
		 * 设置角色集合
		 */
		LC.Data.Plat.prototype.setRoleMap = function(key, pram) {
			_roleMap.put(key, pram);
			return this;
		};
		/**
		 * 获取角色集合
		 */
		LC.Data.Plat.prototype.getRoleMap = function() {
			return _roleMap;
		};
		var itemMap = new LC.Utils.Map();
		/**
		 * 设置物品集合
		 */
		LC.Data.Plat.prototype.setItemMap = function(pram) {
			_itemMap.put(key, pram);
			return this;
		};
		/**
		 * 获取物品集合
		 */
		LC.Data.Plat.prototype.getItemMap = function() {
			return _itemMap;
		};
		var _positionX;
		/**
		 * 设置坐标x
		 */
		LC.Data.Plat.prototype.setPositionX = function(x) {
			_positionX = x;
			return this;
		};
		/**
		 * 获取坐标x
		 */
		LC.Data.Plat.prototype.getPositionX = function() {
			return _positionX;
		};
		var _positionY;
		/**
		 * 设置坐标y
		 */
		LC.Data.Plat.prototype.setPositionY = function(y) {
			_positionY = y;
			return this;
		};
		/**
		 * 获取坐标y
		 */
		LC.Data.Plat.prototype.getPositionY = function() {
			return _positionY;
		};
		var _link = new LC.Utils.Map();
		/**
		 * 设置道路
		 */
		LC.Data.Plat.prototype.setLink = function(pram, flag) {
			if (!this._link) {
				//this._link = new LC.Utils.Map();
				this._link = {};
			}
			if (pram) {
				if (!flag) {
					flag = "true";
				}
				//this._link.put(pram, flag);
				this._link[pram]=flag;
			}
			return this;
		};
		/**
		 * 获取道路
		 */
		LC.Data.Plat.prototype.getLink = function() {
			return this._link;
		};
	},
	Player : function() {
		var _role;
		/**
		 * 设置角色
		 */
		LC.Data.Player.prototype.setRole = function(pram) {
			_role = pram;
			return this;
		};
		/**
		 * 获取角色
		 */
		LC.Data.Player.prototype.getRole = function() {
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
LC.Data.MapFactory = {
	/**
	 *	创建地图
	 */
	createMap : function(x, y) {
		var mapMap = new LC.Utils.Map();
		for (var i = 1; i <= x; i++) {
			for (var j = 1; j <= y; j++) {
				var plat = new LC.Data.Plat();
				plat.setPositionX(i).setPositionY(j);
				//该位置效率低下
				plat.setLink("top").setLink("left").setLink("bottom").setLink("right");
				if (i==1) {
					plat.setLink("left","false");
				} else if (i==x){
					plat.setLink("right","false");
				}
				if (j==1) {
					plat.setLink("top","false");
				} else if (j==x){
					plat.setLink("bottom","false");
				}
				mapMap.put(i + "," + j, plat);
			};
		};
		//开始创建墙壁
		var stack = {};
		var startKey = "1,1,"+x+","+y;
		if ((x - 1) >= 2 && (y - 1) >= 2) {//初次判断，初次计算
			//计算该区域的子区域xy上下限值，生成新的一组数据并放入stack
			var startValue = {0:1+","+ 1+","+ (1 + Math.floor((x - 1) / 2))+","+ (1 + Math.floor((y - 1) / 2))
			,1:(1 + Math.ceil((x - 1) / 2))+","+ 1+","+ x+","+ (1 + Math.floor((y - 1) / 2))
			,2:1+","+(1+Math.ceil((y - 1) / 2))+","+ (1 + Math.floor((x - 1) / 2))+","+y
			,3:(1 + Math.ceil((x - 1) / 2))+","+ (1 + Math.ceil((y - 1) / 2))+","+ x+","+ y};
		}
		stack[startKey]=startValue;
		var minX,minY,maxX,maxY,tempStartX,tempEndX,tempStartY,tempEndY,nowKey,nowValue,stackKeys,linka,tempa,key,value,arr,nowKey2;
		stackKeys = Object.keys(stack);
		var xn = 0;
				while(stackKeys.length>=1){
				stackKeys = Object.keys(stack);
				for (var i=0; i < stackKeys.length; i++) {
				  nowKey =  stackKeys[i];
				  //console.log(nowKey);
				  nowValue = stack[nowKey];//是一个array [下一级4各区域]
				  for (var j=0; j < Object.keys(nowValue).length; j++) {//处理下一级4各区域
				  	xn++;
				  	//console.log(nowKey);
				  	//console.log(nowValue);
				  	/*
					arr = nowValue[j].split(",");//分割字符串得到区域xy上下限值
					*/
				  	nowKey2 = j;
				  	arr = nowValue[nowKey2].split(",");//分割字符串得到区域xy上下限值
					minX = Number(arr[0]);
					minY = Number(arr[1]);
					maxX = Number(arr[2]);
					maxY = Number(arr[3]);
					//开始设置墙
					linka = LC.Components.ComponentFunction.random(["top","left","bottom","right"], [0.25, 0.25,0.25, 0.25]);
					//console.log(linka);
					tempa;
					if (linka == "top") {
						tempStartX = minX + Math.floor((maxX - minX) / 2);
						tempEndX = tempStartX;
						tempStartY = minY;
						tempEndY = minY + Math.floor((maxY - minY) / 2);
					} else if (linka == "left") {
						tempStartX = minX;
						tempEndX = minX + Math.floor((maxX - minX) / 2);
						tempStartY = minY + Math.floor((maxY - minY) / 2);
						tempEndY = tempStartY;
					} else if (linka == "bottom") {
						tempStartX = minX + Math.floor((maxX - minX) / 2);
						tempEndX = tempStartX;
						tempStartY = minY + Math.ceil((maxY - minY) / 2);
						tempEndY = maxY;
					} else if (linka == "right") {
						tempStartX = minX + Math.ceil((maxX - minX) / 2);
						tempEndX = maxX;
						tempStartY = minY + Math.floor((maxY - minY) / 2);
						tempEndY = tempStartY;
					}
					if (tempStartX == tempEndX) {
						for (var i1 = tempStartY; i1 <= tempEndY; i1++) {
							mapMap.get((tempEndX) + "," + i1).setLink("right", "false");
							if (mapMap.get((tempEndX +1) + "," + i1)) {
								mapMap.get((tempEndX +1) + "," + i1).setLink("left", "false");
							}
						};
					} else if (tempStartY == tempEndY) {
						for (var i1 = tempStartX; i1 <= tempEndX; i1++) {
							mapMap.get(i1 + "," + (tempEndY )).setLink("bottom", "false");
							if (mapMap.get(i1 + "," + (tempEndY+1))) {
								mapMap.get(i1 + "," + (tempEndY+1)).setLink("top", "false");
							}
						};
					}					
					//判断是否满足继续生成子区域数据
					if ((maxX - minX) >= 2 && (maxY - minY) >= 2) {
						//console.log("符合条件，继续");
						//计算该区域的子区域xy上下限值，生成新的一组数据并放入stack
						//key = nowValue[j];
						key = nowValue[nowKey2];
						//console.log(key);
						value = {0:minX+","+ minY+","+ (minX + Math.floor((maxX - minX) / 2))+","+ (minY + Math.floor((maxY - minY) / 2))
						,1:(minX + Math.ceil((maxX - minX) / 2))+","+ minY+","+ maxX+","+ (minY + Math.floor((maxY - minY) / 2))
						,2:minX+","+(minY+Math.ceil((maxY - minY) / 2))+","+ (minX + Math.floor((maxX - minX) / 2))+","+maxY
						,3:(minX + Math.ceil((maxX - minX) / 2))+","+ (minY + Math.ceil((maxY - minY) / 2))+","+ maxX+","+ maxY};
						stack[key] = value;
						//console.log(value);
						//console.log(stack);
					}else{
						//console.log("不符合条件");
					}
					//console.log("-----------------");
				  };
				  //该组数据处理完后，将该组数据从stack中移除
				  delete stack[nowKey];
				 // console.log(stack);
				  //console.log("=================");
				  
				};
				 //console.log("*********************");
			};
			 console.log(xn);
		//while((maxX - minX) >= 2 && (maxY - minY) >= 2){
		/*
		var tempStack;
		while () {
			if ((maxX - minX) >= 2 && (maxY - minY) >= 2) {
				//左上区域
				console.log(minX+","+ minY+","+ (minX + Math.floor((maxX - minX) / 2))+","+  (minY+  Math.floor((maxY - minY) / 2)));
				stack.push([]);
				stack[lv].push(minX+","+ minY+","+ minX + Math.floor((maxX - minX) / 2)+","+ minY + Math.floor((maxY - minY) / 2));
				//右上区域
				console.log((minX + Math.ceil((maxX - minX) / 2))+","+ minY+","+ maxX+","+ (minY + Math.floor((maxY - minY) / 2)));
				stack[lv].push([minX + Math.ceil((maxX - minX) / 2), minY, maxX, minY + Math.floor((maxY - minY) / 2)]);
				//左下区域
				console.log(minX+","+(minY+Math.ceil((maxY - minY) / 2))+","+ (minX + Math.floor((maxX - minX) / 2))+","+maxY);
				stack[lv].push([minX,minY+Math.ceil((maxY - minY) / 2), minX + Math.floor((maxX - minX) / 2), maxY]);
				//右下区域
				console.log((minX + Math.ceil((maxX - minX) / 2))+","+ (minY + Math.ceil((maxY - minY) / 2))+","+ maxX+","+ maxY);
				stack[lv].push([minX + Math.ceil((maxX - minX) / 2), minY + Math.ceil((maxY - minY) / 2), maxX, maxY]);
			}
			tempStack = stack[lv];
			//计算 stack[lv]中4个元素中值是否可以继续循环
			//可以循环，则tempStack传入下一个循环中
			lv++;
		};
		*/
		//}
		//console.log(stack);
		/*
		//构建墙壁
		var creatWall = function(x, y, x1, y1) {
			var minX = x;
			var minY = y;
			var maxX = x1;
			var maxY = y1;
			var linka = LC.Components.ComponentFunction.random(["top","left","bottom","right"], [0.25, 0.25,0.25, 0.25]);
			//console.log(linka);
			var tempa;
			if (linka == "top") {
				tempStartX = minX + Math.floor((maxX - minX) / 2);
				tempEndX = tempStartX;
				tempStartY = minY;
				tempEndY = minY + Math.floor((maxY - minY) / 2);
			} else if (linka == "left") {
				tempStartX = minX;
				tempEndX = minX + Math.floor((maxX - minX) / 2);
				tempStartY = minY + Math.floor((maxY - minY) / 2);
				tempEndY = tempStartY;
			} else if (linka == "bottom") {
				tempStartX = minX + Math.floor((maxX - minX) / 2);
				tempEndX = tempStartX;
				tempStartY = minY + Math.ceil((maxY - minY) / 2);
				tempEndY = maxY;
			} else if (linka == "right") {
				tempStartX = minX + Math.ceil((maxX - minX) / 2);
				tempEndX = maxX;
				tempStartY = minY + Math.floor((maxY - minY) / 2);
				tempEndY = tempStartY;
			}
			if (tempStartX == tempEndX) {
				for (var i = tempStartY; i <= tempEndY; i++) {
					mapMap.get((tempEndX) + "," + i).setLink("right", "false");
					if (mapMap.get((tempEndX +1) + "," + i)) {
						mapMap.get((tempEndX +1) + "," + i).setLink("left", "false");
					}
				};
			} else if (tempStartY == tempEndY) {
				for (var i = tempStartX; i <= tempEndX; i++) {
					mapMap.get(i + "," + (tempEndY )).setLink("bottom", "false");
					if (mapMap.get(i + "," + (tempEndY+1))) {
						mapMap.get(i + "," + (tempEndY+1)).setLink("top", "false");
					}
				};
			}
			if ((maxX - minX) >= 2 && (maxY - minY) >= 2) {
				//左上区域
				console.log(minX+","+ minY+","+ (minX + Math.floor((maxX - minX) / 2))+","+  (minY+  Math.floor((maxY - minY) / 2)));
				creatWall(minX, minY, minX + Math.floor((maxX - minX) / 2), minY + Math.floor((maxY - minY) / 2));
				//右上区域
				console.log((minX + Math.ceil((maxX - minX) / 2))+","+ minY+","+ maxX+","+ (minY + Math.floor((maxY - minY) / 2)));
				creatWall(minX + Math.ceil((maxX - minX) / 2), minY, maxX, minY + Math.floor((maxY - minY) / 2));
				//左下区域
				console.log(minX+","+(minY+Math.ceil((maxY - minY) / 2))+","+ (minX + Math.floor((maxX - minX) / 2))+","+maxY);
				creatWall(minX,minY+Math.ceil((maxY - minY) / 2), minX + Math.floor((maxX - minX) / 2), maxY);
				//右下区域
				console.log((minX + Math.ceil((maxX - minX) / 2))+","+ (minY + Math.ceil((maxY - minY) / 2))+","+ maxX+","+ maxY);
				creatWall(minX + Math.ceil((maxX - minX) / 2), minY + Math.ceil((maxY - minY) / 2), maxX, maxY);
			}

		};
		creatWall(1, 1, x, y);
		*/
		console.log("执行完毕");
		return mapMap;
	},
	drawMap : function(map) {
		var t = document.createElement("div");//$("<div></div>");
		var map = map;
		var i1 = 1;
		var top,right,bottom,left,key,str,link;		while (i1 ) {
			var j1 = 1;
			var plat;
			if (!map.get(j1 + "," + i1) || null == map.get(j1 + "," + i1)) {
				break;
			}
			while (j1 ) {
				plat = map.get(j1 + "," + i1);
				if (plat || null != plat) {
					 top = "#ffffff";
					    right = "#ffffff";
					    bottom = "#ffffff";
					    left = "#ffffff";
					   link = plat.getLink();
					    key = "top";
					//if (plat.getLink().get("top") == "false") {
					if (link[key] == "false") {
						top = "#000000";
					}
					key = "right";
					//if (plat.getLink().get("right") == "false") {
					if (link[key] == "false") {
						right = "#000000";
					}
					key = "bottom";
					if (link[key] == "false") {
						bottom = "#000000";
					}
					key = "left";
					if (link[key] == "false") {
						left = "#000000";
					}
					str = top + " " + right + " " + bottom + " " + left;
					var t1 = document.createElement("div");
					t1.style= "width:20px;height:20px;border-style:solid;border-color:"+str+";display:inline-block;position:relative;overflow:hidden;margin:-2px 0px ";
					/*
					var t1 = $("<div></div>").attr({
						linka : j1 + "," + i1
					}).css({
						"width" : "20px",
						"height" : "20px",
						//"border-style" : str,
						"border-style" : "solid",
						"border-color": str,
						"display" : "inline-block",
						"position" : "relative",
						"overflow":"hidden",
						"margin" : "-2px 0px",
					});
					*/
					//t.append(t1);
					t.appendChild(t1);
					j1++;
				} else {
					break;
				}
			}
			t.appendChild(document.createElement("br"));
			i1++;
		}
		console.log("执行完毕");
		//t.css({"transform":"rotateX(55deg) rotateY(0deg) rotateZ(40deg)",});
		return t;
	}
};
/*
 LC.Data.PlatFactory = {
 *	创建营地
 createCampsite : function() {
 var plat = new LC.Data.Plat();
 plat.setName("出生营地").setType(LC.Data.CommonProperty.PLAT.PLAT_TYPE.SAFEZONE);

 },
 };
 */
