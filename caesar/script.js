function codificar() {
    var mensaje = document.getElementById('mensaje').value;
    var offset = parseInt(document.getElementById('offset').value) % 256;
    
    var resultado = "";

    for (var i = 0; i < mensaje.length; i++) {
        var charCode = mensaje.charCodeAt(i);
        
        // Aplicar el desplazamiento al código ASCII
        var codificado = (charCode + offset) % 256;
        
        resultado += String.fromCharCode(codificado);
    }

    document.getElementById('resultado').innerText = resultado;
}

function decodificar() {
    var mensaje = document.getElementById('mensaje').value;
    var offset = parseInt(document.getElementById('offset').value) % 256;
    
    var resultado = "";

    for (var i = 0; i < mensaje.length; i++) {
        var charCode = mensaje.charCodeAt(i);
        
        // Aplicar el desplazamiento al código ASCII
        var codificado = (charCode - offset) % 256;
        
        resultado += String.fromCharCode(codificado);
    }

    document.getElementById('resultado').innerText = resultado;
}