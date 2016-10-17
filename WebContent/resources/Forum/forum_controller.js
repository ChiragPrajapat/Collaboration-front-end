'use strict';
 

angular.module('myApp').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
	alert('calling controller');
    var self = this;
    self.forumdata=[{forumId:null,u_name:'',u_address:'',u_forumname:'',u_password:'',u_gender:'',u_contact:'',u_email:'',u_dob:''}];
    $scope.forum={forumId:null,u_name:'',u_address:'',u_forumname:'',u_password:'',u_gender:'',u_contact:'',u_email:'',u_dob:'',enabled:''};
    self.forums=[]; 
    self.submit = submit;
    self.updateUser = updateUser;
    self.deleteUser = deleteUser;
    self.reset = reset;
    self.edit = edit;
    self.remove = remove;
 
    fetchAllUserPage();
    
    function fetchAllUserPage(){
        UserService.fetchAllUserPage()
            .then(
            function(d) {
                self.forumdata = d;
                console.log(d);
            },
            function(errResponse){
                console.error('Error while fetching forums');
            }
        );
    }
    function createUser(forum){
    	console.log('uname ' + forum.u_name + 'address ' + forum.u_address);
        UserService.createUser(forum)
            .then(
            function(u){
            	$scope.forum=u;
            	console.log(u);
            	alert("call create forum controller");
            },
            function(errResponse){
                console.error('Error while creating forum');
            }
        );
    }
     
    function submit() {
    	alert("call submit 1");
        console.log('Saving New forum', $scope.forum);
    
        if($scope.forum.forumId===null){
        	alert("forum null -- creating new")
            console.log('Saving New forum', $scope.forum);
            createUser($scope.forum);
        }else{
             updateUser($scope.forum, $scope.forum.forumId);
         	alert("forum exist -- updating ")
            console.log(' UserData updated with id ', $scope.forum.forumId);
        }
    	alert("call submit 2");
        reset();
    }
    function updateUser(forum,forumId){
    	alert("In uctrl Update User :" + forumId )
        UserService.updateUser(forum,forumId)
            .then(
            fetchAllUserPage,
            function(errResponse){
                console.error('Error while updating User');
            }
        );
    }

    function deleteUser(forumId){
    	alert("In controller delete User :" + forumId)
        UserService.deleteUser(forumId)
            .then(
            	fetchAllUserPage,
            function(errResponse){
                console.error('Error while deleting User');
            }
        );
    }

    function edit(forumId){
    	alert("in uctrl edit function:" + forumId);
        console.log('id to be edited',forumId);
        console.log('data self.forums.length:',self.forumdata.length);
        for(var i = 0; i < self.forumdata.length; i++){
        	
        console.log("value of i :" +i);
        	console.log('data self.forumdata[i].forumId:',self.forumdata[i].forumId);
        	if(self.forumdata[i].forumId === forumId) {
                $scope.forum = angular.copy(self.forumdata[i]);
                console.log('copied data',$scope.forum);
                break;
            }
        }
      //  updateUser(forumId);
    }

    function remove(forumId){
    	alert("in uctrl remove function:" + forumId);
        console.log('id to be deleted', forumId);
        if($scope.forum.forumId === forumId) {//clean form if the forum to be deleted is shown there.
            reset();
        }
        deleteUser(forumId);
    }

   function reset(){
	   self.forum={forumId:null,u_name:'',u_address:'',u_forumname:'',u_password:'',u_gender:'',u_contact:'',u_email:'',u_dob:''};
//        $scope.myForm.$setPristine(); //reset Form
    }
 
}]);
