<?php
require_once 'db.php';

//$receipt_id = $_POST['receipt_id'];
$receipt_id = $_POST['receipt_id'];
$sql = 'SELECT
  receipt.total_price,
  receipt.rented_out,
  receipt.rented_to,
   payment_table.payd_card,
    payment_table.payd_cash,
   payment_table.back_cash,
  comment.comment,
  payment_method.name AS payment_name,
  customer.id AS customer_id,
  customer.first_name,
  customer.last_name,
  customer.telephone
FROM receipt
  INNER JOIN payment_table
    ON receipt.id = payment_table.receipt_id
  INNER JOIN comment
    ON receipt.comment_id = comment.id
  INNER JOIN payment_method
    ON payment_table.payment_method = payment_method.id
  INNER JOIN rental_ongoing
    ON rental_ongoing.receipt_id = receipt.id
  INNER JOIN customer
    ON rental_ongoing.person_id = customer.id
WHERE receipt.id =(:receipt_id)';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':receipt_id', $receipt_id);

$sth->execute ();

	$customer = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	
	// Send a response indicating success
	echo json_encode($customer);





?>