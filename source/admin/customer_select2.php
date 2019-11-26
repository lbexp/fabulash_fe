<?php

define (DB_USER, "root");
define (DB_PASSWORD, "585259");
define (DB_DATABASE, "customer");
define (DB_HOST, "localhost");
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);


$sql = "SELECT customer.id, customer.nama, customer.no_hp FROM customer
		WHERE no_hp LIKE '%".$_GET['q']."%'
		LIMIT 10";
$result = $mysqli->query($sql);


$json = [];
while($row = $result->fetch_assoc()){
     $json[] = ['id'=>$row['id'], 'nama'=>$row['nama'], 'number'=>$row['no_hp']];
}

echo json_encode($json);

?>
