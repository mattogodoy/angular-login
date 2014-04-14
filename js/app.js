var app = angular.module("app", ['ngRoute']);
var loggedIn = false;

app.config(function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/home', {
		templateUrl: 'home.html',
		controller: 'HomeController'
	});

	$routeProvider.otherwise({ redirectTo: '/login' });
});

app.factory("AuthenticationService", function($location) {
	return {
		login: function(scope) {
			if (scope.credentials.username !== "matto" || scope.credentials.password !== "admin") {
				scope.validLogin = "panel-danger";
				scope.clearPassword();
			} else {
				loggedIn = true;
				$location.path('/home');
			}
		},
		logout: function() {
			loggedIn = false;
			$location.path('/login');
		}
	};
});

app.controller("LoginController", function($scope, $location, AuthenticationService) {
	$scope.credentials = { username: "", password: "" };

	$scope.login = function() {
		AuthenticationService.login($scope);
	}

	$scope.clearPassword = function(){
		$scope.credentials.password = "";
	}
});

app.controller("HomeController", function($scope, $location, AuthenticationService) {
	if(loggedIn){
		$scope.title = "Bienvenido, Matto!";

		$scope.logout = function() {
			AuthenticationService.logout();
		};
	} else {
		$location.path("/login");
	}
});

app.directive("showsMessageWhenHovered", function() {
	return {
		restrict: "A", // A = Attribute, C = CSS Class, E = HTML Element, M = HTML Comment
		link: function(scope, element, attributes) {
			var originalMessage = scope.message;
			element.bind("mouseenter", function() {
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind("mouseleave", function() {
				scope.message = originalMessage;
				scope.$apply();
			});
		}
	};
});