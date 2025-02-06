
// Animate numbers
function animateValue(elementId, start, end, duration, prefix = '') {
    const element = document.getElementById(elementId);
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            clearInterval(timer);
            current = end;
        }
        element.textContent = prefix + Math.floor(current).toLocaleString();
    }, 16);
}

// Initialize animations
setTimeout(() => {
    animateValue('revenue', 0, 85420, 2000, '$');
    animateValue('users', 0, 12458, 2000);
    animateValue('growth', 0, 24, 2000);
}, 500);

// Add hover animations for nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0) scale(1)';
    });
});

// Add click effect for nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        item.classList.add('active');
    });
});
