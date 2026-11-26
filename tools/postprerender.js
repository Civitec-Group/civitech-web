// Despues del prerender (26-nov-2026). Corre solo tras `npm run prerender` (hook "postprerender").
//
// 1. 404 DE VERDAD: Cloudflare Pages sirve 404.html con estado 404 cuando una URL no existe. Sin
//    ese fichero asume que es una SPA y devuelve la portada con 200 para CUALQUIER URL (el "404
//    blando": Google indexaba URL inventadas). La ruta "/404" se prerenderiza con NotFoundComponent
//    (noindex) y aqui se convierte en 404.html.
// 2. Comprueba que existen las paginas que no pueden faltar. Si falta algo, sale con error: el
//    paso de deploy no corre y la web en vivo se queda como estaba.
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist', 'civitech.web', 'browser');
const origen404 = path.join(dist, '404', 'index.html');
const destino404 = path.join(dist, '404.html');

function falla(msg) {
  console.error('postprerender: ' + msg);
  process.exit(1);
}

if (!fs.existsSync(origen404)) falla('no existe ' + origen404 + ' (falta "/404" en las rutas del prerender?)');
fs.copyFileSync(origen404, destino404);
fs.rmSync(path.join(dist, '404'), { recursive: true, force: true });

const html404 = fs.readFileSync(destino404, 'utf8');
if (!/noindex/i.test(html404)) falla('404.html sin noindex');

for (const r of ['index.html', 'gracias/index.html', 'contactanos/index.html', 'domotica/optimizacion-solar/index.html']) {
  if (!fs.existsSync(path.join(dist, r))) falla('falta ' + r);
}
console.log('postprerender: 404.html listo (' + html404.length + ' bytes) y paginas clave presentes');
