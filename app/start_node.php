<?php

$WshShell = new COM("WScript.Shell"); 
$WshShell->Run('cmd /C cd "C:/localhost/www/minecraft/app" && "start_node.bat"', 0, false);

$url = "http://".$_SERVER["SERVER_NAME"]."/minecraft";

header("Location: $url");

?>