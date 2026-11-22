const ANIO_GOLPE = 1976;
document.getElementById('contador').textContent = new Date().getFullYear() - ANIO_GOLPE;

const buscador = document.getElementById('buscador');
const testimonios = document.querySelectorAll('.testimonio');
const sinResultados = document.getElementById('sinResultados');

function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

buscador.addEventListener('input', () => {
  const busqueda = normalizar(buscador.value.trim());
  let visibles = 0;
  testimonios.forEach(t => {
    const coincide = normalizar(t.textContent).includes(busqueda);
    t.classList.toggle('d-none', !coincide);
    if (coincide) visibles++;
  });
  sinResultados.classList.toggle('d-none', visibles > 0);
});

const formAdhesion = document.getElementById('formAdhesion');
const exito = document.getElementById('exito');

function marcar(campo, valido) {
  campo.classList.toggle('is-valid', valido);
  campo.classList.toggle('is-invalid', !valido);
  return valido;
}

formAdhesion.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('adNombre');
  const email = document.getElementById('adEmail');
  const mensaje = document.getElementById('adMensaje');
  const acepto = document.getElementById('adAcepto');

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const resultados = [
    marcar(nombre, nombre.value.trim().length >= 3),
    marcar(email, regexEmail.test(email.value.trim())),
    marcar(mensaje, mensaje.value.trim().length >= 10),
    marcar(acepto, acepto.checked)
  ];

  if (resultados.every(Boolean)) {
    exito.textContent = `¡Gracias, ${nombre.value.trim()}! Tu adhesión fue registrada.`;
    exito.classList.remove('d-none');
    formAdhesion.reset();
    formAdhesion.querySelectorAll('.is-valid').forEach(c => c.classList.remove('is-valid'));
  } else {
    exito.classList.add('d-none');
  }
});

const formTarjeta = document.getElementById('formTarjeta');
const tarjeta = document.getElementById('tarjeta');

function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

formTarjeta.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = escaparHTML(document.getElementById('tNombre').value.trim()) || 'Una persona que no olvida';
  const frase = escaparHTML(document.getElementById('tFrase').value);
  const anios = new Date().getFullYear() - ANIO_GOLPE;

  tarjeta.innerHTML = `
    <div class="t-anios">🕊 ${anios} años · 1976–${new Date().getFullYear()}</div>
    <p class="t-frase">${frase}</p>
    <p class="t-nombre">— ${nombre}</p>
    <p class="t-pie">Nunca Más</p>
  `;
});
