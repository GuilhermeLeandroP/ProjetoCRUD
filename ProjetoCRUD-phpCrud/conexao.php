<?php 


$host = "localhost";
$user = "root";
$pass = "";
$dbname="desafio";

$conn = new PDO("mysql:host=$host;dbname=".$dbname, $user,$pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

?>