<?php

$url = $_POST['url'];
$started = false;
	$dbhost = '00.000.000.00'; //Place host for SQL server here
	$dbuser = 'NotUsername'; //SQL Username
	$dbpass = 'NotPassword'; //SQL Password

	$db = 'YouShare'; //SQL Database


	$conn = mysqli_connect($dbhost, $dbuser, $dbpass); 
	mysqli_select_db($conn, $db);
        
     $ip = $_SERVER['REMOTE_ADDR'];    
  $any = mysqli_query($conn, "SELECT * FROM `Videos` WHERE `url`='$url'");    
$result = mysqli_query($conn, "SELECT * FROM `Videos` WHERE `url`='$url' and `ip`= '$ip'"); 

$checkIf = mysqli_query($conn, "SELECT * FROM `Videos` WHERE `url`='$url' and `hasStarted`= 1");

if(mysqli_num_rows($checkIf) >= 1)
{
    echo "started";
    exit;
}
if(mysqli_num_rows($any) == 0)
{
    echo "started";
    exit;
}
if(mysqli_num_rows($result) == 1)
{
    echo "true";
    exit;
}
if(mysqli_num_rows($result) == 0)
{
    echo "false";
    exit;
}
        



