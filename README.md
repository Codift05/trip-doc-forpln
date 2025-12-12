# TripDoc - Automated Vehicle Request Document Generator

A comprehensive web-based document automation system for generating vehicle request forms with intelligent data processing. Built with modern web technologies, this system streamlines the document creation workflow by transforming interactive form inputs into professionally formatted Word documents (.docx) ready for immediate use in corporate environments.

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?style=flat-square&logo=flask)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development Workflow](#development-workflow)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

TripDoc revolutionizes the traditional vehicle request documentation process by providing an intelligent, automated solution that eliminates manual document preparation. The system combines the power of modern web frameworks with robust backend processing to deliver a seamless user experience.

### Core Capabilities

**Document Automation Engine**
- Automated Word document generation from structured form data
- Template-based rendering with dynamic field injection
- Professional formatting maintained across all generated documents
- Support for complex data structures and multiple document sections

**Intelligent Date Processing**
- Automatic conversion to Indonesian date format (e.g., "12 Desember 2025")
- Smart date validation and formatting
- Timezone-aware date handling
- Flexible input format support (YYYY-MM-DD to localized output)

**Enterprise-Grade Features**
- Real-time form validation with immediate feedback
- Comprehensive error handling and logging
- Automatic file naming with user context
- Instant document download upon generation
- Session management and state persistence

---

## Key Features

### 🚀 Document Generation

- **Template-Based System**: Pre-configured Word templates ensure consistency
- **Dynamic Data Binding**: Seamless mapping between form fields and document placeholders
- **Batch Processing Ready**: Architecture supports future bulk document generation
- **Multiple Format Support**: Extensible design for PDF, XLSX export capabilities

### 🎨 User Experience

- **Responsive Interface**: Mobile-first design using Tailwind CSS 4.0
- **Interactive Forms**: Smart form controls with conditional validation
- **Progress Indicators**: Visual feedback during document generation
- **Accessibility Compliant**: WCAG 2.1 Level AA standards
- **Dark Mode Ready**: UI components prepared for theme switching

### ⚡ Technical Excellence

- **Server-Side Rendering**: Next.js App Router for optimal SEO and performance
- **Type Safety**: Full TypeScript coverage with strict mode enabled
- **Modern Build Tools**: Turbopack for lightning-fast development builds
- **API-First Design**: RESTful endpoints with comprehensive documentation
- **Error Boundaries**: Graceful degradation and error recovery
- **Code Splitting**: Automatic optimization for faster page loads

### 🔒 Security & Reliability

- **Input Sanitization**: Protection against XSS and injection attacks
- **CORS Configuration**: Secure cross-origin resource sharing
- **Rate Limiting Ready**: Infrastructure prepared for production safeguards
- **Audit Logging**: Comprehensive logging for compliance and debugging
- **Environment Isolation**: Strict separation of development and production configs

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

## Usage Guide

### Quick Start - Document Generation

#### Step 1: Access the Application

Navigate to the form page via the homepage call-to-action or directly access the `/form` route.

#### Step 2: Complete Form Sections

The form is organized into logical sections for efficient data entry:

**Section A: Requester Information**
- Full Name (Nama Pemohon)
- Department/Unit (Unit Kerja)
- Job Title (Jabatan)

**Section B: Request Details**
- Vehicle Type (Jenis Kendaraan) - dropdown selection
- Destination (Tempat Tujuan)
- Number of Passengers (Jumlah Penumpang)
- Purpose of Request (Keperluan) - detailed description

**Section C: Schedule Information**
- Start Date & Time (Tanggal & Jam Mulai)
- End Date & Time (Tanggal & Jam Selesai)

**Section D: Logistics Data**
- Driver Name (Nama Pengemudi)
- Vehicle Plate Number (Nomor Polisi)
- Starting Odometer (KM Awal)
- Ending Odometer (KM Akhir)
- Duration of Use (Lama Penggunaan)

**Section E: Travel Log**
- Departure Date & Time (Log Berangkat)
- Return Date & Time (Log Kembali)

#### Step 3: Submit & Generate

Click the "Generate & Unduh Dokumen" button. The system will:
1. Validate all required fields
2. Process the data through the backend
3. Generate the formatted Word document
4. Automatically trigger download

**Output**: `Permohonan_Kendaraan_[Nama_Pemohon].docx`

---

## API Documentation

### Endpoint: Generate Document

```http
POST /api/generate-doc
```

Generates a Word document based on provided form data with automatic formatting and Indonesian date localization.

#### Request Headers

```http
Content-Type: application/json
```

#### Request Body Schema

```json
{
  "nama_pemohon": "string",        // Required: Requester's full name
  "unit_kerja": "string",          // Required: Department/unit name
  "jabatan": "string",             // Required: Job position
  "jenis_kendaraan": "string",     // Required: Vehicle type
  "tempat_tujuan": "string",       // Required: Destination location
  "jumlah_penumpang": "integer",   // Required: Number of passengers
  "keperluan": "string",           // Required: Purpose of request
  "tgl_mulai_req": "YYYY-MM-DD",   // Required: Start date (ISO format)
  "jam_mulai_req": "HH:MM",        // Required: Start time (24h format)
  "tgl_selesai_req": "YYYY-MM-DD", // Required: End date (ISO format)
  "jam_selesai_req": "HH:MM",      // Required: End time (24h format)
  "nama_pengemudi": "string",      // Required: Driver's name
  "nomor_polisi": "string",        // Required: License plate number
  "km_awal": "string",             // Required: Starting odometer
  "km_akhir": "string",            // Required: Ending odometer
  "lama_penggunaan": "string",     // Required: Usage duration
  "log_berangkat_tgl": "YYYY-MM-DD", // Required: Departure date
  "log_berangkat_jam": "HH:MM",    // Required: Departure time
  "log_kembali_tgl": "YYYY-MM-DD", // Required: Return date
  "log_kembali_jam": "HH:MM"       // Required: Return time
}
```

#### Success Response

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
Content-Disposition: attachment; filename="Permohonan_Kendaraan_[Name].docx"

[Binary DOCX Data]
```

#### Error Responses

**400 Bad Request** - Invalid or missing required fields

```json
{
  "error": "Validation failed: [field_name] is required"
}
```

**500 Internal Server Error** - Server processing error

```json
{
  "error": "Failed to generate document via Python API. Check console logs."
}
```

#### Example Usage

**cURL**
```bash
curl -X POST http://localhost:3000/api/generate-doc \
  -H "Content-Type: application/json" \
  -d '{
    "nama_pemohon": "John Doe",
    "unit_kerja": "IT Department",
    "jabatan": "System Administrator",
    "jenis_kendaraan": "Minibus Operasional",
    "tempat_tujuan": "Jakarta Office",
    "jumlah_penumpang": 5,
    "keperluan": "Meeting dengan klien",
    "tgl_mulai_req": "2025-12-15",
    "jam_mulai_req": "08:00",
    "tgl_selesai_req": "2025-12-15",
    "jam_selesai_req": "17:00",
    ...
  }' \
  --output document.docx
```

**JavaScript/Axios**
```javascript
const response = await axios.post('/api/generate-doc', formData, {
  responseType: 'blob'
});

const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;
link.setAttribute('download', 'Permohonan_Kendaraan.docx');
document.body.appendChild(link);
link.click();
```

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
