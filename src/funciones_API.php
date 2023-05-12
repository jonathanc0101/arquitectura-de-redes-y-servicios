<?php 
    require "network_utilities.php";


    function get_users()
    {
        return CallAPI("GET", "http://backend-toptal:3000/users");
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