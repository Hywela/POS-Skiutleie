$(document).ready(function(){


	 var date = new Date();
	 date.setDate(date.getDate());
	 $('#datepicker').val(date.toDateInputValue());

});
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
function getStatics(){
	
}
function endOfDayReceipt(form){
		$('#print').load("endofdayreceipt.html", function() {
		//$('#receipt_date').html($('#date').text());
	
		$('#receipt_date').text($('#datepicker').val());
		getReceiptID_paymentMethod_today(4,$('#total_faktura_count'),$('#faktura_numbers') );
		getReceiptID_paymentMethod_today(6,$('#total_voucher'),$('#voucher_numbers') );
		getReceiptID_paymentMethod_today(5,$('#total_not_paid'),$('#not_paid_numbers') );
		calculate_earnings_and_diff();
		});

	
}
function getReceiptID_paymentMethod_today(payment_method,count, insert) {
	
	$.ajax({
		url: "php_script/getEODreceiptID.php",
		type: "post",
		data: {'payment_method': payment_method,
			'date':  $('#datepicker').val()}, dataType:"json", 
		  success: function(data){
			 var arrayLength = 0;
			  var receiptIDstring="";
				if(data.length > 0){
					
				 arrayLength = data.length;
				
				for (var i = 0; i < arrayLength; i++) {
					receiptIDstring += ""+ read_prop(data[i], "id" );
					receiptIDstring += " , ";
				
				}	
				insert.html(receiptIDstring);
				count.html(arrayLength);
				}else {
					
					count.html(arrayLength);
				}
				},
			
				 error: function (request, status, error) {
				 $('#info_panel').removeClass("panel panel-primary");
				 $('#info_panel').addClass("panel panel-warning"); 
				
				 $('#info_panel').html("<h1> "+ request.responseText + " </h1>");
			 }
			  	
		   }); 	

	
}
function calculate_earnings_and_diff() {

	$.ajax({
		url: "php_script/get_EODearnings.php",
		type: "post",
		data: {'date':  $('#datepicker').val()}, dataType:"json", 
		  success: function(data){

					var t_cash = parseFloat(read_prop(data[0], 'cash_total' ));
					var t_cash_out = parseFloat(read_prop(data[0], 'cash_out_total' ));

					var total_cash = (  t_cash - t_cash_out);
					
					var total_card = parseFloat(read_prop(data[0], 'card_total' ));
					 $('#totalt_in_card').html(total_card);
					 $('#totalt_in_cash').html(total_cash+" (ut:"+ t_cash_out +")");
					/// var diff_card = counted_card-total_card;
					// var diff_cash =  counted_cash-total_cash;
					// $('#diff_card').html(diff_card);
				//	 $('#diff_cash').html(diff_cash );
					 $('#total_receipt_count').html(read_prop(data[0], 'count' ));
					 $('#total_amount').html((total_card+total_cash)
							 +"");
					// post_EOD(total_cash,total_card,counted_cash,counted_card, diff_card, diff_cash);
				},
			
				 error: function (request, status, error) {
					 alert(request.responseText );
			 }
			  	
		   }); 	

}
function post_EOD(t_cash,t_card,c_cash,c_card, diff_card, diff_cash){
	$("#eodButton").prop('disabled', true);
	
	var name = $('#name').val();
	var total_faktura_count = $('#total_faktura_count').text();
	var faktura_numbers = $('#faktura_numbers').text();
	var total_voucher = $('#total_voucher').text();
	var voucher_numbers = $('#voucher_numbers').text();
	var total_not_paid = $('#total_not_paid').text();
	var not_paid_numbers = $('#not_paid_numbers').text();
	var comment_input = $('#comment_input').val();
	

	
	$.ajax({
		url: "php_script/reg_EOD.php",
		type: "post",
		data: {
			'total_card':t_card,
			'total_cash':t_cash,
			'counted_card':c_card,
			'counted_cash':c_cash,
			'name':name,
			'total_faktura_count':total_faktura_count,
			'faktura_numbers':faktura_numbers,
			'total_voucher':total_voucher,
			'voucher_numbers':voucher_numbers,
			'total_not_paid':total_not_paid,
			'not_paid_numbers':not_paid_numbers,
			'comment_input':comment_input,
			'diff_card':diff_card,
			'diff_cash':diff_cash
			}, dataType:"json", 
		  success: function(data){
		//	alert("SUCESS");
				//	var t_cash = parseFloat(read_prop(data[0], 'cash_total' ));
	
					 $('#receipt_id').html(data.eod_id);
				//	 $('#totalt_in_cash').html(total_cash);
			
				},
			
				 error: function (request, status, error) {
					 alert(request.responseText );
			 }
			  	
		   }); 	
	
	
}