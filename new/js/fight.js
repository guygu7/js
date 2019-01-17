/*--------------------------------------------------------*/
/**
 * activeObj:主动对象
 * passiveObj:被动对象
 * activeObjSkill:主动对象所用技能
 */
function battleSettlement(activeObj, passiveObj, activeObjSkill) {
	var tempAttr;
	if ("getAttr" in activeObjSkill && activeObjSkill.getAttr() != undefined && Object.getOwnPropertyNames(activeObjSkill.getAttr()).length > 0) {
		//判断有getAttr
		tempAttr = activeObjSkill.getAttr();
	} else {//没有则应该为直接传入了attr{}
		tempAttr = activeObjSkill;
	}
	var infoStr = "";
	//主动对象hp变化值（主动对象自身效果）
	var activeObjHpChange = 0;
	//主动对象ep变化值（主动对象自身效果）
	var activeObjEpChange = 0;
	//主动对象的att输出
	var activeObjAttDamage = NaN;
	//主动对象的cri暴击率计算
	var activeObjCri = 0;
	//主动对象的criStrike暴击伤害计算
	var activeObjCriStrike = 0;
	//主动对象的hit命中率计算
	var activeObjHit = 0;
	//标记是否对被动对象有攻击
	var flag = false;
	if (tempAttr && tempAttr != undefined && tempAttr != null) {
		//maxHp(百分比)恢复值
		if (SKILL.ATTR.hpRecoveryMaxHpPercent in tempAttr) {
			activeObjHpChange += activeObj.getMaxHp() * tempAttr.hpRecoveryMaxHpPercent;
		}
		//当前hp(百分比)恢复值
		if (SKILL.ATTR.hpRecoveryPercent in tempAttr) {
			activeObjHpChange += activeObj.getHp() * tempAttr.hpRecoveryPercent;
		}
		//hp直接恢复值
		if (SKILL.ATTR.hpRecovery in tempAttr) {
			activeObjHpChange += tempAttr.hpRecovery;
		}
		//maxEp(百分比)恢复值
		if (SKILL.ATTR.epRecoveryMaxEpPercent in tempAttr) {
			activeObjEpChange += activeObj.getMaxEp() * tempAttr.epRecoveryMaxEpPercent;
		}
		//当前ep(百分比)恢复值
		if (SKILL.ATTR.epRecoveryPercent in tempAttr) {
			activeObjEpChange += activeObj.getEp() * tempAttr.epRecoveryPercent;
		}
		//ep直接恢复值
		if (SKILL.ATTR.epRecovery in tempAttr) {
			activeObjEpChange += tempAttr.epRecovery;
		}

		//计算输出伤害值（不包含固定伤害）
		//计算攻击输出（不包含固定伤害）
		if (SKILL.ATTR.attPercent in tempAttr) {
			if (isNaN(activeObjAttDamage)) {
				activeObjAttDamage = 0;
			};
			activeObjAttDamage += activeObj.getAtt() * tempAttr.attPercent;
			flag = true;
		}
		if (SKILL.ATTR.att in tempAttr) {
			if (isNaN(activeObjAttDamage)) {
				activeObjAttDamage = 0;
			};
			activeObjAttDamage += tempAttr.att;
			flag = true;
		}
		//计算暴击率
		if (SKILL.ATTR.cri in tempAttr) {
			activeObjCri = activeObj.getCri() + tempAttr.cri;
		} else {
			activeObjCri = activeObj.getCri();
		}
		//计算暴击伤害
		if (SKILL.ATTR.criStrike in tempAttr) {
			activeObjCriStrike = activeObj.getCriStrike() + tempAttr.criStrike;
		} else {
			activeObjCriStrike = activeObj.getCriStrike();
		}
		//计算命中
		if (SKILL.ATTR.hit in tempAttr) {
			activeObjHit = activeObj.getHit() + tempAttr.hit;
		} else {
			activeObjHit = activeObj.getHit();
		}

	}

	var str = "";
	if (dataRoleObj[0].getStatus() == "fight") {//判断是战斗状态
		//计算命中闪避
		var tempHit = activeObjHit - passiveObj.getAvd();
		if (random([true, false], [tempHit, (1 - tempHit)])) {//命中
			//被动对象hp计算:1.主动对象攻击给予的变化（受伤减少）
			var tempEnemyHp = passiveObj.getHp();
			//主动对象输出伤害-被动对象防御
			var tempActiveObjAttDamage = activeObjAttDamage - passiveObj.getDef();
			//计算暴击加成
			if (random([true, false], [activeObjCri, (1 - activeObjCri)])) {
				//暴击发生，计算暴击伤害
				tempActiveObjAttDamage += tempActiveObjAttDamage * activeObjCriStrike;
				//标记暴击发生
				str = "cri";
			};

			//判断为固定伤害输出计算，不计算防御力
			if (SKILL.ATTR.damage in tempAttr) {
				if (isNaN(tempActiveObjAttDamage)) {
					tempActiveObjAttDamage = 0;
				};
				tempActiveObjAttDamage += tempAttr.damage;
				flag = true;
			}

			//触发被动技能
			if (flag) {
				//---------未实现--------------
			}

		} else {
			//闪避发生
			str = "avd";
		}

		if (tempActiveObjAttDamage < 0) {
			tempActiveObjAttDamage = 0;
		}
		tempActiveObjAttDamage = Math.round(Number(tempActiveObjAttDamage));
		//舍去小数
		tempEnemyHp -= tempActiveObjAttDamage;
		//将被动对象hp实现
		passiveObj.setHp(tempEnemyHp);
		//输出战斗信息
		if (!isNaN(activeObjAttDamage) && flag) {
			if (str == "cri") {
				infoStr += "暴击!";
			}
			if (str == "avd") {
				infoStr += "未命中...";
			} else {
				infoStr += (activeObj.getName() + "造成了 " + tempActiveObjAttDamage + " 伤害;");
			}
		};
	}

	//主动对象hp计算:1.自身给予的主动变化（恢复）;
	var tempActiveObjHp = activeObj.getHp();
	activeObjHpChange = Math.round(Number(activeObjHpChange));
	//舍去小数
	if (activeObjHpChange > 0) {
		infoStr += (activeObj.getName() + "恢复了 " + activeObjHpChange + " 生命;");
	} else if (activeObjHpChange < 0) {
		infoStr += (activeObj.getName() + "的生命减少了 " + activeObjHpChange + ";");
	}
	tempActiveObjHp += activeObjHpChange;
	//将主动对象hp实现
	activeObj.setHp(tempActiveObjHp);

	if ("getEp" in activeObj) {
		//主动对象ep计算:1.自身给予的主动变化（恢复）;
		var tempActiveObjEp = activeObj.getEp();
		activeObjEpChange = Math.round(Number(activeObjEpChange));
		//舍去小数
		if (activeObjEpChange > 0) {
			infoStr += (activeObj.getName() + "恢复了 " + activeObjEpChange + " 能量;");
		} else if (activeObjEpChange < 0) {
			infoStr += (activeObj.getName() + "的能量减少了 " + activeObjEpChange + ";");
		}
		tempActiveObjEp += activeObjEpChange;
		//将主动对象ep实现
		activeObj.setEp(tempActiveObjEp);

	}

	if (infoStr != "") {
		viewDataModel.battle.battleInfo.push({
			str : infoStr
		});
		infoStr = "";
	}

	//添加buff
	if ("getBuffs" in activeObjSkill) {
		var tempBuffs = activeObjSkill.getBuffs();
		//tempBuff 为  array
		if (tempBuffs && tempBuffs != undefined && tempBuffs != null && tempBuffs.length > 0) {//判断有buff
			//获取当前角色hp的百分比
			var roleHpPercent = activeObj.getHp() / activeObj.getMaxHp();
			//获取当前对方hp的百分比
			var enemyHpPercent = passiveObj.getHp() / passiveObj.getMaxHp();
			for (var i = 0; i < tempBuffs.length; i++) {
				//复制一个buff对象，存入
				var tempBuff = copyBuff(tempBuffs[i]);
				if (tempBuff.getTarget() == BUFF.TARGET.self) {
					//判断是赋予自己(buff)
					activeObj.addBuff(tempBuff);
					infoStr += (activeObj.getName() + "获得了\"" + tempBuff.getName() + "\"效果;");
				} else if (tempBuff.getTarget() == BUFF.TARGET.opponent) {
					//判断是赋予对方(deBuff)
					if (str != "avd") {
						passiveObj.addBuff(tempBuff);
						infoStr += (activeObj.getName() + "给对方\"" + tempBuff.getName() + "\"效果;");
					} else {
						infoStr += (activeObj.getName() + "给对方\"" + tempBuff.getName() + "\"效果,但未命中;");
					}
				}
			};
			//重设双方HP，以处理跟随MaxHP变化
			activeObj.setHp(activeObj.getMaxHp() * roleHpPercent);
			passiveObj.setHp(passiveObj.getMaxHp() * enemyHpPercent);
		};
		viewDataModel.battle.battleInfo.push({
			str : infoStr
		});
		infoStr = "";
	}

	//判断hp是否为0
	if (dataRoleObj[0].getHp() <= 0) {
		//结束（未实现）
		viewDataModel.battle.battleInfo.push({
			str : "角色死亡"
		});
		fightOver("fail");
		return false;
	} else
	//判断对方hp是否为0
	if (currentInteractiveObject.getHp() <= 0) {
		//结束（未实现）
		viewDataModel.battle.battleInfo.push({
			str : "战斗胜利"
		});
		fightOver("victory");
		return false;
	}
	return true;
}

/**
 * 双方行动结算（角色先行动）传入：skillObj
 */
function battleSettlement2(skillObj) {
	//角色行动
	if (battleSettlement(dataRoleObj[0], currentInteractiveObject, skillObj)) {
		//技能概率计算
		var skillsArr = currentInteractiveObject.getSkills("active");
		var skillsChanceArr = [];
		if (Object.prototype.toString.call(skillsArr) == "[object Array]" && skillsArr.length > 0) {//判断有技能
			for (var i = 0; i < skillsArr.length; i++) {
				skillsChanceArr.push(Number(skillsArr[i].getUseChance()));
			};
		}
		var useSkill = random(skillsArr, skillsChanceArr);
		var str = "";
		if (useSkill != null) {//判断为使用技能
		} else {
			//没有使用技能，为普通攻击
			useSkill = {
				attPercent : 1
			};
		}
		//对方行动
		battleSettlement(currentInteractiveObject, dataRoleObj[0], useSkill);
	}
}

/**
 * 回合开始buff结算（hp增加、减少;ep增加、减少）
 */
function roundStartBuffSettlement() {
	var buffs = dataRoleObj[0].getBuffs();
	var hpRecovery = 0;
	//hp恢复量-减少量
	var epRecovery = 0;
	//ep恢复量-减少量
	for (var i = 0; i < buffs.length; i++) {
		var attr = buffs[i].getAttr();
		var flag1 = false;
		var flag2 = false;
		if (BUFF.ATTR.hpRecovery in attr) {//hp恢复-直接量
			flag1 = true;
			hpRecovery += attr.hpRecovery;
		}
		if (BUFF.ATTR.hpRecoveryPercent in attr) {//hp恢复-当前hp百分比
			flag1 = true;
			hpRecovery += (dataRoleObj[0].getHp() * attr.hpRecoveryPercent);
		}
		if (BUFF.ATTR.hpRecoveryMaxHpPercent in attr) {//hp恢复-MaxHp百分比
			flag1 = true;
			hpRecovery += (dataRoleObj[0].getMaxHp() * attr.hpRecoveryMaxHpPercent);
		}
		if (BUFF.ATTR.epRecovery in attr) {//ep恢复-直接量
			flag2 = true;
			epRecovery += attr.epRecovery;
		}
		if (BUFF.ATTR.epRecoveryPercent in attr) {//ep恢复-当前ep百分比
			flag2 = true;
			epRecovery += (dataRoleObj[0].getEp() * attr.epRecoveryPercent);
		}
		if (BUFF.ATTR.epRecoveryMaxEpPercent in attr) {//ep恢复-MaxHp百分比
			flag2 = true;
			epRecovery += (dataRoleObj[0].getMaxEp() * attr.epRecoveryMaxEpPercent);
		}
		if (flag1) {
			if (hpRecovery >= 0) {
				viewDataModel.battle.battleInfo.push({
					str : "你受到" + buffs[i].getName() + "效果:" + "HP+" + hpRecovery
				});
			} else {
				viewDataModel.battle.battleInfo.push({
					str : "你受到" + buffs[i].getName() + "效果:" + "HP" + hpRecovery
				});
			}
		}
		if (flag2) {
			if (epRecovery >= 0) {
				viewDataModel.battle.battleInfo.push({
					str : "你受到" + buffs[i].getName() + "效果:" + "EP+" + epRecovery
				});
			} else {
				viewDataModel.battle.battleInfo.push({
					str : "你受到" + buffs[i].getName() + "效果:" + "EP" + epRecovery
				});
			}
		}
	};
	var buffs = currentInteractiveObject.getBuffs();
	var hpRecovery = 0;
	//hp恢复量-减少量
	var epRecovery = 0;
	//ep恢复量-减少量
	for (var i = 0; i < buffs.length; i++) {
		var attr = buffs[i].getAttr();
		var flag1 = false;
		if (BUFF.ATTR.hpRecovery in attr) {//hp恢复-直接量
			flag1 = true;
			hpRecovery += attr.hpRecovery;
		}
		if (BUFF.ATTR.hpRecoveryPercent in attr) {//hp恢复-当前hp百分比
			flag1 = true;
			hpRecovery += (dataRoleObj[0].getHp() * attr.hpRecoveryPercent);
		}
		if (BUFF.ATTR.hpRecoveryMaxHpPercent in attr) {//hp恢复-MaxHp百分比
			flag1 = true;
			hpRecovery += (dataRoleObj[0].getMaxHp() * attr.hpRecoveryMaxHpPercent);
		}
		if (flag1) {
			if (hpRecovery >= 0) {
				viewDataModel.battle.battleInfo.push({
					str : currentInteractiveObject.getName() + "受到" + buffs[i].getName() + "效果:" + "HP+" + hpRecovery
				});
			} else {
				viewDataModel.battle.battleInfo.push({
					str : currentInteractiveObject.getName() + "受到" + buffs[i].getName() + "效果:" + "HP" + hpRecovery
				});
			}
		}
	};
}

/**
 * 回合结束buff结算
 */
function buffSettlement() {
	//获取双方当前hp的百分比
	var roleHpPercent = dataRoleObj[0].getHp() / dataRoleObj[0].getMaxHp();
	var enemyHpPercent = currentInteractiveObject.getHp() / currentInteractiveObject.getMaxHp();
	var buffs = dataRoleObj[0].getBuffs();
	for (var i = 0; i < buffs.length; i++) {
		buffs[i].setRound(buffs[i].getRound() - 1);
		if (buffs[i].getRound() <= 0) {
			dataRoleObj[0].delBuff(buffs[i]);
			i--;
		}
	};
	var buffs2 = currentInteractiveObject.getBuffs();
	for (var i = 0; i < buffs2.length; i++) {
		buffs2[i].setRound(buffs2[i].getRound() - 1);
		if (buffs2[i].getRound() <= 0) {
			currentInteractiveObject.delBuff(buffs2[i]);
			i--;
		}
	};
	//重设双方HP，以处理跟随MaxHP变化
	dataRoleObj[0].setHp(dataRoleObj[0].getMaxHp() * roleHpPercent);
	currentInteractiveObject.setHp(currentInteractiveObject.getMaxHp() * enemyHpPercent);
}

/**
 * 结束战斗
 */
function fightOver(pram) {
	if (pram == "victory") {//战斗胜利
		//数据计算
		//携带buff清除
		dataRoleObj[0].clearBuffs();
		currentInteractiveObject.clearBuffs();
		//计算掉落
		var tempItems = currentInteractiveObject.getItems();
		var dropItems = [];
		//最终的掉落物品
		var dropItemsArr = [];
		//掉落物品对象数组
		var dropChanceArr = [];
		//掉落概率数组
		for (var i = 0; i < tempItems.length; i++) {
			if ( typeof tempItems[i].getDropChance() == "number") {
				dropItemsArr.push(tempItems[i]);
				dropChanceArr.push(tempItems[i].getDropChance());
			}
		};
		var itemNames = "";
		if (dropItemsArr.length > 0) {//判断有掉落率物品才进行
			//随机掉落数量
			var dropNum = Math.ceil(Math.random() * currentInteractiveObject.getDropNum());
			for (var i = 0; i < dropNum; i++) {//根据掉落数量随机多次
				var dropItem = random(dropItemsArr, dropChanceArr);
				if (dropItem != null) {
					//对掉落物品对象复制处理
					var item_Obj = DataModleFactory.createItem();
					copyBean(dropItem, item_Obj);
					item_Obj.setTotalNum(1);
					dropItems.push(item_Obj);
					itemNames += (dropItem.getName() + ";");
				}
			};
		};
		//掉落物品信息写入
		if (itemNames.length > 0) {
			itemNames = "掉落物品:" + itemNames;
			//获取到临时存放点对象
			var tempObjArr = currentDomain.getInteractiveObjects();
			var tempObj = null;
			for (var i = 0; i < tempObjArr.length; i++) {
				if (tempObjArr[i].getName() == "临时存放点") {
					tempObj = tempObjArr[i];
					break;
				}
			};
			if (tempObj == null) {
				//没有获取到，则新建一个临时存放点对象
				tempObj = DataModleFactory.createInteractiveObject();
				copyBean(tempStoragePointObj, tempObj);
				currentDomain.addInteractiveObject(tempObj, "unshift");
			}
			//将掉落物存入临时存放点对象
			for (var i = 0; i < dropItems.length; i++) {
				tempObj.addItem(dropItems[i]);
			};
		};
		//判断是否战斗后消失
		if (currentInteractiveObject.getDisappear() == true) {
			currentInteractiveObject.supper.delInteractiveObject(currentInteractiveObject);
		}
		//场景切换
		sceneFightHide("战斗胜利!" + itemNames);
		sceneMainDataLoad(currentDomain);
		//任务校验------由于暂时不是直接放进包中(未完成)---------
		//mainShow();
	} else if (pram == "fail") {//战斗失败（未实现）

	}
	//清空战斗数据
	viewDataModel.battle.battleInfo.length = 0;
}

//战斗场景
app.controller("scene-battle", function($scope, $rootScope, $timeout) {
	quickMenuBagHide = function() {
		viewControl.display.quickMenuBagHide = true;
		viewControl.display.quickMenuBagMaskLayerHide = true;
		viewControl.zIndexList["menuBag"] = 0;
		viewControl.zIndexList["quickMenuBagMaskLayer"] = 0;
		viewControl.menu_bag_Style["z-index"] = 0;
		viewControl.quickMenuBagMaskLayer_Style["z-index"] = 0;
		viewControl.menu_bag_Style.opacity = 0;
	};
	quickMenuBagShow = function() {
		//获取层叠关系数组中最大值，并+1存入
		var maxZIndex = getMaxZIndex(100);
		viewControl.zIndexList["menuBag"] = maxZIndex + 2;
		viewControl.zIndexList["quickMenuBagMaskLayer"] = maxZIndex + 1;
		viewControl.menu_bag_Style["z-index"] = viewControl.zIndexList["menuBag"];
		viewControl.quickMenuBagMaskLayer_Style["z-index"] = viewControl.zIndexList["quickMenuBagMaskLayer"];
		//显示选择菜单
		viewControl.display.quickMenuBagHide = false;
		viewControl.display.quickMenuBagMaskLayerHide = false;
		viewControl.menu_bag_Style.left = 200 + "px";
		viewControl.menu_bag_Style.opacity = 1;
	};
	var quickButtonChangeArr;
	var nowQuickButtonSet;
	$scope.quickButtonChange = function(num) {//选择快捷按钮
		quickMenuBagShow();
		if (num == 4) {//加载背包中消耗品（包含战斗消耗品）
			quickButtonChangeArr = dataRoleObj[0].getItems("useRoleBag-Consumable");
			nowQuickButtonSet = 4;
		} else if (num == 5) {//加载背包中消耗品（包含战斗消耗品）
			quickButtonChangeArr = dataRoleObj[0].getItems("useRoleBag-Consumable");
			nowQuickButtonSet = 5;
		} else if (num == 6) {//加载背包中消耗品（包含战斗消耗品）
			quickButtonChangeArr = dataRoleObj[0].getItems("useRoleBag-Consumable");
			nowQuickButtonSet = 6;
		} else if (num == 1) {//加载角色技能
			quickButtonChangeArr = dataRoleObj[0].getSkills("active");
			nowQuickButtonSet = 1;
		} else if (num == 2) {//加载角色技能
			quickButtonChangeArr = dataRoleObj[0].getSkills("active");
			nowQuickButtonSet = 2;
		} else if (num == 3) {//加载角色技能
			quickButtonChangeArr = dataRoleObj[0].getSkills("active");
			nowQuickButtonSet = 3;
		} else {
			quickButtonChangeArr = [];
		}
		viewDataModel.menuBag.buttonElements = function() {
			return quickButtonChangeArr;
		};
	};
	$scope.menulistClick = function($index) {//点击选择
		quickMenuBagHide();
		switch(nowQuickButtonSet) {
		case 4:
			quickButton4 = quickButtonChangeArr[$index];
			break;
		case 5:
			quickButton5 = quickButtonChangeArr[$index];
			break;
		case 6:
			quickButton6 = quickButtonChangeArr[$index];
			break;
		case 1:
			quickButton1 = quickButtonChangeArr[$index];
			break;
		case 2:
			quickButton2 = quickButtonChangeArr[$index];
			break;
		case 3:
			quickButton3 = quickButtonChangeArr[$index];
			break;
		default:
			break;
		};
	};
	$scope.quickMenuBagMaskLayerClick = function() {
		quickMenuBagHide();
	};
	$scope.quickButtonClick = function(num) {
		var infoStr = "";

		var useItem = function(quickButton, num) {
			if (quickButton && quickButton != undefined && quickButton != null) {//判断quickButton是否设置
				if (quickButton.getTotalNum() && quickButton.getTotalNum() != undefined && quickButton.getTotalNum() != null && quickButton.getTotalNum() > 0) {
					//判断TotalNum存在且>0
					if (quickButton.getType() == ITEM.TYPE.consumable) {//判断第一类型为消耗品
						if (quickButton.getType2() == ITEM.TYPE2.consumable || quickButton.getType2() == ITEM.TYPE2.reusingConsumable) {//判断第二类型为消耗品或可反复使用消耗品
							//执行使用效果
							var tempAttr = quickButton.getAttr();
							//行动结算
							roundStartBuffSettlement();
							battleSettlement2(quickButton);
							buffSettlement();
							//数量-1
							if (!(quickButton.getType2() == ITEM.TYPE2.reusingConsumable)) {//是可反复使用消耗品则不减少数量
								var totalNum = quickButton.getTotalNum();
								totalNum -= 1;
								if (totalNum <= 0) {
									dataRoleObj[0].delItem(quickButton);
									quickButton = null;
								} else {
									quickButton.setTotalNum(totalNum);
								}
							}
						} else if (quickButton.getType2() == ITEM.TYPE2.battleConsumable) {//判断第二类型为战斗消耗品（攻击类）
							//执行使用效果
							var tempAttr = quickButton.getAttr();
							//行动结算
							roundStartBuffSettlement();
							battleSettlement2(quickButton);
							buffSettlement();
							//数量-1
							var totalNum = quickButton.getTotalNum();
							totalNum -= 1;
							if (totalNum <= 0) {
								dataRoleObj[0].delItem(quickButton);
								quickButton = null;
							} else {
								quickButton.setTotalNum(totalNum);
							}
						}

					}
				} else {//判断TotalNum不存在<=0,重新校准数据
					dataRoleObj[0].delItem(quickButton);
				}
			} else {//quickButton未设置，打开设置
				$scope.quickButtonChange(num);
			}
		};

		var useSkill = function(quickButton, num) {
			if (quickButton && quickButton != undefined && quickButton != null) {//判断quickButton是否设置
				//执行使用效果
				var tempAttr = quickButton.getAttr();
				//行动结算
				//如果消耗ep,计算ep是否足够
				if ("epRecovery" in tempAttr && typeof Number(tempAttr.epRecovery) == "number" && typeof !isNaN(Number(tempAttr.epRecovery)) && Number(tempAttr.epRecovery) != 0 && (Number(dataRoleObj[0].getEp()) + Number(tempAttr.epRecovery)) < 0) {
					//判断为ep不足
					viewDataModel.battle.battleInfo.push({
						str : "ep不足,无法使用技能"
					});
					return;
				} else {
					dataRoleObj[0].setEp(Number(dataRoleObj[0].getEp()) + Number(tempAttr.epRecovery));
				}
				roundStartBuffSettlement();
				battleSettlement2(quickButton);
				buffSettlement();
			} else {//quickButton未设置，打开设置
				$scope.quickButtonChange(num);
			}
		};
		switch(num) {
		case 1:
			//使用技能
			useSkill(quickButton1, 1);
			break;
		case 2:
			//使用技能
			useSkill(quickButton2, 2);
			break;
		case 3:
			//使用技能
			useSkill(quickButton3, 3);
			break;
		case 4:
			//使用消耗品
			useItem(quickButton4, 4);
			break;
		case 5:
			//使用消耗品
			useItem(quickButton5, 5);
			break;
		case 6:
			//使用消耗品
			useItem(quickButton6, 6);
			break;
		default:
			break;
		}
	};

}); 