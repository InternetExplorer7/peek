
<?php

$flag = $_POST["flag"]; // write or read
$time = $_POST["epoch"];

$epochF = "chats/" .$time . ".txt";
// Write file
if(strpos($flag,'write') !== false){ //Has to write
$message = $_POST["msg"];
$filecreate = fopen($epochF,"w");
fwrite($filecreate,$message);
fclose($filecreate);
}
// Read file
if(strpos($flag,'read') !== false){
$handle = fopen($epochF, "r");
$contents = fread($handle, filesize($epochF));
echo $contents;
fclose($handle);
}