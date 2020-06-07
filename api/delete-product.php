<?php
	header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	
	include('./config/siteUrl.php');
	$returnObj = new \stdClass();
	
	require('./connection/dbConnection.php');

	if(isset($_GET)){
		$data = convertToObject($_GET);
		$id = $data->id;

		// DELETE data from database
		$stmt = $con->prepare('DELETE products, product_details FROM products INNER JOIN product_details ON product_details.product_id = products.id WHERE products.id=?');
		if ( false===$stmt ) {
			$returnObj->success = -1;
			$returnObj->msg = 'Unable to create prepare statement.';
			die('prepare("11111") failed: '. htmlspecialchars($con->error));
		}
		$rc = $stmt->bind_param('i', $id);
		
		if ( false===$rc ) {
			$returnObj->msg = 'Unable to bind values.';
			die('prepare(22222) failed: '. htmlspecialchars($con->error));
		}
		$rc = $stmt->execute();
		if ( false===$rc ) {
			$returnObj->success = -1;
			$returnObj->msg = 'Unable to execute the sql query.';
			die('prepare(333333) failed:'. htmlspecialchars($con->error));
		}else{

			$returnObj->success = 1;
			$returnObj->msg = 'Record has been deleted!!';
			mysqli_close($con);
			$stmt->close();
		}		
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