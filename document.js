// Selectează toate imaginile din container
const produse = document.querySelectorAll(".produse");

produse.forEach((img) => {
    // La trecerea mouse-ului peste imagine
    img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.1)"; // Mărește imaginea
        img.style.border = "5px solid green"; // Adaugă o bordură verde
        img.style.transition = "all 0.3s"; // Tranziție lină
    });

    // Când mouse-ul iese de pe imagine
    img.addEventListener("mouseout", () => {
        img.style.transform = "scale(1)"; // Revine la dimensiunea originală
        img.style.border = "none"; // Elimină bordura
    });
});