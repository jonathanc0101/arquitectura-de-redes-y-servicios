<?php 
   require_once('funciones_API.php');
   require_once('network_utilities.php');
   
   $email = $_POST['email'];
   $password = $_POST['password'];
   
   set_token($email,$password);

   redirect('index.php');
?>