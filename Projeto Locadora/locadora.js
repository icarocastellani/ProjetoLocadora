// Cria uma lista de titulos cadastrados
let titulosCadastrados = []

// Função que coleta, verifica e armazena detalhes do filme.
function CadastroTitulos () {
    // cria referencias aos elementos da pagina
    let inFilme = document.getElementById("inFilme");
    let inQtde = document.getElementById("inQtde");
    let inDuracao = document.getElementById("inDuracao");
    let classLivre = document.getElementById("classLivre");
    let class10 = document.getElementById("class10");
    let class12 = document.getElementById("class12");
    let class14 = document.getElementById("class14");
    let class16 = document.getElementById("class16");
    let class18 = document.getElementById("class18");

    // Obtenha o conteúdo dos campos
    let nome = inFilme.value || "";
    let qtde = parseInt(inQtde.value) || 0;
    let duracao = parseFloat(inDuracao.value) || 0;
    let classificacao;

    // Verificar preenchimentos
    if (nome == "") { // Verificar se o titulo foi preenchido
        alert ("Preencha o Titulo do filme!");
        inFilme.focus(); //Posiciona no campo Titulo do filme
        return;
    } else if (qtde == 0) { // Verificar se a quantidade foi preenchida
        alert ("Preencha a quantidade de unidades do filme!");
        inQtde.focus(); //Posiciona no campo Quantidade
        return;
    } else if (duracao == 0) { // Verificar se a duração foi preenchida
        alert ("Preencha a duração do filme!");
        inDuracao.focus(); //Posiciona no campo Duração
        return;
    }
    
    // Verifique qual opção de classificação está selecionada
    if (classLivre.checked) {
        classificacao = "Livre";
    } else if (class10.checked) {
        classificacao = "Não recomendado para Menores de 10 anos";
    } else if (class12.checked) {
        classificacao = "Não recomendado para Menores de 12 anos";
    } else if (class14.checked) {
        classificacao = "Não recomendado para Menores de 14 anos";
    } else if (class16.checked) {
        classificacao = "Não recomendado para Menores de 16 anos";
    } else if (class18.checked) {
        classificacao = "Não recomendado para Menores de 18 anos";
    } else {
        classificacao = "";
        alert ("Preencha uma classificação!")
        return;
    }

    // Objeto para representar o título cadastrado e validado anteriormente
    let titulo = {
        nome: nome,
        quantidade: qtde,
        duracao: duracao,
        classificacao: classificacao
    };
    // Adicione o título ao array de títulos cadastrados
        titulosCadastrados.push(titulo);

    // Chame a função para exibir a listagem de títulos
        exibirListagem();
}

// Função que exibe os dados dos títulos cadastrados na lista
function exibirListagem() {
    // Referência ao elemento HTML - div com id "listagem")
    let listagemElement = document.getElementById("listagem");

    // Limpe o conteúdo atual da listagem
    listagemElement.innerHTML = "";

    // Itere sobre o array de títulos cadastrados e crie elementos HTML para exibir as informações
    for (let titulo of titulosCadastrados) {
        let tituloElement = document.createElement("div");
        tituloElement.textContent = `Nome: ${titulo.nome}, Quantidade: ${titulo.quantidade}, Duração: ${titulo.duracao}, Classificação: ${titulo.classificacao}`;
        listagemElement.appendChild(tituloElement);
    }
}

// Função que limpa os dados preenchidos
function LimparCampos () {
    // Limpa os conteúdos dos elementos
    document.getElementById("inFilme").value = ""
    document.getElementById("inQtde").value = ""
    document.getElementById("inDuracao").value = ""
    document.getElementById("classLivre").checked = false
    document.getElementById("class10").checked = false
    document.getElementById("class12").checked = false
    document.getElementById("class14").checked = false
    document.getElementById("class16").checked = false
    document.getElementById("class18").checked = false

    document.getElementById("inFilme").focus()
}

// Função para salvar a lista de filmes em um arquivo JSON
function salvarListaComoJSON() {
    // Converte o array de títulos em uma string JSON
    let listaJSON = JSON.stringify(titulosCadastrados);

    // Crie um elemento <a> para fazer o download do arquivo
    let a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(listaJSON);
    a.download = "listagem.json"; // Nome do arquivo

    // Simule um clique no elemento <a> para iniciar o download
    a.click();
}
// Função classificar a faixa etaria em valores numêricos para utilizar na função Ordenar por classificação
function classificacaoToValor(classificacao) {
    switch (classificacao) {
        case "Livre":
            return 0;
        case "Não recomendado para Menores de 10 anos":
            return 10;
        case "Não recomendado para Menores de 12 anos":
            return 12;
        case "Não recomendado para Menores de 14 anos":
            return 14;
        case "Não recomendado para Menores de 16 anos":
            return 16;
        case "Não recomendado para Menores de 18 anos":
            return 18;
        default:
            return -1; // Valor para classificação inválida ou não preenchida
    }
}

// Função para ordenar filmes por nome (A-Z)
function ordenarFilmesPorNome() {
    let swap;
    let contador = 0; // Inicialize o contador
    do {
        swap = false;
        for (let i = 0; i < titulosCadastrados.length - 1; i++) {
            if (titulosCadastrados[i].nome.localeCompare(titulosCadastrados[i + 1].nome) > 0) {
                [titulosCadastrados[i], titulosCadastrados[i + 1]] = [titulosCadastrados[i + 1], titulosCadastrados[i]];
                swap = true;
            }
            contador++; // Incrementa o contador em cada iteração
        }
    } while (swap);
    
    // Após a ordenação, exiba a lista atualizada
    exibirListagem();
    
    // Exibe o número de validações no console para verificação
    console.log("Número de Validações (Ordenar por Nome): " + contador);
}

// Função para ordenar filmes por quantidade de unidades em estoque (A-Z)
function ordenarFilmesPorQuantidade() {
    let swap;
    let contador = 0; // Inicialize o contador
    do {
        swap = false;
        for (let i = 0; i < titulosCadastrados.length - 1; i++) {
            if (titulosCadastrados[i].quantidade > titulosCadastrados[i + 1].quantidade) {
                [titulosCadastrados[i], titulosCadastrados[i + 1]] = [titulosCadastrados[i + 1], titulosCadastrados[i]];
                swap = true;
            }
            contador++; // Incrementa o contador em cada iteração
        }
    } while (swap);
    
    // Após a ordenação, exiba a lista atualizada
    exibirListagem();
    
    // Exibe o número de validações no console para verificação
    console.log("Número de Validações (Ordenar por Quantidade): " + contador);
}

// Função para ordenar filmes por duração (A-Z)
function ordenarFilmesPorDuracao() {
    let swap;
    let contador = 0; // Inicialize o contador
    do {
        swap = false;
        for (let i = 0; i < titulosCadastrados.length - 1; i++) {
            if (titulosCadastrados[i].duracao > titulosCadastrados[i + 1].duracao) {
                [titulosCadastrados[i], titulosCadastrados[i + 1]] = [titulosCadastrados[i + 1], titulosCadastrados[i]];
                swap = true;
            }
            contador++; // Incrementa o contador em cada iteração
        }
    } while (swap);
    
    // Após a ordenação, exiba a lista atualizada
    exibirListagem();
    
    // Exibe o número de validações no console para verificação
    console.log("Número de Validações (Ordenar por Duração): " + contador);
}

// Função para Classificar filmes por classificação (A-Z)
function classificarFilmesPorClassificacao() {
    let swap;
    let contador = 0; // Inicialize o contador
    do {
        swap = false;
        for (let i = 0; i < titulosCadastrados.length - 1; i++) {
            const classificacaoAtual = classificacaoToValor(titulosCadastrados[i].classificacao);
            const classificacaoSeguinte = classificacaoToValor(titulosCadastrados[i + 1].classificacao);

            if (classificacaoAtual > classificacaoSeguinte) {
                [titulosCadastrados[i], titulosCadastrados[i + 1]] = [titulosCadastrados[i + 1], titulosCadastrados[i]];
                swap = true;
            }
            contador++; // Incrementa o contador em cada iteração
        }
    } while (swap);
    
    // Após a classificação, exiba a lista atualizada
    exibirListagem();
    
    // Exibe o número de validações no console para verificação
    console.log("Número de Validações (Classificar por Classificação): " + contador);
}

document.getElementById("btCadastrar").addEventListener("click", CadastroTitulos); // Evento clique botão "Cadastrar filme"
document.getElementById("btLimpar").addEventListener("click", LimparCampos); // Evento clique botão "Limpar filme"
document.getElementById("btMostrar").addEventListener("click", exibirListagem); // Evento clique botão "Mostrar"
document.getElementById("btSalvarJSON").addEventListener("click", salvarListaComoJSON); // Evento clique botão "Mostrar"
document.getElementById("btOrdenarnome").addEventListener("click", ordenarFilmesPorNome); // Evento clique botão "Ordenar por Nome"
document.getElementById("btOrdenarunidades").addEventListener("click", ordenarFilmesPorQuantidade); // Evento clique botão "Ordenar por quantidade"
document.getElementById("btOrdenarduracao").addEventListener("click", ordenarFilmesPorDuracao); // Evento clique botão "Ordenar por duração"
document.getElementById("btOrdenaclassificacao").addEventListener("click", classificarFilmesPorClassificacao); // Evento clique botão "Ordenar por classificação"




