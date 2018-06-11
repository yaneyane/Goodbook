<?php

$hint = "";
function test()//测试程序
{
    $json_string = file_get_contents('state.json');//打开一个json文件
    $data = json_decode($json_string,true);//解析json文件字符串
    if($data["openState"] == 'close')//对json数据进行操作
    {
        $data1 = array();
        $data1['openState'] = 'open';
        $json_string1 = json_encode($data1);
        file_put_contents('state.json', $json_string1);
    }
        if($data["openState"] == 'open')//对json数据进行操作
    {
        $data1 = array();
        $data1['openState'] = 'close';
        $json_string1 = json_encode($data1);
        file_put_contents('state.json', $json_string1);
    }
    return $json_string;//反馈数据
}

$q=$_GET["q"];//获取前台传来的数据本测试程序为1

switch($q)
{
case 1:
    $hint = test();//执行test函数
    break;
}


$response=$hint;
echo $response;//将处理完的数据反馈给前台

?>