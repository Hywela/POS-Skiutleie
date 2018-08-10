// JavaScript Document

$(document).ready(function(){

	 
	 $("#top_content").load('menue.html');
	 $("#middle_content").load('home.html');
});


//Loggs the user in and sets a cookie
function submitReceip() {
	 $("#middle_content").load('menue.html');
	
}


//checks if the user is already logged in
function sendRentForm() {
	var id = Get_Cookie('id');
	if(id !=''){
	$.ajax({
		url: "./script/loginok.php",
		type: "post",
		data: {'uid': Get_Cookie('id')}, dataType:"json", 
		  success: function(data){
			  if (data.ok=='OK'){
				$("#right_content_loggedout").hide();
	           $("#right_content_loggedin").first().show();
	           $("#right_content_loggedin_userData").html(data.name);  
	        user_authorization('admin_show');
	        getI();
		  }else {$("#right_content_loggedout").show();  }
			  
	      }
		
	    }); 			
	}else { $("#right_content_loggedout").show(); }
};



// opens and loades the register dialog
function register () {
	$("#register").load("register.html");
	$("#register").dialog("open");
};


// checks if the user is already logged in
function isloggedin() {
	var id = Get_Cookie('id');
	if(id !=''){
	$.ajax({
		url: "./script/loginok.php",
		type: "post",
		data: {'uid': Get_Cookie('id')}, dataType:"json", 
		  success: function(data){
			  if (data.ok=='OK'){
				$("#right_content_loggedout").hide();
	           $("#right_content_loggedin").first().show();
	           $("#right_content_loggedin_userData").html(data.name);  
	        user_authorization('admin_show');
	        getI();
		  }else {$("#right_content_loggedout").show();  }
			  
	      }
		
	    }); 			
	}else { $("#right_content_loggedout").show(); }
};


// Loggs the user in and sets a cookie
function loggInn(form) {
	$.ajax({
		url: "./script/login.php",
		type: "post",
		data: {'uname': form.uname.value, 'pwd': form.pwd.value}, dataType:"json", 
		  success: function(data){
			  // if the name == the name returned
			  if (data.returned_val == form.uname.value ) {		 
				 // sets a cookie with the id
				  Set_Cookie( 'id', data.id, 7, '/', '', '' );
				  // visual manipulation
			   $("#right_content_loggedout").hide();
	           $("#right_content_loggedin").first().show();
	           $("#right_content_loggedin_userData").html(form.uname.value);
	           // checks if the admin menu should be showed
	           	user_authorization('admin_show');
	            getI();
	           	// if password or user name is wrong
			  }else  { 
					$('#fail').first().show();
					$('#input').first().get(0).focus();
			  }	  
	      },
	      error:function(data){
	    	  alert("Error - Please Contact Support");
	    	  $("#right_content").html('There is error in the code Please contact Support Staff ');
	      }   
	    }); 			
};

// Opens the admin dialog and loads the admin html
 function admin () {
	$(document).ready(function(){
	$("#admin").load("content_admin.html");
	$("#admin").dialog("open");
	 });
};

// Opens the profile dialog and loads the profile html
 function profile() {
	 $(document).ready(function(){
	 $("#profile").load("content_profile.html");	
	 $("#profile").dialog("open");
	 });
	
	
};
// check if the user has admin rights and takes different parameters 
// 
function user_authorization(temp) {
	
	$.ajax({
		url: './script/user_authorization.php',
		type: "post",
		data: {'uid': Get_Cookie('id')},
		 dataType:"json",
		 // Whe the ajax return sucsessfuly
		 success: function (data) {
				// if the user has admin acess
			  if (data.returned_val == 'true') {	
				  // sett the admin link to show
				if(temp == 'admin_show') {$("#right_content_admin").show(); }
				if(temp == 'admin_site') {
					$('#admin_site').html("Administrator - Menu");
					  
				}		  
			  } 
			// If a there is a error with the php code part  
		} ,error:function(data){
			 alert(data.returned_val);
	    	 // alert("Error - Please Contact Support");
	    	  
	      }   
		
	});
	
};

// function for loggin user out
function loggOut () {
	Delete_Cookie('id','/', '');
	$.ajax({
		url: './script/logout.php',
		success: function (tmp) {
			$('#right_content').load('login.html');
			isloggedin();
			if (  !GetParameterValues('v') ) {
				$("#middle_content").hide("blind", { direction: "right" }, function() {$("#middle_content").load('home.html').show("blind", { direction: "right" });});	
				
			}
		}
	});
};


function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
};

function Set_Cookie( name, value, expires, path, domain, secure )
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
};
// function for delting a cookie
function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) ) document.cookie = name + "=" +
	( ( path ) ? ";path=" + path : "") +
	( ( domain ) ? ";domain=" + domain : "" ) +
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	};
	

