// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    const rodape = document.getElementById("info-rodape");
    const banner = document.getElementById("info-container");
    const noticiaNasa = document.getElementById("noticias");
    const fotoNasa = document.getElementById("galeria");

    const urlApi_clima = 'https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&current_weather=true';
    const urlApi_nasa = 'https://api.nasa.gov/planetary/apod?api_key=wd0sTXOIaEtCPjpvZg5OXXuGYLbLrihuyNKEIqCa'    

    // Atualiza a data e hora a cada segundo
    setInterval(() => {
        const now = new Date();
        rodape.innerHTML = `Data: ${now.toLocaleDateString()} - Hora: ${now.toLocaleTimeString()} `;
    }, 1000);

    // Adiciona a previsão do clima 
    fetch(urlApi_clima)
        .then(resposta => resposta.json())
        .then(data => {
            const weather = data.current_weather;
            banner.innerHTML += `<br>Clima: ${weather.temperature}°C`;
        })
        .catch(() => banner.innerHTML += '<br>Clima: Não disponível');

    // Função para buscar dados da API
    async function buscarDados(urlApi_nasa) {
        try {
            const resposta = await fetch(urlApi_nasa);
            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status}`);
            }
            return await resposta.json();
        } catch (erro) {
            console.error("Erro ao buscar dados:", erro);
            return null;
        }
    }

    // Buscar dados da APOD (para galeria e exemplo de "notícia")
    buscarDados(urlApi_nasa)
    .then(data => {
        if (data) {
            // Exibir na galeria
            const img = document.createElement('img');
            img.src = data.url;
            img.alt = data.title;
            fotoNasa.appendChild(img);

            // Exibir como "notícia" (adaptável para outras fontes)
            const noticiaElemento = document.createElement('div');
            noticiaElemento.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.explanation}</p>
                <p>Data: ${data.date}</p>
            `;
            noticiaNasa.appendChild(noticiaElemento);
        }
    });



});

// Função para capturar informações do sistema
function showSystemInfo() {
    const info = `
        Sistema Operacional: ${navigator.platform} <br>
        Navegador: ${navigator.userAgent} <br>
        Memória: ${navigator.deviceMemory || 'Não disponível'} GB
    `;
    // Insere as informações no elemento HTML
    document.getElementById("system-info").innerHTML = info;
}
// Função para enviar e-mail usando EmailJS
function sendEmail() {
    emailjs.send("service_id", "template_id", {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value
    })
    .then(() => alert("Mensagem enviada com sucesso!")) // Mensagem de sucesso
    .catch(err => alert("Erro ao enviar mensagem: " + err)); // Mensagem de erro
}