/**
 * @author LC 命名空间  namespace
 */
var LC = {};
//
/**
 * 随机概率计算,objArr:参与随机对象;arr2:概率数值
 */
function random(objArr, arr2) {
	//过滤校验,去掉概率不正确的元素(非Number、NaN、小于等于0)
	for (var i=0; i < arr2.length; i++) {
		if(typeof Number(arr2[i])!="number"||isNaN(Number(arr2[i]))||Number(arr2[i])<=0){
			objArr.splice(i,1);
			arr2.splice(i,1);
		}
	};
	var sum = 0,
	factor = 0,
	random = Math.random();
	for(var i = arr2.length - 1; i >= 0; i--) {
		sum += Number(arr2[i]); // 统计概率总和
	};
	for(var i = arr2.length - 1; i >= 0; i--) {
		factor += Number(arr2[i]);
		if(random <= factor) 
		return objArr[i];
	};
	//总概率不足1时，均未随机到则为null
	return null;
};