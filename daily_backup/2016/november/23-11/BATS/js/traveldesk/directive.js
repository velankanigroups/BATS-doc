//validate password
batstravelDeskHome.directive('passwordValidate', function() {
	    return {
	        require: 'ngModel',
	        link: function(scope, elm, attrs, ctrl) {
	            ctrl.$parsers.unshift(function(viewValue) {

	                scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
	                scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
	                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

	                if(scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
	                    ctrl.$setValidity('pwd', true);
	                    return viewValue;
	                } else {
	                    ctrl.$setValidity('pwd', false);                    
	                    return undefined;
	                }

	            });
	        }
	    };
	});
batstravelDeskHome.directive('repasswordValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.repwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
                scope.repwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
                scope.repwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;               
           

                if(scope.repwdValidLength && scope.repwdHasLetter && scope.repwdHasNumber) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);                    
                    return undefined;
                }
               

            });
        }
    };
});