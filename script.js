let entidades = [];

$(document).ready(function () {
    let boton = $("#cargarEntidades");
    let botonLista = $("#cargarLista");
    let botonPOST = $("#introducirEntidad");
    let botonSubmitEntidad = $("#submitEntidad");
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
        $("#introducirEntidadForm").toggle();
    });
    botonSubmitEntidad.click(()=> {
        introducirEntidad();
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
        div.append(`<br>`);
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
        div.append(`<br>`);
        div.append(`<p>${index} : ${value}</p>`);
        $("body").append(div);
    });
}

function introducirEntidad() {
    validarFormulario();
    console.log('POST');
}

function validarFormulario() {
    let valido = true;
    titulo = formularioEntidad.name.value;
    if (titulo == '') {
        alert('Es obligatorio poner el nombre');
        valido = false;
    }
    autor = formularioEntidad.author.value;
    if (valido && autor == '') {
        alert('Es obligatorio poner el autor');
        valido = false;
    }
    isbn = formularioEntidad.isbn.value;
    let isbnRe = /\d{1}-\d{4}-\d{4}-\d{1}/;
    let isbnOK = isbnRe.exec(isbn);
    if (valido && isbn =='') {
        alert('Es obligatorio poner el isbn');
        valido = false;
    } else if (valido && !isbnOK) {
        alert('El isbn debe tener el formato indicado');
        valido = false;
    }
    fecha = formularioEntidad.datePublished.value;
    let fechaRe = /\d{4}[/](0+[1-9]|1[012])[/](0+[1-9]|[1|2]\d|3[01])/;
    let fechaOK = fechaRe.exec(fecha);
    if (valido && fecha =='') {
        alert('Es obligatorio poner la fecha de publicación');
        valido = false;
    } else if (valido && !fechaOK) {
        alert('La fecha debe tener el formato indicado');
        valido = false;
    }
    event.returnValue = valido;
}





