<?php
    header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Credentials: true');

    if(isset($_POST)){
		$array = json_decode($_POST['orders']);
        require('./connection/dbConnection.php');
		
		$order_ref_code = random_strings(8);
		foreach($array as $row => $value ){
			$user_id = $value->user_id;
			$product_id = $value->id;
			$address_id = $value->address_id;
			$quantity = $value->quantity;
			$unit = $value->unit;
			$date = $value->date;
			$status = $value->status;
			$stmt = $con->prepare('INSERT orders (user_id, product_id,address_id,quantity,unit,date,order_ref_code,status) VALUES(?,?,?,?,?,?,?,?)');
			$rc = $stmt->bind_param('iiiisssi',$user_id,$product_id,$address_id,$quantity,$unit,$date,$order_ref_code,$status);
			$stmt->execute();
		}
		$myObj=new \stdClass();
		$myObj->success = 1;
        $myObj->msg = "Order Placed Successfully";
		
        /*$data = convertToObject($_POST);
		$logger = $data->logger;
        $username = $data->username;
        $password = $data->password;

        $query = "SELECT * FROM $logger WHERE username=? and password=?";
        $stmt = $con->prepare($query);
        $rc = $stmt->bind_param('ss', $username, $password);
        if ( false===$rc ) {
            $returnObj->msg = 'Unable to bind values.';
            die('prepare() failed: ' . htmlspecialchars($mysqli->error));
        }
        $rc = $stmt->execute();
        if ( false===$rc ) {
            $returnObj->msg = 'Unable to execute the sql query.';
            die('prepare() failed: ' . htmlspecialchars($mysqli->error));
        }else{
            $result = $stmt->get_result();
            $myObj=new \stdClass();
            if($result->num_rows > 0){
                $myObj->success = 1;
                $myObj->msg = "Loggedin Successfully";
				if($logger == 'users'){
					// output data of each row
					while($row = $result->fetch_assoc()) {
						$myObj->id = $row["id"];
						$myObj->firstName = $row["firstName"];
						$myObj->middleName = $row["middleName"];
						$myObj->lastName = $row["lastName"];
						$myObj->mobile = $row["mobile"];
						$myObj->email = $row["email"];
						$myObj->username = $row["username"];
						$myObj->image = $row["image"];
						$myObj->code = $row["code"];
						$myObj->status = $row["status"];
					}
				}
				if($logger == 'admin'){
					// output data of each row
					while($row = $result->fetch_assoc()) {
						$myObj->firstName = $row["firstName"];
						$myObj->lastName = $row["lastName"];
						$myObj->username = $row["username"];
						$myObj->image = $row["image"];
					}
				}
            }else{
                $myObj->success = -1;
                $myObj->msg = "Incorrect Credentials!";
            }
            
        }*/
        
    }
	
	function random_strings($length_of_string) 
	{ 
		$str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
		return substr(bin2hex(random_bytes($length_of_string)),0, $length_of_string); 
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