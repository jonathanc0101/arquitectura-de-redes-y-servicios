<?php 
    require "network_utilities.php";

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

    function set_token($email,$password){
        $jsonResponse = get_token($email,$password);

        $access_token = $jsonResponse["accessToken"];
        $refresh_token = $jsonResponse["refreshToken"];
        
        set_auth_cookies($access_token,$refresh_token);

        if(!$jsonResponse["errors"]){
        }
    }

    function get_token($email,$password){
        $data = array(
            "email" => $email,
            "password" => $password
        );

        $jsonData = json_encode($data);
        
        return CallAPI("POST", "http://backend-toptal:3000/auth",$jsonData);
    }

    function get_users()
    {
        return CallAPI("GET", "http://backend-toptal:3000/users");
    }

    function get_user($id)
    {
        return CallAPI("GET", "http://backend-toptal:3000/users/$id");
    }


    function insert_user($email, $password, $firstName, $lastName){
        $data = array(
            "email" => $email,
            "password" => $password,
            "firstName" => $firstName,
            "lastName" => $lastName
        );
        
        $jsonData = json_encode($data);
        return CallAPI("POST", "http://backend-toptal:3000/users", $jsonData);
    }


    // Función para actualizar un usuario
    function update_user($id, $email, $password, $firstName, $lastName, $permissionLevel){
        $data = array(
            "email" => $email,
            "password" => $password,
            "firstName" => $firstName,
            "lastName" => $lastName,
            "permissionLevel" => $permissionLevel
        );

        $jsonData = json_encode($data); 
        
        return CallAPI("PUT", "http://backend-toptal:3000/users/$id", $jsonData);
    }


    // Función para eliminar un usuario
    function delete_user($id){
        return CallAPI("DELETE", "http://backend-toptal:3000/users/$id");
    }

    // Función para actualizar el email de un usuario
    function update_user_email($id, $email){
        $data = array(
            "email" => $email
        );

        $jsonData = json_encode($data);
        return CallAPI("PATCH", "http://backend-toptal:3000/users/$id", $jsonData);
    }

    
?>