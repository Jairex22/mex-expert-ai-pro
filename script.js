function hablar() {

    const texto = document.getElementById("textInput").value.trim();
    const subtitulo = document.getElementById("subtitles");
    const avatar = document.getElementById("avatar");

    if (!texto) {
        alert("Escribe algo primero");
        return;
    }

    const speech = new SpeechSynthesisUtterance(texto);
    speech.lang = "es-ES";
    speech.rate = 1;

    speech.onstart = () => {
        subtitulo.innerText = texto;

        anime({
            targets: avatar,
            scale: [1, 1.05],
            duration: 300,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    };

    speech.onend = () => {
        anime.remove(avatar);
        avatar.style.transform = "scale(1)";
    };

    window.speechSynthesis.speak(speech);
}
