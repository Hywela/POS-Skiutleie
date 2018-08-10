<?php
	include_once('db.php');
	
	//get info from form
	
	$personal_id;
	$items;
	if(isset($_POST['first_name'])&&isset($_POST['last_name']) && isset($_POST['telephone'])&& isset($_POST['price']) 
			&& isset($_POST['items'] ) && isset($_POST['payd_cash'])  && isset($_POST['payd_card'])  && isset($_POST['payd_back']) && isset($_POST['payment_method'])){
	$f_name= $_POST['first_name'];
	$l_name =$_POST['last_name'];
	$tlf = $_POST['telephone'];
	$price = $_POST['price'];
	$date = $_POST['date'];
	$date_from = $_POST['date_from'];
	$personal_id = "0";
	if(isset($_POST['customerID'])){
		$personal_id = $_POST['customerID'];
	}
	$items = json_decode($_POST['items']);
	//check does
	$payd_cash = $_POST['payd_cash'];
	$payd_card = $_POST['payd_card'];
	$payd_back = $_POST['payd_back'];
	$payment_method = $_POST['payment_method'];
	



	
	//start so insert user into database
	$galadb->beginTransaction();
	$galadb->query ('LOCK TABLES customer, receipt, comment, rental_ongoing, article_rented_table, miscouliouse_type, payment  WRITE');
	
	if($personal_id =="0"){
	
	
	$sql = 'INSERT INTO customer (first_name , last_name, telephone) VALUES (:first_name , :last_name, :telephone)';
	$sth = $galadb->prepare($sql);
	$sth->bindParam(':first_name',$f_name);
	$sth->bindParam(':last_name',$l_name);
	$sth->bindParam(':telephone',$tlf);
	$sth->execute();
	
	
	//if error when creating user probably because of a taken username
	if ($sth->rowCount()==0) {								// No user created
		$galadb->rollBack();								// Rollback
		//echo "error kontakt admin";
	}
	$sth->closeCursor();         // Prepare to find the id of the new user
			
			$personal_id = getLastID($galadb);
	}
	
	$comment_id = 0;
	$comment ="Not set";
	$comment = $_POST['comment'];
			addComment($galadb,$comment);
			$comment_id = getLastID($galadb);
		
		
		
		addRecipt($galadb, $price, $date, $comment_id, $date_from);
			
		$receipt_id = getLastID($galadb);
		insertPayment($galadb , $payment_method , $payd_cash, $payd_card, $payd_back, $receipt_id);
		addToOutList($galadb,$receipt_id,$personal_id);
		
		
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
	function addComment($galadb,$comment){
		$sql = 'INSERT INTO comment (comment) VALUES (:comment)';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':comment',$comment);
		$sth->execute();
		if ($sth->rowCount()==0) {								// No user created
			$galadb->rollBack();								// Rollback
			//echo "error kontakt admin";
		}
		$sth->closeCursor();
	}
	function addRecipt($galadb , $price, $date, $comment_id, $rented_out){
		$sql = 'INSERT INTO receipt (total_price, comment_id, rented_out, rented_to ) 
				VALUES (:price , :comment_id, :rented_out, :rented_to)';
		$sth = $galadb->prepare($sql);
		$sth->bindParam(':price', $price);
		$sth->bindParam(':comment_id', $comment_id);
		$sth->bindParam(':rented_to', $date);
		$sth->bindParam(':rented_out', $rented_out);
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