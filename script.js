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

$("#entidadForm").submit(function (event) {
    event.preventDefault();
    if (validarFormulario()) {
        console.log("Ejecutando submit");
        let div = $("<div></div>")
        let $form = $(this),
            titulo = $form.find("input[name='name']").val(),
            autor = $form.find("input[name='author']").val(),
            isbnF = $form.find("input[name='isbn']").val(),
            fechaPub = $form.find("input[name='datePublished']").val(),
            url = $form.attr("action");



        let entityJSON = {
            "@context": "http://schema.org",
            "@type": "Book",
            "name": titulo,
            "author":
            {
                "@type": "Person",
                "name": autor
            },
            "datePublished": fechaPub,
            "isbn": isbn
        }

        let arr = { '@context': 'http://schema.org', '@type': 'Book', name: titulo, author: { '@type': 'Person', name: autor }, datePublished: fechaPub, isbn: isbnF };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: url,
            data: JSON.stringify(arr),
            success: function (data) {
                console.log(data.title);
                console.log(data.article);
            },
            dataType: "json"
        });
        alert(`Se ha hecho el POST al servidor. Compruebe con get`);
        $(this).find(':input[type=submit]').prop('disabled', true);
    }
});

function pedirEntidades() {
    $.get(`https://156.35.95.59:5000/python-api/v1/`, (respuesta) => {
        drawEntidades(respuesta);
    });
}

function pedirLista() {
    $.get(`http://156.35.95.59:5000/python-api/v1/book`, (respuesta) => {
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


function validarFormulario() {
    let valido = true;
    titulo = entidadForm.name.value;
    if (titulo == '') {
        alert('Es obligatorio poner el nombre');
        valido = false;
    }
    autor = entidadForm.author.value;
    if (valido && autor == '') {
        alert('Es obligatorio poner el autor');
        valido = false;
    }
    isbn = entidadForm.isbn.value;
    let isbnRe = /\d{1}-\d{4}-\d{4}-\d{1}/;
    let isbnOK = isbnRe.exec(isbn);
    if (valido && isbn == '') {
        alert('Es obligatorio poner el isbn');
        valido = false;
    } else if (valido && !isbnOK) {
        alert('El isbn debe tener el formato indicado');
        valido = false;
    }
    fecha = entidadForm.datePublished.value;
    let fechaRe = /\d{4}[/](0+[1-9]|1[012])[/](0+[1-9]|[1|2]\d|3[01])/;
    let fechaOK = fechaRe.exec(fecha);
    if (valido && fecha == '') {
        alert('Es obligatorio poner la fecha de publicación');
        valido = false;
    } else if (valido && !fechaOK) {
        alert('La fecha debe tener el formato indicado');
        valido = false;
    }
    return valido;
}





