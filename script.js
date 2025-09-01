// Animación de la barra de progreso al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Animar la barra de progreso después de un pequeño delay
    setTimeout(function() {
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = '75%';
    }, 500);
    
    // Efecto de conteo en el texto de progreso
    animateProgressText();
    
    // Agregar efectos hover adicionales
    addHoverEffects();
});

function animateProgressText() {
    const progressText = document.querySelector('.progress-text');
    let current = 0;
    const target = 75;
    const increment = target / 50; // Duración de la animación
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        progressText.textContent = Math.floor(current) + '% Completado';
    }, 30);
}

function addHoverEffects() {
    // Efecto hover para los iconos de timeline
    const timelineIcons = document.querySelectorAll('.timeline-icon');
    
    timelineIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            if (this.classList.contains('completed')) {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            } else if (this.classList.contains('in-progress')) {
                this.style.transform = 'scale(1.1)';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Efecto de paralaje sutil en scroll (opcional)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const timeline = document.querySelector('.timeline');
        
        if (timeline) {
            timeline.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
}

// Función para actualizar el progreso dinámicamente (para futuras actualizaciones)
function updateProgress(newPercentage) {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    progressFill.style.width = newPercentage + '%';
    progressText.textContent = newPercentage + '% Completado';
}

// Función para actualizar estado de una tarea
function updateTaskStatus(taskIndex, status) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const taskItem = timelineItems[taskIndex];
    
    if (!taskItem) return;
    
    const icon = taskItem.querySelector('.timeline-icon');
    const content = taskItem.querySelector('.timeline-content');
    const badge = taskItem.querySelector('.status-badge');
    
    // Remover clases existentes
    icon.classList.remove('completed', 'in-progress', 'pending');
    content.classList.remove('in-progress-content', 'pending-content');
    badge.classList.remove('badge-completed', 'badge-progress', 'badge-pending');
    
    // Agregar nuevas clases según el estado
    switch(status) {
        case 'completed':
            icon.classList.add('completed');
            icon.innerHTML = '✓';
            badge.classList.add('badge-completed');
            badge.textContent = 'Completado';
            break;
        case 'in-progress':
            icon.classList.add('in-progress');
            icon.innerHTML = '⚡';
            content.classList.add('in-progress-content');
            badge.classList.add('badge-progress');
            badge.textContent = 'En Proceso';
            break;
        case 'pending':
            icon.classList.add('pending');
            icon.innerHTML = '⏳';
            content.classList.add('pending-content');
            badge.classList.add('badge-pending');
            badge.textContent = 'Pendiente';
            break;
    }
}

// Función para smooth scroll (si se agregan enlaces internos)
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}