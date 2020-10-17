// (*3) Debugs e otimizações da Aula 3

/* Executa a aplicação 'main()' quando documentos estiverem prontos */
$(document).ready(main);

/* Declara variáveis globais */

// (*3) Nome do site para a tag <title>
var siteName = 'Spider Track';

// Se não aceita cookies, vai para este site
var termsRedirect = 'http://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2018/Lei/L13709.htm';

/* Aplicação principal */
function main() {

    // (*3) Carrega a página atual
    routerLoad();

    // Micro ajustes na view
    changeWidth();

    // LGPD - Trata aceite do usuário
    termsDetect();

    // Evento) Se a largura da tela mudar
    $(window).resize(changeWidth);

    // Evento) Se clicar em um elemento de rota...
    $(document).on('click', '[routerLink]', routerLink);

    // Termina, sem fazer mais nada
    return false;
}

/* LGPD - Detecta aceite dos cookies */
function termsDetect() {

    // Obtém cookie de aceite
    var terms = $.cookie('acceptTerms');

    // Se usuário não aceitou, pede aceite
    if (terms == undefined) {

        // Exibe termos 1 segundo após a carga do site
        var termsTime = setTimeout(() => {
            $('#terms').slideDown(600);
        }, 1000);

        // Evento) Aguarda clique em um dos botões, executando termsAction()
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

    // Se clicou em [Aceitar]
    if ($(this).attr('name') == 'accept') {

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

/* Micro ajustes na largura da view */
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

/* Processar clique em uma rota */
function routerLink() {

    // Obtém o endereço da página a ser carregada e carrega a página solicitada
    routerLoad($(this).attr('routerLink'));

    // Termina, sem fazer mais nada
    return false;
}

/* Obter o caminho dos documentos solicitados */
function routerLoad(routePath) {

    // console.log(window.location.pathname.substring(1));

    // Remove todos os elementos (tags) com a class="page-element"
    $('.page-element').remove();

    // (*3) Se não solicitou uma rota interna, obtém a rota do URL
    if (!routePath) {

        // (*3) Remove primeiro '/' do pathname
        routePath = window.location.pathname.substring(1);
    }

    // Obtém o primeiro elemento da array routePath que é o caminho dos documentos
    var page = routePath.split('/')[0];

    // (*3) Se não definiu uma página, carrega a 'home' por padrão
    if (page == '') page = 'home';

    // Monta os links dos documentos da página
    var load = {
        css: `/pages/${page}/${page}.css`, // Folha de estilos
        html: `/pages/${page}/${page}.html`, // HTML da página
        js: `/pages/${page}/${page}.js`, // JavaScript
        hash: `/${routePath}` // Barra de endereços
    };
    // console.log(load);

    // (*3) Carrega o CSS da página
    $('head').append(`<link class="page-element" rel="stylesheet" href="${load.css}?rnd=${randomChars(10)}">`);

    // Carrega o HTML da página
    $('main').load(load.html, '', function () {

        // (*3) Altera título da página
        setTitle();

        // (*3) Carrega javaScript da página
        $('body').append(`<script class="page-element" src="${load.js}?rnd=${randomChars(10)}"></script>`);

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

/* (*3) Atualiza tag <title> com título <h2> da página. */
function setTitle() {

    // Obtém o título 'h2' da página, exceto se tiver class="notitle"
    var title = $('main h2:not([class="notitle"])').text();

    // Atribui nome do site ao <title>
    var titleTag = siteName;

    // Se a página tem título, atribui à <title>
    if (title != '') {
        titleTag += ` ~ ${title}`;
    }

    // Altera valor da tag <title>
    $('title').text(titleTag);

    // Termina sem fazer mais nada
    return false;
}

// (*3) Gera caracteres aleatórios
function randomChars(len) {
	
	// Armazenará a sequência aleatória
	var text = '';

	// Lista de caracteres que podem ser usados
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	// Obtém a sequência
	for (var i = 0; i < len; i++) {
		text += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	
	// Retorna sequência pronta
	return text;
}