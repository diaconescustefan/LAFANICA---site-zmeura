document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // Expresii regulate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email valid
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Parolă: minim 8 caractere, literă și cifră

    form.addEventListener("submit", (e) => {
        let valid = true;

        // Validare email
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = "Introduceți un email valid (ex: utilizator@email.com).";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        // Validare parolă
        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.textContent =
                "Parola trebuie să conțină cel puțin 8 caractere, inclusiv o literă și o cifră.";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        // Previne trimiterea formularului dacă validarea eșuează
        if (!valid) {
            e.preventDefault();
        } else {
            alert("Logare reușită! Veți fi redirecționat la pagina de acasă.");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Lista de titluri posibile
    const titluri = [
        "Login Page",
        "Autentificare rapidă",
        "Conectează-te pentru mai multe beneficii",
        "Intră în contul tău",
        "Bun venit la Zmeura LAFANICA!",
        "Descoperă produsele noastre autentice!"
    ];

    const titluElement = document.querySelector(".login-container h1");

    const titluAleator = titluri[Math.floor(Math.random() * titluri.length)];

    titluElement.textContent = titluAleator;
});