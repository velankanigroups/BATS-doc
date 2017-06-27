
batstravelDeskHome.controller('tripManagement', function($scope, $localStorage,travelDeskFactory) {

$scope.mymap = function() {
		console.log("enter the mymap");
		var myPlace = {lat: 12.849857, lng: 77.658968}; 
		var labels = "S";
		var labeld = "D";
		var marker;
		
		var mapOptions = {
			center: myPlace ,  
	        zoom: 16,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	}
		var map= new google.maps.Map(document.getElementById("map"), mapOptions);
			console.log(map);
		var map2 =new google.maps.Map(document.getElementById("map2"), mapOptions);
			console.log(map2);
		var map3 =new google.maps.Map(document.getElementById("map3"), mapOptions);
			console.log(map2);
		
		var marker1 = new google.maps.Marker({
	          position: myPlace,
	          label: labels,
	          map: map2
	        });
		 
		google.maps.event.addListener(map2, 'click', function(event) {
			var dlatitude = event.latLng.lat();
			var dlangitude =event.latLng.lng();
			console.log(event.latLng.lat());
			/*dlatlng = {dlatitude*/
			console.log(event.latLng.lng());
		    addMarker(event.latLng, map2);
			});
		
		/*var distancePath = new google.maps.Polyline({

		})*/
		
		function addMarker(location, map2) {
		    // Add the marker at the clicked location, and add the next-available label
		    // from the array of alphabetical characters.
		    
			if(!marker || !marker.setPosition){
				marker = new google.maps.Marker({
					position:location,
					label: labeld,
					draggable:true,
					map:map2
				});
			}
			else { 
				marker.setPosition(location);
			}
		}
	
};


$('.input-group').find('.input-group-addon').on('click', function(){
	$(this).parent().siblings('#startTimePicker').trigger('focus');	
});

$('.input-group').find('.input-group-addon').on('click', function(){
	$(this).parent().siblings('#endTimePicker').trigger('focus');	
});



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
	
	$(document).ready(function(){
		$scope.mymap();
		console.log("doc ready");
	})
	
	
});