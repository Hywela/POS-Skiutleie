<?php
	include_once('db.php');
	
	//get info from form
	
	
	$items;
	$receipt_id = $_POST['receiptID'];
	if(isset($receipt_id)){
	if(isset($_POST['price']) 
			&& isset($_POST['items'] ) && isset($_POST['payd_cash'])  && isset($_POST['payd_card'])  && isset($_POST['payd_back']) && isset($_POST['payment_method'])){

	$price = $_POST['price'];
	$date = $_POST['date'];
	


	$items = json_decode($_POST['items']);
	//check does
	$payd_cash = $_POST['payd_cash'];
	$payd_card = $_POST['payd_card'];
	$payd_back = $_POST['payd_back'];
	$payment_method = $_POST['payment_method'];
	



	
	//start so insert user into database
	$galadb->beginTransaction();
	$galadb->query ('LOCK TABLES receipt, article_rented_table, miscouliouse_type, payment  WRITE');
	

		updateRecipt($galadb, $price, $date, $receipt_id);
			
		
		insertPayment($galadb , $payment_method , $payd_cash, $payd_card, $payd_back, $receipt_id);

		foreach ($items as $item) {
			if($item->type == 1){
	
				insertMiscellaneous($galadb ,$item->articleText,$item->price);
				
				insertItem(
				$galadb,
				$receipt_id,
				$item->type,
				$item->count,
				getLastID($galadb)
				);
			}else{
				
			insertItem(
			$galadb,
			$receipt_id,
			$item->type,
			$item->count,
			$item->package_id
			);
			}
		}
		
		$galadb->commit();
	
	$galadb->query ('UNLOCK TABLES');					// Unlock the tables
	
		echo json_encode(array('receipt_id' => $receipt_id));
	
	}else {
		//echo "Fyll in navne og telefon";
		exit();
	}
	
	}

	function updateRecipt($galadb , $price, $date , $receiptID){
		$sql = 'UPDATE receipt SET total_price=:price, rented_to=:rented_to  
			WHERE id=:id';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':price', $price);
		$sth->bindParam(':rented_to', $date);
		$sth->bindParam(':id', $receiptID);
		$sth->execute();
		$sth->closeCursor();
		
	
	}
	function addToOutList($galadb, $recipt_id, $person_id){
		$sql = 'INSERT INTO rental_ongoing (receipt_id, person_id )
				VALUES (:receipt_id , :person_id)';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':receipt_id', $recipt_id);
		$sth->bindParam(':person_id', $person_id);
		$sth->execute();
		$sth->closeCursor();
	
	}
	function insertItem($galadb, $recipt_id , $type, $count, $article_id ){
		$sql = 'INSERT INTO article_rented_table (receipt_id, equipment_type, article_id, count  )
				VALUES (:receipt_id , :equipment_type, :article_id, :count )';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':receipt_id', $recipt_id);
		$sth->bindParam(':equipment_type', 		$type);
		$sth->bindParam(':count',		$count);
		$sth->bindParam(':article_id',$article_id);
		$sth->execute();
		$sth->closeCursor();
	
	}
	function insertMiscellaneous($galadb, $article_text , $price ){
		$sql = 'INSERT INTO miscouliouse_type (name, price)
				VALUES (:name , :price)';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':name', $article_text);
		$sth->bindParam(':price', 		$price);
		$sth->execute();
		$sth->closeCursor();
	}
	
	function insertPayment($galadb, $paymentmethod , $pc, $pd, $bc,$receipt_id ){
		$sql = 'INSERT INTO payment_table (receipt_id,payment_method, payd_card, payd_cash, back_cash)
				VALUES (:receipt_id, :payment_method , :payd_card, :payd_cash, :back_cash)';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':payment_method', $paymentmethod);
		$sth->bindParam(':payd_cash', 		$pc);
		$sth->bindParam(':payd_card',  $pd);
		$sth->bindParam(':back_cash', 		$bc);
		$sth->bindParam(':receipt_id', 		$receipt_id);
		$sth->execute();
		
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