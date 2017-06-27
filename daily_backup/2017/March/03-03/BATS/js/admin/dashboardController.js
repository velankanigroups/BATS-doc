batsAdminHome.controller('dashboardController', function($scope, $http, $rootScope,$localStorage,commonAppService){	 
	$scope.token = $localStorage.data;
	$rootScope.menuPos=14;
	$scope.tab = 1;
	$scope.setTab = function(newTab){
    	/*google.maps.event.trigger(map, 'resize');*///$scope.tripDetails="";
    	/*console.log("in setTab");*/
    	//clearField();
      $scope.tab = newTab;
    };
    
    $scope.isSet = function(tabNum){
    	//$scope.showTripDropDown=false;
    	//$scope.tripDetails="";
    	/*console.log("in isSetTab");*/
    	
      return $scope.tab === tabNum;
    };
	
	/*$scope.totalDevices=commonAppService.plotValues();*/
	$scope.TrackerCount;
	$scope.TrackerActList;
	
    commonAppService.tracker(function(result){
    	console.log(result);
    	$scope.TrackerCount = result;
    	console.log($scope.TrackerCount);
    	var data=[
  	            {name: "allocated",y: $scope.TrackerCount.allocated, color: '#008cdc'},
  	            {name: "unalloacted",y: $scope.TrackerCount.unallocated, color: '#b3b3b3'},
  	            {name: "Notworking",y: $scope.TrackerCount.nonworking, color: '#e54a4e' },          
  	           ];
    	commonAppService.donutChart('container',data);
    	
    	
    	
    	
    	
    	$scope.getPercentage = function (a,b) {
    	    return ((b * 100) / a).toFixed(2);
    	}
    	/*$scope.getTotal = function () {
    	    return $scope.allocatedTotal;
    	}*/
    	
    	
    });
    var status
    $scope.getList =function(state){
    	status = state;
    	
    	if(status == 0)
    	{
    		$scope.stateCheck="0";
    	}
    	else if(status == 1)
    	{
    		$scope.stateCheck="1";
    	}
    	else if(status == 2)
    	{
    		$scope.stateCheck="2";
    	}
    	else if(status == 3){
    		$scope.stateCheck="3";
    	}
    	else if(status == 4){
    		$scope.stateCheck="4";
    	}
    	else if(status == 5){
    		$scope.stateCheck="5";
    	}
    	commonAppService.trackerList(status,function(result){
    	console.log(result);
    	$scope.TrackerActList = result;
    	console.log($scope.TrackerActList);
    });
    }
    
    
    
});






batsAdminHome.controller('dashboardTripController', function($scope, $http, $rootScope,$localStorage,commonAppService){
	console.log("trip"); 
	
	commonAppService.initMap()
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
    $(function() {
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'DriverContainer',
                type: 'pie',
                height: 222,
                width:250
            },
            title: {
                text: ''
            },

            plotOptions: { 
                pie: {
                    borderColor: '#fff',
                    innerSize: '70%'
                }
            },
            series: [{
                data: [
                       {name: 07,y: 90, color: '#00af81' },
                       {name: 02,y: 10, color: '#43aae5'},
                       ]}],
                 name: "",
                 size: 15,
                 innerSize: 10,
                 pointPadding: 0,
                 groupPadding: 0 
                 
                 
                 
                   
        },
        // using 
                                         
        function(chart) { // on complete
            
            var xpos = '50%';
            var ypos = '50%';
            var circleradius = 80;
        
        // Render the circle
        chart.renderer.circle(xpos, ypos, circleradius).attr({
            fill: '#fff', 
        }).add();

        // Render the text 
        /*'THIS TEXT <span style="color: red">should be in the center of the donut</span>'*/
        /*chart.renderer.text('', 155, 215).css({
                width: circleradius*2,
                color: '#4572A7',
                fontSize: '16px',
                textAlign: 'center'
          }).attr({
                // why doesn't zIndex get the text in front of the chart?
                zIndex: 999
            }).add();*/
        });
    });
	
});



