

function read_prop(obj, prop) {
    return obj[prop];
}

/*$("#first_name , #last_name ,  #telephone").change(function(){
alert( $('#customerInfo').data('customerID') );
	 $('#customerInfo').data('customerID',""); //should make sure when custommer 
				 //changed its a new and not the old 1 

	});*/

$("#select_search_method").change(function(){
	
	$( "#search_receipt" ).addClass("hidden");
	$( "#search_user_info" ).addClass("hidden");
	var option = $( "#select_search_method" ).val();
	if(option =="1"){
		$( "#search_receipt" ).removeClass("hidden");
	}else if(option =="2"){
		
		$( "#search_user_info" ).removeClass("hidden");
	}
	
	});
	
$( "#first_name , #last_name ,  #telephone" ).autocomplete({
			 minLength: 1,
			 source: function (request, response) {
			
				 $.ajax({
						url: "php_script/get_searchName.php",
						type: "post",
						data: {'first_name': $( "#first_name" ).val(),
							   'last_name': $( "#last_name" ).val(),
							   'telephone': $( "#telephone" ).val()}, dataType:"json", 
						
						  success: function(data){
							  	 response($.map(data, function (item) {
				                        return {
				                            label: item.first_name + " " + item.last_name +" - " + item.telephone ,
				                            value: item.last_name,
				                            first_name: item.first_name,
				                            last_name: item.last_name,
				                            telephone: item.telephone,
				                            id: item.id
				                        }
				                    }));
		  	
			    }
							   
			});
		
			 },
			 select: function(event, ui) {
				 event.preventDefault();
				    $('#first_name').val(ui.item.first_name);
				    $('#last_name').val(ui.item.last_name);
				    $('#telephone').val(ui.item.telephone);
				    $('#customerInfo').data('customerID', ui.item.id);
				    $('#first_name').prop('disabled', true);
				    $('#last_name').prop('disabled', true);
				    $('#telephone').prop('disabled', true);
				}
	
});
