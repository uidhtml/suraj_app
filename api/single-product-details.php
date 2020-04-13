
<?php
	header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	include('./config/siteUrl.php');
	$id = $_GET['id'];
	$returnObj = new \stdClass();
	$detailsObj = new \stdClass();
	
	require('./connection/dbConnection.php');
	$arr = [];
	$stmt = $con->prepare("SELECT product_details.body, products.image, products.name FROM product_details INNER JOIN products ON products.id = product_details.product_id WHERE product_id = '$id'");
	$stmt->execute();
	$result = $stmt->get_result();
	if($result->num_rows){
		while($row = $result->fetch_object()) {
			$detailsObj->body = json_decode($row->body);
			$detailsObj->image = $row->image;
			$detailsObj->name = $row->name;
		}
		$arr[] = $detailsObj;
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