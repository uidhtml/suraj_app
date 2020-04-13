<?php
	header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	include('./config/siteUrl.php');
	$returnObj = new \stdClass();
	
	$data = convertToObject($_GET);
	$product  = $data->category;
	
	// Converts array to an object
    function convertToObject($array) {
		$object = new \stdClass();
		foreach ($array as $key => $value) {
			if (is_array($value)) {
				$value = convertToObject($value);
			}
			$object->$key = $value;
		}
		return $object;
	}
	
	require('./connection/dbConnection.php');
	$arr = [];
	$stmt = $con->prepare("SELECT * FROM products WHERE category='$product'");
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = $result->fetch_object()) {
	  $arr[] = $row;
	}
	if(!$arr){
		$returnObj->success = -1;
		$returnObj->results = [];
	}else{
		$returnObj->success = 1;
		$returnObj->results = $arr;
	}
	$stmt->close();
	
	echo json_encode($returnObj);
?>