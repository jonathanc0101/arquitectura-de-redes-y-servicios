<h1>Listado de usuarios</h1>

<table>
    <tr>
        <th>Email</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Acciones</th>
    </tr>

    <?php

    require "funciones_API.php";    

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
                    
                    <button type="submit">Modificar</button>
                </form>

                <form action="delete_user.php" method="post" style="display: inline;">
                    <input type="hidden" name="id" value="<?php echo $usuario['id']; ?>">

                    <button type="submit">Eliminar</button>
                </form>
            </td>
        </tr>
    <?php endforeach; ?>

</table>
