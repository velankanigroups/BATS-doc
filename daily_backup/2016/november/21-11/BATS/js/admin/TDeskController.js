batsAdminHome.controller('TDcontroller',function($scope,$http,$localStorage){
	$scope.token = $localStorage.data;
	//console.log($scope.token);
	if(typeof $scope.token==="undefined"){
		swal({ 
			   title: "Un Authorized Access",
		  	   text: "Kindly Login!",   
		  	   type: "warning",   
		  	   confirmButtonColor: "#ff0000",   
		  	   closeOnConfirm: false }, 
		  	   function(){  
		  		 $localStorage.$reset();
		  		 window.location = apiURL;
		  });
		 
	}
	
	$scope.reset = function(){
		document.getElementById("TravelDesk").reset();
		$scope.travelDeskForm.$setPristine();
		$scope.travelDeskForm.$setUntouched();
		
		
		
	}
	
	
});

