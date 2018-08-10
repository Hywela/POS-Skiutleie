<?php
require_once 'db.php';
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$telephone = $_POST['telephone'];
$sql = 'SELECT * FROM customer WHERE first_name LIKE (:first_name)
		 OR last_name LIKE (:last_name) OR telephone =(:telephone) ORDER BY first_name , last_name LIMIT 6 ';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':first_name', $first_name);
$sth->bindParam(':last_name', $last_name); //skift til uid
$sth->bindParam(':telephone', $telephone); //skift til uid
$sth->execute ();

	$customer = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	
	// Send a response indicating success
	echo json_encode($customer);





?>