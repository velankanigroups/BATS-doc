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
    
    
    /*$(function () {
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
                series: {
                    dataLabels: {
                        enabled: true,
                        color: 'red'
                    }
                },
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
    });*/
    
    $(function() {
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'pie',
                height: 222,
                width:250
            },

            plotOptions: {
                pie: {
                    borderColor: '#000000',
                    innerSize: '60%'
                }
            },
            series: [{
                data: [
                    ['05', 44.2],
                    ['05', 26.6],
                    ['05', 20]
                   
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
        chart.renderer.text('', 155, 215).css({
                width: circleradius*2,
                color: '#4572A7',
                fontSize: '16px',
                textAlign: 'center'
          }).attr({
                // why doesn't zIndex get the text in front of the chart?
                zIndex: 999
            }).add();
        });
    });
    

	
});