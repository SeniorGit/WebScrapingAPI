const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
const product = require('./utils/product')
puppeteer.use(stealth());

async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    });
    
    const page = await browser.newPage();
    
    let data = [];
    for(let i = 1; i <= 2; i++){
        await page.goto(`https://www.ebay.com/sch/i.html?_from=R40&_nkw=nike&_sacat=0&rt=nc&_pgn=${i}`);
        let products = await product.Product(page, browser);
        data.push(...products);
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    console.log(data);
    await browser.close(); 
}

run();