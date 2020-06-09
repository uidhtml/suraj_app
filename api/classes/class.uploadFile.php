<?php

class uploadFile {
    public $status;
    public $uploadOk = 0;
    public $tempfileName;
    public $fileExtension;
    public $newFileName ='';
    public $fileSize = 0;
    public $errorMsg = '';
    public $target_dir;
	
	public function __construct(){
		$this->status = (object)array();
	}

    public function upload($files, $dir){
        $this->target_dir = './../src/assets/uploads/'.$dir;
        if(file_exists($this->target_dir)){
            // Set new file name, which will be uploaded
            $tempName = explode('.',$files['name']);
			$this->newFileName = $journalName = preg_replace('/\s+/', '_', strtolower($tempName[0])).'.' . end($tempName);
            if($this->getFileMimeType($files) == 'image/jpeg' || $this->getFileMimeType($files) == 'image/jpg' 
            || $this->getFileMimeType($files) == 'image/png' || $this->getFileMimeType($files) == 'image/gif'){
                $this->uploadOk = 1;
                if($this->checkFileSizeLimit($files,1004800)){
                    $this->uploadOk = 0;
                    $this->status->result = -1;
					$this->status->msg = "Sorry, your file is too large in size (Allowed max 1MB).";
                    return $this->status;
                }
            }else{
				
			}

            if($this->getFileMimeType($files) == 'image/jpeg' || $this->getFileMimeType($files) == 'image/jpg' 
            || $this->getFileMimeType($files) == 'image/png' || $this->getFileMimeType($files) == 'image/gif'){
                if($this->checkForFileExists($this->newFileName)){
                    $this->uploadOk = 0;
					$this->status->result = 1;
					$this->status->msg = "File already exists.";
					$this->status->fileName = $this->newFileName;
					return $this->status;
                }
                 // call upload function finally
                if($this->uploadOk !== 0){
                    move_uploaded_file($files["tmp_name"], $this->target_dir.''.$this->newFileName);
					$this->status->result = 1;
					$this->status->msg = "uploaded";
					$this->status->fileName = $this->newFileName;
                    return $this->status;
                }else{
					$this->status->result = -1;
					$this->status->msg = "Sorry, your file was not uploaded.";
                    return $this->status;
                }
            }else{
                $this->uploadOk = 0;
				$this->status->result = -1;
				$this->status->msg = "This type of file can not be uploaded.";
                return $this->status;
            }
        }else{
			$this->status->result = -1;
			$this->status->msg = "No such directory exists.";
            return $this->status;
        }
    }

    // Get file extension
    public function getFileMimeType($files){
        return mime_content_type($files['tmp_name']);
    }
    // Get file size in bytes
    public function getFileSize($files){
        return filesize($files["tmp_name"]);
    }

    // check for file size limit
    public function checkFileSizeLimit($files,$limit){
        if ($this->getFileSize($files) > $limit) {
            return true;
        }
    }
    // Check for already existing file
    public function checkForFileExists($newFileName){
        if(file_exists($this->target_dir.''.$newFileName)){
            return true;
        }
    }

    // Upload file finally
    public function uploadFinally($files){
        if (move_uploaded_file($files["tmp_name"], $this->target_dir.''.$this->newFileName)) {
            return true;
        }else{
            return false;
        }
    }
}
?>