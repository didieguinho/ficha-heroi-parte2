# Valkheim — Ficha de Herói (Parte 2)

Esse projeto é a continuação da ficha de herói que fiz na Parte 1. Meu personagem é o Valkheim (Paolo Rodriguez), um guerreiro ligado a Asgard que usa o machado Skåld para manipular o tempo.

Na Parte 2, mantive a ideia e as imagens do primeiro site, mas acrescentei JavaScript para ele ter mais interações. Também melhorei o fundo, deixando a página mais parecida com o universo do personagem.

## Arquivos

- `index.html`: estrutura e conteúdo do site.
- `style.css`: aparência, animações e adaptação para celular.
- `script.js`: funções, eventos, inventário e formulário.
- `imagens/`: imagens do Valkheim, do Skåld, fundo de Asgard e cursores personalizados.

## Funcionalidades da Parte 2 (JS)

- **Menu sanduíche:** em telas pequenas, o menu vira um botão com três barrinhas. Ao abrir, o ícone muda para um X.
- **História do personagem:** o botão "Ver história completa" mostra o restante da história e depois permite esconder novamente.
- **Inventário dinâmico:** os cards são criados pelo JavaScript a partir de um array de objetos, usando `filter`, `forEach` e `createElement`.
- **Filtros:** dá para mostrar todos os itens ou escolher armas, relíquias e conquistas. A categoria selecionada fica destacada.
- **Favoritos:** cada item liberado pode ser marcado e desmarcado com o coração.
- **XP e níveis:** cada clique em "Completar missão" dá 25 XP. A cada 100 XP, o Valkheim sobe um nível.
- **Conquistas por nível:** alguns itens ficam bloqueados até o nível 18. Nesse nível, a conquista "Guardião do Tempo" é liberada.
- **Salvar e reiniciar progresso:** nível, XP e favoritos ficam salvos no navegador. O botão "Reiniciar progresso" pede confirmação e devolve o personagem ao nível 1, com 0 XP. Os favoritos são apagados e os itens de nível 18 voltam a ficar bloqueados.
- **Formulário da Guilda:** tem campos de nome, e-mail e mensagem. O JavaScript verifica os dados e mostra avisos na página antes de preparar o e-mail.
- **Modo noturno:** um botão permite alternar o tema da página.
- **Outros detalhes:** saudação conforme o horário, contagem dos itens conquistados, contagem dos favoritos, rolagem suave e botão para voltar ao topo.

## Melhorias no visual

Troquei o fundo simples por uma paisagem inspirada em Asgard, com montanhas, aurora e runas. Continuei usando azul, dourado e vermelho para combinar com a Parte 1.

Coloquei efeitos ao passar o mouse pela ficha e pelos poderes. As barras dos atributos carregam automaticamente quando aparecem na tela, inclusive quando a pessoa sobe ou desce a página. Também usei um cursor de machado nos elementos clicáveis e uma runa nas áreas com animação. No celular, esses cursores não aparecem, porque a navegação é feita pelo toque.

## Como usei o JavaScript

Usei variáveis, funções, condicionais, operador ternário, arrays de objetos, `forEach`, `filter` e `addEventListener`. O JavaScript também seleciona elementos do HTML, cria cards, muda classes e atualiza informações sem recarregar a página.

Como pesquisa complementar, utilizei o `IntersectionObserver`, que detecta quando os atributos entram na tela para iniciar as animações. Também usei `localStorage` para guardar o progresso no próprio navegador.

## Contato com a Guilda

O formulário verifica se o nome e a mensagem estão preenchidos e se o e-mail informado tem um formato válido. Se houver algum problema, aparece uma mensagem indicando o campo que precisa ser corrigido. Usei `preventDefault()` para controlar o envio.

Depois que os dados estão corretos, o site prepara uma mensagem para abrir no aplicativo de e-mail do visitante. O envio não é automático: a pessoa precisa confirmar no aplicativo. Para funcionar, o endereço do destinatário deve estar configurado na variável `emailDaGuilda`, dentro do `script.js`.

O botão Gmail que aparece junto aos contatos é separado do formulário e pode ser configurado para abrir a tela de escrever mensagem no Gmail.

## Decisões de UI/UX

Procurei deixar claro o que acontece quando alguém usa o site. Por isso:

- O menu muda de ícone quando está aberto e pode ser fechado ao escolher uma seção.
- O filtro ativo fica destacado, para mostrar quais itens estão sendo exibidos.
- A barra de XP e o aviso de nível mudam logo depois de completar uma missão.
- Os itens bloqueados mostram em qual nível poderão ser liberados.
- O botão de reiniciar pede confirmação para evitar perder o progresso por engano.
- A história pode ser aberta e fechada sem atualizar a página.
- O formulário mostra os erros perto dos campos, em vez de simplesmente não funcionar.
- Mantive as cores, os tipos de borda e os efeitos do primeiro site, para a Parte 2 continuar com a mesma identidade.
Também deixei o layout responsivo: no celular, o menu ocupa menos espaço e os cards se reorganizam em menos colunas. A intenção foi melhorar a navegação sem perder a aparência do Valkheim.

O objetivo desta segunda parte foi continuar o meu projeto original e mostrar, na prática, como o JavaScript pode fazer a página responder às ações de quem está usando.
