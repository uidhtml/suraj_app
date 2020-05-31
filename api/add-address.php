<?php
    header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Credentials: true');

    if(isset($_POST)){
        require('./connection/dbConnection.php');
		$returnObj = new \stdClass();
		
        $data = convertToObject($_POST);
		$id = $data->id;
        $name = strtolower($data->name);
        $country = strtolower($data->country);
		$state = strtolower($data->state);
		$city = strtolower($data->city);
		$pincode = $data->pincode;
		$address = strtolower($data->address);
		$landmark = strtolower($data->landmark);
		if($data->defaultAddress == true){
			$defaultAddress = 1;
			$query = "UPDATE shipping SET defaultAddress='0' WHERE user_id=?";
			$stmt = $con->prepare($query);
			$rc = $stmt->bind_param('i', $id);
			$rc = $stmt->execute();
		}else{
			$defaultAddress = 0;
		}
		
		$query = "SELECT user_id,person_name,country,state,city,pincode,address,landmark FROM shipping WHERE user_id=? AND person_name=? AND country=? AND state=? AND city=? AND pincode=? AND landmark=?";
		$stmt = $con->prepare($query);
		$rc = $stmt->bind_param('issssis', $id,$name,$country,$state,$city,$pincode,$landmark);
		
		if ( false===$rc ) {
            $returnObj->msg = 'Unable to bind values.';
            die('prepare() failed: ' . htmlspecialchars($mysqli->error));
        }
        $rc = $stmt->execute();
        if ( false===$rc ) {
            $returnObj->msg = 'Unable to execute the sql query.';
            die('prepare() failed: ' . htmlspecialchars($mysqli->error));
        }else{
			$returnObj=new \stdClass();
			$stmt->store_result();
			$num_of_rows = $stmt->num_rows; 
			if($num_of_rows > 0){
				$returnObj->success = 1;
				$returnObj->msg = 'Address is already present, please choose from above!!';
			}else{
				$query = "INSERT INTO shipping (user_id,person_name,country,state,city,pincode,address,landmark,defaultAddress) values(?,?,?,?,?,?,?,?,?)";
				$stmt = $con->prepare($query);
				$rc = $stmt->bind_param('issssissi', $id,$name,$country,$state,$city,$pincode,$address,$landmark,$defaultAddress);
				if ( false===$rc ) {
					$returnObj->msg = 'Unable to bind values.';
					die('prepare() failed: ' . htmlspecialchars($mysqli->error));
				}
				$rc = $stmt->execute();
				if ( false===$rc ) {
					$returnObj->msg = 'Unable to execute the sql query.';
					die('prepare() failed: ' . htmlspecialchars($mysqli->error));
				}else{
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
					$returnObj->success = 1;
					$returnObj->msg = 'Address has been added successfully!!';
				}
			}
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

    
    echo json_encode($returnObj);
?>