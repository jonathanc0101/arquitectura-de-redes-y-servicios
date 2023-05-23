<?php 
    require_once('funciones_API.php');

    $id = $_POST['id'];

    $result = delete_user($id);
    echo $result;
    var_dump($result);

    if($result) {
        echo "<p>User deleted successfully!</p>";
    } else {
        echo "<p>Error deleting user. " . $result . "</p>";
    }

?>