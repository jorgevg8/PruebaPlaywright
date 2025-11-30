import { test, expect } from '@playwright/test';
test('Seleccionar DOMS en una pagina de prueba', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/challenging_dom');

    await page.waitForTimeout(5000);

    //Seleccionar el DOM
    await page.click('#fd221c80-b02f-031e-02fc-12af3cfc7c48');
}

)