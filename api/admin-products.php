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
	
	if(isset($_GET['active'])){
		$active = $_GET['active'];
		if($active === 'active'){
			$status = 1;
		}else if($active === 'inactive'){
			$status = 0;
		}
	}
	
	
	if(isset($status)){
		$stmt = "SELECT * FROM products WHERE status='$status'";
	}else{
		$stmt = "SELECT * FROM products";
	}
	
	$results = $con->query($stmt);
	while($row = $results->fetch_object()) {
	  $arr[] = $row;
	}
	if(!$arr){
		$returnObj->results = [];
	}else{
		$returnObj->results = $arr;
	}
	
	echo json_encode($returnObj);
?>