<?php
require_once 'db.php';

//$receipt_id = $_POST['receipt_id'];
$receipt_id = $_POST['receipt_id'];
$sql = 'SELECT
  article_rented_table.count,
  equipment_type.name AS type_name,
  miscouliouse_type.name AS text,
  miscouliouse_type.price
FROM article_rented_table
  INNER JOIN equipment_type
    ON article_rented_table.equipment_type = equipment_type.id
  INNER JOIN miscouliouse_type
    ON article_rented_table.article_id = miscouliouse_type.id
    AND article_rented_table.equipment_type = 1
WHERE article_rented_table.receipt_id =(:receipt_id)';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':receipt_id', $receipt_id);

$sth->execute ();

	$customer = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	
	// Send a response indicating success
	echo json_encode($customer);





?>