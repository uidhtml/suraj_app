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
		$mobile = $data->mobile;
		
		//Send sms to mobile code PHP		
		require('./classes/class.sendsms.php');
		$mobile = $mobile;
		
		$otp = mt_rand(100000,999999);
		
		$smsMessage = "Haxxix otp: ".$otp." Use OTP to activate your account.";
		$mobile = '91'.$mobile;
		$smsObj = new SMS($mobile,$smsMessage);
		$smsReturnData = new \stdClass();
		$smsReturnData = $smsObj->send();
				
		if($smsReturnData->success == 1){
			$msg = 'OTP send successfully.';
			$returnObj->otp = $otp;
			$returnObj->success = 1;
		}else{
			$msg = 'OTP could not send.';
			$returnObj->success = -1;
		}

		$returnObj->msg = $msg;
		
	}else{
		$returnObj->success = -1;
		$returnObj->msg = 'Mobile number should not be left empty.';
	}
	
	echo json_encode($returnObj);
	
?>