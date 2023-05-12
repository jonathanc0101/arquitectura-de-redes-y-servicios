<?php 
    require_once('funciones_API.php');

    $email = $_POST['email'];
    $password = $_POST['password'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];

    $result = insert_user($email, $password, $firstName, $lastName);

    if($result) {
        echo "<p>User created successfully!</p>";
    } else {
        echo "<p>Error creating user. " . $result . "</p>";
    }
?>