<?php 
    require_once('funciones_API.php');

    $email = $_POST['email'];
    $newEmail = $_POST['newEmail'];
    $id = $_POST['id'];

    $result = update_user_email($newEmail, $id);

    if($result) {
        echo "<p>Email updated successfully!</p>";
    } else {
        echo "<p>Error updating email. " . $result . "</p>";
    }
?>