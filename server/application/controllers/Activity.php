<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
use QCloud_WeApp_SDK\Mysql\Mysql as DB;
class Activity extends CI_Controller {



public function test()
{
  $code = $_GET['code'];//小程序传来的code值  
    $nick = $_GET['nick'];//小程序传来的用户昵称  
    $imgUrl = $_GET['avaurl'];//小程序传来的用户头像地址  
    $sex = $_GET['sex'];//小程序传来的用户性别  
    $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd15f6d9d7d38610e&secret=e72365910c1496728387912228e65b1a&js_code='.$code.'&grant_type=authorization_code'; 
    //yourAppid为开发者appid.appSecret为开发者的appsecret,都可以从微信公众平台获取；  
    echo $code;
    echo "test";
    $info = file_get_contents($url);//发送HTTPs请求并获取返回的数据，推荐使用curl  
    $json = json_decode($info);//对json数据解码  
    $arr = get_object_vars($json);  
    $openid = $arr['openid'];  
    $session_key = $arr['session_key'];  
    echo $openid;
    /*
    $con = mysqli_connect('localhost', 'root', 'wjqwjq12');//连接数据库  
    if ($con) {  
        if (mysqli_select_db($con, 'students')) {  
            $sql1 = "select * from weixin where openid = '$openid'";  
            $result = mysqli_query($con, $sql1);  
            $result = mysqli_fetch_assoc($result);  
            if ($result!=null) {//如果数据库中存在此用户的信息，则不需要重新获取  
                $result = json_encode($result);  
                echo $result;  
            }  
            else {//没有则将数据存入数据库  
                if ($sex == '0') {  
                    $sex = 'none';  
                } else {  
                    $sex = '1' ? 'man' : 'women';  
                }  
                $sql = "insert into weixin values ('$nick','$openid','$session_key','$imgUrl','$sex')";  
                if (mysqli_query($con, $sql)) {  
                    $arr['nick'] = $nick;  
                    $arr['imgUrl'] = $imgUrl;  
                    $arr['sex'] = $sex;  
                    $arr = json_encode($arr);  
                    echo $arr;  
                } else {  
                    die('failed' . mysqli_error($con));  
                }  
            }  
        }  
    } else {  
        die(mysqli_error());  
    }  */
}
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Activity_model');
        $this->load->model('award_model');
        $this->load->helper('url_helper');
    }

    public function compare()
    {
      date_default_timezone_set("prc");
      $timenow=date("Y-m-d H:i",time());
      $timeend=$this->input->post("EndTime");
      $strnow=strtotime($timenow);
      $strend=strtotime($timeend);
      $chazhi=$strnow-$strend;
      $day=$chazhi/(24*60*60);
      $flag=-1;
      if($day<=3)
      {
        $flag=0;
      }
      else if($day>3)
      {
        $flag=1;
      }
      echo $flag;

    }
    public function index()
    {
        $data['activity'] = $this->Activity_model->get_activity();
        $data['ActivityName'] = '所有活动';
      
        //$this->load->view('templates/header', $data);
        $this->load->view('activity/index', $data);
       // $this->load->view('templates/footer');
    }

  //下载表格
    public function create1($s)
    {
        $this->Activity_model->create($s);
    }

    public function view($ActivityID = NULL) //所有活动
    {
        $data['activity_item'] = $this->Activity_model->get_activity($ActivityID);
        if (empty($data['activity_item']))
        {
            show_404();
        }
        $data['ActivityName'] = $data['activity_item']['ActivityName'];
        $data['StartTime'] = $data['activity_item']['StartTime'];
        $data['ActivityID'] = $data['activity_item']['ActivityID'];
        //$this->load->view('templates/header', $data);
        $this->load->view('activity/view', $data);
        //$this->load->view('templates/footer');
    }


    public function get_activityid()
    {
        $acid = $this->Activity_model->get_acid();
        return $acid;
    }
    public function create()
    {
     $this->output->set_header('content-type:application/x-www-form-urlencoded;charset=utf-8');
       $Activityname=$this->input->post("ActivityName");
       $ActivityDate=$this->input->post("Date");
       $ActivityTime=$this->input->post("Time");
       echo $Activityname;
        $ress=$this->Activity_model->set_activity($Activityname,$ActivityDate, $ActivityTime);
       self::get_activityid();

    }



}
?>