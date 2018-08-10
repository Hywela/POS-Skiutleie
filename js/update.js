/**
 * 
 */
function load_receipt_into_Updater(){
	var receiptID = parseInt($('#receipt_id').text());
	var htmlPage = "updateReceipt.html";
	$('#mainView').load(htmlPage, function() {
		$('#receipt_id_updater').html(receiptID);
		get_update_Receipt(receiptID);
		loadComment(receiptID,"#comment");

	/*$('#commentButton').load("comment_popover.html", function() {
		loadComment(receiptID,"#message-text");
		
	});*/



	getMiscouliouseItems(receiptID);
	getPackageItem(receiptID);
	
	 
   // $('.name').html("DDDDDDDDDDDDD");

});

	
	/* var date = getReceiptDate();
	 date.setDate(date.getDate());
	 $('#datepicker').val(date.toDateInputValue());
	 dateDifference();*/
}