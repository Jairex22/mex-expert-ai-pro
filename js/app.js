function analizar() {

    const texto = document.getElementById("inputText").value;
    const barra = document.getElementById("barra");
    const resultadoTexto = document.getElementById("resultadoTexto");

    if(texto.length < 10){
        alert("Por favor escribe una declaración más extensa.");
        return;
    }

    let puntuacion = 100;

    const palabrasSospechosas = ["no recuerdo", "creo que", "tal vez", "no sé"];

    palabrasSospechosas.forEach(palabra => {
        if(texto.toLowerCase().includes(palabra)){
            puntuacion -= 15;
        }
    });

    if(texto.length < 30){
        puntuacion -= 20;
    }

    if(texto.includes("!!!")){
        puntuacion -= 10;
    }

    if(puntuacion < 0) puntuacion = 0;

    barra.style.width = puntuacion + "%";
    barra.innerText = puntuacion + "%";

    if(puntuacion > 70){
        barra.className = "progress-bar bg-success";
        resultadoTexto.innerText = "Alta probabilidad de veracidad 🇲🇽";
        hablar("La declaración parece confiable.");
    }
    else if(puntuacion > 40){
        barra.className = "progress-bar bg-warning";
        resultadoTexto.innerText = "Veracidad cuestionable";
        hablar("Se detectan inconsistencias.");
    }
    else{
        barra.className = "progress-bar bg-danger";
        resultadoTexto.innerText = "Alta probabilidad de engaño";
        hablar("Se detectan patrones asociados a engaño.");
    }

    anime({
        targets: '#barra',
        width: puntuacion + "%",
        duration: 1200,
        easing: 'easeInOutExpo'
    });

}

function hablar(texto) {
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-MX";
    voz.rate = 1;
    speechSynthesis.speak(voz);
}
