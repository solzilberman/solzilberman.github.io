// Navigation script for multi-page site

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    // Highlight active page based on current URL
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        link.classList.remove('active');
        
        // Match current page
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath === '/index.html')) {
            link.classList.add('active');
        }
    });
});
