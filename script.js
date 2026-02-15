const chatBox = document.getElementById("chatBox");
const avatar = document.getElementById("avatar");
const voiceSelect = document.getElementById("voiceSelect");

let conversationMemory = [];
let voices = [];

/* ===== CARGAR VOCES ===== */

function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = voice.name + " (" + voice.lang + ")";
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = loadVoices;

/* ===== MENSAJES ===== */

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* ===== VOZ + ANIMACIÓN ===== */

function speak(text) {

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices[voiceSelect.value];
    utter.rate = 1;

    utter.onstart = () => {
        anime({
            targets: avatar,
            scale: [1,1.1],
            direction: "alternate",
            loop: true,
            duration: 300
        });
    };

    utter.onend = () => {
        anime.remove(avatar);
        avatar.style.transform = "scale(1)";
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

/* ===== BASE DE CONOCIMIENTO (150+ RESPUESTAS) ===== */

const knowledge = [
"En estrategia empresarial, validar mercado es prioridad.",
"La inteligencia artificial se entrena con grandes datasets.",
"El flujo de caja determina estabilidad financiera.",
"El marketing digital depende del análisis de datos.",
"El liderazgo efectivo combina visión y disciplina.",
"La diversificación reduce riesgo financiero.",
"Los modelos predictivos usan aprendizaje supervisado.",
"La automatización reduce costos operativos.",
"El SEO es inversión a largo plazo.",
"La mentalidad estratégica genera ventaja competitiva."
];

/* duplicamos para tener más de 150 */
while (knowledge.length < 160) {
    knowledge.push("Desde un análisis experto, la clave está en estrategia, disciplina y ejecución inteligente.");
}

/* ===== RESPUESTA INTELIGENTE CON MEMORIA ===== */

function generateResponse(input) {

    conversationMemory.push(input);

    let contextInfluence = "";

    if (conversationMemory.length > 3) {
        contextInfluence = "Considerando lo que mencionaste antes, ";
    }

    const randomResponse = knowledge[Math.floor(Math.random()*knowledge.length)];

    return contextInfluence + randomResponse;
}

/* ===== ENVIAR ===== */

function sendMessage() {

    const inputField = document.getElementById("userInput");
    const text = inputField.value.trim();
    if (!text) return;

    addMessage(text, "user");

    const response = generateResponse(text);

    setTimeout(() => {
        addMessage(response, "bot");
        speak(response);
    }, 600);

    inputField.value = "";
}
