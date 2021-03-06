'use strict';

angular.module('myApp').factory('BlogService',['$http','$q',function($http, $q) {

							var REST_SERVICE_URI = 'http://localhost:8081/CollaborationBackEnd';
							var factory = {
								fetchAllBlogPage : fetchAllBlogPage,
								createBlog : createBlog,
								updateBlog : updateBlog,
								deleteBlog : deleteBlog
							};

							return factory;

							function fetchAllBlogPage() {
								var deferred = $q.defer();
								$http.get(REST_SERVICE_URI + "/blogs")
										.then(function(response) {
											deferred.resolve(response.data);
												},
												function(errResponse) {
													console.error('Error while fetching all blog page');
													deferred.reject(errResponse);
												});
								return deferred.promise;
							}
							
							function createBlog(blog) {
								alert("create in blog service:" + blog.b_title);
								
								var deferred = $q.defer();
								$http.post(REST_SERVICE_URI + "/blog/create",blog)
								
										.then(function(response) {
													deferred.resolve(response.data);
												},
												function(errResponse) {
													console.error('Error while fetching all blog page');
													deferred.reject(errResponse);
												});
								return deferred.promise;
							}
							
							   function updateBlog(blog) {
								   console.log("blog in service:" +blog.b_title +"id:"+blog.b_id);
								 //  alert("update blog :"+ blogId);
							        var deferred = $q.defer();
							        $http.post(REST_SERVICE_URI+"/blog/edit",blog)
							            .then(
							            function (response) {
							                deferred.resolve(response.data);
							            },
							            function(errResponse){
							                console.error('Error while updating Blog');
							                deferred.reject(errResponse);
							            }
							        );
							        return deferred.promise;
							    }
							
							
							 function deleteBlog(b_id) {
								 alert("in service delete:"+ b_id);
							        var deferred = $q.defer();
							        $http.delete(REST_SERVICE_URI+"/blog/delete/"+b_id)
							            .then(
							            function (response) {
							                deferred.resolve(response.data);
							            },
							            function(errResponse){
							                console.error('Error while deleting Blog');
							                deferred.reject(errResponse);
							            }
							        );
							        return deferred.promise;
							    }
						} ]);
