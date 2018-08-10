//------ 	Profil.js		-----------//
//--- Used in : content_profile.html -//
$(document).ready(function(){
	//$( "#dd" ).css("color", "Red");
	$( "#user_name" ).attr('disabled', true);
	getInformation();
	getImage();
});


//called when updating the password
function updatePwd(form) {
	var id = Get_Cookie('id'); //get user id from cookie to pass into the php file
	$.ajax({
		url: "./script/updateProfile.php",
		type: "post",
		data: {'id':id, 'pwd': form.pwd.value, 'pwd2': form.pwd2.value, 'oldPwd': form.oldPwd.value},
		dataType:"json", 
		  success: function(data){
			  alert(data.returned_val);
	      }, error: function(data){
	    	  alert("error changing password");
	      }
	    }); 
};


// Funksjon som hjelper til med tabs
$(function() {
	$( "#profile_tabs" ).tabs();
	});



//used to get the username current user name from the database
function getInformation(){
	var id = Get_Cookie('id');
	$.ajax({
		url: "./script/profile_GetInformation.php",
		type: "post",
		data: {'id':id},
		dataType:"json", 
		  success: function(data){
			  $( "#user_name" ).attr('value', data.id).attr('disabled', true);
	      } 
	    }); 			
};
	
//refreshes the user image for the profile dialog box and for in the logged in field
	function getImage(){
		$('#image_login').first()[0].src = 'script/userImage.php?uid='+Get_Cookie('id');
		$('#aa').first()[0].src = 'script/userImage.php?uid='+Get_Cookie('id');			
	};
	