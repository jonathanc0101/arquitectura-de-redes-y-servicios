<?php 
    require_once('funciones_API.php');

    $userId = $_POST['userId'];
    $title = $_POST['title'];

    $result = insert_book($userId, $title);

    if(isset($result['id'])){
        echo "book created successfully!";
    }
?>

