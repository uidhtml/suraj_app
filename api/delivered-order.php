<?php
	header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	
	include('./config/siteUrl.php');
	$returnObj = new \stdClass();
	
	require('./connection/dbConnection.php');

	if(isset($_POST)){	
		$id = $_POST['id'];
		$ref = $_POST['ref'];

		// DELETE data from database
		$stmt = $con->prepare('UPDATE orders SET status=1 WHERE id=? AND order_ref_code=?');
		if ( false===$stmt ) {
			$returnObj->success = -1;
			$returnObj->msg = 'Unable to create prepare statement.';
			die('prepare("11111") failed: '. htmlspecialchars($con->error));
		}
		$rc = $stmt->bind_param('is', $id,$ref);
		
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
			$returnObj->msg = 'Order has been removed!!';
			mysqli_close($con);
			$stmt->close();
		}		
	}else{
		$returnObj->success = -1;
		$returnObj->msg = 'Order ref code or Id is empty!!';
	}	
	echo json_encode($returnObj);
?>