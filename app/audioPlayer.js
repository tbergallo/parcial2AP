function loadAudioSettings() {
    const settings = { language: 'es-MX', rate: 1.0 }
    return settings
}

export function speechbutton() {
    const playButtons = document.querySelectorAll(".play-audio");

    playButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            // Detener la propagación del evento para evitar abrir el modal
            event.stopPropagation();

            const taskCard = button.closest(".task-card");
            const title = taskCard.querySelector("h3").textContent;
            const details = taskCard.querySelector(".modal-details").textContent;

            // Cargar configuración de audio
            const settings = loadAudioSettings();
            const { language, rate } = settings;

            // Configurar síntesis de voz
            const utterance = new SpeechSynthesisUtterance(`${title}: ${details}`);
            utterance.lang = language;
            utterance.rate = rate;

            // Indicación visual (opcional)
            taskCard.classList.add("playing");
            setTimeout(() => taskCard.classList.remove("playing"), 5000); // Quitar clase después de 5 segundos

            // Reproducir el texto
            speechSynthesis.speak(utterance);
        });
    });
}