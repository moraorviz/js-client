let entidades = [];

$(document).ready(function () {
    let boton = $("#cargarEntidades");
    let botonLista = $("#cargarLista");
    boton.click(() => {
        $(event.target).prop("disabled", true);
        pedirEntidades();
    });
    botonLista.click(() => {
        $(event.target).prop("disabled", true);
        pedirLista();
    });
});

function pedirEntidades() {
    $.get(`http://127.0.0.1:5000/python-api/v1/`, (respuesta) => {
        drawEntidades(respuesta);
    });
}

function pedirLista () {
    $.get(`http://127.0.0.1:5000/python-api/v1/book`, (respuesta) => {
        console.log(respuesta);
        $.each(respuesta, function (index, value) {
        let div = $("<div></div>")
        console.log(index);
        div.append(`<p> Autor : ${value.author.name}</p>`);
        div.append(`<p> Fecha de publicación : ${value.datePublished}</p>`);
        div.append(`<p> isbn : ${value.isbn}</p>`);
        div.append(`<p> Título : ${value.name}</p>`);
        div.append(`<p> Ruta del servicio : ${value.url}</p>`);
        $("body").append(div);
    });
    });
}


function drawEntidades(entidades) {
    console.log('ejecutando draw entidades');
    console.log(entidades);
    $.each(entidades, function (index, value) {
        let div = $("<div></div>")
        div.append(`<p>${index} : ${value}</p>`);
        $("body").append(div);
    });
}

$("#introducirEntidad").click(function(){
        $("#introducirEntidadForm").toggle();
    });





