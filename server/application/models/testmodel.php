<?php
class Testmodel extends CI_Model
{
public function register()
{
$mobile = I('post.mobile');
$password = I('post.password');
$res = D('User')->add(array(
'mobile'=> $mobile,
'password'=>md5($password),
'modifytime'=>date("Y-m-d H:i:s")
));
echo "god";
return $res;


}
  
?>