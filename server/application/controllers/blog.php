<?php
if(!defined("BASEPATH")) exit("没有访问脚步的权限");
class Blog extends CI_Controller
{
    public function _construct()
    {
        parent::_construct();
    }
    public function testblog()
    {
        $this->load->view("vblog");
    }
}
/**
 * Created by PhpStorm.
 * User: miaor
 * Date: 2018/5/25
 * Time: 20:24
 */