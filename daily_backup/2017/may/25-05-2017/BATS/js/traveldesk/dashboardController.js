batstravelDeskHome.controller('dashboardController', function($scope, $http,$interval,
	$rootScope, $localStorage,$location,commonAppService) {
	$scope.token = $localStorage.data;
	$rootScope.menuPos = 4;
	$scope.tab = 1;
	$scope.hideTripTable=true;
	var requestTime = 12;
	$scope.setTab = function(newTab) {
		if(newTab=='2'){
			commonAppService.initMap();
			$rootScope.getTripData();
		}
		$scope.tab = newTab;
	};

	$scope.isSet = function(tabNum) {
		// $scope.showTripDropDown=false;
		// $scope.tripDetails="";
		/* console.log("in isSetTab"); */

		return $scope.tab === tabNum;
	};

	/* $scope.totalDevices=commonAppService.plotValues(); */
	$scope.TrackerCount;
	$scope.TrackerActList;
	
	$rootScope.getTripData=function(){
	commonAppService.tracker(function(result) {
		console.log(result);
		$scope.TrackerCount = result;
		console.log($scope.TrackerCount);
		var data = [ {
			name : "allocated",
			y : $scope.TrackerCount.allocated,
			color : '#008cdc'
		}, {
			name : "unalloacted",
			y : $scope.TrackerCount.unallocated,
			color : '#b3b3b3'
		}, {
			name : "Notworking",
			y : $scope.TrackerCount.nonworking,
			color : '#e54a4e'
		}, ];
		commonAppService.donutChart('container', data);

		$scope.getPercentage = function(a, b) {
			return ((b * 100) / a).toFixed(2);
		}
		/*
		 * $scope.getTotal = function () { return $scope.allocatedTotal; }
		 */

	});
	};
	
	
	$rootScope.getTripData();
	    var callAlarmApi = $interval($rootScope.getTripData ,requestTime * 1000);
	
	
	var status
	$scope.getList = function(state) {
		status = state;

		  commonAppService.trackerList(status,function(result){
	    	console.log(result);
	    	if(result.data!="Trackers data not available for this status "+status){
				   $scope.hideTripTable=false;
				   $scope.TrackerActList = result;
				   console.log($scope.TrackerActList);
			   }
			   else{
				   $scope.hideTripTable=true;
				   /*alert(result.data);*/
			   }
	    });
		//$scope.gotoElement('TdashTable'+status);
	    	/*$location.hash('TdashTable'+status);
	        $anchorScroll();*/
	}
	
	$scope.gotoElement=function(eID){
		commonAppService.scrollTo(eID);
	}
	    
});

/**
 * *
 * -------------------------------------------------------Dashboard TRIP controller--------------------------------------------------
 *  * 
 * */
batstravelDeskHome.controller('dashboardTripController', function($scope, $http, $rootScope,$localStorage,$interval,commonAppService,commonFactory){
	console.log("trip"); 
	$scope.hideTripTable=true;
	var requestTime = 12;
	$scope.initMap=function(){
		commonAppService.initMap();	
	};
	$rootScope.getTripData=function(){
		commonAppService.getTripData(function(result){
			console.log(JSON.stringify(result));
			if(result.data!="trips not found"){
				$scope.scheduled=result.res_data.scheduled;
				$scope.running=result.res_data.running;
				$scope.completed=result.res_data.completed;
				$scope.cancelled=result.res_data.cancelled;
				$scope.dropped=result.res_data.dropped;
				$scope.delay_count=result.res_data.delay_count;
				/*var data1={"trip_id": "tripid1","values" : {"ts" : "1488564205000", "long" : 77.660444, "lat" : 12.848834, "Velocity" :100, "Vol" : 10}};
				var data2={"trip_id": "tripid2","values" : {"ts" : "1488564205000", "long" : 74.784771, "lat" : 20.697141, "Velocity" :100, "Vol" : 10}}
				var dummyData=[];
				dummyData.push(data1);
				dummyData.push(data2);*/
				//commonAppService.plotVehicleMarker(dummyData);
				commonAppService.plotVehicleMarker(result.trip_running);
			}
			else{
				$scope.scheduled=0;
				$scope.running=0;
				$scope.completed=0;
				$scope.cancelled=0;
				$scope.dropped=0;
				$scope.delay_count=0;		
			}		
		});
	};
	
	var callAlarmApi = $interval($rootScope.getTripData ,requestTime * 1000);
	
	$scope.getTripDataByStatus=function(status){
		//if(status!='Ds'){
			commonAppService.getTripsByStatus(status,function(result){
				   console.log(result);
				   if(result.data!="trips not found"){
					   $scope.hideTripTable=false;
					   $scope.tripData=result;
				   }
				   else{
					   $scope.hideTripTable=true;
					   //alert(result.data);
				   }				   
			});
//		}
//		else{
//			$scope.hideTripTable=true;
//			alert("T B D");
//		}
		
	};
	$scope.givelt=function(lt,lg){
		// alert("success");
		var geocoder = new google.maps.Geocoder();
		var latLng = new google.maps.LatLng(lt,lg);
		geocoder.geocode({       
		        latLng: latLng     
		        }, 
		        function(responses) 
		        {     
		           if (responses && responses.length > 0) 
		           {        
		               swal(responses[0].formatted_address);     
		           } 
		           else 
		           {       
		             swal('Not getting Any address for given latitude and longitude.');     
		           }   
		        }
		);
	}
	$scope.gotoElement=function(eID){
		commonAppService.scrollTo(eID);
	}
        
});
/**
 * *
 * -------------------------------------------------------End of Dashboard TRIP controller--------------------------------------------------
 *  * 
 * */
/**
 * *
 * -------------------------------------------------------Dashboard DRIVER controller--------------------------------------------------
 *  * 
 * */
batstravelDeskHome.controller('dashboardDriverController', function($scope,
		$localStorage, commonAppService) {
    
	commonAppService.getDriversData(function(result) {
		$scope.totalDrivers = result.total_drivers;
		$scope.availableDrivers = result.idle_drivers;
		$scope.onTrip = result.drivers_on_trip;
		$scope.driverData = result.drv_details;
		var data = [ {
			name : "Available",
			y : result.idle_drivers,
			color : '#00af81'
		}, {
			name : "On Trip",
			y : result.drivers_on_trip,
			color : '#43aae5'
		}, ]
		commonAppService.donutChart('DriverContainer', data);
	});
	
	$scope.getPercentage = function(a, b) {
		return commonAppService.getPercentage(a, b)
	}
	$scope.gotoElement=function(eID){
		commonAppService.scrollTo(eID);
	}
});
/**
 * *
 * -------------------------------------------------------End of Dashboard DRIVER controller--------------------------------------------------
 *  * 
 * */

/**
 * *
 * -------------------------------------------------------Dashboard Vehicle controller--------------------------------------------------
 *  * 
 * */
batstravelDeskHome.controller('dashboardVehicleController', function($scope,$localStorage,$rootScope,$interval,commonAppService){
	$scope.hideVehiclesTable=true;
	
	var requestTime = 12;
	$rootScope.getTripData=function(){
	commonAppService.getVehicleData(function(result){
		$scope.totalPanic=result.panic;
		$scope.totaloverspeed=result.overspeed;
		$scope.totalgeofence=result.geofence;
		$scope.totalongoing_trip=result.ongoing_trip;
		$scope.totalmax_lmt_cross=result.max_lmt_cross;
	});
	};
	
	
	var callAlarmApi = $interval($rootScope.getTripData ,requestTime * 1000);
	
	$scope.getVehiclesDataByStatus=function(status){
			commonAppService.getVehiclesByStatus(status,function(result){
				   console.log(result);
				   if(result.data!="data not found"){
					   $scope.hideVehiclesTable=false;
					   $scope.vehiclesData=result;
				   }
				   else{
					   $scope.hideVehiclesTable=true;
					   //alert(result.data);
				   }				   
			});		
	};
	$scope.givelt=function(lt,lg){
		// alert("success");
		var geocoder = new google.maps.Geocoder();
		var latLng = new google.maps.LatLng(lt,lg);
		geocoder.geocode({       
		        latLng: latLng     
		        }, 
		        function(responses) 
		        {     
		           if (responses && responses.length > 0) 
		           {        
		               swal(responses[0].formatted_address);     
		           } 
		           else 
		           {       
		             swal('Not getting Any address for given latitude and longitude.');     
		           }   
		        }
		);
	};
	$scope.gotoElement=function(eID){
		commonAppService.scrollTo(eID);
	}
	
	/*$(function() {
		  $('.dashbHover,#ActiveThird-ring1,#NotActiveThird-ring1,#BatteryThird-ring1,#TamperedThird-ring1,.TripOuterCircle').hover(function() {
			  $(this).append('<p id="passopt">Click Me!</p>');
			  $(this).css("text-decoration","none");
		  },function(){
			$(this).children('#passopt').remove();
		  });
		  
		});
	
	$(function() {
		  $('.vehicleHoverClass').hover(function() {
			  $(this).append('<p id="vehicleHover">Click Me!</p>');
			  $(this).css("text-decoration","none");
		  },function(){
			$(this).children('#vehicleHover').remove();
		  });
		  
		});*/
	var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var output = d.getFullYear() + '/' +
      (month<10 ? '0' : '') + month + '/' +
      (day<10 ? '0' : '') + day;
  $scope.currdate = output; 

	
});
/**
 * *
 * -------------------------------------------------------End of Dashboard Vehicle controller--------------------------------------------------
 *  * 
 * */