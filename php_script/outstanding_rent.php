<?php
require_once 'db.php';


//$receipt_id = $_POST['receipt_id'];


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
FROM rental_ongoing
  INNER JOIN receipt
    ON rental_ongoing.receipt_id = receipt.id
  INNER JOIN customer
    ON rental_ongoing.person_id = customer.id
 
	ORDER BY DATE(receipt.rented_to) DESC
";

// WHERE DATE(receipt.rented_to) < NOW()
$sth = $galadb->prepare($sql);
// Perform the query

$sth->execute ();
	$ongoing = $sth->fetchAll(PDO::FETCH_ASSOC);

	// Send a response indicating success
	echo json_encode($ongoing);






?>