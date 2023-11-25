function agregarElemento() {
    // Obtener valores del formulario
    var marca = $('#marca').val();
    var modelo = $('#modelo').val();
    var tipo = $('#tipo').val();
    var anio = $('#anio').val();
    var descripcion = $('#descripcion').val();
    var imagenUrl = $('#imagenUrl').val();

    // Crear objeto con los datos
    var nuevoElemento = {
        marca: marca,
        modelo: modelo,
        tipo: tipo,
        anio: anio,
        descripcion: descripcion,
        imagenUrl: imagenUrl
    };

    // Enviar datos mediante AJAX
    $.ajax({
        type: 'POST',
        url: 'guardarDatos.php', // Cambia esto al nombre que desees
        data: { elemento: JSON.stringify(nuevoElemento) },
        success: function (response) {
            alert('Elemento agregado correctamente');
            // Puedes hacer más cosas aquí si es necesario
        },
        error: function (error) {
            console.error('Error al agregar elemento:', error);
        }
    });
    $(document).ready(function() {
        location.reload(true); // El argumento 'true' fuerza una recarga desde el servidor, omitirlo usará la caché del navegador
    });
    
}

function cargarDatosExistente() {
    // Realizar una solicitud AJAX para obtener los datos existentes
    $.ajax({
        type: 'GET',
        url: 'obtenerDatos.php', // Cambia esto al nombre correcto de tu script PHP para obtener datos
        dataType: 'json', // Especificar el tipo de datos esperado como JSON
        success: function (datos) {
            // Limpiar la lista antes de agregar nuevos elementos
            $('#listaDatos').empty();

            // Iterar sobre los datos y agregarlos a la lista
            datos.forEach(function (elemento) {
                var elementoHTML =
                    '<div class="col-md-6 item-datos">' +
                        '<li class="list-group-item">' +
                            '<strong>Marca:</strong> ' + elemento.marca + '<br>' +
                            '<strong>Modelo:</strong> ' + elemento.modelo + '<br>' +
                            '<strong>Tipo:</strong> ' + elemento.tipo + '<br>' +
                            '<strong>Año:</strong> ' + elemento.anio + '<br>' +
                            '<strong>Descripción:</strong> ' + elemento.descripcion + '<br>' +
                            '<strong></strong> <img src="' + elemento.imagenUrl + '" alt="Imagen" class="imagen-carro">' +
                            '<button type="button" class="btn btn-danger btn-sm mt-2 mr-2" onclick="eliminarElemento(\'' + elemento.marca + '\', \'' + elemento.modelo + '\')">Eliminar</button>' +
                            '<button type="button" class="btn btn-warning btn-sm mt-2" onclick="modificarElemento(\'' + elemento.marca + '\', \'' + elemento.modelo + '\', \'' + elemento.tipo + '\', \'' + elemento.anio + '\', \'' + elemento.descripcion + '\', \'' + elemento.imagenUrl + '\')">Modificar</button>' +
                        '</li>' +
                    '</div>';

                $('#listaDatos').append(elementoHTML);
            });
        },
        error: function (error) {
            console.error('Error al obtener datos existentes:', JSON.stringify(error, null, 2));        }
    });
}

function modificarElemento(marca, modelo, tipo, anio, descripcion, imagenUrl) {
    // Llenar el formulario de modificación con los datos existentes
    $('#marcaModificar').val(marca);
    $('#modeloModificar').val(modelo);
    $('#tipoModificar').val(tipo);
    $('#anioModificar').val(anio);
    $('#descripcionModificar').val(descripcion);
    $('#imagenUrlModificar').val(imagenUrl);

    // Mostrar el modal de modificación
    $('#modalModificar').modal('show');
}

function confirmarModificacion() {
    // Obtener valores del formulario de modificación
    var marca = $('#marcaModificar').val();
    var modelo = $('#modeloModificar').val();
    var tipo = $('#tipoModificar').val();
    var anio = $('#anioModificar').val();
    var descripcion = $('#descripcionModificar').val();
    var imagenUrl = $('#imagenUrlModificar').val();

    // Crear objeto con los datos modificados
    var elementoModificado = {
        marca: marca,
        modelo: modelo,
        tipo: tipo,
        anio: anio,
        descripcion: descripcion,
        imagenUrl: imagenUrl
    };

    // Enviar datos mediante AJAX
    $.ajax({
        type: 'POST',
        url: 'modificarDato.php', // Cambia esto al nombre que desees
        data: { elemento: JSON.stringify(elementoModificado) },
        success: function (response) {
            alert('Elemento modificado correctamente');
            // Puedes hacer más cosas aquí si es necesario
            // Actualizar la lista de datos
            cargarDatosExistente();
            // Ocultar el modal de modificación
            $('#modalModificar').modal('hide');
        },
        error: function (error) {
            console.error('Error al modificar elemento:', error);
        }
    });
}

// ... (tu código existente)


function eliminarElemento(marca, modelo) {
    // Realizar una solicitud AJAX para eliminar el elemento
    $.ajax({
        type: 'POST',
        url: 'eliminarDato.php', // Cambia esto al nombre correcto de tu script PHP para eliminar datos
        data: { marca: marca, modelo: modelo },
        success: function (response) {
            alert('Elemento eliminado correctamente');
            cargarDatosExistente(); // Recargar la lista después de la eliminación
        },
        error: function (error) {
            console.error('Error al eliminar elemento:', error);
        }
    });
}


// Llamar a la función al cargar la página
$(document).ready(function () {
    cargarDatosExistente();
});
