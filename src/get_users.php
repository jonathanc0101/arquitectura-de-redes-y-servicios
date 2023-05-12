<?php 
    require "funciones_API.php";
    
    $users = get_users();
    if(count($users) > 0) {
        echo "<ul>";
		echo $users;
        // foreach($users as $user) {
        //     echo "<li>" . $user->email . " (" . $user->firstName . " " . $user->lastName . ")</li>";
        // }
        echo "</ul>";
    } else {
        echo "<p>No users found.</p>";
    }
?>