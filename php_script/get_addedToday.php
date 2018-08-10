<?php
require_once 'db.php';


	
$sql = 'SELECT rental_ongoing.receipt_id, customer.first_name AS f_name, customer.last_name AS l_name 
FROM rental_ongoing
 JOIN  customer
ON rental_ongoing.person_id=customer.id';
$sth = $galadb->prepare($sql);



// Perform the query

$sth->execute ();
$arr = $sth->fetchAll(PDO::FETCH_ASSOC);

		
	// Send a response indicating success
	echo json_encode($arr);


?>