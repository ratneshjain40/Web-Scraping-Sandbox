//npm install puppeteer
//npm install html-to-text
const puppeteer = require('puppeteer')
const { convert } = require('html-to-text');

const fs = require('fs');
const { promisify } = require('util');
const appendFileAsync = promisify(fs.appendFile)

const filepath = './html/10_Modules.txt';

// Example https://alison.com/courseware/1786/14437/1/1.html
var url = "https://alison.com/courseware/1786/14437/1/1.html"
var pathname = new URL(url).pathname;
var splitUrl = pathname.split('/');
const course_code = splitUrl[2];
const module_code = splitUrl[3];

const no_of_sub_modules = 6
// This array maps no of pages in each sub module
const max_index = [0, 1, 30, 30, 30, 30, 30, 30, 30];

function get_url(x, y) {
    return `https://alison.com/courseware/${course_code}/${module_code}/${x}/${y}.html`;
};

function get_img_url(x) {
    return `https://alison.com/courseware/${course_code}/${module_code}/${x}/`;
};

const main = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: "./user_data"
    });
    const page = await browser.newPage();
    for (let submodule = 1; submodule <= no_of_sub_modules; submodule++) {

        let string_img = "\n" + get_img_url(submodule) + "\n" + "submodule number is " + submodule + "\n";
        await appendFileAsync(filepath, string_img, function (err) {
            if (err) throw err;
        });

        for (let index = 1; index <= max_index[submodule]; index++) {

            await page.goto(get_url(submodule, index));
            const html = await page.content();

            const text = convert(html, {
                wordwrap: 130
            });
            await appendFileAsync(filepath, text, function (err) {
                if (err) throw err;
            });
            console.log('Saved! ' + submodule + " " + index);
        }
    }

    browser.close();
}

main();