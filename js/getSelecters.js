
function getPriceFromTable( eq_option, ag_option, package_option, days, extra_days ){
	var price = 0.00;
	
	$.ajax({
		url: "php_script/get_priceTable.php",
		type: "post",
		data: { 'eq_option': eq_option,
				'ag_option': ag_option,
				'package_option': package_option,
			  }, dataType:"json", 
		  success: function(data){
			
			  var extradayprice;
			  
			  for (var index = 0; index < data.length; index++) {
				 
				  if(read_prop(data[index],'days_id') == days ){
					
					  price = parseFloat(read_prop(data[index],'price'));
					 // alert(read_prop(data[index],'days_id') + " " + days +"  " +price );
				  } else if (read_prop(data[index],'days_id') == 0 ){
					  extradayprice = read_prop(data[index],'price');
				  }
				}
			  		
			  if(extra_days > 0){
				  price += parseInt(extra_days) * parseFloat(extradayprice);
			  }
			  
			  $( "#price" ).val(price);
			
				$('#equipmentPackage').data('price_table', JSON.stringify(data));
				//alert($("#days").data("fixeddays"));
				//alert($("#equipmentPackage").data("price_table"));
			
			
				},
				 error: function (request, status, error) {

				
				 $('#list').html("<h1> "+ request.responseText + " </h1>");
			 }
			  	
		   }); 	
	
	
	//$('#equipmentPackage').attr('data-packageID', 'Testing 123');
	//$('#equipmentPackage').attr('data-exstraPackageID', 'Testing 123');
	
	
}


function getEquipmentPackages(eq_option) {
	
	$.ajax({
		url: "php_script/get_equipmentPackages.php",
		type: "post",
		data: {'eq_option': eq_option}, dataType:"json", 
		  success: function(data){
			  
				var arrayLength = data.length;
			
			
				
				for (var i = 0; i < arrayLength; i++) {
				$('#equipmentPackage').append("<option value=\""+ read_prop(data[i], "id" ) 
						+"\""
						+"  >"
						+ read_prop(data[i], "name" )
						+"</option>")
			
				}},
				 error: function (request, status, error) {
				 $('#info_panel').removeClass("panel panel-primary");
				 $('#info_panel').addClass("panel panel-warning"); 
				
				 $('#info_panel').html("<h1> "+ request.responseText + " </h1>");
			 }
			  	
		   }); 	

	
}
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
function getAgeGroup() {
	
	$.ajax({
		url: "php_script/get_ageGroup.php",
		type: "post",
		data: {}, dataType:"json", 
		  success: function(data){
				var arrayLength = data.length;
				
				for (var i = 0; i < arrayLength; i++) {
				$('#ageGroup').append("<option value=\""+ read_prop(data[i], "id" ) 
						+"\""
						+"  >"
						+ read_prop(data[i], "name" )
						+"</option>")
			
				}
			  	
		  } }); 	


}
function getEquipmentOptions() {
	//$('#cat').show();
	
	$.ajax({
		url: "php_script/get_equipmentOptions.php",
		type: "post",
		data: {}, dataType:"json", 
		  success: function(data){
				var arrayLength = data.length;
			
				for (var i = 0; i < arrayLength; i++) {
				$('#equipmentOption').append("<option value=\""+ read_prop(data[i], "id" ) 
						+"\""
						+ " data-function_id=\""+  read_prop(data[i], "function_id" )
						+"\" "
						+"  >"
						+ read_prop(data[i], "name" )
						+"</option>");
			
				}
			  	
		  } }); 	

}
function getReceipt(receiptID, endText) {
	

	
	$.ajax({
		url: "php_script/get_receiptInfo.php",
		type: "post",
		data: {'receipt_id':receiptID }, dataType:"json", 
		  success: function(data){
			 
			  	$("#name").html(read_prop(data[0], "first_name" ) + " "+ read_prop(data[0], "last_name" ));
				$("#telephone").html(read_prop(data[0], "telephone" ));
				$("#total_amount").html(read_prop(data[0], "total_price" ));
				$("#rented_to_date").html(read_prop(data[0], "rented_to" ));
				$("#rented_date").html(read_prop(data[0], "rented_out" ));
			
				total = parseFloat(read_prop(data[0], "total_price" ));
				
				var back_cash = 0;
				var payd_cash = 0; var payd_card = 0; var paid = 0; var total=0;
				  var arrayLength = data.length;
				  
					for (var i = 0; i < arrayLength; i++) {
						
				$("#payment_status").html(read_prop(data[i], "payment_name" ));
				
				back_cash = back_cash +  parseFloat(read_prop(data[i], "back_cash" ));
				
				total = parseFloat(read_prop(data[i], "total_price" ));
				payd_cash += parseFloat(read_prop(data[i], "payd_cash" ));
				payd_card += parseFloat(read_prop(data[i], "payd_card" ));
					}
				paid = parseFloat(payd_card) + parseFloat(payd_cash);
				
				
				
				$("#foot_total_amount").html(total);
				
		
				$("#foot_back_amount").html(back_cash);
				$("#foot_paid_amount").html(paid);
				
				$("#foot_cash_amount").html(payd_cash);
				$("#foot_card_amount").html(payd_card);
				
				
			var sum = (total-(paid-back_cash));
				if(sum > 0){
				$("#big_foot_total_amount").html(sum);
				}else {
					
					$("#foot_endMessage").html(endText);
				}
			
		  }
		   }); 	

}

function getReceiptOld(receiptID, endText) {
	
	$.ajax({
		url: "php_script/get_receiptInfo_old.php",
		type: "post",
		data: {'receipt_id':receiptID }, dataType:"json", 
		  success: function(data){
			 
			  	$("#name").html( read_prop(data[0], "first_name" ) + " "+ read_prop(data[0], "last_name" ));
				$("#telephone").html(read_prop(data[0], "telephone" ));
				$("#total_amount").html(read_prop(data[0], "total_price" ));
				$("#rented_to_date").html(read_prop(data[0], "rented_to" ));
				$("#rented_date").html(read_prop(data[0], "rented_out" ));
			
				total = parseFloat(read_prop(data[0], "total_price" ));
				
				var back_cash = 0;
				var payd_cash = 0; var payd_card = 0; var paid = 0; var total=0;
				  var arrayLength = data.length;
				  
					for (var i = 0; i < arrayLength; i++) {
						
				$("#payment_status").html(read_prop(data[i], "payment_name" ));
				
				back_cash = back_cash +  parseFloat(read_prop(data[i], "back_cash" ));
				
				total = parseFloat(read_prop(data[i], "total_price" ));
				payd_cash += parseFloat(read_prop(data[i], "payd_cash" ));
				payd_card += parseFloat(read_prop(data[i], "payd_card" ));
					}
				paid = parseFloat(payd_card) + parseFloat(payd_cash);
				
				
				
				$("#foot_total_amount").html(total);
				
		
				$("#foot_back_amount").html(back_cash);
				$("#foot_paid_amount").html(paid);
				
				$("#foot_cash_amount").html(payd_cash);
				$("#foot_card_amount").html(payd_card);
				
				
			var sum = (total-(paid-back_cash));
				if(sum > 0){
				$("#big_foot_total_amount").html(sum);
				}else {
					
					$("#foot_endMessage").html(endText);
				}
			
		  }
		   }); 	

}
function getMiscouliouseItems(receiptID) {

	
	$.ajax({
		url: "php_script/get_miscouliouseItems.php",
		type: "post",
		data: {'receipt_id':receiptID }, dataType:"json", 
		  success: function(data){
			  var arrayLength = data.length;
			  var stringBuilder="";
				for (var i = 0; i < arrayLength; i++) {
					
				
					stringBuilder += "<tr>" 
					+"<td>"	
				    +  read_prop(data[i], "count")    
				    +" </td>"
				    +"<td>"
				    + read_prop(data[i], "type_name") +" - "+ read_prop(data[i], "text")
				    + "</td>"
				    +"<td>"
					
				    + read_prop(data[i], "price")
				    
				    + "  </td>"
				  
				    +"<td>"
					
				    + read_prop(data[i], "price")
				    
				    + "  </td>"

					+ "</tr>";
				
				}
				
				$("#article_lines").append(stringBuilder);
			
		  }
		   }); 	

}
function getPackageItem(receiptID) {
	
	  
	
	$.ajax({
		url: "php_script/get_packageItems.php",
		type: "post",
		data: {'receipt_id':receiptID }, dataType:"json", 
		  success: function(data){
			
			  var stringBuilder="";
			  var textString="";
			  var arrayLength = data.length;
			  
				
				for (var i = 0; i < arrayLength; i++) {
					if(read_prop(data[i], "days_id") == "0"){
						textString = "Extra days";
						
					}else{
						
						textString = read_prop(data[i], "equipment_name") +" - " + read_prop(data[i], "age_name") 
					    +" - "+ read_prop(data[i], "package_name") +" (" + read_prop(data[i], "days_id")+")";
					}
					
						
					stringBuilder +=
					"<tr>" 
					+"<td>"	
				    +  read_prop(data[i], "count")    
				    +" </td>"
				    +"<td>"
				    + textString
				    + "</td>"
				    +"<td>"
					
				    +   read_prop(data[i], "price")
				    
				    + "  </td>"
				  
				    +"<td>"
					
				    +  parseFloat(read_prop(data[i], "price"))*parseInt(read_prop(data[i], "count"))
				    
				    + "  </td>"

					+ "</tr>";
				
				}
				$("#article_lines").append(stringBuilder);
			
		  }
		   }); 	

}
function get_update_Receipt(receiptID) {
	

	
	$.ajax({
		url: "php_script/get_receiptInfo.php",
		type: "post",
		data: {'receipt_id':receiptID }, dataType:"json", 
		  success: function(data){
		
			    $('#customerInfo').data('customerID', read_prop(data[0], "customer_id" ) );
			  	$("#first_name").val(read_prop(data[0], "first_name" ));
			  	$("#last_name").val(read_prop(data[0], "last_name" ));
				$("#telephone").val(read_prop(data[0], "telephone" ));
				
				$("#old_sum").html(read_prop(data[0], "total_price" ));
			
				$("#datepicker").val(read_prop(data[0], "rented_to" ));
		
		
			
		  }
		   }); 	

}
function get_deliveredDate(receiptID){
	$.ajax({
		url: "php_script/get_deliveredDate.php",
		type: "post",
		data: {'receipt_id':receiptID }, dataType:"json", 
		  success: function(data){
			  $('#rented_deliverd_div').removeClass("hidden");
		      $('#rented_deliverd').html( read_prop(data[0], "delivered_back" ) );
		
		
			
		  }
		   }); 	
}