<?php 
    require_once('funciones_API.php');

    $userId = $_POST['userId'];
    $bookId = $_POST['bookId'];

    $result = delete_book($userId,$bookId);
    
    redirect('index.php');
?>

