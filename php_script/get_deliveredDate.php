<?php
require_once 'db.php';

//$receipt_id = $_POST['receipt_id'];
$receipt_id = $_POST['receipt_id'];
$sql = 'SELECT
  receipt.delivered_back
FROM receipt
WHERE receipt.id =(:receipt_id)';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':receipt_id', $receipt_id);

$sth->execute ();

	$date = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	
	// Send a response indicating success
	echo json_encode($date);





?>