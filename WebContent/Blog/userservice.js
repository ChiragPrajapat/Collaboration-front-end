'use strict';

angular.module('myApp').factory('UserService',['$http','$q',function($http, $q) {

							var REST_SERVICE_URI = 'http://localhost:8081/CollaborationBackEnd';
							var factory = {
								fetchAllUserPage : fetchAllUserPage,
								createUser : createUser,
								updateUser : updateUser,
								deleteUser : deleteUser
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
							
							function createUser(user) {
								alert(" in user service:" + user.u_name);
								
								var deferred = $q.defer();
								$http.post(REST_SERVICE_URI + "/user/create",user)
								
										.then(function(response) {
													deferred.resolve(response.data);
												},
												function(errResponse) {
													console.error('Error while fetching all user page');
													deferred.reject(errResponse);
												});
								return deferred.promise;
							}
							
							   function updateUser(user, userId) {
								   alert("update user :"+ userId);
							        var deferred = $q.defer();
							        $http.put(REST_SERVICE_URI+"/user/edit/"+userId, user)
							            .then(
							            function (response) {
							                deferred.resolve(response.data);
							            },
							            function(errResponse){
							                console.error('Error while updating User');
							                deferred.reject(errResponse);
							            }
							        );
							        return deferred.promise;
							    }
							
							
							 function deleteUser(userId) {
								 alert("update user :"+ userId);
							        var deferred = $q.defer();
							        $http.delete(REST_SERVICE_URI+"user/delete/"+userId)
							            .then(
							            function (response) {
							                deferred.resolve(response.data);
							            },
							            function(errResponse){
							                console.error('Error while deleting User');
							                deferred.reject(errResponse);
							            }
							        );
							        return deferred.promise;
							    }
						} ]);
