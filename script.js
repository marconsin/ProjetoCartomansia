// animação de rolagem
window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.js-scroll');
    for(var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if(elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('revelar');
        }
    }
}
reveal();

// async
const conselhoTexto = document.getElementById('conselho-texto');

async function pegarConselho() {
    try {
        const frasesMisticas = [
            "O universo conspira a seu favor, confie no tempo.",
            "O que é seu encontrará o caminho até você.",
            "A resposta que procura está no silêncio da mente.",
            "Hoje é um dia propício para recomeços.",
            "Sua intuição é a bússola mais precisa.",
            "Não force portas, as chaves certas virão.",
            "A paciência é a chave mestra do destino."
        ];
        
        const fraseSorteada = frasesMisticas[Math.floor(Math.random() * frasesMisticas.length)];
        
        if(conselhoTexto) {
            conselhoTexto.innerText = '"' + fraseSorteada + '"';
        }
    } catch (error) {
        console.log('Erro:', error);
    }
}
pegarConselho();