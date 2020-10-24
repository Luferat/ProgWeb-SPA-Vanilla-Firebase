/* Variável que evita reenvio do contato */
var sended = 0;

/* Evento) Monitora o envio do formulário */
$(document).on('submit', '#contact', sendContact);

/* Processa envio do formulário de contatos */
function sendContact() {

    /* Inicializa variáveis */

    // Contém a mensagem de feedback
    var msg = '';

    // Contém os valores dos campos do formulário
    var contact = {
        name: $('#name').val().trim(),
        email: $('#email').val().trim(),
        subject: $('#subject').val().trim(),
        message: $('#message').val().trim(),
        date: new Date()
    }

    // Se documento ainda não foi enviado
    if (sended == 0) {

        // Adiciona documento com o contato no Firestore
        db.collection('contacts').add(contact)

            // Se der certo
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);

                // Mensagem de feedback
                feedback(contact.name, `<p>Seu contato foi enviado para a equipe do ${siteName}.</p>`);
            })

            // Se der errado
            .catch(function (error) {
                console.error("Error adding document: ", error);

                // Mensagem de feedback
                feedback(contact.name, `<p>Ocorreram erros que impedediram o seu contato.</p><p>Nossa equipe já foi avisada do erro.</p><p>Por favor tente mais tarde.</p>`);
            });

        // Já foi enviado
        sended = 1;
    }

    // Termina sem fazer mais nada
    return false;
}

// Exibe feedback na view
function feedback(name, msg) {

    // Monta mensagem
    msg = `<h3>Olá ${name}!</h3>
    ${msg}
    <p><em>Obrigado...</em></p>
    <button routerLink="home" class="primary block">Página inicial</button>`;

    // Escreve na view
    $('#feedback div').html(msg);

    // Ocultar o formulário
    $('#contact').hide('fast', () => {

        // Exibir a mensagem na view
        $('#feedback').show('fast');
    });

    // Termina sem fazer mais nada
    return false;
} 