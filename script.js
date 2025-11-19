/* ============================
   DETECTOR DE CELULAR
   ============================ */
window.addEventListener('DOMContentLoaded', () => {
    const isMobile = /iphone|android|ipad|mobile/i.test(navigator.userAgent);
    const mobileWarning = document.getElementById("mobile-warning");
    const continueBtn = document.getElementById("continueBtn");

    if (isMobile) {
        // Mostrar advertencia antes del loader
        mobileWarning.style.display = "flex";
        document.body.style.overflow = "hidden"; // evitar scroll
    }

    continueBtn.addEventListener("click", () => {
        mobileWarning.style.display = "none";
        document.body.style.overflow = "auto";
    });
});

/* ============================
   SCRIPT PÁGINA PRINCIPAL (LOADER)
   ============================ */
window.addEventListener('load', function () {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderElements = document.querySelectorAll('#loader-wrapper > *');
    const unabLetters = document.querySelectorAll('.unab-letter');

    setTimeout(() => {
        loaderElements.forEach(element => {
            element.style.animation = 'fadeOut 0.8s ease-in forwards';
        });

        unabLetters.forEach(letter => {
            letter.style.animation = 'fadeOut 0.8s ease-in forwards';
        });

        setTimeout(() => {
            loaderWrapper.classList.add('hidden');
            loaderWrapper.addEventListener('transitionend', function () {
                loaderWrapper.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }, 800);

    }, 2000);
});

/* ============================
   SCRIPT SLIDER (IIFE)
   ============================ */
(() => {
    // SLIDES (SE AÑADE LA SUB-IMAGEN)
    const slides = [
        {
            img: "imagen1.jpg",
            qr: "qr1.png",
            link: "https://forms.gle/pvUViZFaPBmLX7FF6",
            title: "Formulario",
            preview: "sub-imagen1.png"
        },
        {
            img: "imagen2.jpg",
            qr: "qr2.png",
            link: "https://gemini.google.com/share/2c74e42b8f30",
            title: "Story Book",
            preview: "sub-imagen2.png"
        }
    ];

    let mainIndex = 0;
    let animating = false;

    // ELEMENTOS
    const mainImg = document.getElementById("mainImg");
    const miniImg = document.getElementById("miniImg");
    const miniBox = document.getElementById("miniBox");

    const qrImg = document.getElementById("qrImg");
    const qrTitle = document.getElementById("qrTitle");
    const linkEl = document.getElementById("linkEl");
    const infoBox = document.getElementById("infoBox");

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    // ---- SUB-IMAGEN FLOTANTE ----
    const floatImg = document.createElement("img");
    floatImg.id = "floatingPreview";
    floatImg.style.position = "absolute";
    floatImg.style.display = "none";
    floatImg.style.width = "180px";
    floatImg.style.borderRadius = "10px";
    floatImg.style.boxShadow = "0 4px 10px rgba(0,0,0,0.45)";
    floatImg.style.zIndex = "99999";
    document.body.appendChild(floatImg);

    // RENDER INICIAL
    function render() {
        // Comprobación para asegurar que los elementos existen
        if (!mainImg || !miniImg || !qrImg || !qrTitle || !linkEl || !infoBox) {
            console.error("Faltan elementos del slider en el DOM.");
            return;
        }

        mainImg.src = slides[mainIndex].img;
        miniImg.src = slides[1 - mainIndex].img;

        qrImg.src = slides[mainIndex].qr;
        qrTitle.textContent = slides[mainIndex].title;

        linkEl.href = slides[mainIndex].link;
        linkEl.textContent = slides[mainIndex].link;

        requestAnimationFrame(() => {
            infoBox.classList.remove("show");
            setTimeout(() => infoBox.classList.add("show"), 40);
        });
    }

    // Solo ejecutar si los elementos principales existen
    if (mainImg) {
        render();
    } else {
        return; // No hacer nada si el slider no está en la página
    }


    // ANIMACIÓN DE CAMBIO
    function swapAnimated() {
        if (animating) return;
        animating = true;

        nextBtn.disabled = true;
        prevBtn.disabled = true;
        infoBox.classList.remove("show");

        const rMini = miniImg.getBoundingClientRect();
        const rMain = mainImg.getBoundingClientRect();

        const clone = miniImg.cloneNode(true);
        clone.classList.add("clone-temp");
        document.body.appendChild(clone);

        clone.style.left = rMini.left + "px";
        clone.style.top = rMini.top + "px";
        clone.style.width = rMini.width + "px";
        clone.style.height = rMini.height + "px";
        clone.style.transition = "all 700ms cubic-bezier(.2,.9,.2,1)";

        requestAnimationFrame(() => {
            clone.style.left = rMain.left + "px";
            clone.style.top = rMain.top + "px";
            clone.style.width = rMain.width + "px";
            clone.style.height = rMain.height + "px";
            clone.style.borderRadius = "0px";
        });

        setTimeout(() => {
            mainIndex = 1 - mainIndex;

            mainImg.src = slides[mainIndex].img;
            miniImg.src = slides[1 - mainIndex].img;

            qrImg.src = slides[mainIndex].qr;
            qrTitle.textContent = slides[mainIndex].title;

            linkEl.href = slides[mainIndex].link;
            linkEl.textContent = slides[mainIndex].link;

            clone.remove();

            setTimeout(() => {
                infoBox.classList.add("show");
                animating = false;
                nextBtn.disabled = false;
                prevBtn.disabled = false;
            }, 120);

        }, 700);
    }

    // Solo añadir listeners si los botones existen
    if (nextBtn && prevBtn && miniBox) {
        nextBtn.addEventListener("click", swapAnimated);
        prevBtn.addEventListener("click", swapAnimated);
        miniBox.addEventListener("click", swapAnimated);

        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") swapAnimated();
            if (e.key === "ArrowLeft") swapAnimated();
        });
    }

    // ---- HOVER PARA MOSTRAR SUB-IMAGEN ----
    if (qrImg) {
        qrImg.addEventListener("mouseenter", () => {
            floatImg.src = slides[mainIndex].preview;
            floatImg.style.display = "block";
        });

        qrImg.addEventListener("mouseleave", () => {
            floatImg.style.display = "none";
        });

        // Seguir cursor
        qrImg.addEventListener("mousemove", (e) => {
            floatImg.style.left = e.pageX + 20 + "px";
            floatImg.style.top = e.pageY + 20 + "px";
        });
    }

})();


/* ============================
   SCRIPT DOCENTE (SECCION 3)
   ============================ */
const foto = document.getElementById("foto");

// Solo ejecutar si el elemento 'foto' existe en la página
if (foto) {
    foto.addEventListener("mouseenter", () => {
        foto.style.opacity = 0;
        setTimeout(() => {
            foto.src = "encargado2.jpg"; // Carga la segunda imagen
            foto.style.opacity = 1;
        }, 300); // Coincide con la transición
    });

    foto.addEventListener("mouseleave", () => {
        foto.style.opacity = 0;
        setTimeout(() => {
            foto.src = "encargado.jpg"; // Vuelve a la imagen original
            foto.style.opacity = 1;
        }, 300); // Coincide con la transición
    });
}


