<?php

// Leer datos desde el archivo JSON
$datosActuales = file_get_contents('datos.json');

// Enviar los datos como respuesta
header('Content-Type: application/json');
echo $datosActuales;

?>
