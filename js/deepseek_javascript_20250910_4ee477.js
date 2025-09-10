// Filtro para a galeria de projetos
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const projetoItems = document.querySelectorAll('.projeto-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active ao botão clicado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projetoItems.forEach(item => {
                if (filterValue === 'todos') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-categoria') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Carrossel para a página de projetos
function initCarousel() {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    
    let currentSlide = 0;
    
    // Criar dots de navegação
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    
    // Função para ir para um slide específico
    function goToSlide(n) {
        slides[currentSlide].classList.remove("active");
        dotsContainer.children[currentSlide].classList.remove("active");
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add("active");
        dotsContainer.children[currentSlide].classList.add("active");
    }
    
    // Event listeners para os botões
    prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));
    
    // Auto-avanço do carrossel
    let carouselInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    
    // Pausar ao passar o mouse
    carousel.addEventListener("mouseenter", () => clearInterval(carouselInterval));
    carousel.addEventListener("mouseleave", () => {
        carouselInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
}

// Inicializar carrossel quando a página carregar
document.addEventListener("DOMContentLoaded", initCarousel);