<?php
	header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	
	include('./config/siteUrl.php');
	$returnObj = new \stdClass();
	
	require('./connection/dbConnection.php');
	$id = $_GET['id'];

	if(isset($id)){
		
		$stmt = $con->prepare('SELECT * from users WHERE id=?');
		if ( false===$stmt ) {
			$returnObj->msg = 'Unable to create prepare statement.';
			die('prepare() failed: ');// . htmlspecialchars($mysqli->error));
		}
		$rc = $stmt->bind_param('i', $id);
		
		if ( false===$rc ) {
			$returnObj->msg = 'Unable to bind values.';
			die('prepare(33333) failed: '. htmlspecialchars($stmt->error));
		}
		$rc = $stmt->execute();
		if ( false===$rc ) {
			$returnObj->msg = 'Unable to execute the sql query.';
			die('prepare() failed:'. htmlspecialchars($stmt->error));
		}else{
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
		}
	}
	
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
	echo json_encode($returnObj);
?>