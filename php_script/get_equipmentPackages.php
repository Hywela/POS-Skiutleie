<?php
require_once 'db.php';

$equipment_type = $_POST['eq_option'];
if(isset($equipment_type)){

	
$sql = 'SELECT id, name FROM equipment_packages_table WHERE equipment_type=:eq_option';
$sth = $galadb->prepare($sql);
$sth->bindParam(':eq_option', $equipment_type);
// Perform the query

$sth->execute ();
$arr = $sth->fetchAll(PDO::FETCH_ASSOC);
		
	
	
	// Send a response indicating success
	echo json_encode($arr);


}
?>