'use strict';
 

angular.module('myApp').controller('BlogController', ['$scope', 'BlogService', function($scope, BlogService) {
	alert('calling controller');
    var self = this;
    self.blogdata=[{b_id:null,b_title:'',b_content:'',b_date:'',b_time:''}];
    $scope.blog={b_id:null,b_title:'',b_content:'',b_date:'',b_time:''};
    self.blogs=[]; 
    self.submit = submit;
    self.updateBlog = updateBlog;
    self.deleteBlog = deleteBlog;
    self.reset = reset;
    self.edit = edit;
    self.remove = remove;
 
    fetchAllBlogPage();
    
    function fetchAllBlogPage(){
        BlogService.fetchAllBlogPage()
            .then(
            function(b) {
                self.blogdata = b;
                console.log(b);
            },
            function(errResponse){
                console.error('Error while fetching blogs');
            }
        );
    }
    function createBlog(blog){
    	console.log('blog title ' + blog.b_content);
        BlogService.createBlog(blog)
            .then(
            function(b){
            	$scope.blog=b;
            	console.log(b);
            	alert("call create blog in controller");
            },
            function(errResponse){
                console.error('Error while creating blog');
            }
        );
    }
     
    function submit() {
    	alert("call submit 1");
        console.log('Saving New blog', $scope.blog);
    
        if($scope.blog.b_id===null){
        	alert("blog null -- creating new")
            console.log('Saving New blog', $scope.blog);
            createBlog($scope.blog);
        }else{
             updateBlog($scope.blog, $scope.blog.b_id);
         	alert("blog exist -- updating ")
            console.log(' BlogData updated with id ', $scope.blog.b_id);
        }
    	alert("call submit 2");
        reset();
    }
    function updateBlog(blog,b_id){
    	alert("In uctrl Update Blog :" + b_id )
        BlogService.updateBlog(blog,b_id)
            .then(
            fetchAllBlogPage,
            function(errResponse){
                console.error('Error while updating Blog');
            }
        );
    }

    function deleteBlog(blogId){
    	alert("In controller delete Blog :" + b_id)
        BlogService.deleteBlog(b_id)
            .then(
            	fetchAllBlogPage,
            function(errResponse){
                console.error('Error while deleting Blog');
            }
        );
    }

    function edit(blogId){
    	alert("in uctrl edit function:" + b_id);
        console.log('id to be edited',b_id);
        console.log('data self.blogs.length:',self.blogdata.length);
        for(var i = 0; i < self.blogdata.length; i++){
        	
        console.log("value of i :" +i);
        	console.log('data self.blogdata[i].blogId:',self.blogdata[i].b_id);
        	if(self.blogdata[i].b_id === b_id) {
                $scope.blog = angular.copy(self.blogdata[i]);
                console.log('copied data',$scope.blog);
                break;
            }
        }
      //  updateBlog(blogId);
    }

    function remove(blogId){
    	alert("in uctrl remove function:" + b_id);
        console.log('id to be deleted', b_id);
        if($scope.blog.b_id === b_id) {//clean form if the blog to be deleted is shown there.
            reset();
        }
        deleteBlog(b_id);
    }

   function reset(){
	   self.blog={b_id:null,b_title:'',b_content:'',b_date:'',b_time:''};
//        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);
