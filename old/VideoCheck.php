<?php

$url = $_POST['url'];

$started = false;
	$dbhost = '00.000.000.00'; //Place host for SQL server here
	$dbuser = 'NotUsername'; //SQL Username
	$dbpass = 'NotPassword'; //SQL Password

	$db = 'YouShare'; //SQL Database 23.229.242.71


	$conn = mysqli_connect($dbhost, $dbuser, $dbpass); 
	mysqli_select_db($conn, $db);
        
        
$result = mysqli_query($conn, "SELECT * FROM `Videos` WHERE `url`='$url' and `started` = 1"); 


if(mysqli_num_rows($result) == 1)
{
    echo "true";
}
else
{
    echo "false";
}
        



