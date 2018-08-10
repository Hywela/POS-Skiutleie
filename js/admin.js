

$(document).ready(function(){
	
	userlevel();

});

// checks the userlevel - ENDPHASE notes dont know if its needed anymore 
function userlevel(){
	
	user_authorization('admin_site');
		
	
};

//gets the id for the user logged in and returns it
function getUser(){
	var user=Get_Cookie('id');
	
return user;
}
//  Checks the input from parameter:form and display output to be changed
function admin_check_input(form){
	var userrights= '';
	if (form.Level.value == '2'){userrights='Administrator'; }else userrights = 'User';
	
	$("#pwd_fail").hide().css("color", "Red");
	 $("#test").html('');
	if(form.Level.value !=''&& getUser()!=''&& form.userToChange.value!= '')	
	{
	
	$("#test").html(" Skifter bruker : ").append(form.userToChange.value)
	.append(" til bruker level : ").append(userrights);
	
	$("#hidden_submit").show();
	}else $("#test").html("Please fill both User and User Level ");
};

// admin_UserlevelChange Parameter:form , Sends data to php file 
// and some user feedback.
function admin_UserlevelChange(form){
	 $("#pwd_fail").hide().css("color", "Red");
	 $("#test").html('');
	
if(form.pwd.value !=''){
	
	//pass check for admin
	
	$.ajax({
		url: "./script/admin_userlevel.php",
		type: "post",
		data: {'admin':getUser(),  'pwd' : form.pwd.value, 'userToChange' : form.userToChange.value ,'userLevel' : form.Level.value},
		dataType:"json", 
		  success: function(data){
			 
			  if (data.returned_val == 'Sucess' ) {
				  $("#pwd_fail").css("color", "Green");
				  $("#pwd_fail").html(data.returned_val).show();
				  $("#hidden_submit").hide();
				  $("#test").hide();
				 
			  }else  {
				 
				if(data.returned_val != 'admin_error') {
					$("#hidden_submit").hide(); $("#pwd_fail").html(data.returned_val).show();
			  }else $("#pwd_fail").html("Wrong Admin Password").show();
					
				  $("#test").hide();
			  }
			  
	      },
	      error:function(data){
	    	  $("#pwd_fail").html(data.returned_val).show();
	    	  
	    	 
	      }   
	    }); 			
		
	}else $("#pwd_fail").html("Please type in your admin password").show();

};
// function for controlling tje tabs
$(function() {
	$( "#tabs" ).tabs();
	});
