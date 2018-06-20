//方向盘箭头生成以及点击动画控制
app.controller("steeringWheel",function($scope, $rootScope) {
	//生成上下左右4个箭头
	$scope.arrows=["1","2","3","4"];
	//点击效果控制
	var sign = "-1";
	$scope.arrowOnClick = function(i) {
		if (sign=="-1"){
			sign="-2";
		}else{
			sign="-1";
		}
		$scope.animation = (i+1) + sign;
	};
}); 