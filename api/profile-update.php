<?php
	header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	
	include('./config/siteUrl.php');
	$returnObj = new \stdClass();
	
	require('./connection/dbConnection.php');

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

	if(isset($_POST)){
		$data = convertToObject($_POST);
		
		$id = $data->id;
		$firstName = $data -> firstName;
		if(isset($data->middleName)){
			$middleName = $data -> middleName;
		}else{
			$middleName = '';
		}
		$lastName = $data -> lastName;
		$mobile = $data -> mobile;
		$username = $data -> mobile;

		if(isset($data->email)){
			$email = $data -> email;
		}else{
			$email = '';
		}
		$password = $data -> password;
		$updateDate = $data -> addedDate;
		$image = $data -> image;

		if(!empty($_FILES['imageFile'])){
			$imageFile = $_FILES['imageFile'];
			// Upload image
			require_once('./classes/class.uploadFile.php');
			$imageObj = new uploadFile();
			$imageUploadStatus = $imageObj -> upload($imageFile, 'images/'); 
			if($imageUploadStatus->result === 1){
				$image = $imageUploadStatus->fileName;
			}else{
				$returnObj->success = -1;
				$arr = array();
				$error = new \stdClass();
				array_push($arr, array('msg'=>'Product Image: '.$imageUploadStatus->msg));
				$returnObj->msg = 'There is some error in updating record. :(';
				$returnObj->error = $arr;
			}
		}
		$code = md5(rand());
		// UPDATE data into database
		$stmt = $con->prepare('UPDATE users SET firstName=?,middleName=?,lastName=?,mobile=?,email=?,username=?,password=?,image=?,code=?,updateDate=? WHERE id=?');
		if ( false===$stmt ) {
			$returnObj->msg = 'Unable to create prepare statement.';
			die('prepare() failed: ');// . htmlspecialchars($mysqli->error));
		}
		$rc = $stmt->bind_param('ssssssssssi', $firstName,$middleName,$lastName,$mobile,$email,$username,$password,$image,$code,$updateDate,$id);
		
		if ( false===$rc ) {
			$returnObj->msg = 'Unable to bind values.';
			die('prepare(33333) failed: '. htmlspecialchars($stmt->error));
		}
		$rc = $stmt->execute();
		if ( false===$rc ) {
			$returnObj->msg = 'Unable to execute the sql query.';
			die('prepare() failed:'. htmlspecialchars($stmt->error));
		}else{

			$returnObj->success = 1;
			$returnObj->msg = 'Profile has been updated!!';

			mysqli_close($con);
		}
			
		$stmt->close();
	}
	echo json_encode($returnObj);
?>