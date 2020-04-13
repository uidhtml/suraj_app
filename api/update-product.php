<?php
	header('Access-Control-Allow-Origin: http://localhost:4200');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
	header('Access-Control-Allow-Credentials: true');
	
	include('./config/siteUrl.php');
	$returnObj = new \stdClass();
	// $myObj->file = new \stdClass();
	
	require('./connection/dbConnection.php');
	print_r($_POST);

	function convertToObject($array) {
		$object = new \stdClass();
		print_r($array);
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
		$name = $data -> name;
		$category = $data -> category;
		$mrp = $data -> mrp;
		$image = $data -> image;
		$imageFile = $_FILES['imageFile'];
		$price = $data -> price;
		$stock = $data -> stock;
		$unit = $data -> unit;
		$date = $data -> addedDate;
		$body = $data -> body;
		$status = $data -> status;
		// Upload image
		require_once('./classes/class.uploadFile.php');
		$imageFileObj = new uploadFile();
		$uploadedImageStatus = $imageFileObj -> upload($imageFile, 'images/'); 
		
		print_r($uploadedImageStatus);
		$returnObj->success = 1;
		$returnObj->file->url = $siteUrl."/images/".$uploadedImageStatus[0]['fileName'];
	}
	

	echo json_encode($returnObj);
?>