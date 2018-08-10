<?php
require_once 'db.php';

$receiptID = $_POST['receiptID'];
$date="ERROR";
if(isset($receiptID)){

	$galadb->beginTransaction();
	$galadb->query ('LOCK TABLES receipt,rental_old,rental_ongoing  WRITE');
	$sqlquery ='SELECT NOW() AS date';
	$sqlquery_1 = '
		UPDATE receipt SET delivered_back =:date
		WHERE receipt.id=:receiptID
		';
$sqlquery_2 = '
		INSERT INTO rental_old (receipt_id, person_id)
 		SELECT
    	rental_ongoing.receipt_id,
   		rental_ongoing.person_id
  		FROM rental_ongoing
		WHERE rental_ongoing.receipt_id=:receiptID
		';
$sqlquery_3 = '
		DELETE 
  		FROM rental_ongoing
		WHERE rental_ongoing.receipt_id=:receiptID
		';
$sth = $galadb->prepare($sqlquery);
$sth->execute ();
if ($row=$sth->fetch()) {		// If a row is returned that means we found the user
	// Store the username/user id in the session variable

	// Send a response indicating success
	$date= $row['date'];
}	
	
$sth = $galadb->prepare($sqlquery_1);
$sth->bindParam(':receiptID', $receiptID);
$sth->bindParam(':date', $date);
$sth->execute ();


$sth = $galadb->prepare($sqlquery_2);
$sth->bindParam(':receiptID', $receiptID);
$sth->execute ();
$sth = $galadb->prepare($sqlquery_3);
$sth->bindParam(':receiptID', $receiptID);
$sth->execute ();

// Perform the query

	$galadb->commit();
	$galadb->query ('UNLOCK TABLES receipt,rental_old,rental_ongoing WRITE');					// Unlock the tables
	echo json_encode(array ('date'=> $date));

	
}

?>