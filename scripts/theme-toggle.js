document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    function setTheme(mode) {
      document.documentElement.classList.toggle('dark', mode === 'dark');
      localStorage.setItem('theme', mode);
      toggle.checked = (mode === 'dark');
    }
  
    toggle.addEventListener('change', () => {
      setTheme(toggle.checked ? 'dark' : 'light');
    });
  
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
    } else if (prefersDark) {
      setTheme('dark');
    }
  });
  