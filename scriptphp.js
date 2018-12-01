let entidades = [];

$(document).ready(function () {
    let boton = $("#cargarEntidades");
    let botonLista = $("#cargarLista");
    let botonPOST = $("#introducirEntidad");

    boton.click(() => {
        $(event.target).prop("disabled", true);
        pedirEntidades();
    });
    botonLista.click(() => {    
        $(event.target).prop("disabled", true);
        pedirLista();
    });
    botonPOST.click(() => {
        $(event.target).prop("disabled", true);
        $("#entidadForm").toggle();
    });
});


function pedirEntidades() {
    $.get(`http://localhost:8000/php-api/v1`, (respuesta) => {
        drawEntidades(respuesta);
    });
}

function pedirLista() { 
    $.get(`http://localhost:8000/php-api/v1/book`, (respuesta) => {
        console.log(respuesta);
        $.each(respuesta, function (index, value) {
            let div = $("<div></div>")
            console.log(index);
            div.append(`<br>`);
            div.append(`<br>`);
            div.append(`<p>${index} : ${value}</p>`);
            $("body").append(div);
        });
    });
}

function drawEntidades(entidades) {
    console.log('ejecutando draw entidades');
    console.log(entidades);
    $.each(entidades, function (index, value) {
        let div = $("<div></div>")
        div.append(`<br>`);
        div.append(`<p>${index} : ${value}</p>`);
        $("body").append(div);
    });
}






