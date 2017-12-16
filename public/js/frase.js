$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
$("#botao-sync").click(sincronizarPlacar);

function fraseAleatoria() {

    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(function() {
            $("#erro").toggle();
            setTimeout(function() {
                $("#erro").toggle();
            }, 1500);
        })
        .always(function() {
            $("#spinner").toggle();
        })

}

function trocaFraseAleatoria(data) {
    // console.log(data);
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo)
}

function buscaFrase() {

    $("#spinner").toggle();

    var fraseId = $("#frase-id").val();
    var dados = { id: fraseId }; //criação do objeto que guarda a id e será enviado junto com o método get

    // passando o objeto como segundo parametro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
        .fail(function() {
            $("#erro").toggle();
            setTimeout(function() {
                $("#erro").toggle();
            }, 2000);
        })
        .always(function() {
            $("#spinner").toggle();
        });
}

function trocaFrase(data) {
    // console.log(data);   

    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

function sincronizarPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

    // console.log(linhas);

    linhas.each(function() {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    }

    $.post("http://localhost:3000/placar", dados, function() {
        console.log("placar sincronizado com sucesso.");
    })
}

function atualizaPlacar() {

    $.get("http://localhost:3000/placar", function(data) {
        $(data).each(function() {
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });

}