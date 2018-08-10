<?php
include_once('db.php');
	
$name = "test";
$total_card = 0;
$total_cash = 0;
$counted_card = 0;
$counted_cash = 0;
$total_faktura_count = 0;
$faktura_numbers = "dd";

$total_voucher = 0;
$voucher_numbers = "d";

$total_not_paid = 0;
$not_paid_numbers = "dd";

$comment_input = "d";
echo"start";
$diff_card =  0;
$diff_cash =  0;


	$galadb->beginTransaction();
	$galadb->query ('LOCK TABLES end_of_day_table WRITE');
	
	$sqlquery_1 = 'INSERT INTO end_of_day_table (reg_by , total_card, total_cash , counted_card,  counted_cash,
			 total_faktura , faktura_numbers,
			 total_voucher , voucher_numbers, 
			 total_not_paid , not_paid_numbers, 
			 comment,
			 diff_card ,diff_cash) 
				VALUES (:name , :total_card , :total_cash , :counted_card ,:counted_cash ,
			 :total_faktura_count ,:faktura_numbers,
			 :total_voucher ,:voucher_numbers,
			 :total_not_paid ,:not_paid_numbers,
			 :comment_input,
			 :diff_card ,:diff_cash)
		';
	



$sth = $galadb->prepare($sqlquery_1);
$sth->bindParam(':name', $name);
$sth->bindParam(':total_card', $total_card);
$sth->bindParam(':total_cash', $total_cash);
$sth->bindParam(':counted_card', $counted_card);
$sth->bindParam(':counted_cash', $counted_cash);

$sth->bindParam(':total_faktura_count', $total_faktura_count);
$sth->bindParam(':faktura_numbers', $faktura_numbers);

$sth->bindParam(':total_voucher', $total_voucher);
$sth->bindParam(':voucher_numbers', $voucher_numbers);

$sth->bindParam(':total_not_paid', $total_not_paid);
$sth->bindParam(':not_paid_numbers', $not_paid_numbers);
$sth->bindParam(':comment_input', $comment_input);

$sth->bindParam(':diff_card', $diff_card);
$sth->bindParam(':diff_cash', $diff_cash);
//$sth->bindParam(':comment_input', $comment_input);

$sth->execute ();
$eod_id = getLastID($galadb);
// Perform the query

	$galadb->commit();
	$galadb->query ('UNLOCK TABLES end_of_day_table WRITE');					// Unlock the tables
	
	// Send a response indicating success
		echo json_encode(array('eod_id' => $eod_id));
		
	
	
	
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
echo"done";
?>