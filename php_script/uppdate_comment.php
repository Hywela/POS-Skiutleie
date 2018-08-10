<?php
require_once 'db.php';
$id = $_POST['id'];
$comment = $_POST['comment'];
$sql = 'UPDATE comment SET comment=:comment WHERE id=:id';
$sth = $galadb->prepare($sql);
// Perform the query
$sth->bindParam(':id',$id);
$sth->bindParam(':comment',$comment);
$sth->execute ();
$sth->closeCursor();



?>