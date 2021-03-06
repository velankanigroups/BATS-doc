/**
 *  Driver Controller
 *  This Controller involves in the following
 *  a)Driver Creation
 *  b)Driver Updation
 *  c)Driver Listing
 *  d)Driver Removal
 *  and some basic operations like
 *  a)checking token and warning the user to login 
 *  b)age validation
 *  c)image upload
 *  d)on checkbox action (use present address as permanent)
 *  e)date picker
 *  f)language array preparation / language selection and removal based on tag input concept
 *  g)
 */
batsAdminHome.controller('driverController', function($scope, $localStorage, $http,$timeout,$window,$location) {
	$scope.httpLoading=false;//loading image
	$scope.imageUploading=false;
	$scope.onlyImage=false;
	$scope.onlyFiletype=false;
	$scope.token = $localStorage.data;
	$scope.driver={};//Driver object for getting the form values	
	$scope.driver.languages=[];
	$scope.driver.confirmAddress=true;	//by default the checkbox is selected for taking present address as permanent address
	$scope.imagepath=""; // image path for the driver
	$scope.driver.salary="";
	$scope.driver.aadhar="";
	$scope.driver.pcity="";
	$scope.driver.pstate="";
	$scope.driver.ppincode="";
	$scope.driver.pstreet="";
	$scope.driver.pcountry="";
	$scope.driver.etype = 'Permanent';
	
	
	
	/*====================================================>>>>>> Start of Basic function <<<<<=================================================*/
	/*
	 *  check for token availability
	 * */
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
	
		 
	/* Use Present Address as permanent address option
	 * show hide the address part on choice
	 * */
	$scope.usePresentAddress=function(choice){
		/* Modal Scroll Top function by animating
		 * Ref link :http://codepen.io/anon/pen/NRoBAq
		 * */
		//if false then user want to enter permanent address
		if(choice==false){
			var sectionOffset = $('#permanentAddr').offset();
			//console.log(sectionOffset);
			$("#driverCreateModal").animate({scrollTop:sectionOffset.top},"slow");
		}
		else{
			var sectionOffset = $('#confirmAddress').offset();			
			$("#driverCreateModal").animate({scrollTop:sectionOffset.top},"slow");	  
		}
		 
	}
	
	/**
	   * Show DateTimePicker onclick in jquery 
	* */	
		$(document).on('click', '#dobPicker', function(){
			var curDate = moment();
			$('#dobPicker').datetimepicker({
		                inline: true,
		                sideBySide: true,
		                ignoreReadonly: true,
		                allowInputToggle: true,
		                showClose : true,
		                defaultDate:curDate,
		                minDate:'1/1/1900',
		                maxDate: 'now',
		                format: 'DD/MM/YYYY'
		            }).on("dp.change",function (e) {
		            	//$scope.selectedDOB=e.date._i;		
		            	//$scope.driver.dob=$scope.selectedDOB;
		            });
			//startDateMinMaxError.style.display = 'none';
		}); 
		$(document).on('click', '#dobPickerUpdate', function(){
			var curDate = moment();
			$('#dobPickerUpdate').datetimepicker({
		                inline: true,
		                sideBySide: true,
		                ignoreReadonly: true,
		                allowInputToggle: true,
		                showClose : true,
		                defaultDate:curDate,
		                minDate:'1/1/1900',
		                maxDate: 'now',
		                format: 'DD/MM/YYYY'
		            }).on("dp.change",function (e) {
		            	//$scope.selectedDOB=e.date._i;		
		            	//$scope.driver.dob=$scope.selectedDOB;
		            });
			});
		
		/*to validate minor age for driver*/
		$scope.validateAge=function(){
		/*function validateAge(){*/		
			var dobOnCreate=document.getElementById("dobOnCreate").value;
			var dobOnUpdate=document.getElementById("dobOnUpate").value;
			if(dobOnCreate){
				birthDate = new Date(dobOnCreate);
			}
			else if(dobOnUpdate){
				birthDate = new Date(dobOnUpdate);
			}
			var today = new Date();
    	    var age = today.getFullYear() - birthDate.getFullYear();
    	    var m = today.getMonth() - birthDate.getMonth();
    	    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    	    	console.log(age--);
    	    }
    	    if(age<18){
    	    	$scope.minorAge=true;
    	    }
    	    else{
    	    	$scope.minorAge=false;
    	    }
    	    console.log($scope.driver.dob);
		}
		/*
		 *  forming languages array on selection and adding languages drop down
		 * */
		$scope.lang = ["Abkhaz","Afar","Afrikaans","Akan","Albanian","Amharic","Arabic","Aragonese","Armenian","Assamese","Avaric","Avestan","Aymara","Azerbaijani","Bambara","Bashkir","Basque","Belarusian","Bengali","Bihari","Bislama","Bosnian","Breton","Bulgarian","Burmese","Catalan; Valencian","Chamorro","Chechen","Chichewa; Chewa; Nyanja","Chinese","Chuvash","Cornish","Corsican","Cree","Croatian","Czech","Danish","Divehi; Dhivehi; Maldivian;","Dutch","English","Esperanto","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fula; Fulah; Pulaar; Pular","Galician","Georgian","German","Greek, Modern","GuaranÃƒÂ­","Gujarati","Haitian; Haitian Creole","Hausa","Hebrew (modern)","Herero","Hindi","Hiri Motu","Hungarian","Interlingua","Indonesian","Interlingue","Irish","Igbo","Inupiaq","Ido","Icelandic","Italian","Inuktitut","Japanese","Javanese","Kalaallisut, Greenlandic","Kannada","Kanuri","Kashmiri","Kazakh","Khmer","Kikuyu, Gikuyu","Kinyarwanda","Kirghiz, Kyrgyz","Komi","Kongo","Korean","Kurdish","Kwanyama, Kuanyama","Latin","Luxembourgish, Letzeburgesch","Luganda","Limburgish, Limburgan, Limburger","Lingala","Lao","Lithuanian","Luba-Katanga","Latvian","Manx","Macedonian","Malagasy","Malay","Malayalam","Maltese","MÃ„ï¿½ori","Marathi (MarÃ„ï¿½Ã¡Â¹Â­hÃ„Â«)","Marshallese","Mongolian","Nauru","Navajo, Navaho","Norwegian BokmÃƒÂ¥l","North Ndebele","Nepali","Ndonga","Norwegian Nynorsk","Norwegian","Nuosu","South Ndebele","Occitan","Ojibwe, Ojibwa","Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","Oromo","Oriya","Ossetian, Ossetic","Panjabi, Punjabi","PÃ„ï¿½li","Persian","Polish","Pashto, Pushto","Portuguese","Quechua","Romansh","Kirundi","Romanian, Moldavian, Moldovan","Russian","Sanskrit (SaÃ¡Â¹ï¿½skÃ¡Â¹â€ºta)","Sardinian","Sindhi","Northern Sami","Samoan","Sango","Serbian","Scottish Gaelic; Gaelic","Shona","Sinhala, Sinhalese","Slovak","Slovene","Somali","Southern Sotho","Spanish; Castilian","Sundanese","Swahili","Swati","Swedish","Tamil","Telugu","Tajik","Thai","Tigrinya","Tibetan Standard, Tibetan, Central","Turkmen","Tagalog","Tswana","Tonga (Tonga Islands)","Turkish","Tsonga","Tatar","Twi","Tahitian","Uighur, Uyghur","Ukrainian","Urdu","Uzbek","Venda","Vietnamese","VolapÃƒÂ¼k","Walloon","Welsh","Wolof","Western Frisian","Xhosa","Yiddish","Yoruba","Zhuang, Chuang"];
		$scope.langArray=[];
		$scope.formLanguageArray=function(){			
					$scope.langArray=$("#langSelect").select2("val");				
					$scope.driver.languages=$scope.langArray;				
		};
		$scope.formUpdateLanguageArray=function(){
			$scope.langArray=$("#updatelangSelect").select2("val");
			$scope.driver.languages=$scope.langArray;
		}
		/**
		 *  to trigger input type file on click of upload or update icon
		 * */
		$scope.triggerInput=function(){
			document.getElementById('imageInput').click();	
		}
		/**
		 *  ================================== upload image to url based on FORM DATA=====================================
		 * */
		$scope.uploadFile = function(files) {
			var filecheck=files[0].type;
			var filechkArray=filecheck.split("/");			
			if(filechkArray[0]=='image'){
				if(filechkArray[1]=='jpg' || filechkArray[1]=='gif'|| filechkArray[1]=='jpeg' || filechkArray[1]=='png'){
					$scope.onlyImage=false;
					$scope.onlyFiletype=false;
					$scope.imageUploading=true;
					if(files[0].size>0){
						var fd = new FormData();
						//Take the first selected file
						fd.append("drv", files[0]);

						$http.post(apiURL+"upload/image", fd, {
							withCredentials : false,
							headers : {
								'Content-Type' : undefined
							},
							transformRequest : angular.identity
						}).success(function(data) {
							$scope.imageUploading=false;
							console.log(data.data)
							$scope.imagepath=data.data;
							$scope.driver.image_src=data.data;
						}).error(function(data, status) {
							$scope.imageUploading=false;
							console.log(data);
							console.log(status);
							// console.log(data.err);
							if (data.err == "Expired Session") {
								$('#driverUpdateModal').modal('hide');
								$('#driverCreateModal').modal('hide');
								expiredSession();
								$localStorage.$reset();
							} else if (data.err == "Invalid User") {
								$('#driverUpdateModal').modal('hide');
								$('#driverCreateModal').modal('hide');
								invalidUser();
								$localStorage.$reset();
							}
							console.log(status);
							console.log(headers);
							console.log(config);
						});
					}		
				}
				else{
					$scope.onlyImage=false;
					$scope.onlyFiletype=true;
				}
			}
			else{
				$scope.onlyImage=true;	
				$scope.onlyFiletype=false;
			}		
		};
		/*
		 *  for loading country and state
		 * */
		
		/*$scope.granChoice=function(basedOn){
			if(basedOn.Item=="Permanent"){
				$scope.Permanent=true;
				$scope.Temporary=false;
				$scope.driver.etype="Permanent";
			}
			else if(basedOn.Item=="Temporary"){
				$scope.Permanent=false;
				$scope.Temporary=true;
				$scope.driver.etype="Temporary";
			}
		}*/
		
		
		
		var countries = ['India'];
		$scope.country = countries;
		/*$scope.state = [];*/

		$scope.countryindia = 
			  [{"id":"1","name":"Mumbai","state":"Maharashtra"},{"id":"2","name":"Delhi","state":"Delhi"},{"id":"3","name":"Bengaluru","state":"Karnataka"},{"id":"4","name":"Ahmedabad","state":"Gujarat"},{"id":"5","name":"Hyderabad","state":"Telangana"},{"id":"6","name":"Chennai","state":"Tamil Nadu"},{"id":"7","name":"Kolkata","state":"West Bengal"},{"id":"8","name":"Pune","state":"Maharashtra"},{"id":"9","name":"Jaipur","state":"Rajasthan"},{"id":"10","name":"Surat","state":"Gujarat"},{"id":"11","name":"Lucknow","state":"Uttar Pradesh"},{"id":"12","name":"Kanpur","state":"Uttar Pradesh"},{"id":"13","name":"Nagpur","state":"Maharashtra"},{"id":"14","name":"Patna","state":"Bihar"},{"id":"15","name":"Indore","state":"Madhya Pradesh"},{"id":"16","name":"Thane","state":"Maharashtra"},{"id":"17","name":"Bhopal","state":"Madhya Pradesh"},{"id":"18","name":"Visakhapatnam","state":"Andhra Pradesh"},{"id":"19","name":"Vadodara","state":"Gujarat"},{"id":"20","name":"Firozabad","state":"Uttar Pradesh"},{"id":"21","name":"Ludhiana","state":"Punjab"},{"id":"22","name":"Rajkot","state":"Gujarat"},{"id":"23","name":"Agra","state":"Uttar Pradesh"},{"id":"24","name":"Siliguri","state":"West Bengal"},{"id":"25","name":"Nashik","state":"Maharashtra"},{"id":"26","name":"Faridabad","state":"Haryana"},{"id":"27","name":"Patiala","state":"Punjab"},{"id":"28","name":"Meerut","state":"Uttar Pradesh"},{"id":"29","name":"Kalyan-Dombivali","state":"Maharashtra"},{"id":"30","name":"Vasai-Virar","state":"Maharashtra"},{"id":"31","name":"Varanasi","state":"Uttar Pradesh"},{"id":"32","name":"Srinagar","state":"Jammu and Kashmir"},{"id":"33","name":"Dhanbad","state":"Jharkhand"},{"id":"34","name":"Jodhpur","state":"Rajasthan"},{"id":"35","name":"Amritsar","state":"Punjab"},{"id":"36","name":"Raipur","state":"Chhattisgarh"},{"id":"37","name":"Allahabad","state":"Uttar Pradesh"},{"id":"38","name":"Coimbatore","state":"Tamil Nadu"},{"id":"39","name":"Jabalpur","state":"Madhya Pradesh"},{"id":"40","name":"Gwalior","state":"Madhya Pradesh"},{"id":"41","name":"Vijayawada","state":"Andhra Pradesh"},{"id":"42","name":"Madurai","state":"Tamil Nadu"},{"id":"43","name":"Guwahati","state":"Assam"},{"id":"44","name":"Chandigarh","state":"Chandigarh"},{"id":"45","name":"Hubli-Dharwad","state":"Karnataka"},{"id":"46","name":"Amroha","state":"Uttar Pradesh"},{"id":"47","name":"Moradabad","state":"Uttar Pradesh"},{"id":"48","name":"Gurgaon","state":"Haryana"},{"id":"49","name":"Aligarh","state":"Uttar Pradesh"},{"id":"50","name":"Solapur","state":"Maharashtra"},{"id":"51","name":"Ranchi","state":"Jharkhand"},{"id":"52","name":"Jalandhar","state":"Punjab"},{"id":"53","name":"Tiruchirappalli","state":"Tamil Nadu"},{"id":"54","name":"Bhubaneswar","state":"Odisha"},{"id":"55","name":"Salem","state":"Tamil Nadu"},{"id":"56","name":"Warangal","state":"Telangana"},{"id":"57","name":"Mira-Bhayandar","state":"Maharashtra"},{"id":"58","name":"Thiruvananthapuram","state":"Kerala"},{"id":"59","name":"Bhiwandi","state":"Maharashtra"},{"id":"60","name":"Saharanpur","state":"Uttar Pradesh"},{"id":"61","name":"Guntur","state":"Andhra Pradesh"},{"id":"62","name":"Amravati","state":"Maharashtra"},{"id":"63","name":"Bikaner","state":"Rajasthan"},{"id":"64","name":"Noida","state":"Uttar Pradesh"},{"id":"65","name":"Jamshedpur","state":"Jharkhand"},{"id":"66","name":"Bhilai Nagar","state":"Chhattisgarh"},{"id":"67","name":"Cuttack","state":"Odisha"},{"id":"68","name":"Kochi","state":"Kerala"},{"id":"69","name":"Udaipur","state":"Rajasthan"},{"id":"70","name":"Bhavnagar","state":"Gujarat"},{"id":"71","name":"Dehradun","state":"Uttarakhand"},{"id":"72","name":"Asansol","state":"West Bengal"},{"id":"73","name":"Nanded-Waghala","state":"Maharashtra"},{"id":"74","name":"Ajmer","state":"Rajasthan"},{"id":"75","name":"Jamnagar","state":"Gujarat"},{"id":"76","name":"Ujjain","state":"Madhya Pradesh"},{"id":"77","name":"Sangli","state":"Maharashtra"},{"id":"78","name":"Loni","state":"Uttar Pradesh"},{"id":"79","name":"Jhansi","state":"Uttar Pradesh"},{"id":"80","name":"Pondicherry","state":"Puducherry"},{"id":"81","name":"Nellore","state":"Andhra Pradesh"},{"id":"82","name":"Jammu","state":"Jammu and Kashmir"},{"id":"83","name":"Belagavi","state":"Karnataka"},{"id":"84","name":"Raurkela","state":"Odisha"},{"id":"85","name":"Mangaluru","state":"Karnataka"},{"id":"86","name":"Tirunelveli","state":"Tamil Nadu"},{"id":"87","name":"Malegaon","state":"Maharashtra"},{"id":"88","name":"Gaya","state":"Bihar"},{"id":"89","name":"Tiruppur","state":"Tamil Nadu"},{"id":"90","name":"Davanagere","state":"Karnataka"},{"id":"91","name":"Kozhikode","state":"Kerala"},{"id":"92","name":"Akola","state":"Maharashtra"},{"id":"93","name":"Kurnool","state":"Andhra Pradesh"},{"id":"94","name":"Bokaro Steel City","state":"Jharkhand"},{"id":"95","name":"Rajahmundry","state":"Andhra Pradesh"},{"id":"96","name":"Ballari","state":"Karnataka"},{"id":"97","name":"Agartala","state":"Tripura"},{"id":"98","name":"Bhagalpur","state":"Bihar"},{"id":"99","name":"Latur","state":"Maharashtra"},{"id":"100","name":"Dhule","state":"Maharashtra"},{"id":"101","name":"Korba","state":"Chhattisgarh"},{"id":"102","name":"Bhilwara","state":"Rajasthan"},{"id":"103","name":"Brahmapur","state":"Odisha"},{"id":"104","name":"Mysore","state":"Karnataka"},{"id":"105","name":"Muzaffarpur","state":"Bihar"},{"id":"106","name":"Ahmednagar","state":"Maharashtra"},{"id":"107","name":"Kollam","state":"Kerala"},{"id":"108","name":"Raghunathganj","state":"West Bengal"},{"id":"109","name":"Bilaspur","state":"Chhattisgarh"},{"id":"110","name":"Shahjahanpur","state":"Uttar Pradesh"},{"id":"111","name":"Thrissur","state":"Kerala"},{"id":"112","name":"Alwar","state":"Rajasthan"},{"id":"113","name":"Kakinada","state":"Andhra Pradesh"},{"id":"114","name":"Nizamabad","state":"Telangana"},{"id":"115","name":"Sagar","state":"Madhya Pradesh"},{"id":"116","name":"Tumkur","state":"Karnataka"},{"id":"117","name":"Hisar","state":"Haryana"},{"id":"118","name":"Rohtak","state":"Haryana"},{"id":"119","name":"Panipat","state":"Haryana"},{"id":"120","name":"Darbhanga","state":"Bihar"},{"id":"121","name":"Kharagpur","state":"West Bengal"},{"id":"122","name":"Aizawl","state":"Mizoram"},{"id":"123","name":"Ichalkaranji","state":"Maharashtra"},{"id":"124","name":"Tirupati","state":"Andhra Pradesh"},{"id":"125","name":"Karnal","state":"Haryana"},{"id":"126","name":"Bathinda","state":"Punjab"},{"id":"127","name":"Rampur","state":"Uttar Pradesh"},{"id":"128","name":"Shivamogga","state":"Karnataka"},{"id":"129","name":"Ratlam","state":"Madhya Pradesh"},{"id":"130","name":"Modinagar","state":"Uttar Pradesh"},{"id":"131","name":"Durg","state":"Chhattisgarh"},{"id":"132","name":"Shillong","state":"Meghalaya"},{"id":"133","name":"Imphal","state":"Manipur"},{"id":"134","name":"Hapur","state":"Uttar Pradesh"},{"id":"135","name":"Ranipet","state":"Tamil Nadu"},{"id":"136","name":"Anantapur","state":"Andhra Pradesh"},{"id":"137","name":"Arrah","state":"Bihar"},{"id":"138","name":"Karimnagar","state":"Telangana"},{"id":"139","name":"Parbhani","state":"Maharashtra"},{"id":"140","name":"Etawah","state":"Uttar Pradesh"},{"id":"141","name":"Bharatpur","state":"Rajasthan"},{"id":"142","name":"Begusarai","state":"Bihar"},{"id":"143","name":"New Delhi","state":"Delhi"},{"id":"144","name":"Chhapra","state":"Bihar"},{"id":"145","name":"Kadapa","state":"Andhra Pradesh"},{"id":"146","name":"Ramagundam","state":"Telangana"},{"id":"147","name":"Pali","state":"Rajasthan"},{"id":"148","name":"Satna","state":"Madhya Pradesh"},{"id":"149","name":"Vizianagaram","state":"Andhra Pradesh"},{"id":"150","name":"Katihar","state":"Bihar"},{"id":"151","name":"Hardwar","state":"Uttarakhand"},{"id":"152","name":"Sonipat","state":"Haryana"},{"id":"153","name":"Nagercoil","state":"Tamil Nadu"},{"id":"154","name":"Thanjavur","state":"Tamil Nadu"},{"id":"155","name":"Murwara (Katni)","state":"Madhya Pradesh"},{"id":"156","name":"Naihati","state":"West Bengal"},{"id":"157","name":"Sambhal","state":"Uttar Pradesh"},{"id":"158","name":"Nadiad","state":"Gujarat"},{"id":"159","name":"Yamunanagar","state":"Haryana"},{"id":"160","name":"English Bazar","state":"West Bengal"},{"id":"161","name":"Eluru","state":"Andhra Pradesh"},{"id":"162","name":"Munger","state":"Bihar"},{"id":"163","name":"Panchkula","state":"Haryana"},{"id":"164","name":"Raayachuru","state":"Karnataka"},{"id":"165","name":"Panvel","state":"Maharashtra"},{"id":"166","name":"Deoghar","state":"Jharkhand"},{"id":"167","name":"Ongole","state":"Andhra Pradesh"},{"id":"168","name":"Nandyal","state":"Andhra Pradesh"},{"id":"169","name":"Morena","state":"Madhya Pradesh"},{"id":"170","name":"Bhiwani","state":"Haryana"},{"id":"171","name":"Porbandar","state":"Gujarat"},{"id":"172","name":"Palakkad","state":"Kerala"},{"id":"173","name":"Anand","state":"Gujarat"},{"id":"174","name":"Purnia","state":"Bihar"},{"id":"175","name":"Baharampur","state":"West Bengal"},{"id":"176","name":"Barmer","state":"Rajasthan"},{"id":"177","name":"Morvi","state":"Gujarat"},{"id":"178","name":"Orai","state":"Uttar Pradesh"},{"id":"179","name":"Bahraich","state":"Uttar Pradesh"},{"id":"180","name":"Sikar","state":"Rajasthan"},{"id":"181","name":"Vellore","state":"Tamil Nadu"},{"id":"182","name":"Singrauli","state":"Madhya Pradesh"},{"id":"183","name":"Khammam","state":"Telangana"},{"id":"184","name":"Mahesana","state":"Gujarat"},{"id":"185","name":"Silchar","state":"Assam"},{"id":"186","name":"Sambalpur","state":"Odisha"},{"id":"187","name":"Rewa","state":"Madhya Pradesh"},{"id":"188","name":"Unnao","state":"Uttar Pradesh"},{"id":"189","name":"Hugli-Chinsurah","state":"West Bengal"},{"id":"190","name":"Raiganj","state":"West Bengal"},{"id":"191","name":"Phusro","state":"Jharkhand"},{"id":"192","name":"Adityapur","state":"Jharkhand"},{"id":"193","name":"Alappuzha","state":"Kerala"},{"id":"194","name":"Bahadurgarh","state":"Haryana"},{"id":"195","name":"Machilipatnam","state":"Andhra Pradesh"},{"id":"196","name":"Rae Bareli","state":"Uttar Pradesh"},{"id":"197","name":"Jalpaiguri","state":"West Bengal"},{"id":"198","name":"Bharuch","state":"Gujarat"},{"id":"199","name":"Pathankot","state":"Punjab"},{"id":"200","name":"Hoshiarpur","state":"Punjab"},{"id":"201","name":"Baramula","state":"Jammu and Kashmir"},{"id":"202","name":"Adoni","state":"Andhra Pradesh"},{"id":"203","name":"Jind","state":"Haryana"},{"id":"204","name":"Tonk","state":"Rajasthan"},{"id":"205","name":"Tenali","state":"Andhra Pradesh"},{"id":"206","name":"Kancheepuram","state":"Tamil Nadu"},{"id":"207","name":"Vapi","state":"Gujarat"},{"id":"208","name":"Sirsa","state":"Haryana"},{"id":"209","name":"Navsari","state":"Gujarat"},{"id":"210","name":"Mahbubnagar","state":"Telangana"},{"id":"211","name":"Puri","state":"Odisha"},{"id":"212","name":"Robertson Pet","state":"Karnataka"},{"id":"213","name":"Erode","state":"Tamil Nadu"},{"id":"214","name":"Batala","state":"Punjab"},{"id":"215","name":"Haldwani-cum-Kathgodam","state":"Uttarakhand"},{"id":"216","name":"Vidisha","state":"Madhya Pradesh"},{"id":"217","name":"Saharsa","state":"Bihar"},{"id":"218","name":"Thanesar","state":"Haryana"},{"id":"219","name":"Chittoor","state":"Andhra Pradesh"},{"id":"220","name":"Veraval","state":"Gujarat"},{"id":"221","name":"Lakhimpur","state":"Uttar Pradesh"},{"id":"222","name":"Sitapur","state":"Uttar Pradesh"},{"id":"223","name":"Hindupur","state":"Andhra Pradesh"},{"id":"224","name":"Santipur","state":"West Bengal"},{"id":"225","name":"Balurghat","state":"West Bengal"},{"id":"226","name":"Ganjbasoda","state":"Madhya Pradesh"},{"id":"227","name":"Moga","state":"Punjab"},{"id":"228","name":"Proddatur","state":"Andhra Pradesh"},{"id":"229","name":"Srinagar","state":"Uttarakhand"},{"id":"230","name":"Medinipur","state":"West Bengal"},{"id":"231","name":"Habra","state":"West Bengal"},{"id":"232","name":"Sasaram","state":"Bihar"},{"id":"233","name":"Hajipur","state":"Bihar"},{"id":"234","name":"Bhuj","state":"Gujarat"},{"id":"235","name":"Shivpuri","state":"Madhya Pradesh"},{"id":"236","name":"Ranaghat","state":"West Bengal"},{"id":"237","name":"Shimla","state":"Himachal Pradesh"},{"id":"238","name":"Tiruvannamalai","state":"Tamil Nadu"},{"id":"239","name":"Kaithal","state":"Haryana"},{"id":"240","name":"Rajnandgaon","state":"Chhattisgarh"},{"id":"241","name":"Godhra","state":"Gujarat"},{"id":"242","name":"Hazaribag","state":"Jharkhand"},{"id":"243","name":"Bhimavaram","state":"Andhra Pradesh"},{"id":"244","name":"Mandsaur","state":"Madhya Pradesh"},{"id":"245","name":"Dibrugarh","state":"Assam"},{"id":"246","name":"Kolar","state":"Karnataka"},{"id":"247","name":"Bankura","state":"West Bengal"},{"id":"248","name":"Mandya","state":"Karnataka"},{"id":"249","name":"Dehri-on-Sone","state":"Bihar"},{"id":"250","name":"Madanapalle","state":"Andhra Pradesh"},{"id":"251","name":"Malerkotla","state":"Punjab"},{"id":"252","name":"Lalitpur","state":"Uttar Pradesh"},{"id":"253","name":"Bettiah","state":"Bihar"},{"id":"254","name":"Pollachi","state":"Tamil Nadu"},{"id":"255","name":"Khanna","state":"Punjab"},{"id":"256","name":"Neemuch","state":"Madhya Pradesh"},{"id":"257","name":"Palwal","state":"Haryana"},{"id":"258","name":"Palanpur","state":"Gujarat"},{"id":"259","name":"Guntakal","state":"Andhra Pradesh"},{"id":"260","name":"Nabadwip","state":"West Bengal"},{"id":"261","name":"Udupi","state":"Karnataka"},{"id":"262","name":"Jagdalpur","state":"Chhattisgarh"},{"id":"263","name":"Motihari","state":"Bihar"},{"id":"264","name":"Pilibhit","state":"Uttar Pradesh"},{"id":"265","name":"Dimapur","state":"Nagaland"},{"id":"266","name":"Mohali","state":"Punjab"},{"id":"267","name":"Sadulpur","state":"Rajasthan"},{"id":"268","name":"Rajapalayam","state":"Tamil Nadu"},{"id":"269","name":"Dharmavaram","state":"Andhra Pradesh"},{"id":"270","name":"Kashipur","state":"Uttarakhand"},{"id":"271","name":"Sivakasi","state":"Tamil Nadu"},{"id":"272","name":"Darjiling","state":"West Bengal"},{"id":"273","name":"Chikkamagaluru","state":"Karnataka"},{"id":"274","name":"Gudivada","state":"Andhra Pradesh"},{"id":"275","name":"Baleshwar Town","state":"Odisha"},{"id":"276","name":"Mancherial","state":"Telangana"},{"id":"277","name":"Srikakulam","state":"Andhra Pradesh"},{"id":"278","name":"Adilabad","state":"Telangana"},{"id":"279","name":"Yavatmal","state":"Maharashtra"},{"id":"280","name":"Barnala","state":"Punjab"},{"id":"281","name":"Nagaon","state":"Assam"},{"id":"282","name":"Narasaraopet","state":"Andhra Pradesh"},{"id":"283","name":"Raigarh","state":"Chhattisgarh"},{"id":"284","name":"Roorkee","state":"Uttarakhand"},{"id":"285","name":"Valsad","state":"Gujarat"},{"id":"286","name":"Ambikapur","state":"Chhattisgarh"},{"id":"287","name":"Giridih","state":"Jharkhand"},{"id":"288","name":"Chandausi","state":"Uttar Pradesh"},{"id":"289","name":"Purulia","state":"West Bengal"},{"id":"290","name":"Patan","state":"Gujarat"},{"id":"291","name":"Bagaha","state":"Bihar"},{"id":"292","name":"Hardoi ","state":"Uttar Pradesh"},{"id":"293","name":"Achalpur","state":"Maharashtra"},{"id":"294","name":"Osmanabad","state":"Maharashtra"},{"id":"295","name":"Deesa","state":"Gujarat"},{"id":"296","name":"Nandurbar","state":"Maharashtra"},{"id":"297","name":"Azamgarh","state":"Uttar Pradesh"},{"id":"298","name":"Ramgarh","state":"Jharkhand"},{"id":"299","name":"Firozpur","state":"Punjab"},{"id":"300","name":"Baripada Town","state":"Odisha"},{"id":"301","name":"Karwar","state":"Karnataka"},{"id":"302","name":"Siwan","state":"Bihar"},{"id":"303","name":"Rajampet","state":"Andhra Pradesh"},{"id":"304","name":"Pudukkottai","state":"Tamil Nadu"},{"id":"305","name":"Anantnag","state":"Jammu and Kashmir"},{"id":"306","name":"Tadpatri","state":"Andhra Pradesh"},{"id":"307","name":"Satara","state":"Maharashtra"},{"id":"308","name":"Bhadrak","state":"Odisha"},{"id":"309","name":"Kishanganj","state":"Bihar"},{"id":"310","name":"Suryapet","state":"Telangana"},{"id":"311","name":"Wardha","state":"Maharashtra"},{"id":"312","name":"Ranebennuru","state":"Karnataka"},{"id":"313","name":"Amreli","state":"Gujarat"},{"id":"314","name":"Neyveli (TS)","state":"Tamil Nadu"},{"id":"315","name":"Jamalpur","state":"Bihar"},{"id":"316","name":"Marmagao","state":"Goa"},{"id":"317","name":"Udgir","state":"Maharashtra"},{"id":"318","name":"Tadepalligudem","state":"Andhra Pradesh"},{"id":"319","name":"Nagapattinam","state":"Tamil Nadu"},{"id":"320","name":"Buxar","state":"Bihar"},{"id":"321","name":"Aurangabad","state":"Maharashtra"},{"id":"322","name":"Jehanabad","state":"Bihar"},{"id":"323","name":"Phagwara","state":"Punjab"},{"id":"324","name":"Khair","state":"Uttar Pradesh"},{"id":"325","name":"Sawai Madhopur","state":"Rajasthan"},{"id":"326","name":"Kapurthala","state":"Punjab"},{"id":"327","name":"Chilakaluripet","state":"Andhra Pradesh"},{"id":"328","name":"Aurangabad","state":"Bihar"},{"id":"329","name":"Malappuram","state":"Kerala"},{"id":"330","name":"Rewari","state":"Haryana"},{"id":"331","name":"Nagaur","state":"Rajasthan"},{"id":"332","name":"Sultanpur","state":"Uttar Pradesh"},{"id":"333","name":"Nagda","state":"Madhya Pradesh"},{"id":"334","name":"Port Blair","state":"Andaman and Nicobar Islands"},{"id":"335","name":"Lakhisarai","state":"Bihar"},{"id":"336","name":"Panaji","state":"Goa"},{"id":"337","name":"Tinsukia","state":"Assam"},{"id":"338","name":"Itarsi","state":"Madhya Pradesh"},{"id":"339","name":"Kohima","state":"Nagaland"},{"id":"340","name":"Balangir","state":"Odisha"},{"id":"341","name":"Nawada","state":"Bihar"},{"id":"342","name":"Jharsuguda","state":"Odisha"},{"id":"343","name":"Jagtial","state":"Telangana"},{"id":"344","name":"Viluppuram","state":"Tamil Nadu"},{"id":"345","name":"Amalner","state":"Maharashtra"},{"id":"346","name":"Zirakpur","state":"Punjab"},{"id":"347","name":"Tanda","state":"Uttar Pradesh"},{"id":"348","name":"Tiruchengode","state":"Tamil Nadu"},{"id":"349","name":"Nagina","state":"Uttar Pradesh"},{"id":"350","name":"Yemmiganur","state":"Andhra Pradesh"},{"id":"351","name":"Vaniyambadi","state":"Tamil Nadu"},{"id":"352","name":"Sarni","state":"Madhya Pradesh"},{"id":"353","name":"Theni Allinagaram","state":"Tamil Nadu"},{"id":"354","name":"Margao","state":"Goa"},{"id":"355","name":"Akot","state":"Maharashtra"},{"id":"356","name":"Sehore","state":"Madhya Pradesh"},{"id":"357","name":"Mhow Cantonment","state":"Madhya Pradesh"},{"id":"358","name":"Kot Kapura","state":"Punjab"},{"id":"359","name":"Makrana","state":"Rajasthan"},{"id":"360","name":"Pandharpur","state":"Maharashtra"},{"id":"361","name":"Miryalaguda","state":"Telangana"},{"id":"362","name":"Shamli","state":"Uttar Pradesh"},{"id":"363","name":"Seoni","state":"Madhya Pradesh"},{"id":"364","name":"Ranibennur","state":"Karnataka"},{"id":"365","name":"Kadiri","state":"Andhra Pradesh"},{"id":"366","name":"Shrirampur","state":"Maharashtra"},{"id":"367","name":"Rudrapur","state":"Uttarakhand"},{"id":"368","name":"Parli","state":"Maharashtra"},{"id":"369","name":"Najibabad","state":"Uttar Pradesh"},{"id":"370","name":"Nirmal","state":"Telangana"},{"id":"371","name":"Udhagamandalam","state":"Tamil Nadu"},{"id":"372","name":"Shikohabad","state":"Uttar Pradesh"},{"id":"373","name":"Jhumri Tilaiya","state":"Jharkhand"},{"id":"374","name":"Aruppukkottai","state":"Tamil Nadu"},{"id":"375","name":"Ponnani","state":"Kerala"},{"id":"376","name":"Jamui","state":"Bihar"},{"id":"377","name":"Sitamarhi","state":"Bihar"},{"id":"378","name":"Chirala","state":"Andhra Pradesh"},{"id":"379","name":"Anjar","state":"Gujarat"},{"id":"380","name":"Karaikal","state":"Puducherry"},{"id":"381","name":"Hansi","state":"Haryana"},{"id":"382","name":"Anakapalle","state":"Andhra Pradesh"},{"id":"383","name":"Mahasamund","state":"Chhattisgarh"},{"id":"384","name":"Faridkot","state":"Punjab"},{"id":"385","name":"Saunda","state":"Jharkhand"},{"id":"386","name":"Dhoraji","state":"Gujarat"},{"id":"387","name":"Paramakudi","state":"Tamil Nadu"},{"id":"388","name":"Balaghat","state":"Madhya Pradesh"},{"id":"389","name":"Sujangarh","state":"Rajasthan"},{"id":"390","name":"Khambhat","state":"Gujarat"},{"id":"391","name":"Muktsar","state":"Punjab"},{"id":"392","name":"Rajpura","state":"Punjab"},{"id":"393","name":"Kavali","state":"Andhra Pradesh"},{"id":"394","name":"Dhamtari","state":"Chhattisgarh"},{"id":"395","name":"Ashok Nagar","state":"Madhya Pradesh"},{"id":"396","name":"Sardarshahar","state":"Rajasthan"},{"id":"397","name":"Mahuva","state":"Gujarat"},{"id":"398","name":"Bargarh","state":"Odisha"},{"id":"399","name":"Kamareddy","state":"Telangana"},{"id":"400","name":"Sahibganj","state":"Jharkhand"},{"id":"401","name":"Kothagudem","state":"Telangana"},{"id":"402","name":"Ramanagaram","state":"Karnataka"},{"id":"403","name":"Gokak","state":"Karnataka"},{"id":"404","name":"Tikamgarh","state":"Madhya Pradesh"},{"id":"405","name":"Araria","state":"Bihar"},{"id":"406","name":"Rishikesh","state":"Uttarakhand"},{"id":"407","name":"Shahdol","state":"Madhya Pradesh"},{"id":"408","name":"Medininagar (Daltonganj)","state":"Jharkhand"},{"id":"409","name":"Arakkonam","state":"Tamil Nadu"},{"id":"410","name":"Washim","state":"Maharashtra"},{"id":"411","name":"Sangrur","state":"Punjab"},{"id":"412","name":"Bodhan","state":"Telangana"},{"id":"413","name":"Fazilka","state":"Punjab"},{"id":"414","name":"Palacole","state":"Andhra Pradesh"},{"id":"415","name":"Keshod","state":"Gujarat"},{"id":"416","name":"Sullurpeta","state":"Andhra Pradesh"},{"id":"417","name":"Wadhwan","state":"Gujarat"},{"id":"418","name":"Gurdaspur","state":"Punjab"},{"id":"419","name":"Vatakara","state":"Kerala"},{"id":"420","name":"Tura","state":"Meghalaya"},{"id":"421","name":"Narnaul","state":"Haryana"},{"id":"422","name":"Kharar","state":"Punjab"},{"id":"423","name":"Yadgir","state":"Karnataka"},{"id":"424","name":"Ambejogai","state":"Maharashtra"},{"id":"425","name":"Ankleshwar","state":"Gujarat"},{"id":"426","name":"Savarkundla","state":"Gujarat"},{"id":"427","name":"Paradip","state":"Odisha"},{"id":"428","name":"Virudhachalam","state":"Tamil Nadu"},{"id":"429","name":"Kanhangad","state":"Kerala"},{"id":"430","name":"Kadi","state":"Gujarat"},{"id":"431","name":"Srivilliputhur","state":"Tamil Nadu"},{"id":"432","name":"Gobindgarh","state":"Punjab"},{"id":"433","name":"Tindivanam","state":"Tamil Nadu"},{"id":"434","name":"Mansa","state":"Punjab"},{"id":"435","name":"Taliparamba","state":"Kerala"},{"id":"436","name":"Manmad","state":"Maharashtra"},{"id":"437","name":"Tanuku","state":"Andhra Pradesh"},{"id":"438","name":"Rayachoti","state":"Andhra Pradesh"},{"id":"439","name":"Virudhunagar","state":"Tamil Nadu"},{"id":"440","name":"Koyilandy","state":"Kerala"},{"id":"441","name":"Jorhat","state":"Assam"},{"id":"442","name":"Karur","state":"Tamil Nadu"},{"id":"443","name":"Valparai","state":"Tamil Nadu"},{"id":"444","name":"Srikalahasti","state":"Andhra Pradesh"},{"id":"445","name":"Neyyattinkara","state":"Kerala"},{"id":"446","name":"Bapatla","state":"Andhra Pradesh"},{"id":"447","name":"Fatehabad","state":"Haryana"},{"id":"448","name":"Malout","state":"Punjab"},{"id":"449","name":"Sankarankovil","state":"Tamil Nadu"},{"id":"450","name":"Tenkasi","state":"Tamil Nadu"},{"id":"451","name":"Ratnagiri","state":"Maharashtra"},{"id":"452","name":"Rabkavi Banhatti","state":"Karnataka"},{"id":"453","name":"Sikandrabad","state":"Uttar Pradesh"},{"id":"454","name":"Chaibasa","state":"Jharkhand"},{"id":"455","name":"Chirmiri","state":"Chhattisgarh"},{"id":"456","name":"Palwancha","state":"Telangana"},{"id":"457","name":"Bhawanipatna","state":"Odisha"},{"id":"458","name":"Kayamkulam","state":"Kerala"},{"id":"459","name":"Pithampur","state":"Madhya Pradesh"},{"id":"460","name":"Nabha","state":"Punjab"},{"id":"461","name":"Shahabad, Hardoi","state":"Uttar Pradesh"},{"id":"462","name":"Dhenkanal","state":"Odisha"},{"id":"463","name":"Uran Islampur","state":"Maharashtra"},{"id":"464","name":"Gopalganj","state":"Bihar"},{"id":"465","name":"Bongaigaon City","state":"Assam"},{"id":"466","name":"Palani","state":"Tamil Nadu"},{"id":"467","name":"Pusad","state":"Maharashtra"},{"id":"468","name":"Sopore","state":"Jammu and Kashmir"},{"id":"469","name":"Pilkhuwa","state":"Uttar Pradesh"},{"id":"470","name":"Tarn Taran","state":"Punjab"},{"id":"471","name":"Renukoot","state":"Uttar Pradesh"},{"id":"472","name":"Mandamarri","state":"Telangana"},{"id":"473","name":"Shahabad","state":"Karnataka"},{"id":"474","name":"Barbil","state":"Odisha"},{"id":"475","name":"Koratla","state":"Telangana"},{"id":"476","name":"Madhubani","state":"Bihar"},{"id":"477","name":"Arambagh","state":"West Bengal"},{"id":"478","name":"Gohana","state":"Haryana"},{"id":"479","name":"Ladnu","state":"Rajasthan"},{"id":"480","name":"Pattukkottai","state":"Tamil Nadu"},{"id":"481","name":"Sirsi","state":"Karnataka"},{"id":"482","name":"Sircilla","state":"Telangana"},{"id":"483","name":"Tamluk","state":"West Bengal"},{"id":"484","name":"Jagraon","state":"Punjab"},{"id":"485","name":"AlipurdUrban Agglomerationr","state":"West Bengal"},{"id":"486","name":"Alirajpur","state":"Madhya Pradesh"},{"id":"487","name":"Tandur","state":"Telangana"},{"id":"488","name":"Naidupet","state":"Andhra Pradesh"},{"id":"489","name":"Tirupathur","state":"Tamil Nadu"},{"id":"490","name":"Tohana","state":"Haryana"},{"id":"491","name":"Ratangarh","state":"Rajasthan"},{"id":"492","name":"Dhubri","state":"Assam"},{"id":"493","name":"Masaurhi","state":"Bihar"},{"id":"494","name":"Visnagar","state":"Gujarat"},{"id":"495","name":"Vrindavan","state":"Uttar Pradesh"},{"id":"496","name":"Nokha","state":"Rajasthan"},{"id":"497","name":"Nagari","state":"Andhra Pradesh"},{"id":"498","name":"Narwana","state":"Haryana"},{"id":"499","name":"Ramanathapuram","state":"Tamil Nadu"},{"id":"500","name":"Ujhani","state":"Uttar Pradesh"},{"id":"501","name":"Samastipur","state":"Bihar"},{"id":"502","name":"Laharpur","state":"Uttar Pradesh"},{"id":"503","name":"Sangamner","state":"Maharashtra"},{"id":"504","name":"Nimbahera","state":"Rajasthan"},{"id":"505","name":"Siddipet","state":"Telangana"},{"id":"506","name":"Suri","state":"West Bengal"},{"id":"507","name":"Diphu","state":"Assam"},{"id":"508","name":"Jhargram","state":"West Bengal"},{"id":"509","name":"Shirpur-Warwade","state":"Maharashtra"},{"id":"510","name":"Tilhar","state":"Uttar Pradesh"},{"id":"511","name":"Sindhnur","state":"Karnataka"},{"id":"512","name":"Udumalaipettai","state":"Tamil Nadu"},{"id":"513","name":"Malkapur","state":"Maharashtra"},{"id":"514","name":"Wanaparthy","state":"Telangana"},{"id":"515","name":"Gudur","state":"Andhra Pradesh"},{"id":"516","name":"Kendujhar","state":"Odisha"},{"id":"517","name":"Mandla","state":"Madhya Pradesh"},{"id":"518","name":"Mandi","state":"Himachal Pradesh"},{"id":"519","name":"Nedumangad","state":"Kerala"},{"id":"520","name":"North Lakhimpur","state":"Assam"},{"id":"521","name":"Vinukonda","state":"Andhra Pradesh"},{"id":"522","name":"Tiptur","state":"Karnataka"},{"id":"523","name":"Gobichettipalayam","state":"Tamil Nadu"},{"id":"524","name":"Sunabeda","state":"Odisha"},{"id":"525","name":"Wani","state":"Maharashtra"},{"id":"526","name":"Upleta","state":"Gujarat"},{"id":"527","name":"Narasapuram","state":"Andhra Pradesh"},{"id":"528","name":"Nuzvid","state":"Andhra Pradesh"},{"id":"529","name":"Tezpur","state":"Assam"},{"id":"530","name":"Una","state":"Gujarat"},{"id":"531","name":"Markapur","state":"Andhra Pradesh"},{"id":"532","name":"Sheopur","state":"Madhya Pradesh"},{"id":"533","name":"Thiruvarur","state":"Tamil Nadu"},{"id":"534","name":"Sidhpur","state":"Gujarat"},{"id":"535","name":"Sahaswan","state":"Uttar Pradesh"},{"id":"536","name":"Suratgarh","state":"Rajasthan"},{"id":"537","name":"Shajapur","state":"Madhya Pradesh"},{"id":"538","name":"Rayagada","state":"Odisha"},{"id":"539","name":"Lonavla","state":"Maharashtra"},{"id":"540","name":"Ponnur","state":"Andhra Pradesh"},{"id":"541","name":"Kagaznagar","state":"Telangana"},{"id":"542","name":"Gadwal","state":"Telangana"},{"id":"543","name":"Bhatapara","state":"Chhattisgarh"},{"id":"544","name":"Kandukur","state":"Andhra Pradesh"},{"id":"545","name":"Sangareddy","state":"Telangana"},{"id":"546","name":"Unjha","state":"Gujarat"},{"id":"547","name":"Lunglei","state":"Mizoram"},{"id":"548","name":"Karimganj","state":"Assam"},{"id":"549","name":"Kannur","state":"Kerala"},{"id":"550","name":"Bobbili","state":"Andhra Pradesh"},{"id":"551","name":"Mokameh","state":"Bihar"},{"id":"552","name":"Talegaon Dabhade","state":"Maharashtra"},{"id":"553","name":"Anjangaon","state":"Maharashtra"},{"id":"554","name":"Mangrol","state":"Gujarat"},{"id":"555","name":"Sunam","state":"Punjab"},{"id":"556","name":"Gangarampur","state":"West Bengal"},{"id":"557","name":"Thiruvallur","state":"Tamil Nadu"},{"id":"558","name":"Tirur","state":"Kerala"},{"id":"559","name":"Rath","state":"Uttar Pradesh"},{"id":"560","name":"Jatani","state":"Odisha"},{"id":"561","name":"Viramgam","state":"Gujarat"},{"id":"562","name":"Rajsamand","state":"Rajasthan"},{"id":"563","name":"Yanam","state":"Puducherry"},{"id":"564","name":"Kottayam","state":"Kerala"},{"id":"565","name":"Panruti","state":"Tamil Nadu"},{"id":"566","name":"Dhuri","state":"Punjab"},{"id":"567","name":"Namakkal","state":"Tamil Nadu"},{"id":"568","name":"Kasaragod","state":"Kerala"},{"id":"569","name":"Modasa","state":"Gujarat"},{"id":"570","name":"Rayadurg","state":"Andhra Pradesh"},{"id":"571","name":"Supaul","state":"Bihar"},{"id":"572","name":"Kunnamkulam","state":"Kerala"},{"id":"573","name":"Umred","state":"Maharashtra"},{"id":"574","name":"Bellampalle","state":"Telangana"},{"id":"575","name":"Sibsagar","state":"Assam"},{"id":"576","name":"Mandi Dabwali","state":"Haryana"},{"id":"577","name":"Ottappalam","state":"Kerala"},{"id":"578","name":"Dumraon","state":"Bihar"},{"id":"579","name":"Samalkot","state":"Andhra Pradesh"},{"id":"580","name":"Jaggaiahpet","state":"Andhra Pradesh"},{"id":"581","name":"Goalpara","state":"Assam"},{"id":"582","name":"Tuni","state":"Andhra Pradesh"},{"id":"583","name":"Lachhmangarh","state":"Rajasthan"},{"id":"584","name":"Bhongir","state":"Telangana"},{"id":"585","name":"Amalapuram","state":"Andhra Pradesh"},{"id":"586","name":"Firozpur Cantt.","state":"Punjab"},{"id":"587","name":"Vikarabad","state":"Telangana"},{"id":"588","name":"Thiruvalla","state":"Kerala"},{"id":"589","name":"Sherkot","state":"Uttar Pradesh"},{"id":"590","name":"Palghar","state":"Maharashtra"},{"id":"591","name":"Shegaon","state":"Maharashtra"},{"id":"592","name":"Jangaon","state":"Telangana"},{"id":"593","name":"Bheemunipatnam","state":"Andhra Pradesh"},{"id":"594","name":"Panna","state":"Madhya Pradesh"},{"id":"595","name":"Thodupuzha","state":"Kerala"},{"id":"596","name":"KathUrban Agglomeration","state":"Jammu and Kashmir"},{"id":"597","name":"Palitana","state":"Gujarat"},{"id":"598","name":"Arwal","state":"Bihar"},{"id":"599","name":"Venkatagiri","state":"Andhra Pradesh"},{"id":"600","name":"Kalpi","state":"Uttar Pradesh"},{"id":"601","name":"Rajgarh (Churu)","state":"Rajasthan"},{"id":"602","name":"Sattenapalle","state":"Andhra Pradesh"},{"id":"603","name":"Arsikere","state":"Karnataka"},{"id":"604","name":"Ozar","state":"Maharashtra"},{"id":"605","name":"Thirumangalam","state":"Tamil Nadu"},{"id":"606","name":"Petlad","state":"Gujarat"},{"id":"607","name":"Nasirabad","state":"Rajasthan"},{"id":"608","name":"Phaltan","state":"Maharashtra"},{"id":"609","name":"Rampurhat","state":"West Bengal"},{"id":"610","name":"Nanjangud","state":"Karnataka"},{"id":"611","name":"Forbesganj","state":"Bihar"},{"id":"612","name":"Tundla","state":"Uttar Pradesh"},{"id":"613","name":"BhabUrban Agglomeration","state":"Bihar"},{"id":"614","name":"Sagara","state":"Karnataka"},{"id":"615","name":"Pithapuram","state":"Andhra Pradesh"},{"id":"616","name":"Sira","state":"Karnataka"},{"id":"617","name":"Bhadrachalam","state":"Telangana"},{"id":"618","name":"Charkhi Dadri","state":"Haryana"},{"id":"619","name":"Chatra","state":"Jharkhand"},{"id":"620","name":"Palasa Kasibugga","state":"Andhra Pradesh"},{"id":"621","name":"Nohar","state":"Rajasthan"},{"id":"622","name":"Yevla","state":"Maharashtra"},{"id":"623","name":"Sirhind Fatehgarh Sahib","state":"Punjab"},{"id":"624","name":"Bhainsa","state":"Telangana"},{"id":"625","name":"Parvathipuram","state":"Andhra Pradesh"},{"id":"626","name":"Shahade","state":"Maharashtra"},{"id":"627","name":"Chalakudy","state":"Kerala"},{"id":"628","name":"Narkatiaganj","state":"Bihar"},{"id":"629","name":"Kapadvanj","state":"Gujarat"},{"id":"630","name":"Macherla","state":"Andhra Pradesh"},{"id":"631","name":"Raghogarh-Vijaypur","state":"Madhya Pradesh"},{"id":"632","name":"Rupnagar","state":"Punjab"},{"id":"633","name":"Naugachhia","state":"Bihar"},{"id":"634","name":"Sendhwa","state":"Madhya Pradesh"},{"id":"635","name":"Byasanagar","state":"Odisha"},{"id":"636","name":"Sandila","state":"Uttar Pradesh"},{"id":"637","name":"Gooty","state":"Andhra Pradesh"},{"id":"638","name":"Salur","state":"Andhra Pradesh"},{"id":"639","name":"Nanpara","state":"Uttar Pradesh"},{"id":"640","name":"Sardhana","state":"Uttar Pradesh"},{"id":"641","name":"Vita","state":"Maharashtra"},{"id":"642","name":"Gumia","state":"Jharkhand"},{"id":"643","name":"Puttur","state":"Karnataka"},{"id":"644","name":"Jalandhar Cantt.","state":"Punjab"},{"id":"645","name":"Nehtaur","state":"Uttar Pradesh"},{"id":"646","name":"Changanassery","state":"Kerala"},{"id":"647","name":"Mandapeta","state":"Andhra Pradesh"},{"id":"648","name":"Dumka","state":"Jharkhand"},{"id":"649","name":"Seohara","state":"Uttar Pradesh"},{"id":"650","name":"Umarkhed","state":"Maharashtra"},{"id":"651","name":"Madhupur","state":"Jharkhand"},{"id":"652","name":"Vikramasingapuram","state":"Tamil Nadu"},{"id":"653","name":"Punalur","state":"Kerala"},{"id":"654","name":"Kendrapara","state":"Odisha"},{"id":"655","name":"Sihor","state":"Gujarat"},{"id":"656","name":"Nellikuppam","state":"Tamil Nadu"},{"id":"657","name":"Samana","state":"Punjab"},{"id":"658","name":"Warora","state":"Maharashtra"},{"id":"659","name":"Nilambur","state":"Kerala"},{"id":"660","name":"Rasipuram","state":"Tamil Nadu"},{"id":"661","name":"Ramnagar","state":"Uttarakhand"},{"id":"662","name":"Jammalamadugu","state":"Andhra Pradesh"},{"id":"663","name":"Nawanshahr","state":"Punjab"},{"id":"664","name":"Thoubal","state":"Manipur"},{"id":"665","name":"Athni","state":"Karnataka"},{"id":"666","name":"Cherthala","state":"Kerala"},{"id":"667","name":"Sidhi","state":"Madhya Pradesh"},{"id":"668","name":"Farooqnagar","state":"Telangana"},{"id":"669","name":"Peddapuram","state":"Andhra Pradesh"},{"id":"670","name":"Chirkunda","state":"Jharkhand"},{"id":"671","name":"Pachora","state":"Maharashtra"},{"id":"672","name":"Madhepura","state":"Bihar"},{"id":"673","name":"Pithoragarh","state":"Uttarakhand"},{"id":"674","name":"Tumsar","state":"Maharashtra"},{"id":"675","name":"Phalodi","state":"Rajasthan"},{"id":"676","name":"Tiruttani","state":"Tamil Nadu"},{"id":"677","name":"Rampura Phul","state":"Punjab"},{"id":"678","name":"Perinthalmanna","state":"Kerala"},{"id":"679","name":"Padrauna","state":"Uttar Pradesh"},{"id":"680","name":"Pipariya","state":"Madhya Pradesh"},{"id":"681","name":"Dalli-Rajhara","state":"Chhattisgarh"},{"id":"682","name":"Punganur","state":"Andhra Pradesh"},{"id":"683","name":"Mattannur","state":"Kerala"},{"id":"684","name":"Mathura","state":"Uttar Pradesh"},{"id":"685","name":"Thakurdwara","state":"Uttar Pradesh"},{"id":"686","name":"Nandivaram-Guduvancheri","state":"Tamil Nadu"},{"id":"687","name":"Mulbagal","state":"Karnataka"},{"id":"688","name":"Manjlegaon","state":"Maharashtra"},{"id":"689","name":"Wankaner","state":"Gujarat"},{"id":"690","name":"Sillod","state":"Maharashtra"},{"id":"691","name":"Nidadavole","state":"Andhra Pradesh"},{"id":"692","name":"Surapura","state":"Karnataka"},{"id":"693","name":"Rajagangapur","state":"Odisha"},{"id":"694","name":"Sheikhpura","state":"Bihar"},{"id":"695","name":"Parlakhemundi","state":"Odisha"},{"id":"696","name":"Kalimpong","state":"West Bengal"},{"id":"697","name":"Siruguppa","state":"Karnataka"},{"id":"698","name":"Arvi","state":"Maharashtra"},{"id":"699","name":"Limbdi","state":"Gujarat"},{"id":"700","name":"Barpeta","state":"Assam"},{"id":"701","name":"Manglaur","state":"Uttarakhand"},{"id":"702","name":"Repalle","state":"Andhra Pradesh"},{"id":"703","name":"Mudhol","state":"Karnataka"},{"id":"704","name":"Shujalpur","state":"Madhya Pradesh"},{"id":"705","name":"Mandvi","state":"Gujarat"},{"id":"706","name":"Thangadh","state":"Gujarat"},{"id":"707","name":"Sironj","state":"Madhya Pradesh"},{"id":"708","name":"Nandura","state":"Maharashtra"},{"id":"709","name":"Shoranur","state":"Kerala"},{"id":"710","name":"Nathdwara","state":"Rajasthan"},{"id":"711","name":"Periyakulam","state":"Tamil Nadu"},{"id":"712","name":"Sultanganj","state":"Bihar"},{"id":"713","name":"Medak","state":"Telangana"},{"id":"714","name":"Narayanpet","state":"Telangana"},{"id":"715","name":"Raxaul Bazar","state":"Bihar"},{"id":"716","name":"Rajauri","state":"Jammu and Kashmir"},{"id":"717","name":"Pernampattu","state":"Tamil Nadu"},{"id":"718","name":"Nainital","state":"Uttarakhand"},{"id":"719","name":"Ramachandrapuram","state":"Andhra Pradesh"},{"id":"720","name":"Vaijapur","state":"Maharashtra"},{"id":"721","name":"Nangal","state":"Punjab"},{"id":"722","name":"Sidlaghatta","state":"Karnataka"},{"id":"723","name":"Punch","state":"Jammu and Kashmir"},{"id":"724","name":"Pandhurna","state":"Madhya Pradesh"},{"id":"725","name":"Wadgaon Road","state":"Maharashtra"},{"id":"726","name":"Talcher","state":"Odisha"},{"id":"727","name":"Varkala","state":"Kerala"},{"id":"728","name":"Pilani","state":"Rajasthan"},{"id":"729","name":"Nowgong","state":"Madhya Pradesh"},{"id":"730","name":"Naila Janjgir","state":"Chhattisgarh"},{"id":"731","name":"Mapusa","state":"Goa"},{"id":"732","name":"Vellakoil","state":"Tamil Nadu"},{"id":"733","name":"Merta City","state":"Rajasthan"},{"id":"734","name":"Sivaganga","state":"Tamil Nadu"},{"id":"735","name":"Mandideep","state":"Madhya Pradesh"},{"id":"736","name":"Sailu","state":"Maharashtra"},{"id":"737","name":"Vyara","state":"Gujarat"},{"id":"738","name":"Kovvur","state":"Andhra Pradesh"},{"id":"739","name":"Vadalur","state":"Tamil Nadu"},{"id":"740","name":"Nawabganj","state":"Uttar Pradesh"},{"id":"741","name":"Padra","state":"Gujarat"},{"id":"742","name":"Sainthia","state":"West Bengal"},{"id":"743","name":"Siana","state":"Uttar Pradesh"},{"id":"744","name":"Shahpur","state":"Karnataka"},{"id":"745","name":"Sojat","state":"Rajasthan"},{"id":"746","name":"Noorpur","state":"Uttar Pradesh"},{"id":"747","name":"Paravoor","state":"Kerala"},{"id":"748","name":"Murtijapur","state":"Maharashtra"},{"id":"749","name":"Ramnagar","state":"Bihar"},{"id":"750","name":"Sundargarh","state":"Odisha"},{"id":"751","name":"Taki","state":"West Bengal"},{"id":"752","name":"Saundatti-Yellamma","state":"Karnataka"},{"id":"753","name":"Pathanamthitta","state":"Kerala"},{"id":"754","name":"Wadi","state":"Karnataka"},{"id":"755","name":"Rameshwaram","state":"Tamil Nadu"},{"id":"756","name":"Tasgaon","state":"Maharashtra"},{"id":"757","name":"Sikandra Rao","state":"Uttar Pradesh"},{"id":"758","name":"Sihora","state":"Madhya Pradesh"},{"id":"759","name":"Tiruvethipuram","state":"Tamil Nadu"},{"id":"760","name":"Tiruvuru","state":"Andhra Pradesh"},{"id":"761","name":"Mehkar","state":"Maharashtra"},{"id":"762","name":"Peringathur","state":"Kerala"},{"id":"763","name":"Perambalur","state":"Tamil Nadu"},{"id":"764","name":"Manvi","state":"Karnataka"},{"id":"765","name":"Zunheboto","state":"Nagaland"},{"id":"766","name":"Mahnar Bazar","state":"Bihar"},{"id":"767","name":"Attingal","state":"Kerala"},{"id":"768","name":"Shahbad","state":"Haryana"},{"id":"769","name":"Puranpur","state":"Uttar Pradesh"},{"id":"770","name":"Nelamangala","state":"Karnataka"},{"id":"771","name":"Nakodar","state":"Punjab"},{"id":"772","name":"Lunawada","state":"Gujarat"},{"id":"773","name":"Murshidabad","state":"West Bengal"},{"id":"774","name":"Mahe","state":"Puducherry"},{"id":"775","name":"Lanka","state":"Assam"},{"id":"776","name":"Rudauli","state":"Uttar Pradesh"},{"id":"777","name":"Tuensang","state":"Nagaland"},{"id":"778","name":"Lakshmeshwar","state":"Karnataka"},{"id":"779","name":"Zira","state":"Punjab"},{"id":"780","name":"Yawal","state":"Maharashtra"},{"id":"781","name":"Thana Bhawan","state":"Uttar Pradesh"},{"id":"782","name":"Ramdurg","state":"Karnataka"},{"id":"783","name":"Pulgaon","state":"Maharashtra"},{"id":"784","name":"Sadasivpet","state":"Telangana"},{"id":"785","name":"Nargund","state":"Karnataka"},{"id":"786","name":"Neem-Ka-Thana","state":"Rajasthan"},{"id":"787","name":"Memari","state":"West Bengal"},{"id":"788","name":"Nilanga","state":"Maharashtra"},{"id":"789","name":"Naharlagun","state":"Arunachal Pradesh"},{"id":"790","name":"Pakaur","state":"Jharkhand"},{"id":"791","name":"Wai","state":"Maharashtra"},{"id":"792","name":"Tarikere","state":"Karnataka"},{"id":"793","name":"Malavalli","state":"Karnataka"},{"id":"794","name":"Raisen","state":"Madhya Pradesh"},{"id":"795","name":"Lahar","state":"Madhya Pradesh"},{"id":"796","name":"Uravakonda","state":"Andhra Pradesh"},{"id":"797","name":"Savanur","state":"Karnataka"},{"id":"798","name":"Sirohi","state":"Rajasthan"},{"id":"799","name":"Udhampur","state":"Jammu and Kashmir"},{"id":"800","name":"Umarga","state":"Maharashtra"},{"id":"801","name":"Pratapgarh","state":"Rajasthan"},{"id":"802","name":"Lingsugur","state":"Karnataka"},{"id":"803","name":"Usilampatti","state":"Tamil Nadu"},{"id":"804","name":"Palia Kalan","state":"Uttar Pradesh"},{"id":"805","name":"Wokha","state":"Nagaland"},{"id":"806","name":"Rajpipla","state":"Gujarat"},{"id":"807","name":"Vijayapura","state":"Karnataka"},{"id":"808","name":"Rawatbhata","state":"Rajasthan"},{"id":"809","name":"Sangaria","state":"Rajasthan"},{"id":"810","name":"Paithan","state":"Maharashtra"},{"id":"811","name":"Rahuri","state":"Maharashtra"},{"id":"812","name":"Patti","state":"Punjab"},{"id":"813","name":"Zaidpur","state":"Uttar Pradesh"},{"id":"814","name":"Lalsot","state":"Rajasthan"},{"id":"815","name":"Maihar","state":"Madhya Pradesh"},{"id":"816","name":"Vedaranyam","state":"Tamil Nadu"},{"id":"817","name":"Nawapur","state":"Maharashtra"},{"id":"818","name":"Solan","state":"Himachal Pradesh"},{"id":"819","name":"Vapi","state":"Gujarat"},{"id":"820","name":"Sanawad","state":"Madhya Pradesh"},{"id":"821","name":"Warisaliganj","state":"Bihar"},{"id":"822","name":"Revelganj","state":"Bihar"},{"id":"823","name":"Sabalgarh","state":"Madhya Pradesh"},{"id":"824","name":"Tuljapur","state":"Maharashtra"},{"id":"825","name":"Simdega","state":"Jharkhand"},{"id":"826","name":"Musabani","state":"Jharkhand"},{"id":"827","name":"Kodungallur","state":"Kerala"},{"id":"828","name":"Phulabani","state":"Odisha"},{"id":"829","name":"Umreth","state":"Gujarat"},{"id":"830","name":"Narsipatnam","state":"Andhra Pradesh"},{"id":"831","name":"Nautanwa","state":"Uttar Pradesh"},{"id":"832","name":"Rajgir","state":"Bihar"},{"id":"833","name":"Yellandu","state":"Telangana"},{"id":"834","name":"Sathyamangalam","state":"Tamil Nadu"},{"id":"835","name":"Pilibanga","state":"Rajasthan"},{"id":"836","name":"Morshi","state":"Maharashtra"},{"id":"837","name":"Pehowa","state":"Haryana"},{"id":"838","name":"Sonepur","state":"Bihar"},{"id":"839","name":"Pappinisseri","state":"Kerala"},{"id":"840","name":"Zamania","state":"Uttar Pradesh"},{"id":"841","name":"Mihijam","state":"Jharkhand"},{"id":"842","name":"Purna","state":"Maharashtra"},{"id":"843","name":"Puliyankudi","state":"Tamil Nadu"},{"id":"844","name":"Shikarpur, Bulandshahr","state":"Uttar Pradesh"},{"id":"845","name":"Umaria","state":"Madhya Pradesh"},{"id":"846","name":"Porsa","state":"Madhya Pradesh"},{"id":"847","name":"Naugawan Sadat","state":"Uttar Pradesh"},{"id":"848","name":"Fatehpur Sikri","state":"Uttar Pradesh"},{"id":"849","name":"Manuguru","state":"Telangana"},{"id":"850","name":"Udaipur","state":"Tripura"},{"id":"851","name":"Pipar City","state":"Rajasthan"},{"id":"852","name":"Pattamundai","state":"Odisha"},{"id":"853","name":"Nanjikottai","state":"Tamil Nadu"},{"id":"854","name":"Taranagar","state":"Rajasthan"},{"id":"855","name":"Yerraguntla","state":"Andhra Pradesh"},{"id":"856","name":"Satana","state":"Maharashtra"},{"id":"857","name":"Sherghati","state":"Bihar"},{"id":"858","name":"Sankeshwara","state":"Karnataka"},{"id":"859","name":"Madikeri","state":"Karnataka"},{"id":"860","name":"Thuraiyur","state":"Tamil Nadu"},{"id":"861","name":"Sanand","state":"Gujarat"},{"id":"862","name":"Rajula","state":"Gujarat"},{"id":"863","name":"Kyathampalle","state":"Telangana"},{"id":"864","name":"Shahabad, Rampur","state":"Uttar Pradesh"},{"id":"865","name":"Tilda Newra","state":"Chhattisgarh"},{"id":"866","name":"Narsinghgarh","state":"Madhya Pradesh"},{"id":"867","name":"Chittur-Thathamangalam","state":"Kerala"},{"id":"868","name":"Malaj Khand","state":"Madhya Pradesh"},{"id":"869","name":"Sarangpur","state":"Madhya Pradesh"},{"id":"870","name":"Robertsganj","state":"Uttar Pradesh"},{"id":"871","name":"Sirkali","state":"Tamil Nadu"},{"id":"872","name":"Radhanpur","state":"Gujarat"},{"id":"873","name":"Tiruchendur","state":"Tamil Nadu"},{"id":"874","name":"Utraula","state":"Uttar Pradesh"},{"id":"875","name":"Patratu","state":"Jharkhand"},{"id":"876","name":"Vijainagar, Ajmer","state":"Rajasthan"},{"id":"877","name":"Periyasemur","state":"Tamil Nadu"},{"id":"878","name":"Pathri","state":"Maharashtra"},{"id":"879","name":"Sadabad","state":"Uttar Pradesh"},{"id":"880","name":"Talikota","state":"Karnataka"},{"id":"881","name":"Sinnar","state":"Maharashtra"},{"id":"882","name":"Mungeli","state":"Chhattisgarh"},{"id":"883","name":"Sedam","state":"Karnataka"},{"id":"884","name":"Shikaripur","state":"Karnataka"},{"id":"885","name":"Sumerpur","state":"Rajasthan"},{"id":"886","name":"Sattur","state":"Tamil Nadu"},{"id":"887","name":"Sugauli","state":"Bihar"},{"id":"888","name":"Lumding","state":"Assam"},{"id":"889","name":"Vandavasi","state":"Tamil Nadu"},{"id":"890","name":"Titlagarh","state":"Odisha"},{"id":"891","name":"Uchgaon","state":"Maharashtra"},{"id":"892","name":"Mokokchung","state":"Nagaland"},{"id":"893","name":"Paschim Punropara","state":"West Bengal"},{"id":"894","name":"Sagwara","state":"Rajasthan"},{"id":"895","name":"Ramganj Mandi","state":"Rajasthan"},{"id":"896","name":"Tarakeswar","state":"West Bengal"},{"id":"897","name":"Mahalingapura","state":"Karnataka"},{"id":"898","name":"Dharmanagar","state":"Tripura"},{"id":"899","name":"Mahemdabad","state":"Gujarat"},{"id":"900","name":"Manendragarh","state":"Chhattisgarh"},{"id":"901","name":"Uran","state":"Maharashtra"},{"id":"902","name":"Tharamangalam","state":"Tamil Nadu"},{"id":"903","name":"Tirukkoyilur","state":"Tamil Nadu"},{"id":"904","name":"Pen","state":"Maharashtra"},{"id":"905","name":"Makhdumpur","state":"Bihar"},{"id":"906","name":"Maner","state":"Bihar"},{"id":"907","name":"Oddanchatram","state":"Tamil Nadu"},{"id":"908","name":"Palladam","state":"Tamil Nadu"},{"id":"909","name":"Mundi","state":"Madhya Pradesh"},{"id":"910","name":"Nabarangapur","state":"Odisha"},{"id":"911","name":"Mudalagi","state":"Karnataka"},{"id":"912","name":"Samalkha","state":"Haryana"},{"id":"913","name":"Nepanagar","state":"Madhya Pradesh"},{"id":"914","name":"Karjat","state":"Maharashtra"},{"id":"915","name":"Ranavav","state":"Gujarat"},{"id":"916","name":"Pedana","state":"Andhra Pradesh"},{"id":"917","name":"Pinjore","state":"Haryana"},{"id":"918","name":"Lakheri","state":"Rajasthan"},{"id":"919","name":"Pasan","state":"Madhya Pradesh"},{"id":"920","name":"Puttur","state":"Andhra Pradesh"},{"id":"921","name":"Vadakkuvalliyur","state":"Tamil Nadu"},{"id":"922","name":"Tirukalukundram","state":"Tamil Nadu"},{"id":"923","name":"Mahidpur","state":"Madhya Pradesh"},{"id":"924","name":"Mussoorie","state":"Uttarakhand"},{"id":"925","name":"Muvattupuzha","state":"Kerala"},{"id":"926","name":"Rasra","state":"Uttar Pradesh"},{"id":"927","name":"Udaipurwati","state":"Rajasthan"},{"id":"928","name":"Manwath","state":"Maharashtra"},{"id":"929","name":"Adoor","state":"Kerala"},{"id":"930","name":"Uthamapalayam","state":"Tamil Nadu"},{"id":"931","name":"Partur","state":"Maharashtra"},{"id":"932","name":"Nahan","state":"Himachal Pradesh"},{"id":"933","name":"Ladwa","state":"Haryana"},{"id":"934","name":"Mankachar","state":"Assam"},{"id":"935","name":"Nongstoin","state":"Meghalaya"},{"id":"936","name":"Losal","state":"Rajasthan"},{"id":"937","name":"Sri Madhopur","state":"Rajasthan"},{"id":"938","name":"Ramngarh","state":"Rajasthan"},{"id":"939","name":"Mavelikkara","state":"Kerala"},{"id":"940","name":"Rawatsar","state":"Rajasthan"},{"id":"941","name":"Rajakhera","state":"Rajasthan"},{"id":"942","name":"Lar","state":"Uttar Pradesh"},{"id":"943","name":"Lal Gopalganj Nindaura","state":"Uttar Pradesh"},{"id":"944","name":"Muddebihal","state":"Karnataka"},{"id":"945","name":"Sirsaganj","state":"Uttar Pradesh"},{"id":"946","name":"Shahpura","state":"Rajasthan"},{"id":"947","name":"Surandai","state":"Tamil Nadu"},{"id":"948","name":"Sangole","state":"Maharashtra"},{"id":"949","name":"Pavagada","state":"Karnataka"},{"id":"950","name":"Tharad","state":"Gujarat"},{"id":"951","name":"Mansa","state":"Gujarat"},{"id":"952","name":"Umbergaon","state":"Gujarat"},{"id":"953","name":"Mavoor","state":"Kerala"},{"id":"954","name":"Nalbari","state":"Assam"},{"id":"955","name":"Talaja","state":"Gujarat"},{"id":"956","name":"Malur","state":"Karnataka"},{"id":"957","name":"Mangrulpir","state":"Maharashtra"},{"id":"958","name":"Soro","state":"Odisha"},{"id":"959","name":"Shahpura","state":"Rajasthan"},{"id":"960","name":"Vadnagar","state":"Gujarat"},{"id":"961","name":"Raisinghnagar","state":"Rajasthan"},{"id":"962","name":"Sindhagi","state":"Karnataka"},{"id":"963","name":"Sanduru","state":"Karnataka"},{"id":"964","name":"Sohna","state":"Haryana"},{"id":"965","name":"Manavadar","state":"Gujarat"},{"id":"966","name":"Pihani","state":"Uttar Pradesh"},{"id":"967","name":"Safidon","state":"Haryana"},{"id":"968","name":"Risod","state":"Maharashtra"},{"id":"969","name":"Rosera","state":"Bihar"},{"id":"970","name":"Sankari","state":"Tamil Nadu"},{"id":"971","name":"Malpura","state":"Rajasthan"},{"id":"972","name":"Sonamukhi","state":"West Bengal"},{"id":"973","name":"Shamsabad, Agra","state":"Uttar Pradesh"},{"id":"974","name":"Nokha","state":"Bihar"},{"id":"975","name":"PandUrban Agglomeration","state":"West Bengal"},{"id":"976","name":"Mainaguri","state":"West Bengal"},{"id":"977","name":"Afzalpur","state":"Karnataka"},{"id":"978","name":"Shirur","state":"Maharashtra"},{"id":"979","name":"Salaya","state":"Gujarat"},{"id":"980","name":"Shenkottai","state":"Tamil Nadu"},{"id":"981","name":"Pratapgarh","state":"Tripura"},{"id":"982","name":"Vadipatti","state":"Tamil Nadu"},{"id":"983","name":"Nagarkurnool","state":"Telangana"},{"id":"984","name":"Savner","state":"Maharashtra"},{"id":"985","name":"Sasvad","state":"Maharashtra"},{"id":"986","name":"Rudrapur","state":"Uttar Pradesh"},{"id":"987","name":"Soron","state":"Uttar Pradesh"},{"id":"988","name":"Sholingur","state":"Tamil Nadu"},{"id":"989","name":"Pandharkaoda","state":"Maharashtra"},{"id":"990","name":"Perumbavoor","state":"Kerala"},{"id":"991","name":"Maddur","state":"Karnataka"},{"id":"992","name":"Nadbai","state":"Rajasthan"},{"id":"993","name":"Talode","state":"Maharashtra"},{"id":"994","name":"Shrigonda","state":"Maharashtra"},{"id":"995","name":"Madhugiri","state":"Karnataka"},{"id":"996","name":"Tekkalakote","state":"Karnataka"},{"id":"997","name":"Seoni-Malwa","state":"Madhya Pradesh"},{"id":"998","name":"Shirdi","state":"Maharashtra"},{"id":"999","name":"SUrban Agglomerationr","state":"Uttar Pradesh"},{"id":"1000","name":"Terdal","state":"Karnataka"},{"id":"1001","name":"Raver","state":"Maharashtra"},{"id":"1002","name":"Tirupathur","state":"Tamil Nadu"},{"id":"1003","name":"Taraori","state":"Haryana"},{"id":"1004","name":"Mukhed","state":"Maharashtra"},{"id":"1005","name":"Manachanallur","state":"Tamil Nadu"},{"id":"1006","name":"Rehli","state":"Madhya Pradesh"},{"id":"1007","name":"Sanchore","state":"Rajasthan"},{"id":"1008","name":"Rajura","state":"Maharashtra"},{"id":"1009","name":"Piro","state":"Bihar"},{"id":"1010","name":"Mudabidri","state":"Karnataka"},{"id":"1011","name":"Vadgaon Kasba","state":"Maharashtra"},{"id":"1012","name":"Nagar","state":"Rajasthan"},{"id":"1013","name":"Vijapur","state":"Gujarat"},{"id":"1014","name":"Viswanatham","state":"Tamil Nadu"},{"id":"1015","name":"Polur","state":"Tamil Nadu"},{"id":"1016","name":"Panagudi","state":"Tamil Nadu"},{"id":"1017","name":"Manawar","state":"Madhya Pradesh"},{"id":"1018","name":"Tehri","state":"Uttarakhand"},{"id":"1019","name":"Samdhan","state":"Uttar Pradesh"},{"id":"1020","name":"Pardi","state":"Gujarat"},{"id":"1021","name":"Rahatgarh","state":"Madhya Pradesh"},{"id":"1022","name":"Panagar","state":"Madhya Pradesh"},{"id":"1023","name":"Uthiramerur","state":"Tamil Nadu"},{"id":"1024","name":"Tirora","state":"Maharashtra"},{"id":"1025","name":"Rangia","state":"Assam"},{"id":"1026","name":"Sahjanwa","state":"Uttar Pradesh"},{"id":"1027","name":"Wara Seoni","state":"Madhya Pradesh"},{"id":"1028","name":"Magadi","state":"Karnataka"},{"id":"1029","name":"Rajgarh (Alwar)","state":"Rajasthan"},{"id":"1030","name":"Rafiganj","state":"Bihar"},{"id":"1031","name":"Tarana","state":"Madhya Pradesh"},{"id":"1032","name":"Rampur Maniharan","state":"Uttar Pradesh"},{"id":"1033","name":"Sheoganj","state":"Rajasthan"},{"id":"1034","name":"Raikot","state":"Punjab"},{"id":"1035","name":"Pauri","state":"Uttarakhand"},{"id":"1036","name":"Sumerpur","state":"Uttar Pradesh"},{"id":"1037","name":"Navalgund","state":"Karnataka"},{"id":"1038","name":"Shahganj","state":"Uttar Pradesh"},{"id":"1039","name":"Marhaura","state":"Bihar"},{"id":"1040","name":"Tulsipur","state":"Uttar Pradesh"},{"id":"1041","name":"Sadri","state":"Rajasthan"},{"id":"1042","name":"Thiruthuraipoondi","state":"Tamil Nadu"},{"id":"1043","name":"Shiggaon","state":"Karnataka"},{"id":"1044","name":"Pallapatti","state":"Tamil Nadu"},{"id":"1045","name":"Mahendragarh","state":"Haryana"},{"id":"1046","name":"Sausar","state":"Madhya Pradesh"},{"id":"1047","name":"Ponneri","state":"Tamil Nadu"},{"id":"1048","name":"Mahad","state":"Maharashtra"},{"id":"1049","name":"Lohardaga","state":"Jharkhand"},{"id":"1050","name":"Tirwaganj","state":"Uttar Pradesh"},{"id":"1051","name":"Margherita","state":"Assam"},{"id":"1052","name":"Sundarnagar","state":"Himachal Pradesh"},{"id":"1053","name":"Rajgarh","state":"Madhya Pradesh"},{"id":"1054","name":"Mangaldoi","state":"Assam"},{"id":"1055","name":"Renigunta","state":"Andhra Pradesh"},{"id":"1056","name":"Longowal","state":"Punjab"},{"id":"1057","name":"Ratia","state":"Haryana"},{"id":"1058","name":"Lalgudi","state":"Tamil Nadu"},{"id":"1059","name":"Shrirangapattana","state":"Karnataka"},{"id":"1060","name":"Niwari","state":"Madhya Pradesh"},{"id":"1061","name":"Natham","state":"Tamil Nadu"},{"id":"1062","name":"Unnamalaikadai","state":"Tamil Nadu"},{"id":"1063","name":"PurqUrban Agglomerationzi","state":"Uttar Pradesh"},{"id":"1064","name":"Shamsabad, Farrukhabad","state":"Uttar Pradesh"},{"id":"1065","name":"Mirganj","state":"Bihar"},{"id":"1066","name":"Todaraisingh","state":"Rajasthan"},{"id":"1067","name":"Warhapur","state":"Uttar Pradesh"},{"id":"1068","name":"Rajam","state":"Andhra Pradesh"},{"id":"1069","name":"Urmar Tanda","state":"Punjab"},{"id":"1070","name":"Lonar","state":"Maharashtra"},{"id":"1071","name":"Powayan","state":"Uttar Pradesh"},{"id":"1072","name":"P.N.Patti","state":"Tamil Nadu"},{"id":"1073","name":"Palampur","state":"Himachal Pradesh"},{"id":"1074","name":"Srisailam Project (Right Flank Colony) Township","state":"Andhra Pradesh"},{"id":"1075","name":"Sindagi","state":"Karnataka"},{"id":"1076","name":"Sandi","state":"Uttar Pradesh"},{"id":"1077","name":"Vaikom","state":"Kerala"},{"id":"1078","name":"Malda","state":"West Bengal"},{"id":"1079","name":"Tharangambadi","state":"Tamil Nadu"},{"id":"1080","name":"Sakaleshapura","state":"Karnataka"},{"id":"1081","name":"Lalganj","state":"Bihar"},{"id":"1082","name":"Malkangiri","state":"Odisha"},{"id":"1083","name":"Rapar","state":"Gujarat"},{"id":"1084","name":"Mauganj","state":"Madhya Pradesh"},{"id":"1085","name":"Todabhim","state":"Rajasthan"},{"id":"1086","name":"Srinivaspur","state":"Karnataka"},{"id":"1087","name":"Murliganj","state":"Bihar"},{"id":"1088","name":"Reengus","state":"Rajasthan"},{"id":"1089","name":"Sawantwadi","state":"Maharashtra"},{"id":"1090","name":"Tittakudi","state":"Tamil Nadu"},{"id":"1091","name":"Lilong","state":"Manipur"},{"id":"1092","name":"Rajaldesar","state":"Rajasthan"},{"id":"1093","name":"Pathardi","state":"Maharashtra"},{"id":"1094","name":"Achhnera","state":"Uttar Pradesh"},{"id":"1095","name":"Pacode","state":"Tamil Nadu"},{"id":"1096","name":"Naraura","state":"Uttar Pradesh"},{"id":"1097","name":"Nakur","state":"Uttar Pradesh"},{"id":"1098","name":"Palai","state":"Kerala"},{"id":"1099","name":"Morinda, India","state":"Punjab"},{"id":"1100","name":"Manasa","state":"Madhya Pradesh"},{"id":"1101","name":"Nainpur","state":"Madhya Pradesh"},{"id":"1102","name":"Sahaspur","state":"Uttar Pradesh"},{"id":"1103","name":"Pauni","state":"Maharashtra"},{"id":"1104","name":"Prithvipur","state":"Madhya Pradesh"},{"id":"1105","name":"Ramtek","state":"Maharashtra"},{"id":"1106","name":"Silapathar","state":"Assam"},{"id":"1107","name":"Songadh","state":"Gujarat"},{"id":"1108","name":"Safipur","state":"Uttar Pradesh"},{"id":"1109","name":"Sohagpur","state":"Madhya Pradesh"},{"id":"1110","name":"Mul","state":"Maharashtra"},{"id":"1111","name":"Sadulshahar","state":"Rajasthan"},{"id":"1112","name":"Phillaur","state":"Punjab"},{"id":"1113","name":"Sambhar","state":"Rajasthan"},{"id":"1114","name":"Prantij","state":"Rajasthan"},{"id":"1115","name":"Nagla","state":"Uttarakhand"},{"id":"1116","name":"Pattran","state":"Punjab"},{"id":"1117","name":"Mount Abu","state":"Rajasthan"},{"id":"1118","name":"Reoti","state":"Uttar Pradesh"},{"id":"1119","name":"Tenu dam-cum-Kathhara","state":"Jharkhand"},{"id":"1120","name":"Panchla","state":"West Bengal"},{"id":"1121","name":"Sitarganj","state":"Uttarakhand"},{"id":"1122","name":"Pasighat","state":"Arunachal Pradesh"},{"id":"1123","name":"Motipur","state":"Bihar"},{"id":"1124","name":"O' Valley","state":"Tamil Nadu"},{"id":"1125","name":"Raghunathpur","state":"West Bengal"},{"id":"1126","name":"Suriyampalayam","state":"Tamil Nadu"},{"id":"1127","name":"Qadian","state":"Punjab"},{"id":"1128","name":"Rairangpur","state":"Odisha"},{"id":"1129","name":"Silvassa","state":"Dadra and Nagar Haveli"},{"id":"1130","name":"Nowrozabad (Khodargama)","state":"Madhya Pradesh"},{"id":"1131","name":"Mangrol","state":"Rajasthan"},{"id":"1132","name":"Soyagaon","state":"Maharashtra"},{"id":"1133","name":"Sujanpur","state":"Punjab"},{"id":"1134","name":"Manihari","state":"Bihar"},{"id":"1135","name":"Sikanderpur","state":"Uttar Pradesh"},{"id":"1136","name":"Mangalvedhe","state":"Maharashtra"},{"id":"1137","name":"Phulera","state":"Rajasthan"},{"id":"1138","name":"Ron","state":"Karnataka"},{"id":"1139","name":"Sholavandan","state":"Tamil Nadu"},{"id":"1140","name":"Saidpur","state":"Uttar Pradesh"},{"id":"1141","name":"Shamgarh","state":"Madhya Pradesh"},{"id":"1142","name":"Thammampatti","state":"Tamil Nadu"},{"id":"1143","name":"Maharajpur","state":"Madhya Pradesh"},{"id":"1144","name":"Multai","state":"Madhya Pradesh"},{"id":"1145","name":"Mukerian","state":"Punjab"},{"id":"1146","name":"Sirsi","state":"Uttar Pradesh"},{"id":"1147","name":"Purwa","state":"Uttar Pradesh"},{"id":"1148","name":"Sheohar","state":"Bihar"},{"id":"1149","name":"Namagiripettai","state":"Tamil Nadu"},{"id":"1150","name":"Parasi","state":"Uttar Pradesh"},{"id":"1151","name":"Lathi","state":"Gujarat"},{"id":"1152","name":"Lalganj","state":"Uttar Pradesh"},{"id":"1153","name":"Narkhed","state":"Maharashtra"},{"id":"1154","name":"Mathabhanga","state":"West Bengal"},{"id":"1155","name":"Shendurjana","state":"Maharashtra"},{"id":"1156","name":"Peravurani","state":"Tamil Nadu"},{"id":"1157","name":"Mariani","state":"Assam"},{"id":"1158","name":"Phulpur","state":"Uttar Pradesh"},{"id":"1159","name":"Rania","state":"Haryana"},{"id":"1160","name":"Pali","state":"Madhya Pradesh"},{"id":"1161","name":"Pachore","state":"Madhya Pradesh"},{"id":"1162","name":"Parangipettai","state":"Tamil Nadu"},{"id":"1163","name":"Pudupattinam","state":"Tamil Nadu"},{"id":"1164","name":"Panniyannur","state":"Kerala"},{"id":"1165","name":"Maharajganj","state":"Bihar"},{"id":"1166","name":"Rau","state":"Madhya Pradesh"},{"id":"1167","name":"Monoharpur","state":"West Bengal"},{"id":"1168","name":"Mandawa","state":"Rajasthan"},{"id":"1169","name":"Marigaon","state":"Assam"},{"id":"1170","name":"Pallikonda","state":"Tamil Nadu"},{"id":"1171","name":"Pindwara","state":"Rajasthan"},{"id":"1172","name":"Shishgarh","state":"Uttar Pradesh"},{"id":"1173","name":"Patur","state":"Maharashtra"},{"id":"1174","name":"Mayang Imphal","state":"Manipur"},{"id":"1175","name":"Mhowgaon","state":"Madhya Pradesh"},{"id":"1176","name":"Guruvayoor","state":"Kerala"},{"id":"1177","name":"Mhaswad","state":"Maharashtra"},{"id":"1178","name":"Sahawar","state":"Uttar Pradesh"},{"id":"1179","name":"Sivagiri","state":"Tamil Nadu"},{"id":"1180","name":"Mundargi","state":"Karnataka"},{"id":"1181","name":"Punjaipugalur","state":"Tamil Nadu"},{"id":"1182","name":"Kailasahar","state":"Tripura"},{"id":"1183","name":"Samthar","state":"Uttar Pradesh"},{"id":"1184","name":"Sakti","state":"Chhattisgarh"},{"id":"1185","name":"Sadalagi","state":"Karnataka"},{"id":"1186","name":"Silao","state":"Bihar"},{"id":"1187","name":"Mandalgarh","state":"Rajasthan"},{"id":"1188","name":"Loha","state":"Maharashtra"},{"id":"1189","name":"Pukhrayan","state":"Uttar Pradesh"},{"id":"1190","name":"Padmanabhapuram","state":"Tamil Nadu"},{"id":"1191","name":"Belonia","state":"Tripura"},{"id":"1192","name":"Saiha","state":"Mizoram"},{"id":"1193","name":"Srirampore","state":"West Bengal"},{"id":"1194","name":"Talwara","state":"Punjab"},{"id":"1195","name":"Puthuppally","state":"Kerala"},{"id":"1196","name":"Khowai","state":"Tripura"},{"id":"1197","name":"Vijaypur","state":"Madhya Pradesh"},{"id":"1198","name":"Takhatgarh","state":"Rajasthan"},{"id":"1199","name":"Thirupuvanam","state":"Tamil Nadu"},{"id":"1200","name":"Adra","state":"West Bengal"},{"id":"1201","name":"Piriyapatna","state":"Karnataka"},{"id":"1202","name":"Obra","state":"Uttar Pradesh"},{"id":"1203","name":"Adalaj","state":"Gujarat"},{"id":"1204","name":"Nandgaon","state":"Maharashtra"},{"id":"1205","name":"Barh","state":"Bihar"},{"id":"1206","name":"Chhapra","state":"Gujarat"},{"id":"1207","name":"Panamattom","state":"Kerala"},{"id":"1208","name":"Niwai","state":"Uttar Pradesh"},{"id":"1209","name":"Bageshwar","state":"Uttarakhand"},{"id":"1210","name":"Tarbha","state":"Odisha"},{"id":"1211","name":"Adyar","state":"Karnataka"},{"id":"1212","name":"Narsinghgarh","state":"Madhya Pradesh"},{"id":"1213","name":"Warud","state":"Maharashtra"},{"id":"1214","name":"Asarganj","state":"Bihar"},{"id":"1215","name":"Sarsod","state":"Haryana"},{"id":"1216","name":"Gandhinagar","state":"Gujarat"},{"id":"1217","name":"Kullu","state":"Himachal Pradesh"},{"id":"1218","name":"Manali","state":"Himachal Praddesh"},{"id":"1219","name":"Mirzapur","state":"Uttar Pradesh"}];
			 
		var stateList = _($scope.countryindia).chain().flatten().pluck('state').unique().value();
		
		$scope.getCities = function(driverstate){
			//console.log(driverstate);
			  var citylist = _.filter($scope.countryindia,function(c){
				return c.state && c.state === driverstate;
			});
			 //console.log(citylist.length);
			 //console.log(citylist);
			return citylist;
		};
		
		$scope.onSelectCountry = function () {
			//console.log("on select");
			$scope.states = stateList;  
		};	
		
		$scope.statesu = stateList;
		
		$scope.clearcity = function(){
			console.log("clearcity");
			$scope.driver.city = "";
		};
		
		$scope.clearpcity =function(){
			
			$scope.driver.pcity = "";
		}
		
		$scope.oneplusMinus = function(){
			console.log("blood group");			
			var driverBlood = document.getElementById("driverBlood");
			driverBlood.value = driverBlood.value.replace(/\++/g,'+');
			driverBlood.value = driverBlood.value.replace(/\--/g,'-');
		}
		
		
		
		/*verify uniqueness of contact*/
		$scope.verifyContact=function(d_id,driverContact){
			//console.log(driverContact);
			if(typeof(driverContact)!='undefined'){
				$scope.verifydriverContactJSON = {};
				$scope.verifydriverContactJSON.token = $scope.token;
				if(d_id!='new'){
					$scope.verifydriverContactJSON.driver_id=d_id;
				}				
				$scope.verifydriverContactJSON.contact_no = driverContact;
				//console.log(JSON.stringify($scope.verifydriverContactJSON));
				$http({
					method : 'POST',
					url : apiURL + 'driver/validatecontact',
					data : JSON.stringify($scope.verifydriverContactJSON),
					headers : {
						'Content-Type' : 'application/json'
					}
				}).success(function(data) {
					//console.log(data);
					if (data.status) {
						$scope.driverform.driverContact.$setValidity('contAvailable',true);
						$scope.driverupdateform.driverContact.$setValidity('contAvailable',true);
					} else {
						$scope.driverform.driverContact.$setValidity('contAvailable',false);
						$scope.driverupdateform.driverContact.$setValidity('contAvailable',true);
					}
				}).error(function(data, status, headers, config) {
					// console.log(data.err);
					if (data.err == "Expired Session") {
						$('#driverUpdateModal').modal('hide');
						$('#driverCreateModal').modal('hide');
						expiredSession();
						$localStorage.$reset();
					} else if (data.err == "Invalid User") {
						$('#driverUpdateModal').modal('hide');
						$('#driverCreateModal').modal('hide');
						invalidUser();
						$localStorage.$reset();
					}
					console.log(status);
					console.log(headers);
					console.log(config);
				})
			}
		}
		/**
		 * check uniqueness of driver license
		 */		
		$scope.verifyDL = function(d_id,dl) {
			if(typeof(dl)!='undefined'){
				$scope.verifydlJSON = {};
				$scope.verifydlJSON.token = $scope.token;
				if(d_id!='new'){
					$scope.verifydlJSON.driver_id=d_id;
				}				
				$scope.verifydlJSON.driver_licence = dl;
				$http({
					method : 'POST',
					url : apiURL + 'driver/validatelicenceid',
					data : JSON.stringify($scope.verifydlJSON),
					headers : {
						'Content-Type' : 'application/json'
					}
				}).success(function(data) {
					//console.log(data);
					if (data.status) {
						$scope.driverform.driverlicense.$setValidity('dlavailable',true);
						$scope.driverupdateform.driverlicense.$setValidity('dlavailable',true);
					} else {
						$scope.driverform.driverlicense.$setValidity('dlavailable',false);
						$scope.driverupdateform.driverlicense.$setValidity('dlavailable',false);
					}
				}).error(function(data, status, headers, config) {
					// console.log(data.err);
					if (data.err == "Expired Session") {
						$('#driverUpdateModal').modal('hide');
						$('#driverCreateModal').modal('hide');
						expiredSession();
						$localStorage.$reset();
					} else if (data.err == "Invalid User") {
						$('#driverUpdateModal').modal('hide');
						$('#driverCreateModal').modal('hide');
						invalidUser();
						$localStorage.$reset();
					}
					console.log(status);
					console.log(headers);
					console.log(config);
				})
			}		
		};
		
		$scope.countChild=function(){
			var list=document.getElementById("driverUlist");
			 var str=document.getElementById('displayList').innerHTML;
			console.log(str.length);
			if(list!=null){			
				var liNodes = [];
				for (var i = 0; i < list.childNodes.length; i++) {
					if (list.childNodes[i].nodeName == "LI") {
						liNodes.push(list.childNodes[i]);
					}
				}
				console.log(liNodes);
				console.log(liNodes.length);
				$scope.noDrivers=false;				
			}
			else{$scope.noDrivers=true;}
			
			
		}
		/*
		 * reset form with clearing form fields
		 * a) .reset() javscript function clearing field even after error
		 * b) assigning the empty object (to all the ng-model of the form fields)
		 * c) setting Pristine (field is set to not modofied state)
		 * d) setting Untouched (field is set to not touched state)
		 * e) clearing the image path
		 * f) clearing the language array
		 * g) for driver contact availablity error reset on close of create /update form
		 * h) for driver licence availablity error reset on close of create /update form
		 * */
		 $scope.reset=function(){
			 document.getElementById("driverCreateform").reset();
			 $scope.driver={};
			 $scope.driver.confirmAddress=true;
			 //$("#confirmAddress").selected(true);
			 $scope.createDriverObject={};		 
			 $scope.langArray=[];
			 $scope.imagepath="";
			 $scope.states = "";
			 $scope.driver.etype = "Permanent";
			 $("#perid").prop("checked", true);
			 $scope.driverform.$setPristine();
			 $scope.driverform.$setUntouched();
			 $scope.driverupdateform.$setPristine();
			 $scope.driverupdateform.$setUntouched();
			 $scope.driverform.driverContact.$setValidity('contAvailable',true);
			 $scope.driverupdateform.driverContact.$setValidity('contAvailable',true);
			 $scope.driverform.driverlicense.$setValidity('dlavailable',true);
			 $scope.driverupdateform.driverlicense.$setValidity('dlavailable',true);
			 
			 $("#id_label_multiple").select2("val","");
				$('#langSelect').select2({
					
					  tags: "true",
				      placeholder: "Select / Type Languages Known",
				      allowClear: true,
				     // tokenSeparators: [',', ' '],
				      maximumSelectionSize: 5
				      });
				$('#updatelangSelect').select2({
					placeholder: "Select / Type Languages Known",  
					allowClear: true,
				     // tokenSeparators: [',', ' '],
				      maximumSelectionSize: 5
					 });
				
				
		 }
	/*====================================================>>>>>> End of Basic function <<<<<=================================================*/
	/*
	 * ====================================================>>>>>> list drivers function <<<<<=================================================
	 * */	
		$scope.listDrivers=function(){
			$scope.httpLoading=true;
			$scope.listDriverJSON={};
			$scope.listDriverJSON.token=$scope.token;
			$scope.listDriverJSON.type="0";
			$http({
				method:'POST',
				url:apiURL+'driver/list',
				data:JSON.stringify($scope.listDriverJSON),
				headers:{'Content-Type':'application/json'}
			})
			.success(function(data){
				//console.log(JSON.stringify(data));
				$scope.driverlist=data;
				$scope.httpLoading=false;				
			})
			.error(function(data, status, headers, config) {
				console.log(data);
				$scope.httpLoading=false;
			}).finally(function(){
				$scope.httpLoading=false;
			});
		}
	/*
	 * ====================================================>>>>>> End of list drivers function <<<<<=================================================
	 * */		
	/*
	 * ===============================>>>>> Start of Create Driver function <<<<<==========================================
	 * Manadatory Fields
	 * a)Driver Name
	 * b)Driver contact number
	 * c)Driver driving license number
	 * d)Driver current city
	 * e)Driver current pin code
	 * f)Driver current street
	 * g)Driver current state
	 * h)Driver current country
	 * i)Driver aadhar card
	 * j)Driver emergency contact number
	 * k)Driver blood group
	 * l)Employee Type (Permanent or Temprorary)
	 * */
	$scope.submitCreateDriverForm=function(){
		$scope.createDriverObject={};
		$scope.createDriverObject.token=$scope.token;
		$scope.createDriverObject.name=$scope.driver.name;
		$scope.createDriverObject.contact_no=$scope.driver.contact;
		$scope.createDriverObject.licence_id=$scope.driver.license;
		if($scope.driver.confirmAddress==true){
			$scope.createDriverObject.native_city=$scope.driver.city;
			$scope.createDriverObject.native_state=$scope.driver.state;
			$scope.createDriverObject.native_pincode=$scope.driver.pincode;
			$scope.createDriverObject.native_street=$scope.driver.street;
			$scope.createDriverObject.native_country=$scope.driver.country;	
		}
		else{
			$scope.createDriverObject.native_city=$scope.driver.pcity;
			$scope.createDriverObject.native_state=$scope.driver.pstate;
			$scope.createDriverObject.native_pincode=$scope.driver.ppincode;
			$scope.createDriverObject.native_street=$scope.driver.pstreet;
			$scope.createDriverObject.native_country=$scope.driver.pcountry;
		}
		$scope.createDriverObject.current_city=$scope.driver.city;
		$scope.createDriverObject.current_country=$scope.driver.country;
		$scope.createDriverObject.current_state=$scope.driver.state;
		$scope.createDriverObject.current_pincode=$scope.driver.pincode;
		$scope.createDriverObject.current_street=$scope.driver.street;
		$scope.createDriverObject.adhar_id=$scope.driver.aadhar;
		$scope.createDriverObject.image_src=$scope.imagepath;
		$scope.createDriverObject.emergency_cn=$scope.driver.emergency_cn;
		$scope.createDriverObject.blood_group=$scope.driver.blood;
		var dobOnCreate=document.getElementById("dobOnCreate").value;
		$scope.driver.dob=dobOnCreate;
		if(dobOnCreate==""){
			$scope.createDriverObject.dob=""
		}
		else{
			$scope.createDriverObject.dob=$scope.driver.dob;
		}
		
		$scope.createDriverObject.education=$scope.driver.education;
		$scope.createDriverObject.languages_known=$("#id_label_multiple").select2("val");
		$scope.createDriverObject.password=$scope.driver.password;
		$scope.createDriverObject.salary=$scope.driver.salary;
		$scope.createDriverObject.employee_type=$scope.driver.etype;		
		
		//console.log(JSON.stringify($scope.driver));
		//console.log(JSON.stringify($scope.createDriverObject));
		$scope.httpLoading=true
		$http({
			method:'POST',
			url:apiURL+'driver/create',
			data:JSON.stringify($scope.createDriverObject),
			headers:{'Content-Type':'application/json'}
		})
		.success(function(data){
			console.log(data);
			console.log("success");
			$scope.httpLoading=false;
			swal({title: "Driver Created Successfully",
	   			   text: "Success!",   
	   			   type: "success",   
	   			   confirmButtonColor: "#9afb29",   
	   			   closeOnConfirm: true }, 
	   			   function(){   
	   				$('#driverCreateModal').modal('hide');
	   				$scope.reset();
					$scope.listDrivers();
	   		 });
		})
		.error(function(data, status, headers, config) {
			//console.log(data);
			$scope.httpLoading=false;
			 if(data.err == "Expired Session")
			  {
       		  $('#driverCreateModal').modal('hide');
			      expiredSession();
			      $localStorage.$reset();
			  }
	       	  else if(data.err == "Invalid User"){
	       		  $('#driverCreateModal').modal('hide');
	       		  invalidUser();
	   			  $localStorage.$reset();  
	       	  }
			
		}).finally(function(){		
			$scope.httpLoading=false;
		});
	}
	
	/*
	 * ===============================>>>>> End of Create Driver function <<<<<==========================================
	 * */
	 
	 /*
	  * ===============================>>>>> Fetch Driver info function <<<<<==========================================
	  * */ 
	 $scope.fetchdriverInfo=function(driver_id){
		 $scope.fetchDriverInfo={};
		 $scope.fetchDriverInfo.token=$scope.token;
		 $scope.fetchDriverInfo.driver_id=driver_id;
		 //console.log(JSON.stringify($scope.fetchDriverInfo));
		 $http({
				method:'POST',
				url:apiURL+'driver/info',
				data:JSON.stringify($scope.fetchDriverInfo),
				headers:{'Content-Type':'application/json'}
			})
			.success(function(data){
				//console.log(JSON.stringify(data));
				$scope.updateEditModal(data,function(){
					$("#driverUpdateModal").modal('show');
				});				
			})
			.error(function(data, status, headers, config) {				
				 if(data.err == "Expired Session")
				  {	  expiredSession();
				      $localStorage.$reset();
				  }
		       	  else if(data.err == "Invalid User"){
		       		  invalidUser();
		   			  $localStorage.$reset();  
		       	  }
			})
	 }
	 
	 $scope.updateEditModal=function(data,callModal){
		 $scope.editformselect=true;
		 $scope.driver=data;
		 $scope.driver.contact=data.contact_no;
		 $scope.driver.license=data.licence_id;
		 $scope.driver.etype=data.employee_type;
			 console.log(data.languages_known);
			 $("#updatelangSelect").select2('val',data.languages_known);
			 $('#updatelangSelect').trigger('change');
		 $scope.langArray=data.languages_known;		 
		 $scope.driver.blood=data.blood_group;
		 $scope.driver.image_src=data.image_src;
		 $scope.imagepath=data.image_src;
		 $scope.driver.aadhar=data.adhar_id;
		 $scope.driver.street=data.current_address.street;
		 $scope.driver.city=data.current_address.city;
		 $scope.driver.pincode=data.current_address.pincode;		 
		 $scope.driver.country=data.current_address.country;
		 $scope.driver.state=data.current_address.state;
		 $scope.driver.pstreet=data.native_address.street;
		 $scope.driver.pcity=data.native_address.city;
		 $scope.driver.ppincode=data.native_address.pincode;		 
		 $scope.driver.pcountry=data.native_address.country;
		 $scope.driver.pstate=data.native_address.state;
		 $scope.driver.driver_id=data.driver_id;
		 callModal();		 
	 }
	 /*
	  * ===============================>>>>> End Fetch Driver info  function <<<<<==========================================	  * 
	  * */
	 /*
	  * ===============================>>>>> Update Driver info  function <<<<<==========================================
	  * */
	 $scope.submitUpdateDriverForm=function(){
		 $scope.updateDriverObject={};
	      $scope.updateDriverObject.token=$scope.token;
	      $scope.updateDriverObject.name=$scope.driver.name;
	      $scope.updateDriverObject.contact_no=$scope.driver.contact;
	      $scope.updateDriverObject.licence_id=$scope.driver.license;
	      if($scope.driver.confirmAddress==true){
	         $scope.updateDriverObject.native_city=$scope.driver.city;
	         $scope.updateDriverObject.native_state=$scope.driver.state;
	         $scope.updateDriverObject.native_pincode=$scope.driver.pincode;
	         $scope.updateDriverObject.native_street=$scope.driver.street;
	         $scope.updateDriverObject.native_country=$scope.driver.country;   
	      }
	      else{
	         $scope.updateDriverObject.native_city=$scope.driver.pcity;
	         $scope.updateDriverObject.native_state=$scope.driver.pstate;
	         $scope.updateDriverObject.native_pincode=$scope.driver.ppincode;
	         $scope.updateDriverObject.native_street=$scope.driver.pstreet;
	         $scope.updateDriverObject.native_country=$scope.driver.pcountry;
	      }
	      $scope.updateDriverObject.current_city=$scope.driver.city;
	      $scope.updateDriverObject.current_country=$scope.driver.country;
	      $scope.updateDriverObject.current_state=$scope.driver.state;
	      $scope.updateDriverObject.current_pincode=$scope.driver.pincode;
	      $scope.updateDriverObject.current_street=$scope.driver.street;
	      $scope.updateDriverObject.adhar_id=$scope.driver.aadhar;
	      $scope.updateDriverObject.image_src=$scope.imagepath;
	      $scope.updateDriverObject.emergency_cn=$scope.driver.emergency_cn;
	      $scope.updateDriverObject.blood_group=$scope.driver.blood;
	      var dobOnUpdate=document.getElementById("dobOnUpdate").value;
			$scope.driver.dob=dobOnUpdate;
			if(dobOnUpdate==""){
				$scope.updateDriverObject.dob=""
			}
			else{
				$scope.updateDriverObject.dob=$scope.driver.dob;
			}			
	      $scope.updateDriverObject.education=$scope.driver.education;	      
	      $scope.updateDriverObject.languages_known=$("#updatelangSelect").select2("val");
	      $scope.updateDriverObject.salary=$scope.driver.salary;
	      $scope.updateDriverObject.employee_type=$scope.driver.etype;
	      $scope.updateDriverObject.driver_id=$scope.driver.driver_id;
	      console.log($scope.updateDriverObject);
	      $scope.httpLoading=true
			$http({
				method:'POST',
				url:apiURL+'driver/update',
				data:JSON.stringify($scope.updateDriverObject),
				headers:{'Content-Type':'application/json'}
			})
			.success(function(data){
				//console.log(data);
				$scope.httpLoading=false;
				$('#driverUpdateModal').modal('hide');
					$scope.listDrivers();
				swal({title: "Driver Updated Successfully",
		   			   text: "Success!",   
		   			   type: "success",   
		   			   confirmButtonColor: "#9afb29",   
		   			   closeOnConfirm: true }, 
		   			   function(){   
		   				$scope.reset();
		   		 });
			})
			.error(function(data, status, headers, config) {
				//console.log(data);
				$scope.httpLoading=false;
				 if(data.err == "Expired Session")
				  {
	       		  $('#driverUpdateModal').modal('hide');
				      expiredSession();
				      $localStorage.$reset();
				  }
		       	  else if(data.err == "Invalid User"){
		       		  $('#driverUpdateModal').modal('hide');
		       		  invalidUser();
		   			  $localStorage.$reset();  
		       	  }
				
			}).finally(function(){		
				$scope.httpLoading=false;
			});
	 }
	 /*
	  * ===============================>>>>> End of Update Driver info  function <<<<<==========================================
	  * */
	 /*
		 * ===============================>>>>> Delete Driver function <<<<<==========================================
		 * */
	 $scope.deleteDriver=function(idVal){
		 swal({
			  title: "Password Confirmation Required!",
			  text: "Enter your password",
			  type: "input",
			  inputType:"password",
			  showCancelButton: true,
			  closeOnConfirm: false,
			  animation: "slide-from-top",
			  inputPlaceholder: "Enter your password"
			},
			function(inputValue){
			  if (inputValue === false) return false;
			  
			  if (inputValue === "") {
			    swal.showInputError("You need to enter password!");
			    return false
			  }
			  confirmUser(inputValue,function(result){
				  if(result){
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
				         			$scope.httpLoading=true;
				         			 $scope.deleteDriverObject={}
				         			 $scope.deleteDriverObject.token=$scope.token;
				         			 $scope.deleteDriverObject.driver_id=idVal;
				         			 $http({
				         					method:'POST',
				         					url:apiURL+'driver/delete',
				         					data:JSON.stringify($scope.deleteDriverObject),
				         					headers:{'Content-Type':'application/json'}
				         				})
				         				.success(function(data){
				         					console.log(data);
				         					swal({title: "Driver Deleted Successfully",
				         			   			   text: "Success!",   
				         			   			   type: "success",   
				         			   			   confirmButtonColor: "#9afb29",   
				         			   			   closeOnConfirm: true }, 
				         			   			   function(){   
				         			   				$scope.searchDriver="";
				         			   		 });
				         					$scope.httpLoading=false;
				         					$scope.listDrivers();
				         				})
				         				.error(function(data, status, headers, config) {
				         					console.log(data);
				         					swal({title:data.err});
				         					$scope.httpLoading=false;
				         				}).finally(function(){		
				         					$scope.httpLoading=false;
				         				});
				         			
				         		}
				         		else{
				         			swal("Cancelled", "You have cancelled :)", "error");
				         		}
				         	});
				  }
				  else{
					  swal("Warning!", "You wrote wrong password ", "error");  
				  }
			  });			  
			});
	 }
	 function confirmUser(passwordValue,cb){
		 $scope.httpLoading=true;
		 var flag;
		 $scope.verifyUser={};
		 $scope.verifyUser.token=$scope.token;
		 $scope.verifyUser.password=passwordValue;
		 $http({
				method:'POST',
				url:apiURL+'user/confirmpassword',
				data:JSON.stringify($scope.verifyUser),
				headers:{'Content-Type':'application/json'}
			})
			.success(function(data){
				flag=data.status;				
				cb(flag);
			})
			.error(function(data, status, headers, config) {
				flag=data.status;				
				cb(flag);
				$scope.httpLoading=false;
			}).finally(function(){		
				$scope.httpLoading=false;
			});		 
	 }
	 
	 /*
		 * ===============================>>>>> End of Delete Driver function <<<<<==========================================
		 * */
	$(document).ready(function() {		
		$.getScript('../assets/select_filter/select2.min.js', function() {
					$('#id_label_multiple').select2({						  
					      placeholder: "Select / Type Languages Known",
					      allowClear: true,					     
					      maximumSelectionSize: 5
					      });
					$('#updatelangSelect').select2({
						placeholder: "Select / Type Languages Known",
					      allowClear: true,					     
					      maximumSelectionSize: 5
						 });
				
			});
		
	});
 /*$(document).ready(function(){
	       $('#perid').trigger('click');
	
 });*/
});

