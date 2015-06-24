<?php

$url = $_POST['url'];
	$dbhost = '00.000.000.00'; //Place host for SQL server here
	$dbuser = 'NotUsername'; //SQL Username
	$dbpass = 'NotPassword'; //SQL Password

	$db = 'YouShare'; //SQL Database


	$conn = mysqli_connect($dbhost, $dbuser, $dbpass); 
	mysqli_select_db($conn, $db);

	mysqli_query($conn, "UPDATE `Videos` SET `started` = 0 WHERE `url` = '$url' ");