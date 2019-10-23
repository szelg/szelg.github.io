<?php
// 实现新闻头条，这个是中转第三方API，接收type和key，返回json数据
header('Content-type:text/html;charset=utf-8');
$type=$_GET['type'];
$key=$_GET['key'];
//配置您申请的appkey
$apicode = $key;
 
$url = "http://v.juhe.cn/toutiao/index";
 
$method = "GET";

$params = array(
        "type" => $type,
        "key" => $key
 );
 
$header = array();
$header[] = "key=".$apicode;
$header[] = "content-type:application/json";
 
$content = linkcurl($url,$method,$params,$header);
$result = json_decode($content,true);
if($result){
    // if($result['error_code']=='0'){
    //     print_r($result);

    // }else{
    //     echo $result['error_code'].":".$result['reason'];
    // }
    print_r($content);
    // echo $content;
}else{
    echo "请求失败";
}
 
/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
 * @param  string $params [请求的参数]
 * @param  int $ipost [是否采用POST形式]
 * @return  string
 */
function linkcurl($url,$method,$params=false,$header=false){
    $httpInfo = array();
    $ch = curl_init();
     
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_FAILONERROR, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
     
    if (1 == strpos("$".$url, "https://"))
    {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    }
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
    curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
 
    if($method == "POST" ){
        curl_setopt( $ch , CURLOPT_POST , true );
        curl_setopt( $ch , CURLOPT_POSTFIELDS, json_encode($params) );
    }else if($params){
        curl_setopt( $ch , CURLOPT_URL , $url.'?'.http_build_query($params) );
    }
    $response = curl_exec( $ch );
    if ($response === FALSE) {
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
    $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
    curl_close( $ch );
    return $response;
}
?>