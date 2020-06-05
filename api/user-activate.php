<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Credentials: true');
	
	if(isset($_POST)){
		require('./connection/dbConnection.php');
        $data = convertToObject($_POST);
		$mobile = $data->mobile;
		
		$query = "UPDATE users SET status=1 WHERE username=?";
        $stmt = $con->prepare($query);
        $rc = $stmt->bind_param('i', $mobile);
		$returnObj = new \stdClass();
        if ( false===$rc ) {
            $returnObj->success = -1;
			$returnObj->msg = 'Unable to bind values.';
			$returnObj->error = htmlspecialchars($con->error);
        }
        $rc = $stmt->execute();
		if ( false===$rc ) {
			$returnObj->success = -1;
			$returnObj->msg = 'Unable to execute the sql query.';
			$returnObj->error = htmlspecialchars($con->error);
        }else{
			$returnObj->success = 1;
			$returnObj->msg = "Hurray, your account has been successfully activated.";
			$stmt->close();
		}
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