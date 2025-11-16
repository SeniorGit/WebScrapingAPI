require('dotenv').config();
const { callDeepseekAI } = require('./deepseek')

// get product name, price, and description
async function Product(page, browser) {
    let productCard = await page.$$('div.su-card-container.su-card-container--vertical');
    let result = [];
     
    // looping for each list card
    for(let i = 2; i < productCard.length; i++){
        const card = productCard[i]
        try {
            // get html
            const listingHTML = await card.evaluate(node => node.outerHTML);

            // get detail link & get description from detail page
            const productLink = await extractProductLink(card);
            const detailDescription = await getDescriptionFromLink(browser, productLink);

            // send to data to deepseek
            let productData;
            productData = await callDeepseekAI(listingHTML, detailDescription);
        
            // send to result
            result.push({
                "title": productData.name,
                "price": productData.price || '-',
                "description": productData.description || '-'
            });
        } catch (error) {
            console.log('Error processing product:', error.message);
        }
        // wait for avoid bot detected
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return result;
}

// getting product link
async function extractProductLink(card) {
    try{
        return await card.$eval('.su-card-container__header a.s-card__link', node =>
            node.getAttribute('href')
        );
    }catch(error){
        console.log('Link not found:', error.message);
        return null;
    }
}

// get description from detail page
async function getDescriptionFromLink(browser, link) {   
    
    // open new page on same browser 
    const detailPage = await browser.newPage();
    
    try {
        // wait untill page loaded or timeout 15 seconds
        await detailPage.goto(link, { 
            waitUntil: 'domcontentloaded',
            timeout: 15000 
        });
                
        // get description inside iframe
        await detailPage.waitForSelector('iframe#desc_ifr', { timeout: 15000 });
        const frame = await (await detailPage.$('iframe#desc_ifr')).contentFrame();
        description = await frame.$eval('.x-item-description-child', node => {
            return node.textContent
                .replace(/\s+/g, ' ')
                .trim()
        });
       
        return description;
        
    } catch (error) {
        console.log('Error getting description:', error.message);
    } finally {
        await detailPage.close();
    }
}

module.exports = { Product }