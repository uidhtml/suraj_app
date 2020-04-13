
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
	$stmt = $con->prepare("SELECT * FROM shipping WHERE user_id = '$id'");
	$stmt->execute();
	$result = $stmt->get_result();
	if($result->num_rows){
		while($row = $result->fetch_object()) {
			$arr[] = $row;
		}	
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