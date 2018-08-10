$(document).ready(function(){
	getList();

});
function read_prop(obj, prop) {
    return obj[prop];
}


function getList() {
	
	$.ajax({
		url: "php_script/get_addedToday.php",
		type: "post",
		data: {}, dataType:"json", 
		  success: function(data){
			  
		var arrayLength = data.length;
			
	
				
				for (var i = 0; i < arrayLength; i++) {
				
				$('#list_input').append(" "
						+"<tr>"
						+"<td>"
						+ read_prop(data[i], "receipt_id" )
						+"</td>"
						+"<td>"
						+read_prop(data[i], "f_name" )
						+"</td>"
						+"<td>"
						+read_prop(data[i], "l_name" )
						+"</td>"
						+"</tr>");
				}
			
				},
				 error: function (request, status, error) {
					 $('#info_panel').removeClass("panel panel-primary");
					 $('#info_panel').addClass("panel panel-warning"); 
					
					 $('#info_panel').html("<h1> "+ request.responseText + " </h1>");
				 }
			  	
		
		   }); 	

	
}