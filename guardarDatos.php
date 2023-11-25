<?php

// Verificar si se recibieron datos
if (isset($_POST['elemento'])) {
    // Obtener datos y decodificar el JSON
    $nuevoElemento = json_decode($_POST['elemento'], true);

    // Obtener el contenido actual del archivo JSON
    $datosActuales = file_get_contents('datos.json');

    // Decodificar el JSON actual
    $datosArray = json_decode($datosActuales, true);

    // Agregar el nuevo elemento al arreglo
    $datosArray[] = $nuevoElemento;

    // Codificar nuevamente el arreglo como JSON
    $datosActualizados = json_encode($datosArray, JSON_PRETTY_PRINT);

    // Guardar los datos en el archivo
    file_put_contents('datos.json', $datosActualizados);

    // Responder con éxito
    echo 'OK';
} else {
    // Si no se recibieron datos, responder con error
    echo 'Error: No se recibieron datos';
}

?>
