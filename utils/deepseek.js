const axios = require('axios');
require('dotenv').config();

// deepseek api
async function callDeepseekAI(listingHTML, detailDescription) {
    try {
        // cleaning html 
        const compressedListing = listingHTML
            .replace(/\s+/g, ' ')
            .replace(/<script[^>]*>.*?<\/script>/gi, '')
            .replace(/<style[^>]*>.*?<\/style>/gi, '')
            .substring(0, 6000) // comment for detail result

        // deepseek message
        const messages = [];
        messages.push({
            role: "user",
            content: `
            EXTRACT product information:
            
            FROM LISTING HTML (get NAME and PRICE):
            ${compressedListing}
            
            ADDITIONAL DESCRIPTION (may be empty if from iframe):
            ${detailDescription}
            
            SEARCH CAREFULLY FOR:
            - Price range with "to"
            - Any currency sysmbols: $, €, £, Rp, IDR
            - Numbers with commas and decimals

            RETURN as JSON: {"name": "...", "price": "...", "description": "..."}
            Use "-" for missing fields only for price and descriptions.

            If description is empty, try to extract brief description from the HTML.
            `
        });
        
        // send message to deepseak 
        const response = await axios.post('https://api.deepseek.com/chat/completions', {
            model: "deepseek-chat",
            messages: messages,
            response_format: { type: "json_object" },
            temperature: 0.1,
            max_tokens: 500 // comment for detail result
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        // get message result from deepseek
        const result = response.data.choices[0].message.content;
        return JSON.parse(result);
        
    } catch (error) {
        console.log('Deepseek API Error:', error.response?.data || error.message);
        return null;
    }
}

module.exports = { callDeepseekAI };