<?php
require_once 'db.php';


$id = $_POST['id'];
$price = $_POST['price'];
if(isset($id) && isset($price)){

	$galadb->beginTransaction();
	$galadb->query ('LOCK TABLES price_table  WRITE');
	$sql = 'UPDATE price_table SET price=:price
				WHERE id=:id';
	$sth = $galadb->prepare($sql);
	$sth->bindParam(':price', $price);
	$sth->bindParam(':id', $id);
	
	$sth->execute();
	$galadb->commit();
	$galadb->query ('UNLOCK TABLES price_table');					// Unlock the tables
	
	


}

?>