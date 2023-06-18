<!DOCTYPE html>
<html>
<head>
	<title>API Test</title>
</head>

<?php 
	error_reporting(E_ALL);
	error_reporting(-1);
	ini_set('error_reporting', E_ALL);  
 ?>
<body>
	<h1>Login</h1>
	<form method="POST" action="login_user.php">
		<label for="email">Email:</label>
		<input type="email" name="email" id="email" required>
		<br>
		<label for="password">Password:</label>
		<input type="password" name="password" id="password" required>
		<br>
		<button type="submit">Login</button>
	</form>

	<h1>Create User</h1>
	<form method="POST" action="create_user.php">
		<label for="email">Email:</label>
		<input type="email" name="email" id="email" required>
		<br>
		<label for="password">Password:</label>
		<input type="password" name="password" id="password" required>
		<br>
		<label for="firstName">First Name:</label>
		<input type="text" name="firstName" id="firstName">
		<br>
		<label for="lastName">Last Name:</label>
		<input type="text" name="lastName" id="lastName">
		<br>
		<button type="submit">Create</button>
	</form>

	<h2>Users</h2>
	<?php require_once("users_section.php"); ?>

</body>
</html>
