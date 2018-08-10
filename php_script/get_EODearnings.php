<?php
require_once 'db.php';
$v = 0;
$f = 0;
$date = $_POST['date'];


	$galadb->beginTransaction();
	//$galadb->query ('LOCK TABLES receipt,payment_table  WRITE');
/*
	$sqlquery_2= '
SELECT
  SUM(receipt.total_price) AS f_sum
FROM receipt
  INNER JOIN payment_table
    ON receipt.id = payment_table.receipt_id
WHERE DATE(receipt.changed) = CURDATE() AND payment_table.payment_method = 4
		';
	
	
	$sth = $galadb->prepare($sqlquery_2);
	$sth->execute ();
	$f = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	$sqlquery_3= '
			
SELECT
  SUM(receipt.total_price) AS v_sum
FROM receipt
  INNER JOIN payment_table
    ON receipt.id = payment_table.receipt_id
WHERE DATE(receipt.changed) = CURDATE() AND payment_table.payment_method = 6
		';
	
	
	$sth = $galadb->prepare($sqlquery_3);
	$sth->execute ();
	$v = $sth->fetchAll(PDO::FETCH_ASSOC);
	*/
	$sqlquery_1 = '
SELECT
  COUNT(*) AS count,
  SUM(payment_table.back_cash) AS cash_out_total,
  SUM(payment_table.payd_card) AS card_total,
  SUM(payment_table.payd_cash) AS cash_total
FROM payment_table
WHERE DATE(payment_table.changed_date) = :date
		';

$sth = $galadb->prepare($sqlquery_1);
$sth->bindParam(':date', $date);

$sth->execute ();

// Perform the query

	$galadb->commit();
	//$galadb->query ('UNLOCK TABLES receipt,payment_table WRITE');					// Unlock the tables
	$receipts = $sth->fetchAll(PDO::FETCH_ASSOC);	
	// Send a response indicating success

	echo json_encode($receipts
			);

?>