// 1. Efeito de Scroll na Navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Menu Mobile Drawer Funcionamento
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const mobileOverlay = document.querySelector('.mobile-nav-overlay');
const mobileDrawer = document.querySelector('.mobile-nav-drawer');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

function openMobileMenu() {
    mobileOverlay.style.display = 'block';
    setTimeout(() => {
        mobileDrawer.style.right = '0';
    }, 10);
}

function closeMobileMenu() {
    mobileDrawer.style.right = '-100%';
    setTimeout(() => {
        mobileOverlay.style.display = 'none';
    }, 400);
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// 3. Sistema Lightbox Slider de Elite (Cardápio)
const thumbs = document.querySelectorAll('.print-thumb-card');
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
// Lista de caminhos das imagens sincronizadas com o HTML
const menuImages = [
    'img/cardapio0.jpeg', 'img/cardapio1.jpeg', 'img/cardapio2.jpeg', 'img/cardapio3.jpeg',
    'img/cardapio4.jpeg', 'img/cardapio5.jpeg', 'img/cardapio6.jpeg', 'img/cardapio7.jpeg',
    'img/cardapio8.jpeg', 'img/cardapio9.jpeg', 'img/cardapio10.jpeg', 'img/cardapio11.jpeg',
    'img/cardapio12.jpeg'
];

function showImage(index) {
    if (index < 0) index = menuImages.length - 1;
    if (index >= menuImages.length) index = 0;
    currentIndex = index;
    lightboxImg.src = menuImages[currentIndex];
}

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const index = parseInt(thumb.getAttribute('data-index'));
        lightbox.style.display = 'flex';
        showImage(index);
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
});

// Suporte a gestos simples para passar de página no telemóvel
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        showImage(currentIndex + 1); // Deslizou para a esquerda -> Próxima
    }
    if (touchEndX > touchStartX + 50) {
        showImage(currentIndex - 1); // Deslizou para a direita -> Anterior
    }
}

// 4. Animação de Entrada suave ao fazer Scroll (Revelação)
const revealElements = document.querySelectorAll('.scroll-reveal');
function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal); // Executa ao carregar a página