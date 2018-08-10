<?php
require_once 'db.php';
$id = $_POST['id'];
$sql = 'SELECT function_type FROM rental_article WHERE id=:id';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':id',$id);
$sth->execute ();
if ($row=$sth->fetch()) {		// If a row is returned that means we found the user
	// Store the username/user id in the session variable
	
	// Send a response indicating success
	echo json_encode(array ('f_type'=> $row['function_type']));
}



?>