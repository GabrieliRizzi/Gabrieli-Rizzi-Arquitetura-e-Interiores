// Menu mobile interativo
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

// Animação de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});

// Efeito de revelação ao scroll
function revealOnScroll() {
    const elements = document.querySelectorAll(".destaque-item, .sobre-content");
    
    elements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
// Executa uma vez ao carregar a página
window.addEventListener("load", revealOnScroll);

// Funcionalidade dos Modais
function initModals() {
    const modalButtons = document.querySelectorAll(".btn-detalhes, .projeto-link");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");
    
    // Abrir modal
    modalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Previne scroll
            }
        });
    });
    
    // Fechar modal com o botão X
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            if (modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto"; // Restaura scroll
            }
        });
    });
    
    // Fechar modal clicando fora dele
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto"; // Restaura scroll
            }
        });
    });
    
    // Fechar modal com a tecla ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (modal.style.display === "block") {
                    modal.style.display = "none";
                    document.body.style.overflow = "auto"; // Restaura scroll
                }
            });
        }
    });
}

// Inicializar modais quando a página carregar
document.addEventListener("DOMContentLoaded", initModals);

// Validação de formulário de contato
function validateContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validar nome
        const nameInput = form.querySelector('input[name="name"]');
        if (!nameInput.value.trim()) {
            showError(nameInput, "Por favor, insira seu nome.");
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validar email
        const emailInput = form.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            showError(emailInput, "Por favor, insira um email válido.");
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validar mensagem
        const messageInput = form.querySelector('textarea[name="message"]');
        if (!messageInput.value.trim()) {
            showError(messageInput, "Por favor, insira sua mensagem.");
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        // Se o formulário for válido, enviar (simulação)
        if (isValid) {
            // Em um cenário real, aqui seria uma requisição AJAX para o servidor
            alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
            form.reset();
        }
    });
    
    function showError(input, message) {
        clearError(input);
        const error = document.createElement("small");
        error.className = "error-message";
        error.style.color = "red";
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.style.borderColor = "red";
    }
    
    function clearError(input) {
        const container = input.parentNode;
        const error = container.querySelector(".error-message");
        if (error) {
            container.removeChild(error);
        }
        input.style.borderColor = "";
    }
}

// Inicializar validação do formulário
document.addEventListener("DOMContentLoaded", validateContactForm);
