document.addEventListener('DOMContentLoaded', () => {
    const platosContainer = document.getElementById('platos-container');
     
    // Función para cargar las bebidas
    function cargarBebidas() {
      fetch('/castillo_surl') // Hacer una solicitud GET a la ruta /bebidas
        .then((response) => response.json())
        .then((data) => {
          platosContainer.innerHTML = ''; // Limpiar el contenedor
          data.forEach((bebida) => {
            const platoElement = document.createElement('div');
            platoElement.classList.add('plato');
            platoElement.innerHTML = `
              <h3>${bebida.nombre} - $${bebida.precio.toFixed(2)}</h3>
              <button onclick="eliminarBebida(${bebida.id})">Eliminar</button>
            `;
            platosContainer.appendChild(platoElement);
          });
        })
        .catch((error) => console.error('Error al cargar los productos:', error));
    }
  
    // Función para eliminar una bebida
    window.eliminarBebida = (id) => {
      fetch(`/castillo_surl/${id}`, {
        method: 'DELETE', // Enviar una solicitud DELETE
      })
        .then((response) => response.json())
        .then(() => {
          cargarBebidas(); // Recargar las bebidas después de eliminar
        })
        .catch((error) => console.error('Error al eliminar los productos:', error));
    };
  
    // Cargar las bebidas al iniciar la página
    cargarBebidas();
  });