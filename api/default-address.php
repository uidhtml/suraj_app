
<?php
	header('Access-Control-Allow-Origin: http://localhost:4200');
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
		$user_id = $data->user_id;
        
		if(isset($id) && isset($user_id)){
			$query = "UPDATE shipping SET defaultAddress='0' WHERE user_id=?";
			$stmt = $con->prepare($query);
			$rc = $stmt->bind_param('i', $user_id);
			$rc = $stmt->execute();
			$query = "UPDATE shipping SET defaultAddress='1' WHERE id=?";
			$stmt = $con->prepare($query);
			$rc = $stmt->bind_param('i', $id);
			$rc = $stmt->execute();
			$returnObj->success = 1;
			$returnObj->msg = 'Default address has been set!!';
		}else{
			$returnObj->success = -1;
			$returnObj->msg = 'Unable to update default address!!';
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