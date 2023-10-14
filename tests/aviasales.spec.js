// @ts-check
import { test, expect } from '@playwright/test';

test('ticket search', async ({ page }) => {
    await page.goto('https://www.aviasales.com/'); //going to aviasales page

    await page.locator('[data-test-id="switch"] span').first().click(); //enable dark mode 
  
    await page.locator('[data-test-id="origin-autocomplete-field"]').click();
    await page.locator('[data-test-id="origin-autocomplete-field"]').fill('kennedy'); //searching for JFK airport
    await page.locator('[data-test-id="suggest-airport-JFK"]').click(); //selecting JFK airport
  
    await page.locator('[data-test-id="destination-autocomplete-field"]').fill('berli');//searching for Berlin airport
    await page.locator('[data-test-id="suggest-city-BER"]').click(); //selecting Berlin airport
  
    await page.locator('[aria-label="Mon Oct 30 2023"]').click(); //Selecting the date
  
    await page.locator('[data-test-id="passengers-field"]').click();
    await page.locator('[data-test-id="passengers-adults-field"] a').nth(1).click(); //adding +1 adult
    await page.locator('[data-test-id="tripclass-economy-label"]').click(); //select economy class
    await page.locator('[data-test-id="passengers-field"]').click(); //close passengers drop-down
  
    await page.getByText('Open Booking.com in a new tab').click(); //click to not open in a new tab
  
    await page.locator('[data-test-id="form-submit"]').click(); //click to search the tickets
    
  
  
    await expect(page).toHaveURL(/JFK3010BER/); //if it was redirected
    //if the fields are if the expect value
    await expect(page.locator('[data-test-id="origin-autocomplete-field"]')).toHaveValue('John F. Kennedy International Airport');
    await expect(page.locator('[data-test-id="destination-autocomplete-field"]')).toHaveValue('Berlin'); 
    await expect(page.locator('[data-test-id="departure-date-input"]')).toHaveValue('Mon, October 30');
    await expect(page.locator('[data-test-id="return-date-input"]')).toHaveValue('');
    await expect(page.getByText('economy')).toBeTruthy();
    await page.locator('[data-test-id="passengers-field"]').click();
    await expect(page.locator('[data-test-id="passengers-adults-field"]')).toHaveText('2');
    //verifying if the night mode is active
    const element = page.locator('[data-test-id="origin-autocomplete-field"]');
    const color = await element.evaluate((el) => {
         return window.getComputedStyle(el).getPropertyValue('background-color');
    });
    await expect('rgb(46, 48, 53)' === color).toBeTruthy();
});
