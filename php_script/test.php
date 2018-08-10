<?php
require_once 'db.php';


$date="2014-11-20";

	$galadb->beginTransaction();


	$sqlquery = '
		
		Select *
		FROM receipt
		WHERE  DATE(receipt.rented_out) LIKE (DATE(:date))
		';

	
	$sth = $galadb->prepare($sqlquery);
	$sth->bindParam(':date', $date);
	$sth->execute ();
	$receipts = $sth->fetchAll(PDO::FETCH_ASSOC);	
	// Send a response indicating success
	echo json_encode($receipts);

?>