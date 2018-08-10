<?php
require_once 'db.php';
$id = $_POST['id'];
$sql = 'SELECT comment FROM comment WHERE id=:id';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':id',$id);
$sth->execute ();
if ($row=$sth->fetch()) {		// If a row is returned that means we found the user
	// Store the username/user id in the session variable
	
	// Send a response indicating success
	echo json_encode(array ('comment'=> $row['comment']));
}



?>