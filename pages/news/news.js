
// Obtém todos os documentos da coleção 'news'
db.collection('news').get()

    // Se conseguiu
    .then((querySnapshot) => {

        // Cria variável da view (HTML)
        var viewNews = '';

        // Obtém um documento por loop
        querySnapshot.forEach((news) => {
            // console.log(`${news.id} => ${news.data()}`);
            // console.log(news.data());

            // Atualizar a view (+= --> concatenar)
            viewNews += `<div class="news-item">
                    <h3>${news.data().title}</h3>
                    ${news.data().text}
                    <small><a href="${news.data().link}" target="_blank">Ler mais...</a></small>
                    </div>`;

        });

        // Não exitem notícias
        if (viewNews == '') {

            // Mostra mensagem na view
            viewNews = `<p class="text-center warning">Não encontrei notícias!</p>`;
        }

        // Envia para a view
        $('#viewNews').html(viewNews);

    });