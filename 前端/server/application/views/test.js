function test()//发送客户端请求 
{
  xmlHttp = GetXmlHttpObject();//获取xmlhttp对象
  if (xmlHttp == null) {
    alert("Browser does not support HTTP Request")
    return
  }
  var url = "test.php"//服务器后台处理程序，此时需要和test.html文件放到同一文件夹下，如果不在同一文件夹下，需要加相对路径或者绝对路径。
  url = url + "?q=" + 1;//网页发送给后台的数据。可以是数字，字符串，json格式数据等任意数据结构
  url = url + "&sid=" + Math.random()//添加一个随机数作为后缀，保证每次请求后台均会重新处理并相应。
  xmlHttp.onreadystatechange = stateChanged//后台处理程序回调函数 
  xmlHttp.open("GET", url, true)//使用GET方式发送
  xmlHttp.send(null)//发送数据 。
}

function stateChanged()//监测程序回调函数
{
  if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete")//如果xmlhttp对象成功接收到数据
  {
    var strJson = xmlHttp.responseText;//获得数据文本
    //var state = new Function("return" + strJson)();//采用json格式解析
    var state = eval("(" + strJson + ")");//和上述注释函数功能相同，使用一个即可
    document.getElementById("processing").innerHTML = state.openState;//显示内容

  }
}

function GetXmlHttpObject()//获取xmlhttp对象
{
  var xmlHttp = null;
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch (e) {
    // Internet Explorer
    try {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return xmlHttp;
}