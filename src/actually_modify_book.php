<?php 
    require_once('funciones_API.php');

    $bookId = $_POST['bookId'];
    $userId = $_POST['userId'];
    $title = $_POST['title'];

    $result = update_book($userId, $bookId, $title);

    redirect('index.php');
?>

