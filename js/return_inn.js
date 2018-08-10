
$('#button_receipt').on('click', function() {
	
	var receiptID = $('#receipt_article').val();
	var htmlPage="";
	var endMessage = " Ha en fin dag !";
	var checkboxes = $("input[name='englishCheck']");
	if(checkboxes.is(":checked")){
		htmlPage ="receiptPrintEnglish.html";
		endMessage = "Have a nice day!";
	}else{
		htmlPage ="receiptPrintNorwegian.html";
		endMessage = "Ha en fin dag og velkommen tilbake!";
	}
	
	
	$('#mainView').load(htmlPage, function() {
		
			getReceipt(receiptID,endMessage);
		
		$("#receipt_id").html(receiptID);
		$('#commentButton').load("comment_popover.html", function() {
			loadComment(receiptID,"#message-text");
			
		});
	
		$('#deliverButton').load("validateDelivery.html", function() {
			loadComment(receiptID,"#message-text-delivery");
				
			});
	
		getMiscouliouseItems(receiptID);
		getPackageItem(receiptID);
		
		 
	   // $('.name').html("DDDDDDDDDDDDD");

	});
	    // now $(this) contains #somediv
	
	
	});


