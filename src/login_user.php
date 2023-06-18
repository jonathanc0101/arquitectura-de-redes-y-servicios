<?php 
   require_once('funciones_API.php');
   require_once('network_utilities.php');
   
   $email = $_POST['email'];
   $password = $_POST['password'];
   
   set_token($email,$password);

   $auth = get_auth_cookies();

   if($auth['access_token']){
       echo "logged in";
   }else{
       echo "not logged in";
   };  

//    redirect('index.php');
?>