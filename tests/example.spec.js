import { test, expect } from '@playwright/test';

test('Seleccionar 3 juegos al azar y agregarlos al carrito', async ({ page, context }) => {
  await page.goto('https://pixelgames.io/');
  await page.waitForSelector('[id^="CardLink-template"]');

  // Captura todos los juegos
  const juegos = await page.$$('[id^="CardLink-template"]');

  // Mezcla y toma 3 al azar
  const productosAleatorios = juegos
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Extrae las URLs de los juegos
  const urls = [];
  for (const juego of productosAleatorios) {
    const href = await juego.getAttribute('href');
    if (href) urls.push(href);
  }

  // Abre cada juego en una nueva pestaña y agrega al carrito
  for (const url of urls) {
    const nuevaPagina = await context.newPage();
    await nuevaPagina.goto(`https://pixelgames.io${url}`);
    await nuevaPagina.getByRole('button', { name: 'Agregar al carrito' }).click();
    await nuevaPagina.close();
    await page.getByRole('link', { name: 'Carrito' }).click();
  }
});