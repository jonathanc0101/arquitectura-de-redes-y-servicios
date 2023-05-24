<?php 
    require_once('funciones_API.php');
    require_once('network_utilities.php');

    $email = $_POST['email'];
    $password = $_POST['password'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];

    $result = insert_user($email, $password, $firstName, $lastName);

    redirect('index.php');

?>