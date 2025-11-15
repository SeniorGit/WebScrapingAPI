# ebay Scraper with AI
Web scraping untuk extract data product dari ebay menggunakan javascript dan AI

## Installation
```bash
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth axios
```

## Setup
1. Dapatkan Api ke dari Deepseek platform
2. buat file .env
```bash
DEEPSEEK_API_KEY=your_api_key_here
```
## Usage
1. Jalankan 
```bash
node main.js
```

Pada root folder

## Project Structure
```bash
WebScrapingAPI/
├── main.js              # Main scraping logic      
├── utils/
│   ├── deepseek.js           # ai
│   ├── filter.js          # filtering product data
│   ├── product.js           # get product data
│   └── scroll.js          # Scrollng Handler
├── result/                # Generated JSON files
├── .env.example           # Environment variables template
├── package.json
└── README.md
```
