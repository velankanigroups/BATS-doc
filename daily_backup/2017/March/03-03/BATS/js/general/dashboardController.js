batsGeneralHome.controller('dashboardController', function($scope, $http, $rootScope,$localStorage,commonAppService){
	console.log("dashboard"); 
	$scope.token = $localStorage.data;
	$rootScope.menuPos=9;
	$scope.tab = 1;
	$scope.setTab = function(newTab){
    	/*google.maps.event.trigger(map, 'resize');*///$scope.tripDetails="";
    	console.log("in setTab");
    	//clearField();
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
    	//$scope.showTripDropDown=false;
    	//$scope.tripDetails="";
    	//console.log("in isSetTab");
    	
      return $scope.tab === tabNum;
    }; 
   var data=[
             {name: 03,y: 30, color: '#b3b3b3'},
             {name: 02,y: 10, color: '#e54a4e'},
             {name: 07,y: 60, color: '#008cdc' },          
            ];
    commonAppService.donutChart('container',data);
    
});

batsGeneralHome.controller('dashboardTripController', function($scope, $http, $rootScope,$localStorage,commonAppService,commonFactory){
	console.log("trip"); 
	commonAppService.initMap();
 	$scope.getTripData=function(){
		var getTripDataJson={};
		getTripDataJson.token=$localStorage.data;
		commonFactory.callApi("POST",apiURL+"dashboard/trips",getTripDataJson,function(result){
			console.log(result);
		})
	}
    /*$scope.initMap =function() {
    	console.log("map");
    	var map;
          map = new google.maps.Map(document.getElementById('TripMap'), {
        	  zoom : 14,
  			center : {
  				lat : 12.849857,
  				lng : 77.658968
  			}
          });
	}*/    
});

/*for driver dashboard*/
batsGeneralHome.controller('dashboardDriverController', function($scope,$localStorage,commonAppService,commonFactory){
	var driversDataJson={};
	driversDataJson.token=$localStorage.data;
	commonFactory.callApi("POST",apiURL+"dashboard/drivers",driversDataJson,function(result){
		console.log(JSON.stringify(result));
		var data=[
	              {name: "Available",y: result.Available, color: '#00af81' },
	              {name: "On Trip",y: 10, color: '#43aae5'},
	              ]
		commonAppService.donutChart('DriverContainer',data);
	});
});
