<?php 
    require_once('funciones_API.php');

    $id = $_POST['id'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];

    echo "\n";
    echo $id, $email, $password, $firstName, $lastName, 1;
    echo "\n";

    $result = update_user($id, $email, $password, $firstName, $lastName, 1);
    var_dump($result);
    if($result) {
        echo "<p>User updated successfully!</p>";
    } else {
        echo "<p>Error updating user. " . $result . "</p>";
    }

?>

