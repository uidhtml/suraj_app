<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Credentials: true');

    if(isset($_POST)){
        require('./connection/dbConnection.php');
        $data = convertToObject($_POST);
		$logger = $data->logger;
        $username = $data->username;
        $password = $data->password;

        $query = "SELECT * FROM $logger WHERE username=? and password=?";
        $stmt = $con->prepare($query);
        $rc = $stmt->bind_param('ss', $username, $password);
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
			$stmt->store_result();
			$num_of_rows = $stmt->num_rows; 
			$myObj=new \stdClass();
            if($num_of_rows > 0){
				$meta = $stmt->result_metadata();
				$results = getDataInArray($stmt, $meta);
				if($results[0]['status'] == 0){
					$myObj->success = -1;
					$myObj->status = 0;
					$myObj->msg = "It seems you have not activated your account. Click OK to activate.";
				}else{
					$myObj->success = 1;
					$myObj->msg = "Loggedin Successfully";
					$myObj->results = $results;
				}
                
			}else{
                $myObj->success = -1;
                $myObj->msg = "Incorrect Credentials or no record found!";
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

    
    echo json_encode($myObj);
?>