'use strict';
 

angular.module('myApp').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
	alert('calling controller');
    var self = this;
    self.userdata={userId:null,name:'',address:'',username:''};
    self.users=[]; 
    self.submit = submit;
 
    self.reset = reset;
 
    fetchAllUserPage();
    
    function fetchAllUserPage(){
        UserService.fetchAllUserPage()
            .then(
            function(d) {
                self.userdata = d;
                console.log(d);
            },
            function(errResponse){
                console.error('Error while fetching users');
            }
        );
    }
    function createUser(userdata){
        UserService.createUser(userdata)
            .then(
            function(u){
            	self.userdata=u;
            	console.log(u);
            	alert("call create user controller")
            },
            function(errResponse){
                console.error('Error while creating user');
            }
        );
    }
     
    function submit() {
    	alert("call submit 1")
        if(self.userdata.id===null){
            console.log('Saving New user', self.userdata);
            createUser(userdata);
        }else{
            updateUser(self.userdata, self.userdata.id);
            console.log(' UserData updated with id ', self.userdata.id);
        }
    	alert("call submit 2")
        reset();
    }
  
 
   function reset(){
        self.user={id:null,username:'',address:'',email:''};
        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);
