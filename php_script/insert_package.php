<?php 
        include_once('db.php'); 
     
  
 $equipmentType = $_POST['equipment_type'];
 $name = $_POST['name'];
 if(isset($equipmentType)&& isset($name)){
 	$galadb->beginTransaction();
 	$galadb->query ('LOCK TABLES equipment_packages_table  WRITE');
 	

		$sql = 'INSERT INTO equipment_packages_table (equipment_type,name) 
				VALUES (:equipment_type , :name)';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':equipment_type', $equipmentType);
		$sth->bindParam(':name', $name);
		$sth->execute();
 

 $galadb->commit();
 $galadb->query ('UNLOCK TABLES equipment_packages_table WRITE');					// Unlock the tables
 
 }
?> 