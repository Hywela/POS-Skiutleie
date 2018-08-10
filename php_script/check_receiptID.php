<?php
require_once 'db.php';

$receipt_id =$_POST['receipt_id'];
$sql = 'SELECT
  id
FROM rental_ongoing
WHERE id =(:receipt_id)';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':receipt_id', $receipt_id);

$sth->execute ();

	
	if ($row=$sth->fetch()) {		
	
		// Send a response indicating success
		echo json_encode(array ('receipt_id'=> $row['id']));
	}else {
		// Send a response indicating error
		echo json_encode(array('receipt_id' => $id['']));
	}
	
	






?>