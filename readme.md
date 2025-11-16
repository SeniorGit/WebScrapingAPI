# eBay Scraper with AI

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Puppeteer](https://img.shields.io/badge/Puppeteer-Chrome-blue) 
![AI-Powered](https://img.shields.io/badge/AI-DeepSeek-orange)

Sebuah proyek web scraping untuk mengekstrak data produk dari eBay menggunakan **JavaScript**, **Puppeteer**, dan pemrosesan data berbasis **AI (DeepSeek API)**.  
Scraper ini dirancang untuk mengambil detail produk, membersihkan data, dan menghasilkan output JSON yang lebih relevan dan siap digunakan.

## Fitur
- Scraping data produk eBay menggunakan *headless browser* (Puppeteer)
- Menggunakan **puppeteer-extra-plugin-stealth** untuk menghindari deteksi anti-bot
- Integrasi **DeepSeek AI** untuk pengolahan & penyaringan data
- Output otomatis dalam format JSON
- Struktur modular sehingga mudah dikembangkan

## Quick Start

```bash
# Clone & setup
git clone https://github.com/SeniorGit/WebScrapingAPI
cd WebScrapingAPI
```

## Instalasi
Install semua dependencies berikut:

```bash
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth axios deepseek-api dotenv fs path
```

## Setup
1. Dapatkan Api key di Deepseek platform
2. buat file .env:
```env
DEEPSEEK_API_KEY=your_api_key_here
```

## Cara Penggunaan
Jalankan scraper:
```bash
node main.js
```
Pastikan perintah dijalankan dari root folder proyek.
Hasil dari pengambilan data akan tersimpan di folder result

## Output by AI Process 
```json
[
  {
    "title": "Nike Women's Free Metcon 6 'Black&White' (FJ7126-001)",
    "price": "IDR1,152,783.00",
    "description": "The Nike Women's Free Metcon 6 'Black&White' shoe..."
  },
]
```

## Output by Manual Process 
```json
[
  {
    "title": "Multiple Sizes - Nike Air Force 1 '07 Low Triple Black | 24HR SHIP | SAME DAY",
    "price": "IDR1,320,067.33",
    "description": "Elevate your sneaker game with these Nike Air..."
  },
]
```

## Struktur Folder
```text
WebScrapingAPI/
├── main.js                 # Main scraper logic
├── utils/
│   ├── deepseek.js         # DeepSeek AI integration
│   ├── productByAi.js      # AI-powered product extraction
│   └── productByManual.js  # Manual product extraction
├── results/       # JSON outputs
├── .env.example           # Environment template
└── README.md              # This file
```

## Configuration
  ### Proses pengambilan data
  - Untuk penggunaan manual ubah pada main.js line 39
    ```javascript
    let products = await product.Product(page, browser);
    ```
  - Untuk penggunaan by AI deepseek pastikan .env sudah ada dan ubah pada main.js line 39
    ```javascript
    let products = await productAi.Product(page, browser);
    ```
  ### Pagination
  - Untuk mengatur jumlah halaman yang ingin diambil ubah pada main.js pada line 22, ubah sesuai dengan kebutuhan 
    ```javascript
    let pagination = 2
    ```
  ### Deepseek API
  - jika pada price terdapat "-" ubah pada utils/deepseek.js pada line 12, comment line tersebut atau hapus
    Catatan: Penghapusan batas ini akan meningkatkan penggunaan kuota API.
    ```javascript
      const compressedListing = listingHTML
            .replace(/\s+/g, ' ')
            .replace(/<script[^>]*>.*?<\/script>/gi, '')
            .replace(/<style[^>]*>.*?<\/style>/gi, '')
            //.substring(0, 6000) 
    ```
  - Jika menginginkan hasil description yang lebih lengkap dan detail ubah pada utils/deepseek.js pada line 45, anda bisa menambahkan maximum dari max_tokens atau menghapusnya
    Catatan: Penghapusan batas ini akan meningkatkan penggunaan kuota API.
    ```javascript
      model: "deepseek-chat",
            messages: messages,
            response_format: { type: "json_object" },
            temperature: 0.1,
            max_tokens: 500 // change or delete
    ```
 Saran: Parameter max_tokens berguna untuk mengoptimalkan biaya operasional API.

    





