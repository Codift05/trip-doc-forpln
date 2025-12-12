from flask import Flask, request, send_file, jsonify
from asgiref.wsgi import WsgiToAsgi # 1. Import library ini
from flask_cors import CORS
from docxtpl import DocxTemplate
from datetime import datetime
import io
import os
import locale

app = Flask(__name__)
CORS(app) 

# --- BAGIAN PENTING (JEMBATAN ASGI) ---
# Ini mengubah Flask (WSGI) menjadi format yang dimengerti Uvicorn (ASGI)
asgi_app = WsgiToAsgi(app) 
# --------------------------------------

# Helper: Format Tanggal Indonesia
def format_tanggal_indo(date_str):
    if not date_str:
        return ""
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        bulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ]
        return f"{date_obj.day} {bulan[date_obj.month - 1]} {date_obj.year}"
    except ValueError:
        return date_str

@app.route('/generate-document', methods=['POST'])
def generate_document():
    try:
        data = request.json
        print("Data diterima:", data) 

        script_dir = os.path.dirname(os.path.abspath(__file__))
        template_path = os.path.join(script_dir, "Template_surat.docx")
        
        if not os.path.exists(template_path):
            return jsonify({"error": f"File template tidak ditemukan di: {template_path}"}), 500

        doc = DocxTemplate(template_path)

        context = {
            'nama_pemohon': data.get('nama_pemohon', ''),
            'unit_kerja': data.get('unit_kerja', ''),
            'jabatan': data.get('jabatan', ''),
            'jenis_kendaraan': data.get('jenis_kendaraan', ''),
            'tempat_tujuan': data.get('tempat_tujuan', ''),
            'jumlah_penumpang': data.get('jumlah_penumpang', ''),
            'keperluan': data.get('keperluan', ''),
            'tgl_mulai_req': format_tanggal_indo(data.get('tgl_mulai_req', '')),
            'jam_mulai_req': data.get('jam_mulai_req', ''),
            'tgl_selesai_req': format_tanggal_indo(data.get('tgl_selesai_req', '')),
            'jam_selesai_req': data.get('jam_selesai_req', ''),
            'nama_pengemudi': data.get('nama_pengemudi', ''),
            'nomor_polisi': data.get('nomor_polisi', ''),
            'km_awal': data.get('km_awal', ''),
            'km_akhir': data.get('km_akhir', ''),
            'lama_penggunaan': data.get('lama_penggunaan', ''),
            'log_berangkat_tgl': format_tanggal_indo(data.get('log_berangkat_tgl', '')),
            'log_berangkat_jam': data.get('log_berangkat_jam', ''),
            'log_kembali_tgl': format_tanggal_indo(data.get('log_kembali_tgl', '')),
            'log_kembali_jam': data.get('log_kembali_jam', ''),
        }

        doc.render(context)

        file_stream = io.BytesIO()
        doc.save(file_stream)
        file_stream.seek(0)

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
    # Ini hanya jalan jika pakai 'python flask_server.py'
    app.run(host='0.0.0.0', port=8000, debug=True)