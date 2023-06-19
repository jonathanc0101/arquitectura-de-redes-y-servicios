<?php
    require_once("funciones_API.php");
    $auth = get_auth_cookies();

    if($auth['access_token']){
        echo "logged in";
    }else{
        echo "not logged in";
    };  

 ?>