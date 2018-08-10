<?php
include_once('db.php');
	
$name = $_POST['name'];
$total_card = $_POST['total_card'];
$total_cash = $_POST['total_cash'];
$counted_card = $_POST['counted_card'];
$counted_cash = $_POST['counted_cash'];
$total_faktura_count = $_POST['total_faktura_count'];
$faktura_numbers = $_POST['faktura_numbers'];
$total_voucher = $_POST['total_voucher'];
$voucher_numbers = $_POST['voucher_numbers'];
$total_not_paid = $_POST['total_not_paid'];
$not_paid_numbers = $_POST['not_paid_numbers'];
$comment_input = $_POST['comment_input'];

$diff_card = $_POST['diff_card'];
$diff_cash = $_POST['diff_cash'];


	$galadb->beginTransaction();
	
	
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

?>