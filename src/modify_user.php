<?php 
    require_once('funciones_API.php');

    $id = $_POST['id'];
    $user = get_user($id);
	$books = get_books($id);
?>	
	<h2>User</h2>
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

	<h2>Add book</h2>
	<form method="POST" action="add_book.php">
        <input type="hidden" name="userId" id="userId" value="<?php echo $id ; ?>">
		<label for="title">Title:</label>
		<input type="text" name="title" id="title" value="">
		<br>
		<button type="submit">add book</button>
	</form>


	<h2>Books</h2>
<table>
	<tr>
		<th>Title</th>
	</tr>

<?php
	foreach ($books as $book):
		?>
			<tr>
				<td><?php echo $book['title']; ?></td>
	
				<td>
					<form action="modify_book.php" method="post" style="display: inline;">
						<input type="hidden" name="userId" value="<?php echo $book['userId']; ?>">
						<input type="hidden" name="bookId" value="<?php echo $book['id']; ?>">
						
						<button type="submit">Modify</button>
					</form>
	
					<form action="delete_book.php" method="post" style="display: inline;">
						<input type="hidden" name="userId" value="<?php echo $book['userId']; ?>">
						<input type="hidden" name="bookId" value="<?php echo $book['id']; ?>">
	
						<button type="submit">Delete</button>
					</form>
				</td>
			</tr>
		<?php endforeach; ?>
</table>	