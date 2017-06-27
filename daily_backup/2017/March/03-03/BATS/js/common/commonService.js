commonApp.service('commonAppService',function(commonFactory,$localStorage){
	/**
	 * 
	 * 
	 *  ------------------------------------------- Common functionality ----------------------------------------------*/
	this.donutChart=function(chartID,arrayOfData){
		console.log(chartID);
		$(function() {
	        var chart = new Highcharts.Chart({
	            chart: {
	                renderTo: chartID,
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
	                data:arrayOfData 
	                	/*[
	                       {name: 03,y: 30, color: '#b3b3b3'},
	                       {name: 02,y: 10, color: '#e54a4e'},
	                       {name: 07,y: 60, color: '#008cdc' },          
	                      ]*/
	                    }],
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
	       /* chart.renderer.text('', 155, 215).css({
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
	}
	
	/**
	 * ----------------------------------------------End of Common Functionality---------------------------------------------*/
	/**
	 * ----------------------------------------------TRACKER---------------------------------------------*/
	this.tracker = function(cb){
		var getTrackerJson = {};
		getTrackerJson.token = $localStorage.data;
		console.log(JSON.stringify(getTrackerJson));
		commonFactory.callApi("POST",apiURL+"dashboard/trackers",getTrackerJson,function(result){
			console.log(result);
			cb(result)
		});
	}
	
	this.trackerList =function(sta,TC){
		console.log(sta);
		var getTrackerListJson = {};
		getTrackerListJson.token = $localStorage.data;
		getTrackerListJson.status = sta.toString();;
		console.log(JSON.stringify(getTrackerListJson));
		commonFactory.callApi("POST",apiURL+"dashboard/tracker/devices",getTrackerListJson,function(result){
			console.log(result);
			TC(result);
			
		})
	}
	
	/*this.plotValues = function(){
		var getDeviceCountJson={};
		getDeviceCountJson.token=$localStorage.data;
		getDeviceCountJson.status="0";
		console.log(JSON.stringify(getDeviceCountJson));
		commonFactory.callApi("POST",apiURL+"dashboard/tracker/devices",getDeviceCountJson,function(result){
		      console.log(result);		      
		});
		return 0;
	}*/
	
	/**
	 * ----------------------------------------------TRACKER END---------------------------------------------*/
	
	/**
	 * -----------------------------------------------Trip Service-------------------------------------------------------*/
	this.initMap =function() {    	
    	var map;
          map = new google.maps.Map(document.getElementById('TripMap'), {
        	  zoom : 14,
  			center : {
  				lat : 12.849857,
  				lng : 77.658968
  			}
          });
	}	
	/**
	 * -----------------------------------------------End of Trip Service-------------------------------------------------------*/
	/**
	 * -----------------------------------------------Driver Service---------------------------------------------------------*/
	this.getDriversData=function(cb){
		var driversDataJson={};
		driversDataJson.token=$localStorage.data;
		commonFactory.callApi("POST",apiURL+"dashboard/drivers",driversDataJson,function(result){
			console.log(JSON.stringify(result));
			cb(result);
		});
	}
	/**
	 * -----------------------------------------------End of Driver Service-------------------------------------------------------*/
});