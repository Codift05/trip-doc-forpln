from http.server import BaseHTTPRequestHandler
from docxtpl import DocxTemplate
from datetime import datetime
import json
import io
import os
import base64

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

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. Read request body
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # 2. Load Template Word
            # Di Vercel, path dari root project
            script_dir = os.path.dirname(os.path.abspath(__file__))
            template_path = os.path.join(script_dir, "..", "Python_Backend", "Template_surat.docx")
            
            if not os.path.exists(template_path):
                self.send_error_response(f"File template tidak ditemukan di: {template_path}")
                return

            doc = DocxTemplate(template_path)

            # 3. Siapkan Context
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

            # 4. Render Dokumen
            doc.render(context)

            # 5. Simpan ke Memory Stream
            file_stream = io.BytesIO()
            doc.save(file_stream)
            file_stream.seek(0)

            # 6. Return sebagai base64 untuk Vercel
            file_content = file_stream.getvalue()
            file_base64 = base64.b64encode(file_content).decode('utf-8')
            
            filename = f"Permohonan_Kendaraan_{data.get('nama_pemohon', 'User')}.docx"
            
            response_data = {
                "success": True,
                "file": file_base64,
                "filename": filename,
                "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }
            
            # Send response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))

        except Exception as e:
            self.send_error_response(str(e))

    def send_error_response(self, error_message):
        self.send_response(500)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        error_data = {"error": error_message}
        self.wfile.write(json.dumps(error_data).encode('utf-8'))
