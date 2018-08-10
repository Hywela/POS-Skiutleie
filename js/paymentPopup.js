$(document).ready(function(){
	getPaymentMethods();
	
});
function getPaymentMethods() {
	
	$.ajax({
		url: "php_script/get_paymentMethods.php",
		type: "post",
		data: {}, dataType:"json", 
		  success: function(data){
				var arrayLength = data.length;
				
				for (var i = 0; i < arrayLength; i++) {
				$('#paymentMethod').append("<option value=\""+ read_prop(data[i], "id" ) 
						+"\""
						+"  >"
						+ read_prop(data[i], "name" )
						+"</option>")
			
				}
			  	
		  } }); 	


}

$("#inn_cash").change(function(){
	
	if($("#paymentMethod").val() == "2"){
	
	var to_pay = parseFloat($("#total_price").val());
	
	var inn_cash = parseFloat($(this).val());

	var diff = inn_cash;
	
	
		$("#back_cash").val( diff - to_pay);
	
	} else {
		
		var to_pay = parseFloat($("#total_price").val());
		
		var inn_cash = parseFloat($(this).val());
		var inn_card = parseFloat($("#inn_card").val());
		var diff = inn_cash+inn_card;
		
		$("#back_cash").val( diff - to_pay);
		
	}
	
	
	
});
$("#inn_card").change(function(){
var to_pay = parseFloat($("#total_price").val());
	
	var inn_cash = parseFloat($("#inn_cash").val());

	var inn_card = parseFloat($(this).val());
	
	
	var diff = inn_cash+inn_card;
	
	if(diff > to_pay ){	
		
		$("#back_cash").val(diff - to_pay);
	}else if(diff < to_pay){
		
		$("#inn_cash").val(to_pay - inn_cash);
		inn_card = parseFloat($("#inn_cash").val());
		diff = inn_cash - to_pay;
		$("#back_cash").val(diff);
	}else{
		
		//$("#inn_cash").val(to_pay - inn_cash);
		
	}
});

$("#paymentMethod").change(function(){
	 $('#div_inn_cash').addClass('hidden');
	 $('#div_inn_card').addClass('hidden');
	 $('#div_back_cash').addClass('hidden');
	 $('#inn_cash').val(0);
	 $('#inn_card').val(0);
	 $('#back_cash').val(0);
	 
	var selecter = $(this).val();
	if(selecter == "1"){
		
		
	}
	if(selecter == "2"){
		 $('#div_inn_cash').removeClass('hidden');
		 $('#div_back_cash').removeClass('hidden');
	}else if (selecter =="3"){
		 $('#div_inn_card').removeClass('hidden');
		$('#div_inn_cash').removeClass('hidden');
		 $('#div_back_cash').removeClass('hidden');
	}else if (selecter =="4"){
		
	}
	 
	
	});
