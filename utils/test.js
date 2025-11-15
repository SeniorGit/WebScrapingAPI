const filter = require('./filter')

// Terima browser sebagai parameter
async function Product(page, browser) { 
    let productCard = await page.$$('div.su-card-container.su-card-container--vertical');
    let result = [];
    
    for(let card of productCard){
        const title = await extractTitle(card);
        const price = await extractPrice(card);
        const productLink = await extractProductLink(card);
        
        if (filter.isPlaceholderProduct(title) || filter.isPlaceholderPrice(price)){
            continue;
        }
        
        const description = await getDescriptionFromLink(browser, productLink);
        
        result.push({
            "title": title,
            "price": price,
            "description": description
        })
    }
    return result;
}
// getting title
async function extractTitle(card){
    try{
        return await card.$eval('.su-card-container__header .s-card__title span.su-styled-text', node => 
            node.textContent.trim()
        );
    }catch(error){
        console.log('Title not found:', error.message);
        return '-';
    }
}

// getting price
async function extractPrice(card){
    try{
        return await card.$eval('.s-card__attribute-row .s-card__price', node =>
            node.textContent.trim()
        ) 
    }catch(error){
        console.log('Price not found:', error.message);
        return '-'
    }
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

// get detail description
async function getDescriptionFromLink(browser, link) {
    if (!link) return '-';
    
    const detailPage = await browser.newPage();
    
    try {
        await detailPage.goto(link, { 
            waitUntil: 'networkidle2',
            timeout: 20000 
        });
        
    
        await detailPage.waitForSelector('iframe#desc_ifr', { timeout: 15000 });
        const iframeElement = await detailPage.$('iframe#desc_ifr');
        const frame = await iframeElement.contentFrame();
        
       
        const cleanDescription = await frame.$eval('.x-item-description-child', node => {
            
            return node.textContent
                .replace(/<[^>]*>/g, '') 
                .replace(/\s+/g, ' ')     
                .replace(/\n+/g, '\n')    
                .trim();
        });
        
        return cleanDescription;
        
    } catch (error) {
        console.log('Error:', error.message);
        return 'No description available';
    } finally {
        await detailPage.close();
    }
}

module.exports = {Product}