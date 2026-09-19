const m = document.querySelector("#menu"), n = document.querySelector("nav");

m.onclick = () => n.classList.toggle("open");

// Animação das fotos da galeria
const fotos = document.querySelectorAll(".photos img");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches) {

    // Se o usuário prefere menos movimento,
    // as fotos aparecem imediatamente.
    fotos.forEach((foto) => {
        foto.classList.add("show");
    });

} else {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                // Evita executar a animação novamente
                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.2
    });

    // Cada foto recebe um pequeno atraso,
    // criando o efeito sequencial.
    fotos.forEach((foto, index) => {

        foto.style.transitionDelay = `${index * 0.15}s`;

        observer.observe(foto);
    });
}