<?php
require_once 'db.php';

$equipment_type = $_POST['eq_option'];
$ageGroup = $_POST['ag_option'];
$packageID = $_POST['package_option'];
if(isset($equipment_type) && isset($ageGroup)&& isset($packageID)){

	
$sql = 'SELECT id, days_id, price FROM price_table WHERE equipment_type=:eq_option 
		AND age_group_id=:ag_option
		AND package_id=:package_option';
$sth = $galadb->prepare($sql);
$sth->bindParam(':eq_option', $equipment_type);
$sth->bindParam(':ag_option', $ageGroup);
$sth->bindParam(':package_option', $packageID);


// Perform the query

$sth->execute ();
$arr = $sth->fetchAll(PDO::FETCH_ASSOC);
		
	// Send a response indicating success
	echo json_encode($arr);

}
?>