batstravelDeskHome.controller('tripManagement', function($scope, $localStorage,travelDeskFactory) {

$scope.mymap = function() {
		console.log("enter the mymap");
	var mapOptions = {
			center: {lat: -34.397, lng: 150.644},
	        zoom: 10,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	}
		var map= new google.maps.Map(document.getElementById("map"), mapOptions);
			console.log(map);
			var map2 =new google.maps.Map(document.getElementById("map2"), mapOptions);
			console.log(map2);
			var map3 =new google.maps.Map(document.getElementById("map3"), mapOptions);
			console.log(map2);

	
	$(window).resize(function() {
	    
	    google.maps.event.trigger(map, "resize");
	  });
	
};



/*$scope.mymap2 = function() {
		console.log("enter the mymap2");
	var mapOptions = {
			center: {lat: -34.397, lng: 150.644},
	        zoom: 10,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	}
		
		var map2 =new google.maps.Map(document.getElementById("map2"), mapOptions);
			console.log(map2);

	
	$(window).resize(function() {
	    
	    google.maps.event.trigger(map2, "resize");
	  });
	
};

$scope.mymap3 = function() {
	console.log("enter the mymap3");
var mapOptions = {
		center: {lat: -34.397, lng: 150.644},
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
}
	
	var map3 =new google.maps.Map(document.getElementById("map3"), mapOptions);
		console.log(map2);


$(window).resize(function() {
    
    google.maps.event.trigger(map3, "resize");
  });

};*/
	
	$('#startTimePicker').datetimepicker({
		format:'LT'
	});
	
	$('#endTimePicker').datetimepicker({
		format:'LT'
	});
	
	$('#custList').hide();
	$('#showAddCust').on('click', function(){
		$('#custList').show();
	})
	
	$scope.choices = [{}];
	if($scope.choices.length == 1){
		$scope.hide_remove = false;
	}
	if($scope.choices.length < 4){
		  $scope.hide_btn = false;
		  }
	$scope.addNewChoice = function() {
	  $scope.choices.push({});
	  if($scope.choices.length == 4){
	  $scope.hide_btn = true;
	  }
	  if($scope.choices.length > 1){
			$scope.hide_remove = true;
		}
	};  
	$scope.removeChoice = function(val) {
		console.log(val);	  
	  $scope.choices.splice(val);
	  if($scope.choices.length < 4){
	  $scope.hide_btn = false;
	  }
	  if($scope.choices.length == 1){
			$scope.hide_remove = false;
		}
	};
	
	
	
});