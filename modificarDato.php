<?php
// Obtener los datos enviados mediante POST
$elementoModificado = json_decode($_POST['elemento'], true);

// Obtener el contenido actual del archivo JSON
$datosJson = file_get_contents('datos.json');

// Decodificar el contenido JSON en un array asociativo
$datos = json_decode($datosJson, true);

// Buscar el elemento a modificar por marca y modelo
foreach ($datos as $key => $elemento) {
    if ($elemento['marca'] == $elementoModificado['marca'] && $elemento['modelo'] == $elementoModificado['modelo']) {
        // Modificar el elemento encontrado con los nuevos datos
        $datos[$key] = $elementoModificado;
        break;
    }
}

// Codificar el array actualizado a JSON
$nuevosDatosJson = json_encode($datos, JSON_PRETTY_PRINT);

// Guardar el nuevo contenido en el archivo
file_put_contents('datos.json', $nuevosDatosJson);

// Devolver una respuesta exitosa
echo json_encode(['success' => true]);

?>