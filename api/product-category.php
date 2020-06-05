<?php
	header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	include('./config/siteUrl.php');
	$returnObj = new \stdClass();
	
	require('./connection/dbConnection.php');
	$arr = [];
	$stmt = $con->prepare("SELECT DISTINCT category FROM products");
	$stmt->execute();
	$result = $stmt->bind_result($category);
	while($row = $stmt->fetch()) {
	  $arr[] = $category;
	}
	if(!$arr){
		$returnObj->results = [];
	}else{
		$returnObj = $arr;
	}
	$stmt->close();
	
	echo json_encode($returnObj);
?>