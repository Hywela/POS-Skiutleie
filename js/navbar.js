$(".nav a").on("click", function(){

   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
	
});
function rentOut(){
	 $("#middle_content").load('rentOut.html');
}
function returnInn(){
	 $("#middle_content").load('returnInn.html');
}
function today_list(){
	 $("#middle_content").load('lastAdded.html');
}
function getHome(){

}
$('#home').on('click', function() {
	
   $(this).parent().parent().find('.active').removeClass('active');
   $("#middle_content").load('home.html');
});
function priceList(){
	$("#middle_content").load('priceList.html');
	
}
function endOfDay(){
	$("#middle_content").load('endofday.html');
}
function updateReceipt(){
	$("#middle_content").load('updateReceipt.html');
}
function futureRentalOut(){
	$("#middle_content").load('futureRentalOut.html');
}
$("#receipt_search").change(function(){
	$("#parameter1_search").val('');
	$("#parameter2_search").val('');
	$("#parameter3_search").val('');

	$("#parameter1_search").addClass('hidden');
	$("#parameter2_search").addClass('hidden');
	$("#parameter3_search").addClass('hidden');
	$("#parameter4_search").addClass('hidden');
	
	var searchType =  $(this).val();
	if(searchType == 1){
		
		$("#parameter1_search").removeClass('hidden');
	
	}else if(searchType == 2){
		
		$("#parameter1_search").removeClass('hidden');
		$("#parameter2_search").removeClass('hidden');
		$("#parameter3_search").removeClass('hidden');
		
	}else if(searchType == 3){
		$("#parameter4_search").removeClass('hidden');
	}
	else if(searchType == 4){
		$("#parameter4_search").removeClass('hidden');
	}
	
	
	});

$('#search_form').submit( function(e){
	
    e.preventDefault();
    
    get_searchOverhead();
    
 
  
  
   // updateDateToOverview(this);
});
function get_searchOverhead(){
	
	
	
	
	var receiptID="0";
	var first_name="0";
	var last_name="0";
	var telephone="0";
	var date = "0";
	
	var searchType =  $("#receipt_search").val();
	
	if(searchType == 1){

		 receiptID=$('#parameter1_search').val();
	
	}else if(searchType == 2){
		
		 first_name=$('#parameter1_search').val();
		 last_name=$('#parameter2_search').val();
		 telephone=$('#parameter3_search').val();
		
	}else if(searchType == 3){
		date  = new Date($('#parameter4_search').val());
		date = date.toDateInputValue();
	
	}else if(searchType == 4){
		date  = new Date($('#parameter4_search').val());
		date = date.toDateInputValue();
	
	}
	
	 $('#middle_content').load("search.html", function() {
		 if(searchType != 4){
		 src_new(receiptID,
					first_name,
					last_name,
					telephone,
					date);
		 src_old(receiptID,
					first_name,
					last_name,
					telephone,
					date);
		 }else{
			 src_on_in_date(true,date);
			 src_on_in_date(false,date);

		 }

					
				});
	
}

function src_on_in_date(tabel_type,
		date){
	var phpscript ="";
	if(tabel_type == true){
		phpscript  = "php_script/search_on_in_date_ongoing.php";
	}else{
		phpscript  = "php_script/search_on_in_date_old.php";
	}
	$.ajax({
		url: phpscript,
		type: "post",
		data: {
			'date':date
			}, dataType:"json", 
		  success: function(data){
			  var arrayLength = data.length;
			  var stringBuilder="";
			 
			  var color="danger";
				for (var i = 0; i < arrayLength; i++) {
					var redirct =""; 
						if(read_prop(data[i], "delivered_back") !=null){
							color = "success";
							redirct = " \"javascript:old_receipt(this)\" ";
						} else {
							color="danger";
							redirct = " \"javascript:ongoing_receipt(this)\" ";
						}

					
						stringBuilder +=" <tr href=\"javascript:void(0)\" onclick="+ redirct  +
						"id=\""+  read_prop(data[i], "id") +"\" class=\""+color+"  \">" +
						read_prop(data[i], "rented_out")  +
						"<td >" + read_prop(data[i], "first_name")  + " </td>"+
						"<td >" + read_prop(data[i], "last_name")  + " </td>"+
						"<td >" + read_prop(data[i], "telephone")  + " </td>"+
						"<td>" + read_prop(data[i], "total_price")  + " </td>"+
						"<td>" + read_prop(data[i], "rented_out")  + " </td>"+
						"<td>" + read_prop(data[i], "rented_to")  + " </td>"+
						"</tr>";
				
				
				
		}
		 $("#search_table").append(stringBuilder);
		  }
	   }); 
	 
	
}

function src_new(receiptID,
		first_name,
		last_name,
		telephone,
		date){
	
	$.ajax({
		url: "php_script/searchOngoing.php",
		type: "post",
		data: {'receipt_id':receiptID,
			'first_name':first_name,
			'last_name':last_name,
			'telephone':telephone,
			'date':date
			}, dataType:"json", 
		  success: function(data){
			  var arrayLength = data.length;
			  var stringBuilder="";
			 
			  var color="danger";
				for (var i = 0; i < arrayLength; i++) {
					 
						if(read_prop(data[i], "delivered_back") !=null){
							color = "success";
						} else {
							color="danger";
						}
					
						stringBuilder +=" <tr href=\"javascript:void(0)\" onclick=\"javascript:ongoing_receipt(this)\"" +
						"id=\""+  read_prop(data[i], "id") +"\" class=\""+color+"  \">" +
						read_prop(data[i], "rented_out")  +
						"<td >" + read_prop(data[i], "first_name")  + " </td>"+
						"<td >" + read_prop(data[i], "last_name")  + " </td>"+
						"<td >" + read_prop(data[i], "telephone")  + " </td>"+
						"<td>" + read_prop(data[i], "total_price")  + " </td>"+
						"<td>" + read_prop(data[i], "rented_out")  + " </td>"+
						"<td>" + read_prop(data[i], "rented_to")  + " </td>"+
						"</tr>";
				
				
				
		}
		 $("#search_table").append(stringBuilder);
		  }
	   }); 
	 
	
}

function src_old(receiptID,
		first_name,
		last_name,
		telephone,
		date){

	$.ajax({
		url: "php_script/searchOld.php",
		type: "post",
		data: {'receipt_id':receiptID,
			'first_name':first_name,
			'last_name':last_name,
			'telephone':telephone,
			'date':date
			}, dataType:"json", 
		  success: function(data){
			  var arrayLength = data.length;
			  var stringBuilder="";
			 
			  var color="danger";
				for (var i = 0; i < arrayLength; i++) {
					 
						if(read_prop(data[i], "delivered_back") !=null){
							color = "success";
						} else {
							color="danger";
						}
					
						stringBuilder +=" <tr href=\"javascript:void(0)\" onclick=\"javascript:old_receipt(this)\"" +
						"id=\""+  read_prop(data[i], "id") +"\" class=\""+color+"  \">" +
						read_prop(data[i], "rented_out")  +
						"<td >" + read_prop(data[i], "first_name")  + " </td>"+
						"<td >" + read_prop(data[i], "last_name")  + " </td>"+
						"<td >" + read_prop(data[i], "telephone")  + " </td>"+
						" <td>" + read_prop(data[i], "total_price")  + " </td>"+
						"<td>" + read_prop(data[i], "rented_out")  + " </td>"+
						"<td>" + read_prop(data[i], "rented_to")  + " </td>"+						
						"</tr>";
				
				
				
		}
		 $("#search_table").append(stringBuilder);
		  }
	   }); 	
	
	
}

function outstanding_rent(){
	
	 $('#middle_content').load("search.html", function() {
		 
		 $.ajax({
				url: "php_script/outstanding_rent.php",
				type: "post",
				data: {
					}, dataType:"json", 
				  success: function(data){
				
					  var stringBuilder="";
					 
				  stringBuilderSearch(data.length, data, "", "ongoing_receipt");
				
					  
				  }
			   }); 			
		 
				});
	
}
function delivery_expected_today(){
	 var date = new Date();
	 date.setDate(date.getDate());
	 $('#parameter4_search').val(date.toDateInputValue());
	 var date = $('#parameter4_search').val();
	 $('#middle_content').load("search.html", function() {
		 
		 $.ajax({
				url: "php_script/delivery_expected_today.php",
				type: "post",
				data: {
					'date':date
					}, dataType:"json", 
				  success: function(data){
				
					  var stringBuilder="";
					 
				  stringBuilderSearch(data.ongoing.length, data.ongoing, "danger", "ongoing_receipt");
				  stringBuilderSearch(data.old.length, data.old, "success", "old_receipt" );
					  
				  }
			   }); 			
		 
				});
	
	
	
}
function stringBuilderSearch(arrayLength, dataType, color, jfunc){
	var stringBuilder ="";
	for (var i = 0; i < arrayLength; i++) {
	
		stringBuilder +=" <tr href=\"javascript:void(0)\" onclick=\"javascript:"+jfunc+"(this)\"" +
		"id=\""+  read_prop(dataType[i], "id") +"\" class=\""+color+"  \">" +
		read_prop(dataType[i], "rented_out")  +
		"<td >" + read_prop(dataType[i], "first_name")  + " </td>"+
		"<td >" + read_prop(dataType[i], "last_name")  + " </td>"+
		"<td >" + read_prop(dataType[i], "telephone")  + " </td>"+
		"<td>" + read_prop(dataType[i], "total_price")  + " </td>"+
		"<td>" + read_prop(dataType[i], "rented_out")  + " </td>"+
		"<td>" + read_prop(dataType[i], "rented_to")  + " </td>"+
		"</tr>";
		
}
$("#search_table").append(stringBuilder);
}
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});