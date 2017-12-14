function inserePlacar() {
    // var placar = $(".placar");
    // var corpoTabela = placar.find("tbody");
    var corpoTabela = $('.placar').find("tbody");
    var usuario = "Edi Carlos";
    var numPalavras = $("#contador-palavras").text();
    // var botaoRemover = "<a href='#' class='botao-remover'><i class='small material-icons'>delete</i></a>";

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    // corpoTabela.append(linha);
    corpoTabela.prepend(linha);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href", "#").addClass("botao-remover");
    var icone = $("<i>").addClass("small material-icons").text("delete");

    // ícone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // os três <td> denttro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
}
// $(".botao-remover").click(function(event) {
//     event.preventDefault();
//     console.log("fui clicado");
//     $(this).parent().parent().remove();
// });