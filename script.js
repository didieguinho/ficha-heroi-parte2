// Informações do personagem
const nivelInicial = 1;
const xpPorNivel = 100;
const xpPorMissao = 25;

// Coloque aqui um endereço real para receber as mensagens.
// Exemplo: const emailDaGuilda = "seuemail@gmail.com";
const emailDaGuilda = "diegorodrigues010208@gmail.com";

const itens = [
    {id:1, nome:"Skåld", tipo:"arma", raridade:"LENDÁRIO", descricao:"Machado ancestral capaz de manipular o fluxo do tempo, permitindo a Valkheim alterar passado, presente e futuro.", imagem:"imagens/skald.png"},
    {id:2, nome:"Runas Temporais", tipo:"reliquia", raridade:"RARO", descricao:"Símbolos ancestrais que amplificam a conexão de Valkheim com o fluxo temporal.", icone:"fa-hourglass-half"},
    {id:3, nome:"Herdeiro de Asgard", tipo:"conquista", raridade:"CONQUISTA", descricao:"O legado que conecta Valkheim aos antigos guerreiros de Asgard.", icone:"fa-crown"},
    {id:4, nome:"Ampulheta de Mimir", tipo:"reliquia", raridade:"ÉPICO", descricao:"Artefato que ajuda Valkheim a perceber alterações na linha do tempo.", icone:"fa-hourglass", nivel:18},
    {id:5, nome:"Escudo de Bifröst", tipo:"arma", raridade:"RARO", descricao:"Escudo criado para resistir a ataques de outras dimensões.", icone:"fa-shield-halved", nivel:18},
    {id:6, nome:"Guardião do Tempo", tipo:"conquista", raridade:"CONQUISTA", descricao:"Conquista obtida ao dominar os primeiros desafios temporais.", icone:"fa-medal", nivel:18}
];

let dadosSalvos = {};
try {
    dadosSalvos = JSON.parse(localStorage.getItem("valkheimParte2")) || {};
} catch (erro) {
    dadosSalvos = {};
}

// Mantém a evolução no navegador até o jogador escolher reiniciar.
let nivel = Number.isInteger(dadosSalvos.nivel) && dadosSalvos.nivel >= nivelInicial
    ? dadosSalvos.nivel : nivelInicial;
let xp = Number.isInteger(dadosSalvos.xp) && dadosSalvos.xp >= 0 && dadosSalvos.xp < xpPorNivel
    ? dadosSalvos.xp : 0;
let favoritos = Array.isArray(dadosSalvos.favoritos) ? dadosSalvos.favoritos : [];
let tipoAtual = "todos";

function salvarProgresso() {
    localStorage.setItem("valkheimParte2", JSON.stringify({nivel, xp, favoritos}));
}

// Menu sanduíche
const botaoMenu = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

function fecharMenu() {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    botaoMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    botaoMenu.innerHTML = aberto
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".menu a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
});

// Experiência e evolução
function atualizarXP() {
    document.getElementById("nivelAtual").textContent = nivel;
    document.getElementById("xpTexto").textContent = xp + " / " + xpPorNivel + " XP";
    document.getElementById("xpProgresso").style.width = xp + "%";
}

document.getElementById("ganharXP").addEventListener("click", function () {
    xp += xpPorMissao;
    if (xp >= xpPorNivel) {
        xp -= xpPorNivel;
        nivel++;
        document.getElementById("avisoXP").textContent = nivel === 18
            ? "NÍVEL 18! Conquista Guardião do Tempo desbloqueada!"
            : "NÍVEL UP! Valkheim alcançou o nível " + nivel + "!";
        mostrarItens();
    } else {
        document.getElementById("avisoXP").textContent = "+" + xpPorMissao + " XP! Missão concluída.";
    }
    atualizarXP();
    salvarProgresso();
});

// Ao reiniciar, também bloqueia novamente as conquistas do nível 18.
document.getElementById("reiniciarXP").addEventListener("click", function () {
    const confirmou = window.confirm("Reiniciar o progresso? O nível, o XP e os favoritos voltarão ao início.");
    if (!confirmou) return;

    nivel = nivelInicial;
    xp = 0;
    favoritos = [];
    salvarProgresso();
    atualizarXP();
    mostrarItens();
    document.getElementById("avisoXP").textContent = "Progresso reiniciado! Valkheim voltou ao nível 1.";
    document.getElementById("avisoInventario").textContent = "";
});

// Ver mais / ver menos
const botaoHistoria = document.getElementById("verHistoria");
const historiaExtra = document.getElementById("historiaExtra");

botaoHistoria.addEventListener("click", function () {
    historiaExtra.hidden = !historiaExtra.hidden;
    const aberta = !historiaExtra.hidden;
    botaoHistoria.innerHTML = aberta
        ? 'VER MENOS <i class="fa-solid fa-chevron-up"></i>'
        : 'VER HISTÓRIA COMPLETA <i class="fa-solid fa-chevron-down"></i>';
    botaoHistoria.setAttribute("aria-expanded", String(aberta));
});

// Animacao dos atributos ao aparecerem durante a rolagem
const atributos = document.querySelectorAll(".atributo");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            // Ao sair da tela, a barra volta ao inicio para animar novamente.
            entrada.target.classList.toggle("em-vista", entrada.isIntersecting);
        });
    }, {threshold:0.5});

    atributos.forEach(function (atributo) {
        atributo.classList.add("animavel");
        observador.observe(atributo);
    });
}

// Inventário: array + filtro + forEach + criação de cards
const listaInventario = document.getElementById("listaInventario");
const filtros = document.getElementById("filtros");

function mostrarItens() {
    listaInventario.innerHTML = "";

    const visiveis = itens.filter(function (item) {
        return tipoAtual === "todos" || item.tipo === tipoAtual;
    });

    visiveis.forEach(function (item) {
        const desbloqueado = !item.nivel || nivel >= item.nivel;
        const card = document.createElement("article");
        card.className = "item " + item.tipo + (desbloqueado ? "" : " bloqueado");

        const icone = document.createElement("div");
        icone.className = "icone";

        if (item.imagem) {
            const imagem = document.createElement("img");
            imagem.src = item.imagem;
            imagem.alt = item.nome;
            icone.appendChild(imagem);
        } else {
            const simbolo = document.createElement("i");
            simbolo.className = "fa-solid " + item.icone;
            icone.appendChild(simbolo);
        }

        const raridade = document.createElement("small");
        raridade.textContent = item.raridade;
        const titulo = document.createElement("h3");
        titulo.textContent = item.nome.toUpperCase();
        const descricao = document.createElement("p");
        descricao.textContent = item.descricao;

        card.appendChild(icone);
        card.appendChild(raridade);
        card.appendChild(titulo);
        card.appendChild(descricao);

        if (desbloqueado) {
            const favorito = document.createElement("button");
            favorito.type = "button";
            favorito.className = "favorito" + (favoritos.includes(item.id) ? " ativo" : "");
            favorito.innerHTML = '<i class="fa-solid fa-heart"></i>';
            favorito.setAttribute("aria-label", "Favoritar " + item.nome);
            favorito.setAttribute("aria-pressed", String(favoritos.includes(item.id)));
            favorito.addEventListener("click", function () {
                if (favoritos.includes(item.id)) {
                    favoritos = favoritos.filter(function (id) { return id !== item.id; });
                    document.getElementById("avisoInventario").textContent = item.nome + " removido dos favoritos.";
                } else {
                    favoritos.push(item.id);
                    document.getElementById("avisoInventario").textContent = item.nome + " adicionado aos favoritos!";
                }
                salvarProgresso();
                mostrarItens();
            });
            card.appendChild(favorito);
        } else {
            const aviso = document.createElement("strong");
            aviso.className = "trancado";
            aviso.textContent = "🔒 LIBERA NO NÍVEL " + item.nivel;
            card.appendChild(aviso);
        }
        listaInventario.appendChild(card);
    });

    const conquistados = itens.filter(function (item) { return !item.nivel || nivel >= item.nivel; });
    document.getElementById("contadorItens").textContent = conquistados.length + " itens conquistados";
    document.getElementById("contadorFavoritos").textContent = favoritos.length + " favoritos";
}

filtros.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".filtro");
    if (!botao) return;
    tipoAtual = botao.dataset.tipo;
    filtros.querySelectorAll(".filtro").forEach(function (item) {
        const ativo = item === botao;
        item.classList.toggle("ativo", ativo);
        item.setAttribute("aria-pressed", String(ativo));
    });
    mostrarItens();
});

// Formulário: valida os dados antes de preparar a mensagem
const formulario = document.getElementById("formGuilda");
const avisoFormulario = document.getElementById("avisoFormulario");

function erroCampo(idCampo, idErro, texto) {
    const campo = document.getElementById(idCampo);
    document.getElementById(idErro).textContent = texto;
    campo.classList.toggle("invalido", texto !== "");
    return texto === "";
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const nomeOk = erroCampo("nome", "erroNome", nome ? "" : "Preencha seu nome.");
    const emailOk = erroCampo("email", "erroEmail", !email ? "Preencha seu e-mail." : emailValido ? "" : "Digite um e-mail válido.");
    const mensagemOk = erroCampo("mensagem", "erroMensagem", mensagem ? "" : "Escreva uma mensagem.");

    if (!nomeOk || !emailOk || !mensagemOk) {
        avisoFormulario.className = "form-aviso erro";
        avisoFormulario.textContent = "Confira os campos destacados antes de continuar.";
        return;
    }

    if (!emailDaGuilda) {
        avisoFormulario.className = "form-aviso erro";
        avisoFormulario.textContent = "Falta configurar o e-mail da Guilda no arquivo script.js.";
        return;
    }

    const assunto = encodeURIComponent("Mensagem para Valkheim — " + nome);
    const corpo = encodeURIComponent("Nome: " + nome + "\nE-mail: " + email + "\n\n" + mensagem);
    avisoFormulario.className = "form-aviso sucesso";
    avisoFormulario.textContent = "Mensagem pronta! Confirme o envio no seu aplicativo de e-mail.";
    window.location.href = "mailto:" + emailDaGuilda + "?subject=" + assunto + "&body=" + corpo;
});

// Função extra pesquisada: localStorage mantém o progresso após atualizar
const botaoTema = document.getElementById("alternarTema");
function atualizarTema() {
    const noturno = document.body.classList.contains("modo-guilda");
    botaoTema.innerHTML = noturno
        ? '<i class="fa-solid fa-sun"></i> MODO ASGARD'
        : '<i class="fa-solid fa-moon"></i> MODO NOTURNO';
}

botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-guilda");
    localStorage.setItem("temaValkheim", document.body.classList.contains("modo-guilda") ? "noturno" : "asgard");
    atualizarTema();
});

if (localStorage.getItem("temaValkheim") === "noturno") {
    document.body.classList.add("modo-guilda");
}
atualizarTema();

// Saudação de acordo com o horário
const hora = new Date().getHours();
document.getElementById("saudacao").textContent = hora < 12
    ? "Bom dia, viajante!" : hora < 18 ? "Boa tarde, guerreiro!" : "Boa noite, guerreiro!";

// Voltar ao início
const botaoTopo = document.getElementById("voltarTopo");
window.addEventListener("scroll", function () {
    botaoTopo.classList.toggle("visivel", window.scrollY > 450);
});
botaoTopo.addEventListener("click", function () {
    window.scrollTo({top:0, behavior:"smooth"});
});

atualizarXP();
mostrarItens();
