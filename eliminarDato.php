<?php

// Obtener datos enviados por POST
$marca = $_POST['marca'];
$modelo = $_POST['modelo'];

// Simular almacenamiento de datos en un archivo (puedes ajustar esto según tu lógica de almacenamiento)
$datos = json_decode(file_get_contents('datos.json'), true);

// Buscar y eliminar el elemento en el array
foreach ($datos as $key => $dato) {
    if ($dato['marca'] === $marca && $dato['modelo'] === $modelo) {
        unset($datos[$key]);
        break; // Terminar el bucle después de encontrar el elemento
    }
}

// Guardar los datos actualizados en el archivo
file_put_contents('datos.json', json_encode(array_values($datos)));

?>
