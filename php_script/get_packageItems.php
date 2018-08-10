<?php
require_once 'db.php';

$receipt_id = $_POST['receipt_id'];
$sql = 'SELECT
  equipment_packages_table.name AS package_name,
  price_table.price,
  price_table.days_id,
  age_group.name AS age_name,
  equipment_type.name AS equipment_name,
  article_rented_table.count
FROM article_rented_table
  INNER JOIN price_table
    ON article_rented_table.article_id = price_table.id
    AND article_rented_table.equipment_type > 1
  INNER JOIN equipment_type
    ON article_rented_table.equipment_type = equipment_type.id
  INNER JOIN equipment_packages_table
    ON price_table.package_id = equipment_packages_table.id
  INNER JOIN age_group
    ON price_table.age_group_id = age_group.id
WHERE article_rented_table.receipt_id =(:receipt_id)';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':receipt_id', $receipt_id);

$sth->execute ();

	$customer = $sth->fetchAll(PDO::FETCH_ASSOC);
	
	
	// Send a response indicating success
	echo json_encode($customer);





?>