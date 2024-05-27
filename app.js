document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://minaaktiviteter.se/api/content/json/?contenttype=shop&org=esportsacademy';
    const contentElement = document.getElementById('content');
    const loadingElement = document.getElementById('loading');
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Ta bort laddningsmeddelandet
        loadingElement.style.display = 'none';
  
        // Lägg till CSS-filer dynamiskt
        data.cssFiles.forEach(file => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = file.url;
          document.head.appendChild(link);
        });
  
        // Lägg till HTML-innehåll
        contentElement.innerHTML = data.htmlBlock;
  
        // Lägg till JavaScript-filer dynamiskt
        data.javascriptFilesAfter.forEach(file => {
          const script = document.createElement('script');
          script.src = file.url;
          script.async = true;
          document.body.appendChild(script);
        });
      })
      .catch(error => {
        console.error('Error fetching the content:', error);
        loadingElement.textContent = 'Error loading content';
      });
  });
  