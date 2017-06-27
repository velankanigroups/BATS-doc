batstravelDeskHome.controller('tripManagement', function($scope, $localStorage,$http,travelDeskFactory,travelDeskService) {
	$scope.token = $localStorage.data;
	var pathWays;
	var destinations;
	
	/*=========================BASIC FUNCTIONS==============================*/
	$scope.token = $localStorage.data;
	var map;
	var myPlace = {lat: 12.850167, lng: 77.660329}; 
	var marker;
	var labeld="D";
	var end;
	var directionsDisplay;
	var directionsService;
	
	
	$scope.initMap =function() {
		document.getElementById("startpointId").value="Crowne Plaza Bengaluru";
		document.getElementById("endpointId").value="Crowne Plaza Bengaluru";
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

	
	function calcRoute() {
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
			  calcRoute();
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
		console.log(JSON.stringify($scope.pathwaysArray));
		
	}
	
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
	
	$scope.customer = [{}];
	if($scope.customer.length == 1){
		$scope.hide_remove = false;
	}
	if($scope.customer.length < 4){
		  $scope.hide_btn = false;
		  }

	$scope.addNewCustomer = function() {
	  $scope.customer.push({});
	  console.log($scope.customer);
	  
	  if($scope.customer.length == 4){
	  $scope.hide_btn = true;
	  }
	  if($scope.customer.length > 1){
			$scope.hide_remove = true;
		}
	};  
	$scope.removeCustomer = function(val) {
	  console.log(val);	  
	  $scope.customer.splice(val);
	  if($scope.customer.length < 4){
	  $scope.hide_btn = false;
	  }
	  if($scope.customer.length == 1){
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
		
		/*var a = $("#endTimePicker").val();
		console.log(a);*/
		
		var s = $("#startTimePicker").val();;
		var s_split = s.split(':');
		console.log(s_split[0]);
		var hr= s_split[0];
		console.log(s_split[1]);
		var s_apmsplit = s_split[1].split(' ');
		console.log(s_apmsplit[0]);
		var mi = s_apmsplit[0];
		console.log(s_apmsplit[1]);
		var meri = s_apmsplit[1];
		console.log(travelDeskService.getTimestamp(new Date(),hr,mi,0,meri));
		var todays =travelDeskService.getTimestamp(new Date(),hr,mi,0,meri);
		$scope.todaystart =todays;
		$scope.createTripData.apprx_start_time= $scope.todaystart;
		
		
		
		var e = $("#endTimePicker").val();
		var e_split = e.split(':');
		console.log(e_split[0]);
		var hr= e_split[0];
		console.log(e_split[1]);
		var e_apmsplit = e_split[1].split(' ');
		console.log(e_apmsplit[0]);
		var mi = e_apmsplit[0];
		console.log(e_apmsplit[1]);
		var meri = e_apmsplit[1];
		console.log(travelDeskService.getTimestamp(new Date(),hr,mi,0,meri));
		var todaye = travelDeskService.getTimestamp(new Date(),hr,mi,0,meri);
		$scope.todayend = todaye;
		
		
		
		$scope.createTripData.apprx_end_time= $scope.todayend;
		$scope.createTripData.start_point ={};
		$scope.createTripData.start_point.name= "Crowne Plaza Bengaluru";
		$scope.createTripData.start_point.lat= 12.850167;
		$scope.createTripData.start_point.long= 77.660329;
		$scope.createTripData.end_point ={};
		$scope.createTripData.end_point.name="Crowne Plaza Bengaluru" ;
		$scope.createTripData.end_point.lat= 12.850167;
		$scope.createTripData.end_point.long= 77.660329;
		$scope.createTripData.path_way = $scope.pathwaysArray;
		$scope.createTripData.destination= destinations;
		/*$scope.createTripData.customers =$scope.createTripData.customers;*/
		/*$scope.createTripData.customers.name = $scope.createTripForm.contact_name;
		$scope.createTripData.customers.cn= $scope.createTripForm.contact_num;*/
		
		
		var cont_num = $scope.customer;
		console.log(cont_num.length);
		console.log(cont_num[0].contact_name);
		console.log(JSON.stringify(cont_num));
		$scope.createTripData.customers = [];
		var contactObject = {};
		for (var key in cont_num) {
		if (cont_num.hasOwnProperty(key)) {
			contactObject = {};
			console.log(cont_num[key].contact_name);
			contactObject.name=cont_num[key].contact_name;
			contactObject.cn=cont_num[key].contact_num;
			$scope.createTripData.customers.push(contactObject);
			console.log(contactObject);
		}
		}
		
		
		
		console.log(JSON.stringify($scope.createTripData));
		
		/*travelDeskFactory.callApi("POST",apiURL+"trip/create",$scope.createTripData,function(result){
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
		});*/
		
		
	}

	
	/*==========================API FUNCTION===============================*/
	

	
	
	
});


