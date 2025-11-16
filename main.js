const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs')
const path = require('path');
puppeteer.use(stealth());

// choose manual use "product" or ai use "productAi"
const product = require('./utils/productByManual');
const productAi = require('./utils/productByAi');

async function run() {
    // opening browser
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    });
    
    // open page
    const page = await browser.newPage();
    
    let data = [];

    let pagination = 2 // change it for get more data

    // pagination logic 
    for(let i = 1; i <= pagination; i++){
        console.log(`\n Processing PAGE ${i}...`);
        
        // go to website target
        await page.goto(`https://www.ebay.com/sch/i.html?_from=R40&_nkw=nike&_sacat=0&rt=nc&_pgn=${i}`, {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        
        // waiting for getting container
        await page.waitForSelector('div.su-card-container.su-card-container--vertical', { timeout: 30000 });
        
        // get product and save into data 
        let products = await productAi.Product(page, browser); // change product to productAi for ai usage
        data.push(...products);
        
        console.log(`Page ${i} completed: ${products.length} products`);
    }

    // json processing into file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join('./result/', `result-${timestamp}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`Total products: ${data.length}`);
    
    await browser.close(); 
}

run();