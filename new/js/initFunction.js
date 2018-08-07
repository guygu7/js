/* 初始化数据用到的方法 */
/**
 * 将数据封装成对象,传入对象数据则返回对象，传入对象数组数据则返回对象数组
 * data:数据json对象,dataName:数据变量名
 */
function loadData(data,dataName){
	//判断传入的data是对象
	if(Object.prototype.toString.call(data) === "[object Object]"){
		//根据data类型创建对应的对象，role|domain|interactiveObject|item
		var obj = DataModleFactory[("create"+dataName.substring(0,1).toUpperCase()+dataName.substring(1))]();
		//获取data数据的属性名称数组
		var dataAttrs = Object.keys(data);
		//遍历生成对象的属性
		for (var objAttr in obj) {
			//仅获取对象的方法
			if (obj.hasOwnProperty(objAttr) && typeof obj[objAttr] == "function") {
				//判断为set方法
				if ("set"==objAttr.substring(0,3)){
					//执行生成对象的set方法(获取set方法的名称，处理，去掉set首字母小写，获取到属性名;并将data对应属性set进去)
					var tempData = data[objAttr.substring(3,4).toLowerCase()+objAttr.substring(4)];
					if(tempData!=undefined&&tempData!=null){
						tempData=JSON.parse(JSON.stringify(tempData));
					}
					console.info(objAttr+":"+tempData);
					obj[objAttr](tempData);
				}else if("add"==objAttr.substring(0,3)){//判断为add方法，需要递归
					//获取到data中对应的数组
					var dataArr = data[objAttr.substring(3,4).toLowerCase()+objAttr.substring(4)+"s"];
					if (dataArr){
						for (var i=0; i < dataArr.length; i++) {
							obj[objAttr](loadData(dataArr[i],objAttr.substring(3)));//递归调用
						};
					}
				}
			}
		}
		return obj;
	}
	//判断传入的data是数组
	else if (Object.prototype.toString.call(data) === "[object Array]") {
		var objArr = [];
		if(data){
			for (var i=0; i < data.length; i++) {
				objArr.push(loadData(data[i],dataName));
			};
		}
		return objArr;
	};
}
