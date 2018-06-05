<?php
  defined('BASEPATH') OR exit('NO DIRECT SCRIPT ALLOWED');
  class Login extends CI_Controller{
    public function index()
    {
      $this->json([
        'code'=>0,
        'data'=>[
          'msg'=>'Hello World'
        ]
      ]

      )
    }
  }