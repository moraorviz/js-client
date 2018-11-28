let entidades = [];

$(document).ready(function () {
    let boton = $("#cargarEntidades");
    boton.click(() => {
        $(event.target).prop("disabled", true);
        $(event.target).html("Cargando entidades...");
        pedirEntidades();
    });
});

function pedirEntidades() {
    $.get(`http://127.0.0.1:5000/python-api/v1/`, (respuesta) => {
        let entidadesJSON = respuesta.data;
        entidades = entidades.concat(entidadesJSON);
        drawUsuarios();
    });
}


function drawEntidades() {
    $("#cargarEntidades").remove();
    console.log("printing traffic");
    console.log(entidades);
}

