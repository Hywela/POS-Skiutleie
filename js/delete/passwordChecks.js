//used to check the password strenght and that the re-entered password is the same as the new password
//we have no requirement for password strenght so this is only to give the user a mesurement as to how good the
//password he is writing is.

//password strenght check
$(document).ready(function(){
	$('#pwd').keyup(function(){
		var pwd = $('#pwd').val();
		
		//calculate password strenght
		var strength = 0;
		if(pwd.length > 4){	//length
			strength++;
		}
		if (pwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){ //contains lover and upper case
			 strength++;
		}
		if (pwd.match(/([a-zA-Z])/) && pwd.match(/([0-9])/)){ //contains letters and numbers
			strength++;
		}
		if (pwd.match(/([!,%,&,@,#,$,^,*,?,_,~])/)){ //special symbols
			strength++;
		}
		
		//output to screen
		if(pwd.length == 0){	//nothing entered in password field, dont show anything
			$('#pwdStatus').removeClass()
			.text('');
		}else if(strength < 2){	//poor password
			$('#pwdStatus').removeClass()
				.addClass('weak')
				.text('weak');
		}else if(strength == 2){ //good password
			$('#pwdStatus').removeClass()
				.addClass('good')
				.text('good');
		}else if(strength > 2){ //strong password
			$('#pwdStatus').removeClass()
				.addClass('strong')
				.text('strong');
		}
	});
});

//check to se if the re-entered password is the same as the new one
$(document).ready(function(){
	$('#pwd2').keyup(function(){
		if($("#pwd").val() == ''){		//if nothing is entered dont show anything
			$('#pwd2Status').removeClass()
				.text('');
		}else if($("#pwd").val() == $("#pwd2").val()){	//if password match show green
			$('#pwd2Status').removeClass()
			.addClass('strong')
			.text('OK!');
		}else{											//as long as they dont match show red
			$('#pwd2Status').removeClass()
			.addClass('weak')
			.text('Dont match');
		}
	});
});