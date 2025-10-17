import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pixelgames.io/');
  await page.getByRole('button', { name: 'Búsqueda' }).click();
  await page.getByRole('combobox', { name: 'Búsqueda' }).fill('hollow knight');
  await page.getByRole('link', { name: 'Hollow Knight: Silksong PS4 | PS5 Hollow Knight: Silksong PS4 | PS5' }).click();
  await page.getByLabel('Plataforma de videojuegos').selectOption('PlayStation 5');
  await page.goto('https://pixelgames.io/products/hollow-knight-silksong?variant=50052896162039');
  await page.getByRole('button', { name: 'Agregar al carrito' }).click();
  await page.getByRole('link', { name: 'Ver carrito (1)' }).click();
  await page.getByRole('button', { name: 'Pagar pedido' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('jorgevg945@gmail.com');
  await page.getByRole('textbox', { name: 'Nombre' }).click();
  await page.getByRole('textbox', { name: 'Nombre' }).fill('jorge');
  await page.getByRole('textbox', { name: 'Apellidos' }).click();
  await page.getByRole('textbox', { name: 'Apellidos' }).fill('velasquez');
  await page.getByRole('textbox', { name: 'Teléfono' }).click();
  await page.getByRole('textbox', { name: 'Teléfono' }).fill('4128418550');
  await page.getByRole('textbox', { name: 'Ciudad' }).click();
  await page.getByRole('textbox', { name: 'Ciudad' }).fill('cumana');
  await page.getByRole('textbox', { name: 'Código postal (opcional)' }).click();
  await page.getByRole('textbox', { name: 'Código postal (opcional)' }).fill('6021');
});
