// get name, price, and description
async function Product(page, browser) { 
    // get all html
    let productCard = await page.$$('div.su-card-container.su-card-container--vertical');
    let result = [];
    
    // get for each list card
    for(let i = 2; i < productCard.length; i++){
        const card = productCard[i]

        // get title and price
        const title = await extractTitle(card);
        const price = await extractPrice(card);
        
        // getting link and get description
        const productLink = await extractProductLink(card);        
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

        // get specific for title
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

        // get specific for price
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

        // get specific for link each card
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

    // open new page on current browser
    const detailPage = await browser.newPage();
    
    try {
        
        // wait until documentload or timeout on 15 seconds
        await detailPage.goto(link, { 
            waitUntil: 'networkidle2',
            timeout: 15000 
        });
        
        // accessing iframe to get descriptions
        await detailPage.waitForSelector('iframe#desc_ifr', { timeout: 15000 });
        const iframeElement = await detailPage.$('iframe#desc_ifr');
        const frame = await iframeElement.contentFrame();
        
        // cleaning description
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
    } finally {
        await detailPage.close();
    }
}

module.exports = {Product}