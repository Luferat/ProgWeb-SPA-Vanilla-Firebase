/* Executa a aplicação 'main()' quando documentos estiverem prontos */
$(document).ready(main());

/* Aplicação principal */
function main() {

    // LGPD - Obtém aceite do usuário
    var terms = $.cookie('acceptTerms');
    // console.log(terms);

    // LGPD - Se usuário não aceitou, pede aceite
    if (terms == undefined) {

        // Exibe termos após a carga do site
        var termsTime = setTimeout(function () {
            $('#terms').slideDown(600);
        }, 1000);

        // Aguarda clique em um dos botões, executando termsAction()
        $(document).on('click', '.terms', termsAction);

        // Se já aceitou
    } else {

        // Oculta termos
        $('#terms').hide(0);
    }
}

/* LGPD - Trata aceite dos termos */
function termsAction() {

    // Qual botão foi clicado?
    var btn = $(this).attr('name');

    // Se clicou em aceitou...
    if (btn == 'accept') {

        // Grava cookie no navegador
        $.cookie('acceptTerms', 'accept', { expires: 365, path: '/' });

        // Oculta os termos
        $('#terms').slideUp(500);
    } else {

        // Apaga todos os cookies do site
        for (var it in $.cookie()) {
            $.removeCookie(it);
        }

        // Avisa sobre a saída
        alert('Obrigado por ter acessado nosso site!');

        // Sai do site
        top.location.href = 'http://www.planalto.gov.br/ccivil_03/_Ato2015-2018/2018/Lei/L13709.htm';
    }

    // Termina, sem fazer mais nada
    return false;
}
