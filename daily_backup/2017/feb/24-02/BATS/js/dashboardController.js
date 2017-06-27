batsAdminHome.controller('dashboardController', function($scope, $http, $rootScope,$localStorage){
	console.log("dashboard"); 
	$scope.token = $localStorage.data;
	$rootScope.menuPos=14;
	
	
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
    	console.log("in isSetTab");
    	
      return $scope.tab === tabNum;
    }; 
    
    
    $(function () {
    	var testData = [{name:"77",y:77},{name:" ",y:23,color:"#eee"}];
    	var donutChartOptions = {
    		chart: {
    			backgroundColor: '#fff' ,
    			margin: [0,0,0,0],
    			renderTo: 'TestDonut',
    			spacing: [0,0,0,0],
    			type: 'pie'
    		},
            colors: ['#9cdb3b'],
    		credits: {
    			enabled: false
    		},
            exporting: {
    			enabled: false
    		}, 
    		legend: {
    			enabled: false
    		},
    		plotOptions: {
                /*series: {
                    dataLabels: {
                        enabled: true,
                        color: 'red'
                    }
                },*/
    			pie: {
                    allowPointSelect: false,
    				dataLabels: {
                        connectorWidth: 0,
    					enabled: false
    				},
    				shadow: false,
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
    			},
    		},
    		tooltip: {
    			enabled: false
    		},
    		series: [{
    			data: testData,
    			name: "",
    			size: 70,
    			innerSize: 57,
    			pointPadding: 0,
    			groupPadding: 0
    		}],
    		template: 'donut',
            title: {
                align: 'center',
                style: {
                    color: '#9cdb3b',
                    fontFamily: 'Arial, Helvetica, sans',
                    fontSize: '14px',
                    fontWeight: 'bold'
                },
                text: testData[0].name ,
                verticalAlign: 'middle',
                y: 5
            }
    	};

    var temp = new Highcharts.Chart(donutChartOptions);    
    });

	
});