// La fecha es 18 de Julio de 2026 a las 15:00 Hrs (3:00 PM).
const targetDate = new Date("2026-07-18T15:00:00-07:00").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<p style='font-size: 1.1rem; color: #b67784; font-weight: 500; letter-spacing: 2px;'>¡El gran día ha llegado!</p>";
    }
}, 1000);

// =========================================
// LÓGICA DEL FORMULARIO RSVP
// =========================================
const form = document.getElementById('rsvp-form');
const submitBtn = document.getElementById('submit-btn');
const formMsg = document.getElementById('form-msg');

// REEMPLAZA ESTO CON LA URL QUE TE DÉ GOOGLE APPS SCRIPT
const scriptURL = 'https://script.google.com/macros/s/AKfycbwnzw0zjlErRrWqIOOygdEcter0Ex5pS6uwFmglfMxO8wLBKr4OeBDsK9hhrLBsvhFfCw/exec'; 

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Cambiar texto de botón para que sepan que está cargando
    submitBtn.innerText = 'ENVIANDO...';
    submitBtn.disabled = true;

    let requestBody = new FormData(form);

    fetch(scriptURL, { method: 'POST', body: requestBody })
        .then(response => {
            // Éxito
            formMsg.innerText = "¡Gracias! Tu asistencia fue confirmada.";
            formMsg.style.display = "block";
            formMsg.style.color = "var(--pink-dark)";
            form.reset();
            submitBtn.innerText = 'ENVIAR CONFIRMACIÓN';
            submitBtn.disabled = false;
        })
        .catch(error => {
            // Error
            formMsg.innerText = "Hubo un error al enviar. Intenta de nuevo.";
            formMsg.style.display = "block";
            formMsg.style.color = "red";
            submitBtn.innerText = 'ENVIAR CONFIRMACIÓN';
            submitBtn.disabled = false;
        });
});