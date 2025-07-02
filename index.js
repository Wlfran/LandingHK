const input = document.getElementById('buscar');
    const resultados = document.getElementById('resultados');

    input.addEventListener('input', async function () {
      const query = this.value.trim();
        debugger
    //   if (query.length < 2) {
    //     resultados.innerHTML = '';
    //     return;
    //   }

      try {
        const url = `https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/Henkel_PDV?NOMBRE_PDV=${query}`;


        const response = await fetch(url, {
          headers: {
            'Authorization': 'Token 06588006ccf7cff0d3ddc5f86659f8a8f77a0327',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        resultados.innerHTML = '';

        if (!data || data.length === 0) {
          resultados.innerHTML = '<li class="list-group-item text-muted">No se encontraron resultados</li>';
          return;
        }

        data.forEach(item => {
          const li = document.createElement('li');
          li.classList.add('list-group-item', 'result-item');
          li.textContent = item.NOMBRE_PDV || JSON.stringify(item);
          resultados.appendChild(li);
        });

      } catch (error) {
        console.error('Error al buscar:', error);
        resultados.innerHTML = `<li class="list-group-item text-danger">Error: ${error.message}</li>`;
      }
    });