<?php
	header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	include('./config/siteUrl.php');
	$returnObj = new \stdClass();
	
	require('./connection/dbConnection.php');
	$arr = [];
	
	/*$category = $_GET['category'];
	if($category === 'all'){
		$stmt = $con->prepare("SELECT * FROM products");
	}else{
		$stmt = $con->prepare("SELECT * FROM products WHERE category='$category'");
	}*/
	$stmt = $con->prepare("SELECT * FROM products");
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = $result->fetch_object()) {
	  $arr[] = $row;
	}
	if(!$arr){
		$returnObj->results = [];
	}else{
		$returnObj->results = $arr;
	}
	$stmt->close();
	
	echo json_encode($returnObj);
?>