<?php 
        include_once('db.php'); 
        session_start(); 
         
 $packageID = 3;
 $age_group = 3;
	$days=array(
			"0"=>"30",
			"1"=>"150",
			"2"=>"210",
			"3"=>"300",
			"4"=>"400",
			"5"=>"500",
			"6"=>"600",
			"7"=>"700"
			
	);
 foreach ($days as  $d=>$price){
		$sql = 'INSERT INTO alpin_price_table (package_id, age_group_id, days_id, price ) 
				VALUES (:package_id , :age_group_id, :days_id, :price)';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':package_id', $packageID);
		$sth->bindParam(':age_group_id', $age_group);
		$sth->bindParam(':days_id', $d);
		$sth->bindParam(':price', $price);
		$sth->execute();
 }

 $galadb->commit();
         
?> 