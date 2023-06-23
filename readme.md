# ¿Cómo uso el proyecto?
### Yo suelo correr [live server]() (extensión de visual studio code) y luego accedo a cada una de las páginas.


## Sobre la realización de los ejercicios:
* El ejercicio del cifrado de Cesar lo hice con ayuda de chatgpt.

* El ejercicio de vigenere lo hice con ayuda de chatgpt, [wikipedia](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) y [esta página](https://www.nayuki.io/page/vigenere-cipher-javascript) que ya realiza una implementación en javascript.


### Los algoritmos de hash (md5, sha-x, etc.) no se utilizan para cifrar mensajes. ¿Por qué?

* Se utilizan para generar valores a partir de un mensaje y ninguna clave, o una clave que viene "hardcodeada" en la función del algoritmo, en general los valores resultantes suelen estar muy dispersos por lo que si un solo bit está cambiado en el mensaje, ya se va a producir un valor de hash muy distinto.

* La idea es que no sean reversibles o que no sea práctico revertirlos.

* Es poco probable pero dos inputs pueden tener el mismo hash.

* No tiene clave secreta

## Explique conceptualmente la utilidad de algoritmos de hash para:
### a) Autenticación de usuarios

* Suele ser buena práctica que al iniciar sesión o crear un usuario, dada una tupla (nombre de usuario, contraseña, ...) se genere un hash para los campos que no deben ser almacenados como plain text, y es bueno **no** tenerlos en la base de datos, lo mas cercano que podemos hacer es tener un hash de la contraseña almacenado, o un doble hash, ya que el cliente puede enviar un hash de su contraseña, y nosotros lo hasheamos de vuelta.
* Esto es bueno porque es algo que no es reversible, y no estamos almacenando la contraseña, pero cuando el usuario inicia sesión podemos volver a crear el hash y compararlo con el que está almacenado.

### b) Comprobación de integridad de archivos.
* Si se cambia un solo bit, se produce un hash muy distinto.


## ¿Qué es salt? ¿Para qué se utiliza?
* Es un valor aleatorio que se le añade a un valor que se va a hashear justo antes de hashearlo, permite que inputs aparentemente identicos tengan hashes distintos.
* Agrega aleatoriedad a las contraseñas antes de su almacenamiento y hace que el proceso de descifrarlas sea más difícil y costoso para los atacantes. Ayuda a mejorar la seguridad y a proteger las contraseñas contra diversos tipos de ataques.


## Escriba un pequeño programa que almacene usuarios/contraseñas (MySQL, PostgreSQL, etc.) 
### Que permita registrarse/autenticarse, utilizando algún algoritmo de hash. Tenga en cuenta la utilización de salt.