const puppeteer = require('puppeteer');
const {generateText, checkAndGenerate} = require('./util');

//arg: label + anonymous fns
//test is provider by test runner
test('should output name and age', () => {
    //testing code to be executed
    const text = generateText('Max', 29);
    //expect is provided by assertion lib
    expect(text).toBe('Max (29 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

//an integration text, beacuse we check more things
test('should generate a valid text output', () => {
    const text = checkAndGenerate('Vanya', 31);
    expect(text).toBe('Vanya (31 years old)');
});

test('should create an element with text and correct class', async () => {
        const browser = await puppeteer.launch({
            headless: true, //to run an actual browser
            // slowMo: 80, //slow operation so that we can see what is going on
            // args: ['--window-size=1920,1080'] //launch browser with this size
        });
        const page = await browser.newPage();
        await page.goto('file:///D:/projects/testing/js-testing-introduction/index.html');
        await page.click('input#name');
        await page.type('input#name', 'Anna');
        await page.click('input#age');
        await page.type('input#age', '28');
        await page.click('#btnAddUser');
        const finalText = await page.$eval('.user-item', el => el.textContent);
        expect(finalText).toBe('Anna (28 years old)');
}, 10000);