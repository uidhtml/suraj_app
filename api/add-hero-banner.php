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
		
		print_r($_POST);
		$image = $_POST['image'];
		$imageFile = $_FILES['imageFile'];	
		$date = $_POST['addedDate'];
		if(!empty($_POST['status'])){
			$status = $_POST['status'];
		}else{
			$status = 0;
		}
		
		// Upload image
		require_once('./classes/class.uploadFile.php');
		$imageObj = new uploadFile();
		$imageUploadStatus = $imageObj -> upload($imageFile, 'images/hero_banner/'); 
		
		if($imageUploadStatus->result === 1){

			$image = $imageUploadStatus->fileName;
			
			// insert data into database
			$stmt = $con->prepare('INSERT INTO hero_banner (image,date,status) VALUES(?,?,?)');
			if ( false===$stmt ) {
				$returnObj->msg = 'Unable to create prepare statement.';
				die('prepare() failed: ');// . htmlspecialchars($mysqli->error));
			}
			$rc = $stmt->bind_param('ssi', $image,$date,$status);
			
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
				$returnObj->msg = 'Record has been added successfully!!';
				$returnObj->imageUrl = $siteUrl."/suraj-latest-backup/src/assets/uploads/images/".$image;
			}

			mysqli_close($con);
		}else{
			$returnObj->success = -1;
			$arr = array();
			$error = new \stdClass();
			array_push($arr, array('msg'=>'Product Image: '.$imageUploadStatus->msg));
			$returnObj->msg = 'There is some error in adding record. :(';
			$returnObj->error = $arr;
		}
	}
	die();
	//echo json_encode($returnObj);
?>