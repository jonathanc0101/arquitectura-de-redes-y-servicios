<h1>Listado de usuarios</h1>

<table>
    <tr>
        <th>Email</th>
        <th>Acciones</th>
    </tr>

    <?php
    require "funciones_API.php";
    // Supongamos que tenemos un array de usuarios
    $usuarios = get_users();

    if(count($usuarios) == 0) {
        echo "<p>No users found.</p>";
        return;
    }

    foreach ($usuarios as $usuario):
    ?>
        <tr>
            <td><?php echo $usuario['email']; ?></td>
            <td>
                <form action="modify_user.php" method="post" style="display: inline;">
                    <input type="hidden" name="email" value="<?php echo $usuario['email']; ?>">
                    <button type="submit">Modificar</button>
                </form>

                <form action="delete_user.php" method="post" style="display: inline;">
                    <input type="hidden" name="email" value="<?php echo $usuario['email']; ?>">
                    <button type="submit">Eliminar</button>
                </form>
            </td>
        </tr>
    <?php endforeach; ?>

</table>
