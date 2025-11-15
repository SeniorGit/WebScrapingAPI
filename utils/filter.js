// check if any contain pattern
function isPlaceholderProduct(title){
    if (!title || title === '-') return true;
    
    const placeHolder = [
        'Shop on eBay',
    ];

    return placeHolder.some(pattern => 
        title.toLowerCase().includes(pattern.toLowerCase())
    );
}

// check if any contain pattern
function isPlaceholderPrice(price){
    if (!price || price === '-') return true;
    
    const placeHolder = [
        '$20.00',
    ];

    return placeHolder.some(pattern => 
        price.includes(pattern)
    );
}

module.exports = {isPlaceholderProduct, isPlaceholderPrice}