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
		//$data = convertToObject($_POST);	
		$id = $_POST['id'];
		$name = $_POST['name'];
		$category = $_POST['category'];
		$mrp = $_POST['mrp'];
		$mrp_unit = $_POST['mrp_unit'];		
		$price = $_POST['price'];
		$price_unit = $_POST['price_unit'];		
		$stock = $_POST['stock'];
		$stock_unit = $_POST['stock_unit'];
		$image = $_POST['image'];
		$gst = $_POST['gst'];
		$date = $_POST['addedDate'];
		$body = json_encode($_POST['body']);

		if(!empty($_POST['status'])){
			$status = $_POST['status'];
		}else{
			$status = 0;
		}

		if(!empty($_FILES['imageFile'])){
			$imageFile = $_FILES['imageFile'];
			// Upload image
			require_once('./classes/class.uploadFile.php');
			$imageObj = new uploadFile();
			$imageUploadStatus = $imageObj -> upload($imageFile, 'images/'); 
			if($imageUploadStatus->result === 1){
				
				$sql = "SELECT image FROM products WHERE id='$id'";
				$stmt = $con->query($sql);
				$result = $stmt->fetch_object();
				$num_of_rows = $stmt->num_rows;
			
				if($result->image){
					unlink('./../src/assets/uploads/images/'.$result->image);
				}
				$returnObj->success = 1;
				$image = $imageUploadStatus->fileName;
			}else{
				$returnObj->success = -1;
				$arr = array();
				$error = new \stdClass();
				array_push($arr, array('msg'=>'Product Image: '.$imageUploadStatus->msg));
				$returnObj->msg = 'There is some error in updating record. :(';
				$returnObj->error = $arr;
			}
		}else{
			$returnObj->success = 1;
		}
		if($returnObj->success === 1){
			// UPDATE data into database
			$stmt = $con->prepare("UPDATE products SET name=?,category=?,mrp=?,mrp_unit=?,price=?,price_unit=?,stock=?,stock_unit=?,gst=?,date=?,image=?,status=? WHERE id=?");

			if ( false===$stmt ) {
				$returnObj->msg = 'Unable to create prepare statement.';
				die('prepare() failed: ');// . htmlspecialchars($mysqli->error));
			}
			$rc = $stmt->bind_param('ssssssssssssi', $name,$category,$mrp,$mrp_unit,$price,$price_unit,$stock,$stock_unit,$gst,$date,$image,$status,$id);
													
			if ( false===$rc ) {
				$returnObj->msg = 'Unable to bind values.';
				die('prepare(33333) failed: '. htmlspecialchars($stmt->error));
			}
			$rc = $stmt->execute();
			if ( false===$rc ) {
				$returnObj->msg = 'Unable to execute the sql query.';
				die('prepare() failed:'. htmlspecialchars($stmt->error));
			}else{
				// UPDATE Body into database
				$stmt = $con->prepare("UPDATE product_details SET body=? WHERE product_id=?");	
				$rc = $stmt->bind_param('si', $body,$id);
				$rc = $stmt->execute();
				if ( false===$rc ) {
					$returnObj->msg = 'Unable to execute the sql query.';
					die('prepare() failed:'. htmlspecialchars($stmt->error));
				}else{
					$returnObj->success = 1;
					$returnObj->msg = 'Record has been updated!!';
					$returnObj->imageUrl = $siteUrl."/suraj-latest-backup/src/assets/uploads/images/".$image;
				}
			}
			$stmt->close();	
			mysqli_close($con);
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
	
	
	echo json_encode($returnObj);
?>