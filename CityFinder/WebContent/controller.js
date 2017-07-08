var app = angular.module("myApp",[]);

app.controller("myCtrl",['$scope','$http',function($scope,$http){
		
		$scope.search=function(name){
			$http.get("http://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric&appid=964ff625b23110b7cac131a419caf844").then(Accepted , Error)
		};
		var Accepted=function(response){
			$scope.country = response.data;
			$http.get("http://api.geonames.org/timezoneJSON?lat="+ $scope.country.coord.lat  +"&lng="+ $scope.country.coord.lon +"&username=rozeka").then(CTime , Error)
		};
		
		var CTime=function(response){
			$scope.times=response.data;
			var someString = $scope.times.time;
			var index = someString.indexOf(" "); 
			var reversedate = someString.substr(0, index);
			var day=reversedate.substr(8, index);
			var month=reversedate.substr(5,2);
			var year=reversedate.substr(0,4);
			$scope.date=day+"/"+month+"/"+year;
			$scope.curTime = AM_PM(someString);
			someString = $scope.times.sunrise;
			$scope.sunrise = AM_PM(someString);
			someString = $scope.times.sunset;
			$scope.sunset = AM_PM(someString);
			
			
			
		};
		
		var Error=function(reason){
			$scope.error = "Something went wrong :(";
		};
	}]);

app.filter('capitalize', function() {
    	return function(input) {
    		return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    	}
	});

function AM_PM(someString)
{
	var index = someString.indexOf(" "); 
	var CurHr = someString.substr(index + 1,2);
	var CurHrs=parseInt(CurHr);
	if(CurHrs>=12)
		{
		if(CurHrs>12){
			
			CurHrs=CurHrs-12;
			
			}
			
		var CurMins = someString.substr(index + 3,3);
		return String(CurHrs)+CurMins+ " PM";
		
		}
	else {
		
		if(CurHrs==0){
			
			CurHrs=CurHrs+12;
			
		}
		
		var CurMins = someString.substr(index + 3,3);
		return String(CurHrs)+CurMins+ " AM";
	}
	

}

	
	
	