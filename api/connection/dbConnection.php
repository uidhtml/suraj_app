<?php
    $host = 'localhost';
    $username = 'root';
    $password = '';
    $db = 'suraj_app';

    $con = mysqli_connect($host, $username, $password, $db);
    if(!$con){
        die('Could not connect: ' . mysqli_error()) ;
    }
?>