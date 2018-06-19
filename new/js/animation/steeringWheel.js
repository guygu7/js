app.controller('steeringWheel-upperArrow', function($scope, $rootScope) { 
	$scope.upArrowClick() = function(i) {
		console.log("upClick");
		$scope.focus=i;
	};
	
}); 