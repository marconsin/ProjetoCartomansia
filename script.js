// animação de scroll
const elementosScroll = document.querySelectorAll('.js-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('revelar');
    });
});
elementosScroll.forEach(el => observer.observe(el));


// api de tradução
async function traduzirTexto(textoIngles) {
    if(!textoIngles) return "Astros confusos...";
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textoIngles)}&langpair=en|pt-br`;
        const res = await fetch(url);
        const data = await res.json();
        return data.responseData.translatedText;
    } catch (e) {
        console.error("Erro tradução", e);
        return textoIngles;
    }
}


// conselho do dia
async function carregarConselho() {
    const el = document.getElementById('conselho-texto');
    try {
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        const traducao = await traduzirTexto(data.slip.advice);
        el.innerText = `"${traducao}"`;
        el.style.opacity = 1;
    } catch (error) {
        el.innerText = "A nuvem cósmica está densa...";
    }
}
document.addEventListener("DOMContentLoaded", carregarConselho);


// usando proxy p funcionar
async function buscarHoroscopoReal(signoPT) {
    const box = document.getElementById('resultado-horoscopo');
    const titulo = document.getElementById('signo-titulo');
    const texto = document.getElementById('signo-texto');

    const mapaSignos = {
        'aries': 'aries', 'touro': 'taurus', 'gemeos': 'gemini',
        'cancer': 'cancer', 'leao': 'leo', 'virgem': 'virgo',
        'libra': 'libra', 'escorpiao': 'scorpio', 'sagitario': 'sagittarius',
        'capricornio': 'capricorn', 'aquario': 'aquarius', 'peixes': 'pisces'
    };

    const signoEN = mapaSignos[signoPT];
    
    // carregamemto
    box.style.display = 'block';
    titulo.innerText = signoPT.charAt(0).toUpperCase() + signoPT.slice(1);
    texto.innerText = "Sicronizando os cosmos...";

    try {
        const apiUrl = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signoEN}&day=today`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
        
        const response = await fetch(proxyUrl);
        const dataProxy = await response.json(); 
        
        if (!dataProxy.contents) throw new Error("Sem resposta do Proxy");
        
        const dadosReais = JSON.parse(dataProxy.contents);
        
        texto.innerText = "Traduzindo mensagem do universo...";
        
        const previsaoTraduzida = await traduzirTexto(dadosReais.data.horoscope_data);
        texto.innerText = previsaoTraduzida;

    } catch (erro) {
        console.error(erro);
        texto.innerText = "Erro de conexão cósmica, tente novamente mais tarde.";
    }
}