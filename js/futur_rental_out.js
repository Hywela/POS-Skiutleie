//when loaded set focus to username field

var id = 0;
$(document).ready(function(){


	//$('#datepicker').datepicker(Default: Beginning of time)
	getEquipmentOptions();
	getAgeGroup();
	getPaymentMethods();
	
	//getHelmSize();
	 $('#ageGroup').addClass('hidden');
	 $('#equipmentPackage').addClass('hidden');
	 $('#miscellaneous').addClass('hidden');
	 
/*
	 $('#cat').addClass('hidden');
	 $('#helm_size').addClass('hidden');
	 $('#size').addClass('hidden');
	 $('#info_panel').removeClass("panel-primary");
	 $('#info_panel').addClass("panel-success"); */
	 var date = new Date();
	 date.setDate(date.getDate());
	 $('#datepicker').val(date.toDateInputValue());
	 $('#datepicker_from').val(date.toDateInputValue());
	 dateDifference();
	 $('#price').attr('readonly', true);
	// $('.paymentMethod option:eq(3)');
	
	

});

Date.daysBetween = function( date1, date2 ) {
	  //Get 1 day in milliseconds
	  var one_day=1000*60*60*24;


	  // Convert both dates to milliseconds
	  var date1_ms = date1.getTime();
	  var date2_ms = date2.getTime();

	  // Calculate the difference in milliseconds
	  var difference_ms = date2_ms - date1_ms;
	
	  if(difference_ms <= one_day){
		
		  return 1;
	  }else if (difference_ms > one_day){
	  // Convert back to days and return
	  return Math.round(difference_ms/one_day); }
	}

function dateDifference() {
    // check if both is not empty

	var start = new Date($('#datepicker_from').val());
	var end   = new Date($('#datepicker').val());
	start.setHours(00);
	start.setMinutes(00);
	start.setSeconds (00);
	var hours = start.getHours();
		

	end.setHours(24);
	end.setMinutes(00);
	end.setSeconds(00);
	var days = Date.daysBetween(start, end);
	
	var extraDays = 0;
	$("#days").html(days);
	if(days > 7){
	 extraDays = days - 7;
	 days =  7;
	
	
	}
	$('#days').data('fixeddays', days);

	$('#days').data('extradays', extraDays);
	//alert($("#days").data("fixeddays"));
	//alert($("#days").data("extradays"));

}
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function deleteInOverView(itemID) {
	var toDelete = $(itemID).attr("id");
var sum = parseFloat($("#"+toDelete).data('article_line_price'));
	
	//alert("ddd");
	//alert();
	

$("#total_price").val(parseFloat($("#total_price").val())-sum);

	$("#sum").html(parseFloat($("#sum").text())-sum);
	
	
			$("#"+toDelete).remove();
}

$("#equipmentOption").change(function(){
	$("#add_item").prop('disabled', true);
	$('#equipmentPackage')
    .find('option')
    .remove()
    .end()
    .append('<OPTION value ="0" SELECTED>-- Vare --</OPTION> ')
    .val('0');
	 $('#price').attr('readonly', true);
	$('#equipmentPackage').addClass('hidden');
	 $('#miscellaneous').addClass('hidden');
	 $("#ageGroup").val($("#ageGroup option:first").val());
	 $('#ageGroup').addClass('hidden');
	var check = $(this).children("option:selected").data("function_id");
	
	if(check == 1){//if annet
		 $('#price').attr('readonly', false);
		 $('#miscellaneous').removeClass('hidden');
		 $("#add_item").prop('disabled', false);
	}else if(check > 1){
		 $('#ageGroup').removeClass('hidden');
	} else{
		 $('#ageGroup').addClass('hidden');
	}	
	
	});

$("#ageGroup").change(function(){
	$('#equipmentPackage')
    .find('option')
    .remove()
    .end()
    .append('<OPTION value ="0" SELECTED>-- Vare --</OPTION> ')
    .val('0');
	$("#add_item").prop('disabled', true);
	var eq_option = $( "#equipmentOption" ).val();
	var ag_option =  $(this).val();

	if(ag_option > 0 && eq_option > 0){
		
		getEquipmentPackages(eq_option);
		$('#equipmentPackage').removeClass('hidden');
	} else{
		$('#equipmentPackage').addClass('hidden');
	}	
	
	});
$("#equipmentPackage").change(function(){
	$("#add_item").prop('disabled', true);
	var eq_option = $( "#equipmentOption" ).val();
	var ag_option =  $( "#ageGroup" ).val();
	var package_option =  $( "#equipmentPackage" ).val();
	var days = $("#days").data("fixeddays");
	var extra_days = $("#days").data("extradays");
	
	if(ag_option > 0 && eq_option > 0 && package_option > 0 && days > 0) {
	
	
	
		getPriceFromTable(eq_option, ag_option, package_option, days, extra_days );
		 $("#add_item").prop('disabled', false);

	} else{
		alert("Velg dato eller forny");
	}	
	
	});
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
	
	
		
		$("#back_cash").val(diff - to_pay);
		
	
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

function addItem(form) {

	$.ajax({
		url: "php_script/RentItem.php",
		type: "post",
		data: {'count': form.count.value,
			'cat': form.cat.value,
			'size': form.size.value }, dataType:"json"
				
	    }); 			
	
	$("#overview").html("rentOK.html");
	
	  //  $("#middle_content").html("Error");
};


function buildOverView(item){
var count = parseInt(read_prop(item, "count"));
var extradayprice = 0;
var days;

var extradays = parseInt($('#days').data('extradays'));

var price , itemPrice;
var data;
var packageID, extraPackageID;
var extradaycost;

var sum = parseFloat($("#total_price").val());


//alert("ddd");
//alert();



if(read_prop(item, "type" ) === "1"){
	price  =  parseFloat(read_prop(item,'price'));
	sum += price;
}else{
	
	days = read_prop(item, "days" );
	data = $.parseJSON( read_prop(item, "packageData" ));
  for (var index = 0; index < data.length; index++) {
	 
	  if(read_prop(data[index],'days_id') == days ){
		
		  itemPrice = parseFloat(read_prop(data[index],'price'));
		  packageID = read_prop(data[index],'id');
		 // alert(read_prop(data[index],'days_id') + " " + days +"  " +price );
	  } else if (read_prop(data[index],'days_id') == 0 ){
		  extradaycost = parseFloat( read_prop(data[index],'price'));
		  extraPackageID = read_prop(data[index],'id');
	  }
	}

	  extradayprice = extradays * extradaycost;

	  price = (count * (parseFloat(itemPrice)));
	  sum += count * extradayprice;
	  sum += price;


}

var stringBuilder = "<tr  id =\"overviewID" + read_prop(item, "id" ) + "\" " 
+ " data-count=\""+ read_prop(item, "count") 
+"\" "
+ " data-article_line_price=\""+  (price+extradayprice)
+"\" "
+ " data-type=\""+  read_prop(item, "type" )

+"\" ";

	if( read_prop(item, "type" ) === "1" ){
	
		stringBuilder += 
			
			 " data-articletext=\""+ read_prop(item, "rawtext" )
			+"\" "
			+ " >"
		+"<td>"
	    + read_prop(item, "count") 
	    
	    +" </td>"

	    +"<td>"
	    + read_prop(item, "article_text" )
	    + "</td>"
	    
	    +"<td>"
		
	    + price
	    
	    + "  </td>"
	    +"<td>"
		
	    + price
	    
	    + "  </td>"
	    +"<td id =\"delete\">  <A id =\"overviewID"+read_prop(item, "id" )+" \"ONCLICK=\"deleteInOverView(this)\""
	    +"CLASS=\"glyphicon glyphicon-minus\">"
	    +"</A>  </td> "
		+ "</tr>";
	}else {
	
				  
		stringBuilder += 
		" data-packageid=\""+ packageID 
		+"\" "
		+">"
			+"<td>"
			
		    + read_prop(item, "count") 
		    
		    +" </td>"
	
		    +"<td>"
		    + read_prop(item, "article_text" ) 
		  
		    + "</td>"
		  
		    +"<td>"
			
		    +  itemPrice 
		    
		    + "  </td>"
		    +"<td>"
			
		    +  price 
		    
		    + "  </td> ";
		
		stringBuilder += "<td id =\"delete\">  <A id =\"overviewID"+read_prop(item, "id" )+" \"ONCLICK=\"deleteInOverView(this)\""
	    +"CLASS=\"glyphicon glyphicon-minus\">"
	    +"</A>  </td> "
		+ "</tr>";
		
		if(extradays > 0){
			
		for(var i = 0; i < count; i++){
			stringBuilder +=
				"<tr  id =\"overviewID" + read_prop(item, "id" ) + "\" " 
				+ " data-count=\""+ extradays 
				+"\" "
				+ " data-type=\"" +  read_prop(item, "type" )
				+"\" "
				+" data-packageid=\""+ extraPackageID 
				
				+"\" "
			
				+">"

				+"<td id=\"extradaycost\">"
				
			    + extradays 
			    
			    +" </td>"
		
			    +"<td>"
			    + "Ekstra dager"  
			  
			    + "</td>"
			    
			    +"<td>"
				
			    +  extradaycost 
			    
			    + "  </td>"
			  
			    +"<td id=\"extradaycost\">"
				
			    + extradayprice 
			    
			    + "  </td>";
				
				
				
				+"<td id =\"delete\">"
			+""
			   +"</td> "
				+ "</tr>";
				
		}	
		
	}
		
		
	}
	
	
	


	$("#total_price").val(sum);
	$("#sum").html(sum)

	//$("#total_price").val(sum);
	$("#overview_input").append(stringBuilder);
}
$('#addItemForm').submit( function(e){
	
        e.preventDefault();
        updateDateToOverview(this);
});
$('#nameForm').submit( function(e){
	
    e.preventDefault();
  
});
function updateDateToOverview(form){	
	
	
	var sendToBuilder;

	if( (form.count.value) == ""){
		$('#count').focus(); 
	
	}else {
		var eq_op =form.equipmentOption.options[form.equipmentOption.selectedIndex];
		
	
		var article_textt;
		var price = 0;
		 price = form.price.value;
	if(eq_op.value === "1"){
		article_text = eq_op.text+" - "+ form.miscellaneous.value;
		sendToBuilder = {
				id:id,
				count:form.count.value,
				type:eq_op.value,
				rawtext:form.miscellaneous.value,
				article_text:article_text,
				price:price
			}; 
	
	}else{
		var ag_op = form.ageGroup.options[form.ageGroup.selectedIndex];
		var package_op = form.equipmentPackage.options[form.equipmentPackage.selectedIndex];
		var days = $('#days').data('fixeddays');
		article_text = eq_op.text + " - " + ag_op.text + " - " + package_op.text + "("+days+")" ;
		
		sendToBuilder = {
				id:id,
				count:form.count.value,
				type:eq_op.value,
				article_text:article_text,
				days:days,
				ageGroup:ag_op,
				packageData:$("#equipmentPackage").data("price_table")
				
			}; 
	
	}
	

	buildOverView(sendToBuilder);

	}
	id++;
	
}
		

function send_rec_form(form) {
	 $('#add_name').click();

	
	//$('#nameForm').submit();
	
	
	
	
	var first_name = $('#first_name').val();
	var last_name = $('#last_name').val();
	var telephone = $('#telephone').val();
	var date = $("#datepicker").val();
	var date_from = $("#datepicker_from").val();
	var payment_method = parseFloat($('#paymentMethod').val());
	var payd_cash = parseFloat($('#inn_cash').val());
	var payd_card = parseFloat($('#inn_card').val());
	var payd_back = parseFloat($('#back_cash').val());

	
	var price = $("#total_price").val();
	
	if( payment_method == 1){
		payd_card = price;
	}
	
	var customerID = $('#customerInfo').data('customerID');

	if( first_name == ""){
		
		$('#first_name').focus();
	}else if( last_name == ""){
		$('#last_name').focus();
	}else if( telephone == ""){
		$('#telephone').focus();
	}else if ( date == ""){
		$('#datepicker').focus();
	
	
		
		
	}else {
		 
		
		
		
		var itemList = [];
	
		$('#overview_input  > tr').each(function() {
			var item;
			if($(this).data('type') != "1"){
			
		    item = {
				
				count:$(this).data('count'),
				type:$(this).data('type'),	
				articleText:"",
				package_id: $(this).data('packageid'),
				price: ""
				
					
			}; 
			}else{
			 item = {
						
						count:$(this).data('count'),
						type:$(this).data('type'),	
						articleText:$(this).data('articletext'),
						package_id:"",
						price: $(this).data('article_line_price')
							
					}; 
				
				
			}
		itemList.push(item);
	});
		
		
		
	if(itemList.length > 0){
		
		//$('#overview').focus();
	
	
	$.ajax({
		url: "php_script/reg_rent_future.php",
		type: "post",
		data: {
			'first_name':first_name,
			'last_name':last_name,
			'telephone':telephone,
			'price':price,
			'date_from':date_from,
			'date':date,
			'comment':form.comment.value,
			'payment_method':payment_method,
			'payd_cash':payd_cash,
			'payd_card':payd_card,
			'payd_back':payd_back,
			'customerID':customerID,
			'items':JSON.stringify(itemList)
				}, dataType:"json",
				 success: function(data){  
					 
					 $('#overview').addClass('hidden');
					 $('#customer_info_iput').addClass('hidden');
					 $('#customer_info_iput').addClass('hidden');
					$('#headdelete').remove();
					$('#footdelete').remove();
				/*	$('#overview_input tr > td').each(function() {
						
						if($(this).attr('id') == "delete"){
							
							$(this).remove();
							
						}	});
*/

				// var Clonedtable = jQuery("#overview_table tbody").clone(true);
     
				var endMessage = "Ha en fin dag og velkommen tilbake!";
				 var receiptID = read_prop(data,"receipt_id");
			        var htmlPage="";
			    	
			    	var checkboxes = $("input[name='englishCheck']");
			    	if(checkboxes.is(":checked")){
			    		htmlPage ="receiptPrintEnglish.html";
			    		endMessage = "Have a nice day!";
			    	}else{
			    		htmlPage ="receiptPrintNorwegian.html";
			    		endMessage = "Ha en fin dag!";
			    	}
			    	$('#mainView').load(htmlPage, function() {
			    			getReceipt(receiptID,endMessage);
			    		
			    		$("#receipt_id").html(receiptID);
			    		$('#commentButton').load("comment_popover.html", function() {
			    			loadComment(receiptID,"#message-text");
			    			
			    			
			    		});
			    		
			    		getMiscouliouseItems(receiptID);
			    		getPackageItem(receiptID);
			    	
			    	
			    	});
					 $('#info_panel').html("<h1> Vellykt ! - husk å skriv ut </h1>");
				
					 
				 },
				 error: function (request, status, error) {
				        alert(request.responseText);
				    
				
				 $('#info_panel').removeClass("panel panel-primary");
				 $('#info_panel').addClass("panel panel-warning"); 
				
				 $('#info_panel').html("<h1> "+ request.responseText + " </h1>");
			 }
	
		
	    }); 
	 
	 //buildRecipeOutput("overview_custommer",form.first_name.value,form.last_name.value,form.telephone.value);
	

	 $('#submitForm').addClass('hidden'); 
	 $('#addItemDIv').addClass('hidden'); 
	 
	 $('#overview_foot').removeClass('hidden'); 
	 $('#sum').html(price);
	 $('#first_name').attr('readonly', true);
	 $('#last_name').attr('readonly', true);
	 $('#datepicker').attr('readonly', true);
	 $('#telephone').attr('readonly', true);
	 
	 
	
	//$("#middle_content").load("rentOK.html");
	  //  $("#middle_content").html("Error");
} }
	
};
function buildRecipeOutput(div,parameter_one, parameter_two, parameter_three){
	 $(div).html(
			" div class=\"container\">"
			 +"<div class=\"row\">"
			    +"<div class=\"pull-left\" class=\"col-md-6\">Total cost</div><div class=\"col-md-6\">" 
			    		+"<span class=\"pull-right\">$42</span></div>"
			  +"</div>"
			+"</div>"
	 ); 
	
}
function runRentAgain() {
	 $("#middle_content").load('rentOut.html');
	
}
