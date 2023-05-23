<?php 
    require_once('funciones_API.php');

    $id = $_POST['id'];
    $user = get_user($id);

?>
    <form method="POST" action="actually_modify_user.php">
        <input type="hidden" name="id" id="id" value="<?php echo $id ; ?>">
		<p>Email: <?php echo $user['email'] ; ?></p>
		<input type="hidden" name="email" id="email" value="<?php echo $user['email'] ; ?>" required>
		<br>
		<label for="password">New Password:</label>
		<input type="password" name="password" id="password" value="" required>
		<br>
		<label for="firstName">First Name:</label>
		<input type="text" name="firstName" id="firstName" value="<?php echo $user['firstName'] ; ?>">
		<br>
		<label for="lastName">Last Name:</label>
		<input type="text" name="lastName" id="lastName" value="<?php echo $user['lastName'] ; ?>">
		<br>
		<button type="submit">Modify</button>
	</form>
