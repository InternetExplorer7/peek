<?php

$url = $_POST['url'];
	$dbhost = '00.000.000.00'; //Place host for SQL server here
	$dbuser = 'NotUsername'; //SQL Username
	$dbpass = 'NotPassword'; //SQL Password

	$db = 'YouShare'; //SQL Database


	$conn = mysqli_connect($dbhost, $dbuser, $dbpass); 
	mysqli_select_db($conn, $db);
        
        
mysqli_query($conn, "DELETE FROM `Videos` WHERE `url` ='$url'"); 

    
$fileName = substr($url, 18); //http://peek.ninja/1419902613326v=TaNTd3fqzsQ.html
$fileName2 = substr($url, 18,31) . ".txt";

unlink($fileName);
//unlink($fileName2);




