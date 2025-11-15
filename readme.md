# eBay Scraper with AI

Sebuah proyek web scraping untuk mengekstrak data produk dari eBay menggunakan **JavaScript**, **Puppeteer**, dan pemrosesan data berbasis **AI (DeepSeek API)**.  
Scraper ini dirancang untuk mengambil detail produk, membersihkan data, dan menghasilkan output JSON yang lebih relevan dan siap digunakan.

## Fitur
- Scraping data produk eBay menggunakan *headless browser* (Puppeteer)
- Menggunakan **puppeteer-extra-plugin-stealth** untuk menghindari deteksi anti-bot
- Integrasi **DeepSeek AI** untuk pengolahan & penyaringan data
- Output otomatis dalam format JSON
- Struktur modular sehingga mudah dikembangkan

## Instalasi
Install semua dependencies berikut:

```bash
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth axios
```

## Setup
1. Dapatkan Api ke dari Deepseek platform
2. buat file .env:
```bash
DEEPSEEK_API_KEY=your_api_key_here
```
Atau gunakan .env berikut:
```bash
DEEPSEEK_API_KEY=your_api_key_here
```

## Cara Penggunaan
Jalankan scraper:
```bash
node main.js
```
Pastikan perintah dijalankan dari root folder proyek.

## Tutorial Penggunaan

## Struktur Folder
```bash
WebScrapingAPI/
├── main.js                 # Main scraping logic      
├── utils/
│   ├── deepseek.js         # Integrasi AI DeepSeek
│   ├── filter.js           # Filtering & refining product data
│   ├── product.js          # Handler: mengambil data produk dari eBay
│   └── scroll.js           # Scrolling automation untuk Puppeteer
├── result/                 # Output JSON tersimpan di sini
├── .env.example            # Template environment variables
├── package.json
└── README.md
```


