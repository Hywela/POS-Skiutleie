<?php
require_once 'db.php';

$receipt_id = $_POST['receipt_id'];

$sql = 'SELECT rental_ongoing.receipt_id, customer.first_name, customer.last_name , customer.telephone
FROM rental_ongoing
 JOIN  customer
ON rental_ongoing.person_id=customer.id WHERE rental_ongoing.receipt_id =(:receipt_id)';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':receipt_id', $receipt_id);

$sth->execute ();

	$customer = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	
	// Send a response indicating success
	echo json_encode($customer);





?>