# TripDoc - Document Generator Application

## Overview

TripDoc adalah aplikasi web modern untuk generate dokumen permohonan kendaraan secara otomatis. Aplikasi ini mengintegrasikan Next.js sebagai frontend framework dengan Python Flask sebagai backend service untuk pemrosesan dokumen Word (.docx). Sistem ini dirancang untuk mempermudah proses pembuatan formulir permohonan kendaraan dengan mengisi data melalui form interaktif yang kemudian secara otomatis akan menghasilkan dokumen Word yang siap diunduh.

## Key Features

### Document Generation
- **Automated Document Creation**: Generate dokumen Word (.docx) secara otomatis berdasarkan template yang telah ditentukan
- **Dynamic Field Mapping**: Mapping data form ke template Word menggunakan python-docx-template (docxtpl)
- **Indonesian Date Formatting**: Otomatis format tanggal ke format Indonesia (contoh: 12 Desember 2025)
- **Instant Download**: Dokumen langsung terdownload setelah generation berhasil

### User Interface
- **Responsive Design**: Interface yang responsive dan mobile-friendly menggunakan Tailwind CSS
- **Real-time Validation**: Validasi input form secara real-time
- **Status Feedback**: Notifikasi status (loading, success, error) yang informatif
- **Modern UI/UX**: Desain clean dan profesional dengan banner PLN

### Technical Features
- **Server-Side Rendering (SSR)**: Menggunakan Next.js App Router untuk optimal performance
- **API Route Handler**: Next.js API routes sebagai proxy ke Python backend
- **Error Handling**: Comprehensive error handling di frontend dan backend
- **TypeScript Support**: Type-safe development dengan full TypeScript integration

## Technology Stack

### Frontend
- **Framework**: Next.js 16.0.8 (React 19.2.1)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.0
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.559.0
- **Build Tool**: Turbopack (Next.js native)

### Backend
- **Framework**: Flask 3.0.0 (Python)
- **Document Processing**: python-docx-template (docxtpl) 0.16.7
- **CORS Handling**: Flask-CORS
- **Template Engine**: Jinja2 (via docxtpl)

### Deployment
- **Frontend Hosting**: Vercel (serverless)
- **Python Functions**: Vercel Serverless Functions
- **Version Control**: Git + GitHub

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│                    (User Interface)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP Request
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              App Router (SSR)                        │   │
│  │  - page.tsx (Homepage)                               │   │
│  │  - form/page.tsx (Form Page)                         │   │
│  └─────────────────┬───────────────────────────────────┘   │
│                    │                                         │
│                    │ POST /api/generate-doc                 │
│                    ▼                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        Next.js API Route Handler                     │   │
│  │     (api/generate-doc/route.ts)                      │   │
│  └─────────────────┬───────────────────────────────────┘   │
└────────────────────┼─────────────────────────────────────────┘
                     │
                     │ HTTP POST (Local Dev)
                     │ http://localhost:8000/generate-document
                     │
                     │ Serverless Function (Production)
                     │ /api/python/generate-document
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Python Backend                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          Flask Server (Development)                  │   │
│  │      OR Vercel Function (Production)                 │   │
│  │                                                       │   │
│  │  - Receive JSON data                                 │   │
│  │  - Load Word template                                │   │
│  │  - Render document with data                         │   │
│  │  - Return DOCX file                                  │   │
│  └─────────────────┬───────────────────────────────────┘   │
└────────────────────┼─────────────────────────────────────────┘
                     │
                     │ Read Template
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         Python_Backend/Template_surat.docx                   │
│              (Word Template File)                            │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
TripDoc/
├── .git/                                # Git repository
├── .gitignore                           # Git ignore rules
├── ANALISIS_SISTEM.md                   # System analysis document
├── README.md                            # This file
└── document-generator-app/              # Main application directory
    ├── .next/                           # Next.js build output (generated)
    ├── node_modules/                    # NPM dependencies (generated)
    ├── public/                          # Static assets
    │   ├── banner.png                   # PLN banner images
    │   ├── BANNER PLN.png
    │   ├── banner 2.png
    │   ├── banner 3.png
    │   └── *.svg                        # Icon files
    ├── src/                             # Source code directory
    │   └── app/                         # Next.js App Router
    │       ├── layout.tsx               # Root layout component
    │       ├── page.tsx                 # Homepage
    │       ├── globals.css              # Global styles
    │       ├── api/                     # API routes
    │       │   └── generate-doc/
    │       │       └── route.ts         # Document generation endpoint
    │       └── form/                    # Form feature
    │           └── page.tsx             # Form page component
    ├── Python_Backend/                  # Python backend service
    │   ├── flask_server.py              # Flask development server
    │   └── Template_surat.docx          # Word document template
    ├── api/                             # Vercel serverless functions
    │   └── generate-document.py         # Python serverless function
    ├── package.json                     # NPM dependencies & scripts
    ├── package-lock.json                # NPM lock file
    ├── tsconfig.json                    # TypeScript configuration
    ├── next.config.ts                   # Next.js configuration
    ├── tailwind.config.js               # Tailwind CSS config (generated)
    ├── postcss.config.mjs               # PostCSS configuration
    ├── eslint.config.mjs                # ESLint configuration
    ├── vercel.json                      # Vercel deployment config
    ├── requirements.txt                 # Python dependencies
    ├── .env.local.example               # Environment variables template
    └── DEPLOY.md                        # Deployment instructions
```

## Installation & Setup

### Prerequisites

- **Node.js**: Version 18.x or higher
- **Python**: Version 3.9 or higher
- **Git**: For version control
- **NPM or Yarn**: Package manager

### Local Development Setup

#### 1. Clone Repository

```bash
git clone https://github.com/Codift05/trip-doc-forpln.git
cd trip-doc-forpln/document-generator-app
```

#### 2. Install Node.js Dependencies

```bash
npm install
```

#### 3. Install Python Dependencies

```bash
# Create virtual environment (recommended)
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install flask flask-cors python-docx-template asgiref docxtpl
```

#### 4. Run Development Servers

**Terminal 1 - Flask Backend:**
```bash
cd Python_Backend
python flask_server.py
```
Flask akan berjalan di `http://localhost:8000`

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```
Next.js akan berjalan di `http://localhost:3000`

#### 5. Access Application

Buka browser dan akses: `http://localhost:3000`

## Usage

### Generating Document

1. **Navigate to Form Page**: Klik tombol "Mulai Buat Formulir" di homepage atau akses `/form`

2. **Fill Form Data**: Isi semua field yang diperlukan:
   - **Data Pemohon**: Nama, Unit Kerja, Jabatan
   - **Detail Permohonan**: Jenis Kendaraan, Tujuan, Jumlah Penumpang, Keperluan
   - **Jadwal**: Tanggal & Jam Mulai, Tanggal & Jam Selesai
   - **Data Logistik**: Nama Pengemudi, Nomor Polisi, KM Awal/Akhir
   - **Log Perjalanan**: Waktu Berangkat dan Kembali

3. **Submit**: Klik tombol "Generate & Unduh Dokumen"

4. **Download**: Dokumen Word akan otomatis terdownload dengan nama file: `Permohonan_Kendaraan_[Nama].docx`

### API Endpoints

#### POST `/api/generate-doc`

Generate dokumen Word berdasarkan data form.

**Request Body:**
```json
{
  "nama_pemohon": "string",
  "unit_kerja": "string",
  "jabatan": "string",
  "jenis_kendaraan": "string",
  "tempat_tujuan": "string",
  "jumlah_penumpang": "string",
  "keperluan": "string",
  "tgl_mulai_req": "YYYY-MM-DD",
  "jam_mulai_req": "HH:MM",
  "tgl_selesai_req": "YYYY-MM-DD",
  "jam_selesai_req": "HH:MM",
  "nama_pengemudi": "string",
  "nomor_polisi": "string",
  "km_awal": "string",
  "km_akhir": "string",
  "lama_penggunaan": "string",
  "log_berangkat_tgl": "YYYY-MM-DD",
  "log_berangkat_jam": "HH:MM",
  "log_kembali_tgl": "YYYY-MM-DD",
  "log_kembali_jam": "HH:MM"
}
```

**Response:**
- Content-Type: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Binary DOCX file

## Deployment

### Deploy to Vercel

#### Method 1: Via Vercel Dashboard

1. Push code ke GitHub repository
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Login ke [Vercel](https://vercel.com)

3. Click "New Project" → Import repository `trip-doc-forpln`

4. **Important**: Set Root Directory ke `document-generator-app`

5. Click "Deploy"

#### Method 2: Via Vercel CLI

```bash
npm i -g vercel
cd document-generator-app
vercel
```

### Environment Variables

Untuk production, set environment variables di Vercel Dashboard jika diperlukan:

- `PYTHON_API_URL` (optional): URL Python API (auto-detected)
- `NODE_ENV=production` (auto-set by Vercel)

### Post-Deployment

1. Vercel akan auto-detect Next.js framework
2. Python serverless function akan di-deploy dari folder `api/`
3. Template Word harus ada di `Python_Backend/Template_surat.docx`

**Production URLs:**
- Frontend: `https://your-app.vercel.app`
- Python API: `https://your-app.vercel.app/api/python/generate-document`

## Development Workflow

### Branch Strategy

- **main**: Production-ready code
- **fix-update**: Development branch untuk updates

### Making Changes

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add: new feature description"

# Push to remote
git push origin feature/new-feature

# Create Pull Request on GitHub
```

### Code Quality

- **TypeScript**: Strict mode enabled untuk type safety
- **ESLint**: Linting rules untuk code consistency
- **Prettier**: Code formatting (dapat dikonfigurasi)

## Troubleshooting

### Common Issues

#### 1. Flask Server Not Running
**Error**: "fetch failed" atau "ECONNREFUSED"

**Solution**: 
```bash
cd Python_Backend
python flask_server.py
```

#### 2. Port Already in Use
**Error**: "Port 3000/8000 is already in use"

**Solution**:
```bash
# Kill process on port
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :3000
kill -9 <PID>
```

#### 3. Module Not Found (Python)
**Error**: "ModuleNotFoundError: No module named 'xxx'"

**Solution**:
```bash
pip install flask flask-cors python-docx-template docxtpl asgiref
```

#### 4. TypeScript Errors
**Solution**:
```bash
npm run build
# Check output untuk specific errors
```

#### 5. Template Not Found
**Error**: "File template tidak ditemukan"

**Solution**: Pastikan `Template_surat.docx` ada di `Python_Backend/` folder

## Performance Optimization

### Frontend
- **Code Splitting**: Automatic via Next.js
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports untuk components besar

### Backend
- **Caching**: Flask response caching (dapat ditambahkan)
- **Compression**: GZIP compression untuk responses
- **CDN**: Static assets via Vercel Edge Network

## Security Considerations

- **Input Validation**: Frontend dan backend validation
- **CORS**: Configured untuk allowed origins only
- **Environment Variables**: Sensitive data tidak di-commit
- **Rate Limiting**: Dapat ditambahkan untuk production

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes dengan descriptive messages
4. Push ke branch
5. Create Pull Request dengan detail perubahan

## License

This project is private and proprietary to PLN (Perusahaan Listrik Negara).

## Support & Contact

Untuk issues dan questions:
- **GitHub Issues**: [Create new issue](https://github.com/Codift05/trip-doc-forpln/issues)
- **Repository**: [https://github.com/Codift05/trip-doc-forpln](https://github.com/Codift05/trip-doc-forpln)

---

**Last Updated**: December 12, 2025  
**Version**: 1.0.0  
**Maintained by**: Codift05
