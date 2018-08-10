<?php
require_once 'db.php';

$sql = 'SELECT * FROM equipment_type';
$sth = $galadb->prepare($sql);
// Perform the query

$sth->execute ();
$arr = $sth->fetchAll(PDO::FETCH_ASSOC);

	
	// Send a response indicating success
	echo json_encode($arr);



?>