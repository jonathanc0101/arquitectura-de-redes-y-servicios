<?php 
    require_once('funciones_API.php');
    require_once('network_utilities.php');

    $id = $_POST['id'];

    delete_user($id);
    redirect('index.php');

?>