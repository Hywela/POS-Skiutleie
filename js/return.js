

function validateDelivery(){
	
	var receiptID = $('#receipt_id').text();
	 
	var message = $('#message-text-comment-not-saved').val();
	$.ajax({
		url: "php_script/deliver.php",
		type: "post",
		data: {
			'receiptID':receiptID,
				}, dataType:"json", 
				 success: function(data){ 
					 $('#table_middle_content').html("<div  class=\"client-info\" align=\"left\"" +
					 		"<h4 >  <strong>" +
					 		"Levert" +
					 		" </strong>" +
					 		"<br><strong>Dato : </strong>" + data.date +
					 		"<br><strong>Kommentar : </strong> <br>" + message 
					 		+"</h4>"
					 		+"<h2>"
					 		+"<br>"
					 		+"Gålå Ski Arena - Skiutlleie"
					 		+"<br>"
					 		+"Velkommen tilbake!"
					 		+"</h2>"
					 		
					 		+"</div>");
					 $('#message-text').val("System Kommentar: " + $('#message-text').val()+" Kunde Kommentar: "+ message);
					 updateComment();
					
				 },
				 error: function (request, status, error) {
				        alert(request.responseText);
	    
			 }
	
		
	    }); 

	
	
}