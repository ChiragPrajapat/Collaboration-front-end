'use strict';

angular
		.module('myApp')
		.factory(
				'UserService',
				[
						'$http',
						'$q',
						function($http, $q) {

							var REST_SERVICE_URI = 'http://localhost:8081/CollaborationBackEnd';
							var factory = {
								fetchAllUserPage : fetchAllUserPage
							};

							return factory;

							function fetchAllUserPage() {
								var deferred = $q.defer();
								$http.get(REST_SERVICE_URI + "/users")
										.then(function(response) {
													deferred.resolve(response.data);
												},
												function(errResponse) {
													console.error('Error while fetching all user page');
													deferred.reject(errResponse);
												});
								return deferred.promise;
							}
							function createUser(userdata) {
								$http.post(REST_SERVICE_URI + "/user/create")
								alert(" in user service:" + userdata)
										.then(function(response) {
													deferred.resolve(response.data);
												},
												function(errResponse) {
													console.error('Error while fetching all user page');
													deferred.reject(errResponse);
												});

							}
						} ]);
