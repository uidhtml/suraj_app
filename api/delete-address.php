<?php
	header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	include('./config/siteUrl.php');
	
	if(isset($_POST)){
        require('./connection/dbConnection.php');
		$returnObj = new \stdClass();
        $data = convertToObject($_POST);
		$id = $data->id;
        
		if(isset($id)){
			$query = "DELETE FROM shipping WHERE id=?";
			$stmt = $con->prepare($query);
			$rc = $stmt->bind_param('i', $id);
			if ( false===$rc ) {
				$returnObj->msg = 'Unable to bind values.';
				die('prepare() failed: ' . htmlspecialchars($mysqli->error));
			}
			$rc = $stmt->execute();
			if ( false===$rc ) {
				$returnObj->msg = 'Unable to execute the sql query.';
				die('prepare() failed: ' . htmlspecialchars($mysqli->error));
			}else{
				$returnObj->success = 1;
				$returnObj->msg = 'Address deleted successfully!!';
			}
		}else{
			$returnObj->success = -1;
			$returnObj->msg = 'Could not varify, which address needs to delete!!';
		}
	}else{
		$returnObj->success = -1;
		$returnObj->msg = 'Some data is missing to set default!!';
	}
	
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
	
	echo json_encode($returnObj);
?>