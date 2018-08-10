function print(){
	
	if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){   // Chrome Browser Detected?
		   window.focus(#receipt_input);
		   window.print(#receipt_input);                                             // Print preview
		   window.close(#receipt_input);                                             // Print preview
	}else{
		   window.focus(#receipt_input);
		   window.print(#receipt_input);                                             // Print preview
		   window.close(#receipt_input);                                             // Print preview
		   
	}
	//window.print(#receipt_input);
}