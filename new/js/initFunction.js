/* 初始化数据用到的方法 */
/**
 * 场景数据封装到对象 
 */
function loadDomainsData (data){
	//将data数据封装对象，暂时仅为一个domain数组 
	var data_Obj = [];
	//暂存domain数据
	var tempDomains = data.domains;
	for (var i=0; i < tempDomains.length; i++) {
		//创建domain对象
		var domain_Obj = DataModleFactory.createDomain();
		domain_Obj.setName(tempDomains[i].name).setSignId(tempDomains[i].signId);
		//暂存interactiveObject可交互对象数据
		var tempInteractiveObjects = tempDomains[i].interactiveObjects;
		if (tempInteractiveObjects) {
			for (var j=0; j < tempInteractiveObjects.length; j++) {
				//创建interactiveObject可交互对象的对象
				var interactiveObject_Obj =  DataModleFactory.createInteractiveObject();
				interactiveObject_Obj.setName(tempInteractiveObjects[j].name);
				//暂存action交互动作数据
				var tempActions = tempInteractiveObjects[j].actions;
				if(tempActions){
					for (var k=0; k < tempActions.length; k++) {
						//创建action对象
						var action_Obj =  DataModleFactory.createAction();
						action_Obj.setName(tempActions[k].name).setType(tempActions[k].type).setContent(tempActions[k].content).setTarget(tempActions[k].target);
						//action对象 存入 interactiveObject_Obj
						interactiveObject_Obj.addAction(action_Obj);
					};
				};
				//暂存item物品数据
				var tempItems = tempInteractiveObjects[j].items;
				if (tempItems) {
					for (var k=0; k < tempItems.length; k++) {
						//创建item物品对象
						var item_Obj =  DataModleFactory.createItem();
						item_Obj.setName(tempItems[k].name).setType(tempItems[k].type).setContent(tempItems[k].content).setTotalNum(tempItems[k].totalNum);
						//暂存action交互动作数据
						var tempItemActions = tempItems[k].actions;
						if(tempItemActions){
							for (var l=0; l < tempItemActions.length; l++) {
								//创建action对象
								var action_Obj =  DataModleFactory.createAction();
								action_Obj.setName(tempItemActions[l].name).setType(tempItemActions[l].type).setContent(tempItemActions[l].content).setTarget(tempItemActions[l].target);
								//action对象存入item_Obj
								item_Obj.addAction(action_Obj);
							};
						};
						//item物品对象 存入 interactiveObject_Obj
						interactiveObject_Obj.addItem(item_Obj);
					};
				};
				//interactiveObject可交互对象的对象 存入 domain_Obj
				domain_Obj.addInteractiveObject(interactiveObject_Obj);
			};
		}
		//domain对象 存入 data_Obj
		data_Obj.push(domain_Obj);
	}
	return data_Obj;
};
/**
 * 角色数据封装到对象 
 */
function loadRolesData(data){
	//将data数据封装对象，暂时仅为一个Role数组 
	var data_Obj = [];
	//暂存role数据
	var tempRole = data.role;
	//创建role对象
	var role_Obj = DataModleFactory.createRole();
	role_Obj.setName(tempRole.name);
	//暂存item物品数据
	var tempItems = tempRole.items;
	if (tempItems) {
		for (var i=0; i < tempItems.length; i++) {
			//创建item物品对象
			var item_Obj =  DataModleFactory.createItem();
			item_Obj.setName(tempItems[i].name).setType(tempItems[i].type).setContent(tempItems[i].content).setTotalNum(tempItems[i].totalNum).setSellCost(tempItems[i].sellCost).setBuyCost(tempItems[i].buyCost);
			//暂存action交互动作数据
			var tempItemActions = tempItems[i].actions;
			if(tempItemActions){
				for (var l=0; l < tempItemActions.length; l++) {
					//创建action对象
					var action_Obj =  DataModleFactory.createAction();
					action_Obj.setName(tempItemActions[l].name).setType(tempItemActions[l].type).setContent(tempItemActions[l].content).setTarget(tempItemActions[l].target);
					//action对象存入item_Obj
					item_Obj.addAction(action_Obj);
				};
			};
			//item物品对象 存入 role_Obj
			role_Obj.addItem(item_Obj);
		};
	};
	//role对象 存入 data_Obj
	data_Obj.push(role_Obj);
	return data_Obj;
};
/**
 * 将物品数据封装成对象数组返回 
 * 传参：item数组
 */
function loadItemsData (data){
	//将data数据封装对象，暂时仅为一个Item数组 
	var data_Obj = [];
	//暂存item物品数据
	var tempItems = data;
	if (tempItems) {
		for (var i=0; i < tempItems.length; i++) {
			//创建item物品对象
			var item_Obj =  DataModleFactory.createItem();
			item_Obj.setName(tempItems[i].name).setType(tempItems[i].type).setContent(tempItems[i].content).setTotalNum(tempItems[i].totalNum).setSellCost(tempItems[i].sellCost).setBuyCost(tempItems[i].buyCost);
			//暂存action交互动作数据
			var tempItemActions = tempItems[i].actions;
			if(tempItemActions){
				for (var l=0; l < tempItemActions.length; l++) {
					//创建action对象
					var action_Obj =  DataModleFactory.createAction();
					action_Obj.setName(tempItemActions[l].name).setType(tempItemActions[l].type).setContent(tempItemActions[l].content).setTarget(tempItemActions[l].target);
					//action对象存入item_Obj
					item_Obj.addAction(action_Obj);
				};
			};
			//item物品对象 存入 data_Obj[]
			data_Obj.push(item_Obj);
		};
	};
	return data_Obj;
}