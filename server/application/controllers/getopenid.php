<?php  
public function text()  
{  
  $appid = 'wxd15f6d9d7d38610e';
        $secret = 'e72365910c1496728387912228e65b1a';
        $code = $_GET["code"];
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $appid . '&secret=' . $secret . '&code=' . $code . '&grant_type=authorization_code';

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
// 为保证第三方服务器与微信服务器之间数据传输的安全性，所有微信接口采用https方式调用，必须使用下面2行代码打开ssl安全校验。
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_URL, $url);

        $res = curl_exec($curl);
        curl_close($curl);

        $json_obj = json_decode($res, true);
        $openid = $json_obj["openid"];
        $data['openid'] = $openid;
        return json_encode($data);
}  
  
?>  