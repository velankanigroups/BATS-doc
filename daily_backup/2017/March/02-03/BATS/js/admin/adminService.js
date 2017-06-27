batsAdminHome.service('dashboardService',function(commonFactory,$localStorage){
	
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
	this.plotValues = function(){
		var getDeviceCountJson={};
		getDeviceCountJson.token=$localStorage.data;
		getDeviceCountJson.status="0";
		console.log(JSON.stringify(getDeviceCountJson));
		commonFactory.callApi("POST",apiURL+"dashboard/tracker/devices",getDeviceCountJson,function(result){
		      console.log(result);		      
		});
	}
	
	
	
});