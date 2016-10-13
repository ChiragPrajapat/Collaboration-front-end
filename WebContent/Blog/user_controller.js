'use strict';
 

angular.module('myApp').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
	alert('calling controller');
    var self = this;
    self.userdata={userId:null,u_name:'',u_address:'',u_username:'',u_password:'',u_gender:'',u_contact:'',u_email:'',u_dob:''};
    $scope.user={userId:null,u_name:'',u_address:'',u_username:'',u_password:'',u_gender:'',u_contact:'',u_email:'',u_dob:'',enabled:''};
    self.users=[]; 
    self.submit = submit;
    self.updateUser = updateUser;
    self.deleteUser = deleteUser;
    self.reset = reset();
 
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
    function createUser(user){
    	console.log('uname ' + user.u_name + 'address ' + user.u_address);
        UserService.createUser(user)
            .then(
            function(u){
            	$scope.user=u;
            	console.log(u);
            	alert("call create user controller");
            },
            function(errResponse){
                console.error('Error while creating user');
            }
        );
    }
     
    function submit() {
    	alert("call submit 1");
        console.log('Saving New user', $scope.user);
    
//        if(self.userdata.userId===null){
        	alert("user null -- creating new")
            console.log('Saving New user', $scope.user);
            createUser($scope.user);
//        }else{
          //  updateUser(self.userdata, self.userdata.id);
//        	alert("user exist -- updating ")
//            console.log(' UserData updated with id ', self.userdata.userId);
//        }
    	alert("call submit 2");
        reset();
    }
    function updateUser(user,userId){
        UserService.updateUser(user, userId)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while updating User');
            }
        );
    }

    function deleteUser(userId){
        UserService.deleteUser(id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while deleting User');
            }
        );
    }

    function edit(userId){
    	alert("edit function:" + userId)
        console.log('id to be edited', user.userId);
        for(var i = 0; i < self.users.length; i++){
            if(self.users[i].userId === user.userId) {
                self.user = angular.copy(self.users[i]);
                break;
            }
        }
    }

    function remove(userId){
        console.log('id to be deleted', userId);
        if(self.user.userId === userId) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteUser(userId);
    }

   function reset(){
	   self.user={userId:null,u_name:'',u_address:'',u_username:'',u_password:'',u_gender:'',u_contact:'',u_email:'',u_dob:''};
//        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);
