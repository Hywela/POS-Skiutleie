<?php
/**
*		Dette er config-fila, hvor vi setter alle viktige globale variabler
*		og lager PDOen for databasen.
*
**/

// Database innlogging.
$DB_TYPE = 'mysql'; //Type of database<br>
$dbuser = "root";
$dbpass = "";
$dbname = "";
$dbhost = "localhost";

// Initierer PDOen.
try {
	$galadb = new PDO('mysql:host='.$dbhost.';dbname='.$dbname.'',$dbuser,$dbpass);
}
catch (PDOException $e) {

    die ('<div>Could not connect to db: ' . $e->getMessage() . '</div>');
}


?>
