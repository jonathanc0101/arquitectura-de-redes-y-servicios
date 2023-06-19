<?php 
    require_once('funciones_API.php');

	$userId = $_POST['userId'];
    $bookId = $_POST['bookId'];

    $book = get_book($userId,$bookId);
	
?>	
	<h2>Book</h2>
    <form method="POST" action="actually_modify_book.php">
		<input type="hidden" name="userId" value="<?php echo $book['userId']; ?>">
		<input type="hidden" name="bookId" value="<?php echo $book['id']; ?>">

		<br>
		<label for="title">New title:</label>
		<input type="title" name="title" id="title" value="<?php echo $book['title']; ?>" required>
		<br>

		<button type="submit">Modify</button>
	</form>
