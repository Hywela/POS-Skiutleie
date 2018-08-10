<?php
require_once 'db.php';
$type = $_POST['payment_method'];
$date = $_POST['date'];

if(isset($type)){
	$galadb->beginTransaction();
	$galadb->query ('LOCK TABLES receipt,payment_table  WRITE');
	
	$sqlquery_1 = '
SELECT
  receipt.id
FROM receipt
  INNER JOIN payment_table
    ON receipt.id = payment_table.receipt_id
WHERE DATE(receipt.changed) = :date AND payment_table.payment_method = :method
		';


$sth = $galadb->prepare($sqlquery_1);
$sth->bindParam(':method', $type);
$sth->bindParam(':date', $date);

$sth->execute ();

// Perform the query

	$galadb->commit();
	$galadb->query ('UNLOCK TABLES receipt,payment_table WRITE');					// Unlock the tables
	$receipts = $sth->fetchAll(PDO::FETCH_ASSOC);	
	// Send a response indicating success
	echo json_encode($receipts);
}
?>