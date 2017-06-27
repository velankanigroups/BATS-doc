batstravelDeskHome.controller('tripManagement', function($scope, $localStorage,$http,travelDeskFactory,travelDeskService) {
	$scope.token = $localStorage.data;
	
	$scope.tripList = function(){
		//console.log("entered the trip");
		$scope.listToken ={};
		$scope.listToken.token = $scope.token;
		travelDeskFactory.callApi("POST",apiURL+"trip/list",$scope.listToken,function(result){
			if(result.status == "trips not available"){
				swal({title:"No Trips Created Yet"});
			}
			else{
		      $scope.triplistObject= result.list;
		      $scope.httpLoading=false;
			}
		});
	}
	

/*$scope.createTrip = function(){
		$scope.createTripData ={};
		$scope.createTripData.token = $scope.token;
		$scope.createTripData.devid= ;
		$scope.createTripData.apprx_start_time= ;
		$scope.createTripData.apprx_end_time= ;
		$scope.createTripData.start_point= ;
		$scope.createTripData.devid= ;
		$scope.createTripData.start_point ={};
		$scope.createTripData.start_point.name= ;
		$scope.createTripData.start_point.lat= ;
		$scope.createTripData.start_point.long= ;
		$scope.createTripData.end_point ={};
		$scope.createTripData.
		$scope.createTripData.
	}*/
	
	
	
	
	$scope.token = $localStorage.data;
	var map;
	var myPlace = {lat: 12.849857, lng: 77.658968};
	var marker;
	var labeld="D";
	var end;
	var directionsDisplay;
	var directionsService;
	 $scope.initMap =function() {
		console.log("entered the initmap");
		directionsService = new google.maps.DirectionsService();
		directionsDisplay = new google.maps.DirectionsRenderer({
			draggable : true,
			map : map,
			panel:document.getElementById('right-panel')
		});
		map = new google.maps.Map(document.getElementById('map'), {
			zoom : 14,
			center : {
				lat : 12.849857,
				lng : 77.658968
			}
		});
	   directionsDisplay.setMap(map);
	   google.maps.event.addListener(map, 'click', function(event) {
		   end=event.latLng;
		   addMarker(event.latLng, map);
		   calcRoute();
	   });
	   directionsDisplay.addListener('directions_changed', function() {
			computeTotalDistance(directionsDisplay.getDirections());
		});
	}
	 
	 function undoMap(){
			marker.setMap(null);
			directionsDisplay.setMap(null);
			
			marker="";
		}

	
	function calcRoute() {
		var start = new google.maps.LatLng(myPlace.lat,myPlace.lng);
		var bounds = new google.maps.LatLngBounds();
		bounds.extend(start);
		bounds.extend(end);
		map.fitBounds(bounds);
		var request = {
			origin : start,
			destination : end,
			travelMode : google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				directionsDisplay.setMap(map);
				directionsDisplay.setOptions({suppressMarkers:true});
			} else {
				alert("Directions not available for the selected location");
				undoMap();
				initMap();
			}
		});
	}
	function addMarker(location, map) {
	    // Add the marker at the clicked location, and add the next-available label
	    // from the array of alphabetical characters.    
		if(!marker || !marker.setPosition){
			marker = new google.maps.Marker({
				position:location,
				label: labeld,
				draggable:true,
				map:map
			});
		}
		else { 
			marker.setPosition(location);
		}
		marker.addListener('dragend', function(event){		  
			  end=event.latLng;
			  calcRoute();
		  });
	}
	function computeTotalDistance(result) {
		var pointsArray = [];
		pointsArray = result.routes[0].overview_path;
		$scope.pathways = pointsArray;
		console.log(pointsArray.length);
		/*document.getElementById('pathWay').innerHTML =JSON.stringify(pointsArray);*/
		
		for(var n=0;n<pointsArray.length;n++){
			travelDeskService.convertAddress(pointsArray[n],function(resp){
				console.log(resp);
				document.getElementById('pathWay').innerHTML =resp;
			})	
		}
		
	}
	
	
	

	
/*	var myPlace = {lat: 12.849857, lng: 77.658968}; 
	var labels = "S";
	var labeld = "D";
	
$scope.mymap = function() {
		//console.log("enter the mymap");
		
		var marker;
		
		var mapOptions = {
			center: myPlace ,  
	        zoom: 16,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	}
		var map= new google.maps.Map(document.getElementById("map"), mapOptions);
			//console.log(map);
		var map2 =new google.maps.Map(document.getElementById("map2"), mapOptions);
			//console.log(map2);
		var map3 =new google.maps.Map(document.getElementById("map3"), mapOptions);
			//console.log(map2);
		
		var marker1 = new google.maps.Marker({
	          position: myPlace,
	          label: labels,
	          map: map2
	        });
		 
		google.maps.event.addListener(map2, 'click', function(event) {
			var dlatitude = event.latLng.lat();
			var dlangitude =event.latLng.lng();
			
			var dlatlng = [
			               {lat:12.849857,lng:77.658968},
			               {lat:dlatitude,lng:dlangitude}
			              ];
			var polycoords = [dlatlng,myPlace];
			
			var polypath =new google.maps.Polyline({
				path: dlatlng,
				geodesic:true,
				strokeColor:'#ff0000',
				storkeOpacity:1.0,
				strokeWeight:2
			});
			polypath.setMap(map2);
			console.log(event.latLng.lng());
		    addMarker(event.latLng, map2);
			});
		
		var distancePath = new google.maps.Polyline({

		})
		
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

*/






$('.input-group').find('.input-group-addon').on('click', function(){
	$(this).parent().siblings('#startTimePicker').trigger('focus');	
});

$('.input-group').find('.input-group-addon').on('click', function(){
	$(this).parent().siblings('#endTimePicker').trigger('focus');	
});
	
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
	
	$scope.getTimeFormat = function(ts){
		return travelDeskService.showTime(ts);
	}
	
	
});