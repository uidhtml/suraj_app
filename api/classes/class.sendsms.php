<?php
	class SMS{
		private $returnObj;
		private $numbers;
		private $sender;
		private $msg;

		function __construct($mobile, $msg){
			$this->returnObj = (object)array();
			$this->numbers = array($mobile);
			$this->msg = $msg;
			$this->sender = 'TXTLCL';
		}
		
		public function send(){
			require('textlocal.class.php');
			$apiKey = urlencode('hE+knkWSwng-U7zxWJsuJbWebgMyRVn6Yi1h2qaBVt');
			$textlocal = new Textlocal(false, false, $apiKey);
			try {
				$result = $textlocal->sendSms($this->numbers, $this->msg, $this->sender);
				// Process your response here
				$this->returnObj->success = 1;
			} catch (Exception $e) {
				$error = $e->getMessage();
				$this->returnObj->success = -1;
				$this->returnObj->msg = $error;
			}
			
			return $this->returnObj;
		}
	}
?>