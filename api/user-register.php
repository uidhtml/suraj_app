<?php
	header('Access-Control-Allow-Origin: http://localhost:4200');
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
		$firstName = $_POST['firstName'];
		if(isset($_POST['middleName'])){
			$middleName = $_POST['middleName'];
		}else{
			$middleName = '';
		}
		
		$lastName = $_POST['lastName'];
		$mobile = $_POST['mobile'];
		if(isset($_POST['email'])){
			$email = $_POST['email'];
		}else{
			$email = '';
		}
		
		$username = $_POST['mobile'];
		$password = $_POST['password'];
		$imageFile = $_FILES['imageFile'];
		$tempName = explode('.',$imageFile['name']);
		$imageFile['name'] = $tempName[0].'_'.$mobile.'.' . end($tempName);
		$date = $_POST['addedDate'];
		$status = $_POST['status'];
		// Upload image
		require_once('./classes/class.uploadFile.php');
		$imageObj = new uploadFile();
		$imageUploadStatus = $imageObj -> upload($imageFile, 'images/profile_pic/'); 
		
		if($imageUploadStatus->result === 1){

			$image = $imageUploadStatus->fileName;
			
			$stmt = $con->prepare('SELECT * FROM users WHERE username = ?');
			$rc = $stmt->bind_param('s', $username);
			$rc = $stmt->execute();
			$result = $stmt->get_result();
			if($result->num_rows){
				$returnObj->success = -1;
				$arr = array();
				$error = new \stdClass();
				array_push($arr, array('msg'=>'User already exists, !Try another.'));
				$returnObj->error = $arr;
				$returnObj->msg = 'There is some error in adding record. 😒';
			}else{
				// insert data into database
				$code = md5(rand());
				$stmt = $con->prepare('INSERT INTO users (firstName,middleName,lastName,mobile,email,username,password,image,code,date,status) VALUES(?,?,?,?,?,?,?,?,?,?,?)');
				if ( false===$stmt ) {
					$returnObj->msg = 'Unable to create prepare statement.';
					die('prepare() failed: ');// . htmlspecialchars($mysqli->error));
				}
				$rc = $stmt->bind_param('ssssssssssi', $firstName,$middleName,$lastName,$mobile,$email,$username,$password,$image,$code,$date,$status);
				
				if ( false===$rc ) {
					$returnObj->msg = 'Unable to bind values.';
					die('prepare(33333) failed: '. htmlspecialchars($stmt->error));
				}
				$rc = $stmt->execute();
				if ( false===$rc ) {
					$returnObj->msg = 'Unable to execute the sql query.';
					die('prepare() failed:'. htmlspecialchars($stmt->error));
				}
				$stmt->fetch();
				$stmt->close();
				
				$returnObj->success = 1;
				$returnObj->msg = 'Record has been added successfully!!';
				
				$webmaster = "HAXXIX <info@haxxix.com>";
				$header = "FROM: ".$webmaster;
				$subject = "Activate your account";
				$message = "Thanks for registering.\n";
				$message .= "Your username:".$username."\n";
				$message .= "Your password:".$password."\n";
				$message .= "Click on link below to activate your account. \n";	
				$message .= $siteUrl."/activation/".$username."/".$code ."\n";
				$message .= "you must activate your account to login.";
				@mail($email,$subject,$message,$header);	
				$emailExtention = explode('@',$email);
				$messageHeader = "Thankyou for Registration";
				$successMessage = '
					<p>Thankyou for giving your precious time. You have been successfully registered.</p>
					<h3>Kindly activate your account</h3>
					<p style="margin-bottom:30px">An activation link has been sent to your registered email id: '.$emailExtention[0].'@***</p>
					<a class="button" href="'.$siteUrl.'"><i class="fa fa-home"></i>Home</a>
				';					
				
				mysqli_close($con);
			}
		}else{
			$returnObj->success = -1;
			$arr = array();
			$error = new \stdClass();
			array_push($arr, array('msg'=>'Product Image: '.$imageUploadStatus->msg));
			$returnObj->msg = 'There is some error in adding record. :(';
			$returnObj->error = $arr;
		}
	}
	echo json_encode($returnObj);
?>