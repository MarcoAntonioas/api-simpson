 fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=5')
      .then(response => response.json())
      .then(data => {
        data.forEach((quote, index) => {
          const div = document.getElementById(`frase${index + 1}`);
          div.innerHTML = `${quote.quote}`;
        });
      })
      .catch(error => {
        console.error('Error al obtener frases:', error);
        document.getElementById('frases').innerText = 'Error al cargar las frases.';
      });