$(document).ready(function(){
	getEquipmentOptions();
	getAgeGroup();

	 $('#ageGroup').addClass('hidden');
	 $('#equipmentPackage').addClass('hidden');
	 $('#addPackageButton').addClass('hidden');
	 
	
});
function getPriceList(){
	var eq_option = $( "#equipmentOption" ).val();
	var ag_option =  $( "#ageGroup" ).val();
	var package_option =  $( "#equipmentPackage" ).val();
	 $('#price_list_body tr').each(function() {
		
		 
		 getPrice(eq_option,ag_option,package_option,
				 parseInt($(this).find('span[id="day"]').text()),
						 $(this).find('input[id="price"]'),
						 $(this).find('span[id="id"]')
						 );
	 
	 
	 
	 });
	
}
function getPrice(eq_option, ag_option, package_option, days, $inputfield , $id){

	$.ajax({
		url: "php_script/getOrInsert_priceTable.php",
		type: "post",
		data: {
			'eq_option':eq_option,
			'ag_option':ag_option,
			'package_option':package_option,
			'days_id':days
			}, dataType:"json",  
		  success: function(data){
			  $id.html(data.id);
			  $inputfield.val(data.price);
				},
				error: function(){
				
				}
		   }); 	

	
}

$("#equipmentOption").change(function(){
	$('#priceListEditing').addClass('hidden');
	$("#add_item").prop('disabled', true);
	$('#equipmentPackage')
    .find('option')
    .remove()
    .end()
    .append('<OPTION value ="0" SELECTED>-- Vare --</OPTION> ')
    .val('0');

	$('#equipmentPackage').addClass('hidden');
	 $('#addPackageButton').addClass('hidden');
	 $("#ageGroup").val($("#ageGroup option:first").val());
	 $('#ageGroup').addClass('hidden');
	var check = $(this).children("option:selected").data("function_id");
	
	if(check == 1){//if annet
		
	}else if(check > 1){
		 $('#ageGroup').removeClass('hidden');
	} else{
		 $('#ageGroup').addClass('hidden');
	}	
	
	});

$("#ageGroup").change(function(){
	$('#priceListEditing').addClass('hidden');
	$('#equipmentPackage')
    .find('option')
    .remove()
    .end()
    .append('<OPTION value ="0" SELECTED>-- Vare --</OPTION> ')
    .val('0');

	var eq_option = $( "#equipmentOption" ).val();
	
	if( eq_option > 0){
		
		getEquipmentPackages(eq_option);
		$('#equipmentPackage').removeClass('hidden');
		 $('#addPackageButton').removeClass('hidden');
	} else{
		$('#equipmentPackage').addClass('hidden');
	}	
	
	});
$("#equipmentPackage").change(function(){
		
	var eq_option = $( "#equipmentOption" ).val();
	var ag_option =  $( "#ageGroup" ).val();
	var package_option =  $( "#equipmentPackage" ).val();

	
	if(ag_option > 0 && eq_option > 0 && package_option > 0) {
		getPriceList();
		$('#priceListEditing').removeClass('hidden');
		//getPriceFromTable(eq_option, ag_option, package_option, days, extra_days );
	//	 $("#add_item").prop('disabled', false);

	} else{
		alert("Should not run");
	}	
	
	});
function addPackage(){
	var name = $( "#package_name" ).val();
	var equipmentType = $( "#equipmentOption" ).val();
	
	$.ajax({
		url: "php_script/insert_package.php",
		type: "post",
		data: {'equipment_type':equipmentType,
			'name':name},  
		  success: function(){
				alert("sucess");
				}	  	
		   }); 	

	$('#equipmentPackage')
    .find('option')
    .remove()
    .end()
    .append('<OPTION value ="0" SELECTED>-- Vare --</OPTION> ')
    .val('0');
	
	var eq_option = $( "#equipmentOption" ).val();

	getEquipmentPackages(eq_option);
	
}
function updatePriceList(){
 $('#price_list_body tr').each(function() {
		
		 
	 updatePrice( $(this).find('input[id="price"]').val(),
						 parseInt($(this).find('span[id="id"]').text())
						 );
	 
	 
	 
	 });
 

}
function updatePrice( price,  id ){
	
	$.ajax({
		url: "php_script/update_priceTable.php",
		type: "post",
		data: {
			'price':price,
			'id':id
			},  
		  success: function(){
			
				},
				error: function(){
					alert("error");
				}
		   }); 	

	$('#priceListEditing').addClass('hidden');
	 $('#ageGroup').addClass('hidden');
	 $('#equipmentPackage').addClass('hidden');
	
	 $('#addPackageButton').addClass('hidden');
}
