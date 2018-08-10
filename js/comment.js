
function loadComment(receiptID, tag){	
	$.ajax({
		url: "php_script/get_comment.php",
		type: "post",
		data: {
			'id':receiptID
				}, dataType:"json",
				 success: function(data){  
						$(tag).val(data.comment);
					 
				 },
				 error: function (request, status, error) {
				        alert(request.responseText);
	    	$('#message-text').val("Noe feil har forekommet! venligst abryt og prøv igjenn eller kontakt admin");
			 }
	
		
	    }); 
}
function updateComment_button(){

	updateComment($('#message-text').val(),
			$('#receipt_id').text());

}
function updateComment(message, receiptID){	

	$.ajax({
		url: "php_script/uppdate_comment.php",
		type: "post",
		data: {
			'id':receiptID,
			'comment':message
				},
				 success: function(){ 
				 },
				 error: function (request, status, error) {
				        alert(request.responseText);
	    
			 }
	
		
	    }); 
}