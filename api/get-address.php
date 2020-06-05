<?php
	header('Access-Control-Allow-Origin: http://haxxix.com');
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
	$stmt->store_result();
	$num_of_rows = $stmt->num_rows; 
	
	if($num_of_rows > 0){
		$meta = $stmt->result_metadata();
		$results = getDataInArray($stmt, $meta);
		$returnObj->success = 1;
		$returnObj->results = $results;		
	}else{
		$returnObj->success = -1;
		$returnObj->results = [];
	}
	$stmt->close();
	
	// Return all rows of table
	function getDataInArray($stmt, $meta){
		while ($field = $meta->fetch_field())
		{
			$params[] = &$row[$field->name];
		}

		call_user_func_array(array($stmt, 'bind_result'), $params);

		while ($stmt->fetch()) {
			foreach($row as $key => $val)
			{
				$c[$key] = $val;
			}
			$result[] = $c;
		}
		return $result;
	}
	
	echo json_encode($returnObj);
?>