<?php
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $post = $_POST;
    $username=$_POST['username'];
    $arr = array('text' => $username, "pass" =>$_POST);
    echo json_encode($arr);
}

?>