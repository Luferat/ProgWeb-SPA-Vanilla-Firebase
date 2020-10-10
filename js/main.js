/* Executa a aplicação 'main()' quando documentos estiverem prontos */
$(document).ready(main());

/* Declara variáveis globais */

// Se não aceita cookies, vai para este site
var termsRedirect = 'http://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2018/Lei/L13709.htm';

/* Aplicação principal */
function main() {

    // Carrega a página inicial
    routerLoad('home');

    // Micro ajustes na view
    changeWidth();

    // LGPD - Trata aceite do usuário
    termsDetect();

    // Se a largura da tela mudar
    $(window).resize(changeWidth);

    // Se clicar em um elemento de rota...
    $(document).on('click', '[routerLink]', routerLink);

    // Termina, sem fazer mais nada
    return false;
}

// LGPD - Detecta aceite dos cookies
function termsDetect() {

    // LGPD - Obtpem cookie de aceite
    var terms = $.cookie('acceptTerms');

    // LGPD - Se usuário não aceitou, pede aceite
    if (terms == undefined) {

        // Exibe termos 1 segundo após a carga do site
        var termsTime = setTimeout(() => {
            $('#terms').slideDown(600);
        }, 1000);

        // Aguarda clique em um dos botões, executando termsAction()
        $(document).on('click', '.terms', termsAction);

        // Se já aceitou
    } else {

        // Oculta termos
        $('#terms').hide(0);
    }

    // Termina, sem fazer mais nada
    return false;
}

/* LGPD - Trata clique no aceite dos termos */
function termsAction() {

    // Qual botão foi clicado?
    var btn = $(this).attr('name');

    // Se clicou em [Aceitar]
    if (btn == 'accept') {

        // Grava cookie no navegador
        $.cookie('acceptTerms', 'accept', { expires: 365, path: '/' });

        // Oculta os termos
        $('#terms').slideUp(500);

        // Se clicou em [Rejeitar]
    } else {

        // Apaga todos os cookies do site
        for (var it in $.cookie()) {
            $.removeCookie(it);
        }

        // Avisa sobre a saída
        alert('Obrigado por ter acessado nosso site!');

        // Sai do site
        top.location.href = termsRedirect;
    }

    // Termina, sem fazer mais nada
    return false;
}

// Micro ajustes na largura da view
function changeWidth() {

    // Se aparece a barra de rolagem vertical
    if ($(document).height() > $(window).height()) {

        // Compensa a barra de rolagem no rodapé
        $('footer').css('margin-bottom', '0.4rem');

        // Se não tem barra de rolagem
    } else {

        // Reseta a margem do rodapé
        $('footer').css('margin-bottom', '0');
    }

    // Termina, sem fazer mais nada
    return false;
}

// Processa clique em uma rota
function routerLink() {

    // Obtém o endereço da página a ser carregada
    var page = $(this).attr('routerLink');

    // Carrega a página solicitada
    if (page) routerLoad(page);

    // Termina, sem fazer mais nada
    return false;
}

// Obter o caminho dos documentos solicitados
function routerLoad(routePath) {

    // Obtém o primeiro elemento da array routePath
    // que é o caminho dos documentos
    var page = routePath.split('/')[0];

    // Monta os links dos documentos da página
    var load = {
        css: `/pages/${page}/${page}.css`, // Folha de estilos
        html: `/pages/${page}/${page}.html`, // HTML da página
        js: `/pages/${page}/${page}.js`, // JavaScript
        hash: `/${routePath}` // Barra de endereços
    };

    // Carrega o CSS da página
    $('#headCss').attr('href', load.css);

    // Carrega o HTML da página
    $('main').load(load.html, function() {

        // Carrega e executa o JavaScript após a carga do HTML
        $.getScript(load.js);
    });

    // Atualiza a barra de endereços do navegador (FAKE)
    if (history.pushState) {

        // Navegadores modernos
        window.history.pushState('', '', load.hash);
    } else {

        // Navegadores dos dinossauros
        document.location.href = load.hash;
    }

    // Termina, sem fazer mais nada
    return false;
}