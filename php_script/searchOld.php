<?php
require_once 'db.php';

$receipt_id = $_POST['receipt_id'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$telephone = $_POST['telephone'];
$date = $_POST['date'];

//$receipt_id = $_POST['receipt_id'];
$queryWhereStatment;
if($receipt_id != "0"){
	$queryWhereStatment ='WHERE receipt.id LIKE(:receipt_id)';
	
}else if($first_name != "0" && $last_name != "0" && $telephone != "0"){
	$queryWhereStatment ="WHERE  customer.first_name LIKE (:first_name) OR 
			 customer.last_name LIKE (:last_name) OR  customer.telephone LIKE (:telephone)";
}else if($first_name != "0" && $last_name != "0"){
$queryWhereStatment ="WHERE  customer.first_name LIKE (:first_name) OR 
			 customer.last_name LIKE (:last_name) ";
}else if($last_name != "0" && $telephone != "0"){
	$queryWhereStatment ="WHERE 
			 customer.last_name LIKE (:last_name) OR  customer.telephone LIKE (:telephone)";
}else if($first_name != "0" && $telephone != "0"){
	$queryWhereStatment ="WHERE  customer.first_name LIKE (:first_name) OR 
			 customer.telephone LIKE (:telephone)";
}else if($first_name != "0"){
	$queryWhereStatment ="WHERE  customer.first_name LIKE(:first_name)";
}else if($last_name != "0"){
		$queryWhereStatment ="WHERE  customer.last_name LIKE(:last_name)";
}else if($telephone != "0"){
		$queryWhereStatment ="WHERE  customer.telephone LIKE(:telephone)";
}else if($date != "0"){
		$queryWhereStatment ="WHERE  DATE(receipt.rented_out) LIKE (DATE(:date))";

}

$sql = "SELECT
  receipt.id,
  receipt.rented_out,
  receipt.rented_to,
  receipt.delivered_back,
  receipt.changed,
  receipt.total_price,
  customer.first_name,
  customer.last_name,
  customer.telephone
FROM rental_old
  INNER JOIN receipt
    ON rental_old.receipt_id = receipt.id
  INNER JOIN customer
    ON rental_old.person_id = customer.id
		$queryWhereStatment
";

$sth = $galadb->prepare($sql);

// Perform the query

if($receipt_id != "0"){
	$sth->bindParam(':receipt_id', $receipt_id);
	
}else if($first_name != "0" && $last_name != "0" && $telephone != "0"){
	$sth->bindParam(':first_name', $first_name);
	$sth->bindParam(':last_name', $last_name);
	$sth->bindParam('telephone', $telephone);
	
}else if($first_name != "0" && $last_name != "0"){
	$sth->bindParam(':first_name', $receipt_id);
	$sth->bindParam(':last_name', $last_name);
	
}else if($last_name != "0" && $telephone != "0"){
	$sth->bindParam(':last_name', $last_name);
	$sth->bindParam(':telephone', $telephone);
	
}else if($first_name != "0" && $telephone != "0"){
	$sth->bindParam(':first_name', $first_name);
	$sth->bindParam(':telephone', $telephone);
	
}else if($first_name != "0"){
	$sth->bindParam(':first_name', $first_name);
	
}else if($last_name != "0"){
	$sth->bindParam(':last_name', $last_name);
}else if($telephone != "0"){
	$sth->bindParam(':telephone', $telephone);
}else if($date != "0"){
	$sth->bindParam(':date', $date);
	

}

$sth->execute ();

	$customer = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	
	// Send a response indicating success
	echo json_encode($customer);





?>