<?php 
    require_once('funciones_API.php');

    $id = $_POST['id'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];

    $result = update_user($id, $email, $password, $firstName, $lastName, 1);

    redirect('index.php');

?>

