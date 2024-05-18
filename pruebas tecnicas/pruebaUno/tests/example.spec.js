// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = "http://localhost:5173/";

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole('paragraph');
  const imagen = await page.getByRole('img');
  
  //recuperar text and image
  const textContent = await text.textContent();
  const imagenContent = await imagen.getAttribute('src');

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imagenContent?.startsWith("https://cataas.com")).toBeTruthy();

});
