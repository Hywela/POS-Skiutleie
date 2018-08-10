<?php
require_once 'db.php';

$equipment_type = $_POST['eq_option'];
$ageGroup = $_POST['ag_option'];
$packageID = $_POST['package_option'];
$days_id =  $_POST['days_id'];
if(isset($equipment_type) && isset($ageGroup)&& isset($packageID) && isset($days_id)){

	
$sql = 'SELECT price,id FROM price_table WHERE equipment_type=:eq_option 
		AND age_group_id=:ag_option
		AND package_id=:package_option
		AND days_id=:days_id';
$sth = $galadb->prepare($sql);
$sth->bindParam(':eq_option', $equipment_type);
$sth->bindParam(':ag_option', $ageGroup);
$sth->bindParam(':package_option', $packageID);
$sth->bindParam(':days_id', $days_id);


// Perform the query

$sth->execute ();

if ($row=$sth->fetch()) {		// If a row is returned that means we found the user
	// Store the username/user id in the session variable

	// Send a response indicating success
	echo json_encode(array ('price'=> $row['price'],'id'=> $row['id']));
	
} else {
	$galadb->beginTransaction();
	$galadb->query ('LOCK TABLES price_table  WRITE');
	$price = 0;
	
	$sql = 'INSERT INTO price_table (equipment_type,age_group_id,package_id,days_id,price)
				VALUES (:equipment_type,:age_group_id,:package_id,:days_id,:price)';
	$sth = $galadb->prepare($sql);
	$sth->bindParam(':equipment_type', $equipment_type);
	$sth->bindParam(':age_group_id', $ageGroup);
	$sth->bindParam(':package_id', $packageID);
	$sth->bindParam(':days_id', $days_id);
	$sth->bindParam(':price', $price);
	$sth->execute();
	
	
	$galadb->commit();
	$galadb->query ('UNLOCK TABLES price_table WRITE');					// Unlock the tables

	echo json_encode(array ('price'=> $price,'id'=> getLastID($galadb)));
	
}

}
function getLastID($galadb){

	$id;
	$sth = $galadb->prepare ('SELECT LAST_INSERT_ID() AS id');
	$sth->execute();
	if ($row = $sth->fetch())  {
		$id = $row['id'];
			


	}else {
		$galadb->rollBack();        // Rollback, remove the user
		$galadb->query ('UNLOCK TABLES');
		throw new Exception ('Error getting new user id'); // Throw an exception
	}
	$sth->closeCursor ();

	return $id;
}
?>