from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from docxtpl import DocxTemplate
from datetime import datetime
import io
import os
import locale

app = Flask(__name__)
# Mengizinkan request dari Next.js
CORS(app) 

# Helper: Format Tanggal Indonesia (Opsional, biar rapi)
def format_tanggal_indo(date_str):
    if not date_str:
        return ""
    try:
        # Parsing format YYYY-MM-DD dari input HTML date
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        # Mapping nama bulan manual (agar tidak tergantung locale OS)
        bulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ]
        return f"{date_obj.day} {bulan[date_obj.month - 1]} {date_obj.year}"
    except ValueError:
        return date_str # Kembalikan asli jika format salah

@app.route('/generate-document', methods=['POST'])
def generate_document():
    try:
        # 1. Terima Data dari Next.js
        data = request.json
        print("Data diterima:", data) # Debugging di terminal

        # 2. Load Template Word
        # Pastikan file 'template_pln.docx' ada di folder yang sama dengan app.py
        template_path = "Template_surat.docx"
        
        if not os.path.exists(template_path):
            return jsonify({"error": "File template_pln.docx tidak ditemukan di server!"}), 500

        doc = DocxTemplate(template_path)

        # 3. Siapkan Context (Data yang akan dimasukkan ke Word)
        # Kita format tanggalnya agar cantik
        context = {
            # --- Bagian 1: Data Pemohon ---
            'nama_pemohon': data.get('nama_pemohon', ''),
            'unit_kerja': data.get('unit_kerja', ''),
            'jabatan': data.get('jabatan', ''),
            'jenis_kendaraan': data.get('jenis_kendaraan', ''),
            'tempat_tujuan': data.get('tempat_tujuan', ''),
            'jumlah_penumpang': data.get('jumlah_penumpang', ''),
            
            # --- Bagian 2: Rencana Pemakaian ---
            'keperluan': data.get('keperluan', ''),
            'tgl_mulai_req': format_tanggal_indo(data.get('tgl_mulai_req', '')),
            'jam_mulai_req': data.get('jam_mulai_req', ''),
            'tgl_selesai_req': format_tanggal_indo(data.get('tgl_selesai_req', '')),
            'jam_selesai_req': data.get('jam_selesai_req', ''),

            # --- Bagian 3: Logistik ---
            'nama_pengemudi': data.get('nama_pengemudi', ''),
            'nomor_polisi': data.get('nomor_polisi', ''),
            'km_awal': data.get('km_awal', ''),
            'km_akhir': data.get('km_akhir', ''),
            'lama_penggunaan': data.get('lama_penggunaan', ''),
            
            # Log Berangkat
            'log_berangkat_tgl': format_tanggal_indo(data.get('log_berangkat_tgl', '')),
            'log_berangkat_jam': data.get('log_berangkat_jam', ''),
            
            # Log Kembali
            'log_kembali_tgl': format_tanggal_indo(data.get('log_kembali_tgl', '')),
            'log_kembali_jam': data.get('log_kembali_jam', ''),
        }

        # 4. Render Dokumen
        doc.render(context)

        # 5. Simpan ke Memory Stream (Virtual File)
        file_stream = io.BytesIO()
        doc.save(file_stream)
        file_stream.seek(0)

        # 6. Kirim Balik ke Client (Next.js)
        filename = f"Permohonan_Kendaraan_{data.get('nama_pemohon', 'User')}.docx"
        
        return send_file(
            file_stream,
            as_attachment=True,
            download_name=filename,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Jalankan di port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)