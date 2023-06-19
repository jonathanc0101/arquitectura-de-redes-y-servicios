 se inicia y corre con:

    docker compose up

* Tanto el backend como el frontend corren en distintos containers de docker y se comunican entre ellos.

* Se puede acceder a la pagina principal yendo a localhost:8080/index.php

* La interfaz gráfica es horrenda.

Un flujo de acciones que permite probar que la pagina funciona lo mas rápido posible es:
    
    1: Entrar y crear un usuario
    2: Hacer login
    3: Editar el usuario
    4: Agregarle libros (solo tienen título)
    5: Eliminar/modificar libros
    6: No sufrir mucho mirando el frontend sin CSS

El token se almacena como cookie en el navegador, por lo que si se reinicia el backend, el navegador va a seguir pensando que se está logeado. Al hacer log out se "limpian" los cookies.

Espero nunca mas tener que usar php.