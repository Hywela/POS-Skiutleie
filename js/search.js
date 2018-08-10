/**
 * 
 */

function ongoing_receipt(id){
	var htmlPage ="receiptPrintNorwegian.html";

	var endMessage = "Ha en fin dag og velkommen tilbake!";
$('#mainView').load(htmlPage, function() {
	
		getReceipt(id.id ,endMessage);
	
	$("#receipt_id").html(id.id);
	$('#commentButton').load("comment_popover.html", function() {
		loadComment(id.id ,"#message-text");
		
	});

	$('#deliverButton').load("validateDelivery.html", function() {
		loadComment(id.id,"#message-text-delivery");
			
		});

	getMiscouliouseItems(id.id);
	getPackageItem(id.id);
	
	 
   // $('.name').html("DDDDDDDDDDDDD");

});
    // now $(this) contains #somediv



}
function old_receipt(id){
	var htmlPage ="receiptPrintNorwegian.html";
	var endMessage = "Ha en fin dag og velkommen tilbake!";
	$('#mainView').load(htmlPage, function() {
	
		$("#update_button").prop('disabled', true);
		getReceiptOld(id.id,endMessage);
	
		get_deliveredDate(id.id);
	$("#receipt_id").html(id.id);
	$('#commentButton').load("comment_popover.html", function() {
		loadComment(id.id,"#message-text");
		
	});

	

	getMiscouliouseItems(id.id);
	getPackageItem(id.id);
	
	 
   // $('.name').html("DDDDDDDDDDDDD");


    // now $(this) contains #somediv


});
	
}