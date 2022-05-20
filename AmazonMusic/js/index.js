const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const fs = require('fs')

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./user_data"
  });
  const page = await browser.newPage();

  await page.goto('https://music.amazon.in/');
  await page.waitForSelector("#accountSetting");
  //open pop up
  await page.click("#accountSetting");


  //checks if user is already signed in by seening if signin button is present in the dom
  state = true;
  await page.click("#signInButton").catch(() => {
    state = false;
  });
  if (state != false) {
    await page.waitForSelector("#ap_email");
    await page.type("#ap_email", "ratneshjain40@gmail.com");
    await page.type("#ap_password", "penguinclub@40");

    await page.click('input[name="rememberMe"]')
    await page.click("#signInSubmit");
  }

  if (!state) {
    //close pop up
    await page.click("#accountSetting");
  }

  const content = await page.content();
  const $ = cheerio.load(content);
  const element = $('music-container[class="hydrated"]');
  
  browser.close();
}

main();