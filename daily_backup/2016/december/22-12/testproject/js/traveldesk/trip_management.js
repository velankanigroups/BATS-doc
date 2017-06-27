batstravelDeskHome.controller('tripManagement', function($scope, $localStorage,$http,travelDeskFactory,travelDeskService) {
	$scope.token = $localStorage.data;
	var pathWays;
	var destinations;
	$scope.trip_create={};
	$scope.updateTrip={};
	/*=========================BASIC FUNCTIONS==============================*/
	$scope.token = $localStorage.data;
	var map;
	var myPlace = {lat: 12.850167, lng: 77.660329}; 
	var marker;
	var labeld="D";
	var end;
	var directionsDisplay;
	var directionsService;
	var triplist_map;
	
	
	$scope.initMap =function() {
		document.getElementById("startpointId").value="Crowne Plaza Bengaluru";
		document.getElementById("endpointId").value="Crowne Plaza Bengaluru";
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
		   calcRoute(map);
	   });
	   directionsDisplay.addListener('directions_changed', function() {
			computeTotalDistance(directionsDisplay.getDirections());
		});
	   
	   
	
	}

	$('#createTripModal').on('shown.bs.modal', function() {		
		resizeCreateMap();
	});
	function resizeCreateMap() {
		   if(typeof map =="undefined") return;
		   var center = myPlace;
		   google.maps.event.trigger(map, "resize");
		   map.setCenter(center); 
	};
	
	 $scope.undoMap  = function(){
			marker.setMap(null);
			directionsDisplay.setMap(null);
			marker="";
			$scope.pathwaysArray = '';
		}

	
	function calcRoute(map) {
		var start = new google.maps.LatLng(myPlace.lat,myPlace.lng);
		var bounds = new google.maps.LatLngBounds();
		bounds.extend(start);
		bounds.extend(end);
		
		travelDeskService.convertAddress(end,function(result){
			console.log(result);
			destinations= result;
			document.getElementById("destinationSelected").value="";
			document.getElementById("destinationSelected").value=result;
			})
			
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
				$scope.undoMap();
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
			
			/*$scope.createTripForm.dest = getReverseGeocodingData(location);
			console.log($scope.createTripForm.dest);*/
			
		}
		else { 
			marker.setPosition(location);
		}
		marker.addListener('dragend', function(event){		  
			  end=event.latLng;
			  calcRoute(map);
		  });
		
		
	}	
	function computeTotalDistance(result) {
		var pointsArray = [];
		pointsArray = result.routes[0].overview_path;
		$scope.pathwaysArray = [];
		for(var n=0;n<pointsArray.length;n++){
			var patha = [];
			var a = pointsArray[n].lat();
			var b = pointsArray[n].lng();
			patha.push(a);
			patha.push(b);
			$scope.pathwaysArray.push(patha);
			
		}
		
	}
	
	
	
	$('#startTimePicker').datetimepicker({
		format:'LT'
	});
	
	$('#endTimePicker').datetimepicker({
		format:'LT'
	});
	
	$scope.trip_create.customers = [{}];
	$scope.addNewCustomer = function() {
	  $scope.trip_create.customers.push({});
	  console.log($scope.trip_create.customers);
	  
	  if($scope.trip_create.customers.length == 4){
	  $scope.hide_btn = true;
	  }
	  if($scope.trip_create.customers.length > 1){
			$scope.hide_remove = true;
		}
	};  
	$scope.removeCustomer = function(val) {
	  console.log(val);	  
	  $scope.trip_create.customers.splice(val);
	  if($scope.trip_create.customers.length < 4){
	  $scope.hide_btn = false;
	  }
	  if($scope.trip_create.customers.length == 1){
			$scope.hide_remove = false;
		}
	};
	
	$scope.getTimeFormat = function(ts){
		return travelDeskService.showTime(ts);
	}
	
	$scope.reset = function(){
		document.getElementById("createTripf").reset();
		$("#pathWay").text("");
	}
	
	/*======================BASIC FUNCTION=========================*/
	
	/*===========================API FUNCTION========================*/
	
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
	
	$scope.grouplist = function(){
		$scope.groupdata = {};
		$scope.groupdata.token = $scope.token;
		travelDeskFactory.callApi("POST",apiURL+"group/list",$scope.groupdata,function(result){
			$scope.grouplist = result.glist;
		})
		
	}
	
	$scope.fetchDevicelist=function(groupname){
		$scope.deviceId="";
		$('#clearTextDevice span.select2-chosen').empty();  
	    $('#clearTextDevice span.select2-chosen').text("- - Select Vehicle No/Device - -");
		$scope.httpLoading=true;
		$scope.listDeviceJson={};
		$scope.listDeviceJson.token=$scope.token;
		$scope.listDeviceJson.gid=groupname;
		travelDeskFactory.callApi("POST",apiURL+"traveldesk/getgroupdevices",$scope.listDeviceJson,function(result){
		      //console.log(result);	
		      $scope.devlistObject=result;
		      $scope.httpLoading=false;
		});
	}
	

	$scope.createTrip = function(){
		console.log("entered the createtrip");
		$scope.createTripData ={};
		$scope.createTripData.token = $scope.token;
		console.log($scope.trip_create.devid);
		$scope.createTripData.devid= $scope.trip_create.devid;
		$scope.createTripData.start_point ={};
		$scope.createTripData.start_point.name= "Crowne Plaza Bengaluru";
		$scope.createTripData.start_point.lat= 12.850167;
		$scope.createTripData.start_point.long= 77.660329;
		$scope.createTripData.end_point ={};
		$scope.createTripData.end_point.name="Crowne Plaza Bengaluru" ;
		$scope.createTripData.end_point.lat= 12.850167;
		$scope.createTripData.end_point.long= 77.660329;
		$scope.createTripData.destination= destinations;
		$scope.createTripData.path_way = $scope.pathwaysArray;
		$scope.createTripData.apprx_start_time=travelDeskService.getTsOverTime($("#startTimePicker").val());
		$scope.createTripData.apprx_end_time=travelDeskService.getTsOverTime($("#endTimePicker").val());	
		$scope.createTripData.customers=$scope.trip_create.customers;
		console.log(JSON.stringify($scope.createTripData));
		
		travelDeskFactory.callApi("POST",apiURL+"trip/create",$scope.createTripData,function(result){
		      console.log(result);	
		      $scope.devlistObject=result;
		      if(result.status == "success"){
		    	  
		    	  swal({title: "Trip Created Successfully",
		   			   text: "Success!",   
		   			   type: "success",   
		   			   confirmButtonColor: "#9afb29",   
		   			   closeOnConfirm: true }, 
		   			   function(){   
		   				$('#createTripModal').modal('hide');
						$scope.tripList();
						$scope.reset();
		   		 });
		    	  
		      }
		      else{}
		      $scope.httpLoading=false;
		});
		
		
	}
	
	$scope.initTriplistMap = function(tripdetail){
		directionsService = new google.maps.DirectionsService();
		window['triplist_map'+tripdetail.trip_id] = new google.maps.Map(document.getElementById('triplist_map'+tripdetail.trip_id), {
			zoom : 14,
			center : myPlace
		});
		directionsDisplay = new google.maps.DirectionsRenderer({
			draggable : true,
			map : window['triplist_map'+tripdetail.trip_id]
		});
		var endArray=tripdetail.path_way.slice(-1)[0];
		var start = new google.maps.LatLng(myPlace.lat,myPlace.lng);
		var end=new google.maps.LatLng(endArray[0],endArray[1]);
		var bounds = new google.maps.LatLngBounds();
		bounds.extend(start);
		bounds.extend(end);
		window['triplist_map'+tripdetail.trip_id].fitBounds(bounds);
		addMarker(end,window['triplist_map'+tripdetail.trip_id]);
		var request = {
				origin : start,
				destination : end,
				travelMode : google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
					directionsDisplay.setMap(window['triplist_map'+tripdetail.trip_id]);
					directionsDisplay.setOptions({suppressMarkers:true});
				} else {
					alert("Directions not available for the selected location");
					undoMap();
				}
			});		
			resizeTriplistMap(tripdetail.trip_id);	
	}
	function resizeTriplistMap(id) {
		   if(typeof window['triplist_map'+id] =="undefined") return;
		   var center = myPlace;
		   google.maps.event.trigger(window['triplist_map'+id], "resize");
		   window['triplist_map'+id].setCenter(center);
	};
	
	/*==========================API FUNCTION===============================*/
	

	/*===========================================>>>>>>> Madhavan Trip Update <<<<<<<======================================================*/
	$scope.updateTrip.Customers = [{}];
	$scope.addNewChoice = function() {
		$scope.updateTrip.Customers.push({});
	  if($scope.updateTrip.Customers.length == 4){
	  $scope.hide_btn = true;
	  }
	  if($scope.updateTrip.Customers.length > 1){
			$scope.hide_remove = true;
		}
	};  
	$scope.removeChoice = function(val) {
		console.log(val);	  
		$scope.updateTrip.Customers.splice(val);
	  if($scope.updateTrip.Customers.length < 4){
	  $scope.hide_btn = false;
	  }
	  if($scope.updateTrip.Customers.length == 1){
			$scope.hide_remove = false;
		}
	};
	
	 $('#startTimePickerU').datetimepicker({
        format: 'LT'
    });
	$scope.fetchTripInfo=function(trip_id){
		$scope.tripInfoJson={};
		$scope.tripInfoJson.token=$scope.token;
		$scope.tripInfoJson.trip_id=trip_id;
		travelDeskFactory.callApi("POST",apiURL+"trip/detail",$scope.tripInfoJson,function(result){
			updateTripForm(result);
		});
	}
	$scope.initUpdateMap=function(){
		directionsService = new google.maps.DirectionsService();
		updateMap = new google.maps.Map(document.getElementById('updateMap'), {
			zoom : 14,
			center : myPlace
		});
		directionsDisplay = new google.maps.DirectionsRenderer({
			draggable : true,
			map : updateMap
		});
		
	   directionsDisplay.setMap(updateMap);
	   google.maps.event.addListener(updateMap, 'click', function(event) {
		   end=event.latLng;
		   addMarker(event.latLng, updateMap);
		   calcRoute(updateMap);
	   });
	   directionsDisplay.addListener('directions_changed', function() {
			computeTotalDistance(directionsDisplay.getDirections());
		});	   
	}
	function updateTripForm(result){
		$scope.updateTrip.stime=travelDeskService.showTime(result.data.apprx_start_time);
		$scope.updateTrip.etime=travelDeskService.showTime(result.data.apprx_end_time);
		//$scope.updateTrip.gname=result.data.gname;
		$scope.updateTrip.vno=result.data.devid;
		$scope.updateTrip.spoint=result.data.start_point.name
		$scope.updateTrip.epoint=result.data.end_point.name
		$scope.updateTrip.dest=result.data.destination;
		$scope.updateTrip.Customers=result.data.customers;
		var endArray=result.data.path_way.slice(-1)[0];
		var start = new google.maps.LatLng(myPlace.lat,myPlace.lng);
		var end=new google.maps.LatLng(endArray[0],endArray[1]);
		var bounds = new google.maps.LatLngBounds();
		bounds.extend(start);
		bounds.extend(end);
		updateMap.fitBounds(bounds);
		addMarker(end,updateMap);
		var request = {
				origin : start,
				destination : end,
				travelMode : google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
					directionsDisplay.setMap(updateMap);
					directionsDisplay.setOptions({suppressMarkers:true});
				} else {
					alert("Directions not available for the selected location");
					undoMap();
					initUpdateMap();
				}
			});
	}
	$scope.postUpdateTrip=function(){
		$scope.updateTrip.stime=travelDeskService.getTsOverTime($scope.updateTrip.stime);
		$scope.updateTrip.etime=travelDeskService.getTsOverTime($scope.updateTrip.etime);
		console.log(JSON.stringify($scope.updateTrip));
	}
	$('#updateTripModal').on('shown.bs.modal', function() {		
		   resizeUpdateMap();
	});
	function resizeUpdateMap() {
		   if(typeof updateMap =="undefined") return;
		   var center = myPlace;
		   google.maps.event.trigger(updateMap, "resize");
		   updateMap.setCenter(center); 
	};

	
	$scope.cancelTrip = function(trip_id) {
		 swal({   title: "Are you sure?",   
	         	text: "You want to delete this driver?",   
	         	type: "warning",   
	         	showCancelButton: true,   
	         	confirmButtonColor: "#DD6B55",   
	         	confirmButtonText: "Yes, delete it!",   
	         	cancelButtonText: "No, cancel it!",   
	         	closeOnConfirm: false,   
	         	closeOnCancel: false }, 
	         	function(isConfirm){
	         		if (isConfirm) {
	         			$scope.cancelTripInfoJson ={};
	         			$scope.cancelTripInfoJson.token=$scope.token;
	         			$scope.cancelTripInfoJson.trip_id=trip_id;
	         			travelDeskFactory.callApi("POST",apiURL+"trip/cancel",$scope.cancelTripInfoJson,function(result){
	         				console.log(result);
	         				
	         				if(result.msg == "trip cancelled successfully"){
	         					swal({title: "Trip Cancelled Successfully",
	         			   			   text: "Success!",   
	         			   			   type: "success",   
	         			   			   confirmButtonColor: "#9afb29",   
	         			   			   closeOnConfirm: true }, 
	         			   			   function(){
	         			   			   $scope.tripList();	
	         			   		 });
	         				}
	         			});
	         		}
	         		else{
	         			swal("Cancelled", "You have cancelled :)", "error");
         			}
	         	})
		
	}
	/*===========================================>>>>>>> End Madhavan Trip Update  <<<<<<<=================================================*/	
	
	$(function(){
		var active = true;
		  $('#accordion').on('show.bs.collapse', function () {			 
		        if (active) $('#accordion .in').collapse('hide');
		    });
	});
});


