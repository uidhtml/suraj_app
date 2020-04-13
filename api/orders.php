<?php
	header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	include('./config/siteUrl.php');
	$user_id = $_GET['user_id'];
	$order_range = $_GET['order_range'];
	$returnObj = new \stdClass();
	
	require('./connection/dbConnection.php');
	$arr = array();
	
	/*$category = $_GET['category'];
	if($category === 'all'){
		$stmt = $con->prepare("SELECT * FROM products");
	}else{
		$stmt = $con->prepare("SELECT * FROM products WHERE category='$category'");
	}*/
	$stmt = $con->prepare("SELECT orders.*, products.name,products.category, products.image, shipping.person_name,shipping.country,shipping.state,shipping.city,shipping.pincode,shipping.address,shipping.landmark FROM orders INNER JOIN products ON orders.product_id = products.id INNER JOIN shipping ON orders.address_id=shipping.id WHERE orders.user_id = '$user_id'");
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = $result->fetch_object()) {
		$arr[] = $row;
		/*print_r($row);
		$orderRefArray = array();
		$dateObj = date('Y-m-d', strtotime($row->date));
		/*$tempObj->user_id = $row->user_id;
		$tempObj->product_id = $row->product_id;
		$tempObj->address_id = $row->address_id;
		$tempObj->quantity = $row->quantity;
		$tempObj->unit = $row->unit;
		$tempObj->date = date('Y-m-d', strtotime($row->date));
		$tempObj->order_ref_code = $row->order_ref_code;
		$tempObj->status = $row->status;
		
		array_push($orderRefArray, array($dateObj->date=>$row));*/
	}
	//print_r($orderRefArray);
	if(!$arr){
		$returnObj->results = [];
	}else{
		$returnObj->results = $arr;
	}
	$stmt->close();
	
	echo json_encode($returnObj);
?>
