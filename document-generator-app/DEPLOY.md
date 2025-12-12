# TripDoc - Document Generator

Aplikasi untuk generate dokumen permohonan kendaraan menggunakan Next.js dan Python.

## 🚀 Deploy ke Vercel

### Langkah-langkah Deploy:

1. **Push code ke GitHub repository kamu**
   ```bash
   git add .
   git commit -m "Setup for Vercel deployment"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub account
   - Click "New Project"
   - Import repository `trip-doc-forpln`
   - **Root Directory**: Pilih `document-generator-app`
   - Vercel akan auto-detect Next.js
   - Click "Deploy"

3. **Deploy via Vercel CLI** (Alternative)
   ```bash
   npm i -g vercel
   cd document-generator-app
   vercel
   ```

### File Penting untuk Deployment:

- ✅ `vercel.json` - Konfigurasi Vercel
- ✅ `requirements.txt` - Python dependencies
- ✅ `api/generate-document.py` - Python serverless function
- ✅ Template Word harus ada di `Python_Backend/Template_surat.docx`

## 🛠 Development

### Menjalankan Local:

1. **Install dependencies**
   ```bash
   cd document-generator-app
   npm install
   ```

2. **Jalankan Flask Backend** (Terminal 1)
   ```bash
   cd Python_Backend
   python flask_server.py
   ```

3. **Jalankan Next.js** (Terminal 2)
   ```bash
   npm run dev
   ```

4. Buka browser: `http://localhost:3000`

## 📦 Structure

```
document-generator-app/
├── api/                          # Vercel serverless functions
│   └── generate-document.py      # Python endpoint untuk production
├── Python_Backend/               # Flask untuk local dev
│   ├── flask_server.py
│   └── Template_surat.docx       # Template Word
├── src/
│   └── app/
│       ├── api/
│       │   └── generate-doc/     # Next.js API route
│       └── form/                 # Form UI
└── requirements.txt              # Python dependencies
```

## 🔧 Environment Variables

Copy `.env.local.example` ke `.env.local` jika perlu custom configuration.

## 📝 Notes

- Di production (Vercel), Python berjalan sebagai serverless function
- Di local development, gunakan Flask server terpisah
- Template Word harus selalu ada di `Python_Backend/Template_surat.docx`
