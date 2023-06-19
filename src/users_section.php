<h1>Users</h1>

<table>
    <tr>
        <th>Email</th>
        <th>Name</th>
        <th>Second name</th>
        <th> </th>
    </tr>

    <?php

    require_once("funciones_API.php");

    $usuarios = get_users();

    if(count($usuarios) == 0) {
        echo "<p>No users found.</p>";
        return;
    }

    foreach ($usuarios as $usuario):
    ?>
        <tr>
            <td><?php echo $usuario['email']; ?></td>
            <td><?php echo $usuario['firstName']; ?></td>
            <td><?php echo $usuario['lastName']; ?></td>

            <td>
                <form action="modify_user.php" method="post" style="display: inline;">
                    <input type="hidden" name="id" id="id" value="<?php echo $usuario['id']; ?>">
                    
                    <button type="submit">Modify</button>
                </form>

                <form action="delete_user.php" method="post" style="display: inline;">
                    <input type="hidden" name="id" value="<?php echo $usuario['id']; ?>">

                    <button type="submit">Delete</button>
                </form>
            </td>
        </tr>
    <?php endforeach; ?>

</table>
