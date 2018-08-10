<?php
require_once 'db.php';

$date = $_POST['date'];

//$receipt_id = $_POST['receipt_id'];
$queryWhereStatment;

		$queryWhereStatment ="WHERE  DATE(receipt.rented_to) LIKE (DATE(:date))";



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
	$sth->bindParam(':date', $date);
$sth->execute ();

	$customer = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	
	// Send a response indicating success
	echo json_encode($customer);





?>