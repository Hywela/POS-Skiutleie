/** reads number input and checks if the receipt id exsist
 * then sets the button on or off **/
$("#receipt_article").on('input', function(){
	var receiptID = $(this).val();
	$.ajax({
		url: "php_script/check_receiptID.php",
		type: "post",
		data: {'receipt_id':receiptID}, dataType:"json", 
		  success: function(data){
			
		if( data.receipt_id  == receiptID){
		$("#button_receipt").prop('disabled', false);

	} else {
		$("#button_receipt").prop('disabled', true);
		
	}},  error: function(){
			
		$("#button_receipt").prop('disabled', true);	
	}	  	
		   }); 	

});
/*$("#receipt_article").on('input', function(){
var receiptID = $(this).val();
$.ajax({
	url: "php_script/check_receiptID.php",
	type: "post",
	data: {'receipt_id':receiptID}, dataType:"json", 
	  success: function(data){
		
	if( data.receipt_id  == receiptID){
	$("#button_receipt").prop('disabled', false);

} else {
	$("#button_receipt").prop('disabled', true);
	
}},  error: function(){
		
	$("#button_receipt").prop('disabled', true);	
}	  	
	   }); 	

});*/