function atualizaCaracteres() {
    var noticia = $(".corpo-noticia").val();
    var caracteres = noticia.length;

    var contador = $("#numero-caracteres");
    contador.text(caracteres);
}

$(".corpo-noticia").on("input", atualizaCaracteres);