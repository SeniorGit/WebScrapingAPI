const puppeteer = require('puppeteer')

async function scrollDown(page) {
    let prevHeight = -1;
    let maxScrolls = 100;
    let scrollCount = 0;
    let noChangeCount = 0;

    while (scrollCount < maxScrolls){
        // scroll to bottom
        await page.evaluate(()=> {
            window.scrollTo(0, document.body.scrollHeight)
        });

        // waiting time page
        await new Promise(resolve => setTimeout(resolve, 5000));

        // check if the scroll arrive at bottom
        let newHeight = await page.evaluate(()=>document.body.scrollHeight);
        if(newHeight === prevHeight){
            noChangeCount++;
            console.log(`No Change Count ${noChangeCount}`)
            if(noChangeCount >= 2){
                break;
            }
        } else {
            noChangeCount = 0;
        }
        // save current height and iteration
        prevHeight = newHeight;
        scrollCount += 1;        
        console.log(`Scroll ${scrollCount}, Height: ${newHeight}`)
    }
    console.log(`Finished scrolling after ${scrollCount} attemps`)
}

async function scrollEbay(page) {
    let scrollCount = 0;
    
    while (scrollCount < 10) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        
        // ✅ Tunggu SAMPAI element produk baru muncul
        try {
            await page.waitForFunction(
                (currentCount) => {
                    const products = document.querySelectorAll('.s-item');
                    return products.length > currentCount;
                },
                { timeout: 5000 },
                scrollCount * 20 // Expected product count
            );
        } catch (error) {
            console.log('No new products loaded, stopping...');
            break;
        }
        
        scrollCount++;
        console.log(`Scroll ${scrollCount}, Products loaded`);
    }
}


async function  run() {
    // lauch puppeteer and get new page
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    });
    let page = await browser.newPage();
    await page.goto('https://to-do-list-rho-ashen.vercel.app/landingPage');
    await scrollDown(page);
    // console.log(scrollEbay(page))
    await browser.close();
    // console.log(reviews);
}

run();