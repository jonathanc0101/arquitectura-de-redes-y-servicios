<?php 

function set_auth_cookies($access_token, $refresh_token){
    setcookie("access_token",$access_token,time() + 2 * 24 * 60 * 60);
    setcookie("refresh_token",$refresh_token,time() + 2 * 24 * 60 * 60);
}

function get_auth_cookies(){
    return array(
        'access_token' => $_COOKIE['access_token'],
        'refresh_token' => $_COOKIE['refresh_token']
    );
}

function clear_auth_cookies(){
    setcookie("access_token", "", time() - 3600);
    setcookie("refresh_token", "", time() - 3600);
}



// Method: POST, PUT, GET etc
// Data: array("param" => "value") ==> index.php?param=value

function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {   
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
                
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));            
            break;
        case "DELETE":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    $cookies = get_auth_cookies();
    $accessToken = $cookies['access_token'];
    if(isset($accessToken)){
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Bearer ' . $accessToken));
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return json_decode($result,TRUE);
}

function redirect($url, $statusCode = 303)
{
   header('Location: ' . $url, true, $statusCode);
   die();
}

?>