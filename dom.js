document.getElementById('themeToggle').addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
});
