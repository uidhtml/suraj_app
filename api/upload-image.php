<?php
	header('Access-Control-Allow-Origin: http://haxxix.com');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin , authorization, access-control-allow-methods, access-control-allow-headers');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Credentials: true');
	
	include('./config/siteUrl.php');
	
	$myObj=new \stdClass();
	$myObj->file = new \stdClass();
	
	require_once('./classes/class.uploadFile.php');
    $imageFileObj = new uploadFile();
    $imageUploadStatus = $imageFileObj -> upload($_FILES['image'], 'images/'); 
	
	if($imageUploadStatus[0]['result'] != -1){
		//array_push($data, array("success" => 1, "file" => $siteUrl."/uploads/images/".$imageUploadStatus[0]['fileName']));
	}else{
		//array_push($data, array("success" => 0, "msg" = $imageUploadStatus[0]['msg']);
	}
	$myObj->success = 1;
	$myObj->file->url = $siteUrl."/images/".$imageUploadStatus[0]['fileName'];

	echo json_encode($myObj);
?>