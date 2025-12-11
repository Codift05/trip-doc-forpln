"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Download,
  Loader2,
  CheckCircle,
  XCircle,
  Zap,
  Users,
  BookOpen,
} from "lucide-react";

export default function PermohonanKendaraanForm() {
  // --- State untuk Data Formulir (PERMOHONAN) ---
  const [namaPemohon, setNamaPemohon] = useState("");
  const [unitKerja, setUnitKerja] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [tempatTujuan, setTempatTujuan] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [jumlahPenumpang, setJumlahPenumpang] = useState<number | string>(1);

  const [tglMulai, setTglMulai] = useState("");
  const [jamMulai, setJamMulai] = useState("08:00");

  const [tglSelesai, setTglSelesai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("17:00");

  // --- State untuk Data LOGISTIK & PENCATATAN (BARU) ---
  const [namaPengemudi, setNamaPengemudi] = useState("");
  const [nomorPolisi, setNomorPolisi] = useState("");
  const [kmAwal, setKmAwal] = useState<number | string>("");
  const [kmAkhir, setKmAkhir] = useState<number | string>("");
  const [logBerangkatTgl, setLogBerangkatTgl] = useState("");
  const [logBerangkatJam, setLogBerangkatJam] = useState("");
  const [logKembaliTgl, setLogKembaliTgl] = useState("");
  const [logKembaliJam, setLogKembaliJam] = useState("");
  const [lamaPenggunaan, setLamaPenggunaan] = useState("");

  // --- State untuk Status Aplikasi ---
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  // --- Data Opsi Pilihan ---
  const JABATAN_OPTIONS = ["Asman", "Team Leader", "Supervisor", "Staf"];
  const JENIS_KENDARAAN_OPTIONS = [
    "Mobil Dinas",
    "Minibus Operasional",
    "Pick Up Operasional",
    "Motor Dinas",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("loading");
    setMessage("Sedang memproses Permohonan Dokumen...");

    try {
      // Data LENGKAP yang dikirim ke API Route
      const submissionData = {
        // Data Permohonan
        nama_pemohon: namaPemohon,
        unit_kerja: unitKerja,
        jabatan: jabatan,
        jenis_kendaraan: jenisKendaraan,
        tempat_tujuan: tempatTujuan,
        keperluan: keperluan,
        jumlah_penumpang: jumlahPenumpang,

        tgl_mulai_req: tglMulai,
        jam_mulai_req: jamMulai,

        tgl_selesai_req: tglSelesai,
        jam_selesai_req: jamSelesai,

        // Data Logistik
        nama_pengemudi: namaPengemudi,
        nomor_polisi: nomorPolisi,
        km_awal: kmAwal,
        km_akhir: kmAkhir,
        log_berangkat_tgl: logBerangkatTgl,
        log_berangkat_jam: logBerangkatJam,
        log_kembali_tgl: logKembaliTgl,
        log_kembali_jam: logKembaliJam,
        lama_penggunaan: lamaPenggunaan,
      };

      const response = await axios.post("/api/generate-doc", submissionData, {
        responseType: "blob",
      });

      // --- Logika Unduh File ---
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "Formulir_Permohonan_Kendaraan.docx";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/i);
        if (match && match[1]) {
          fileName = match[1].replace(/['"]/g, "");
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setMessage(`✅ Formulir **${fileName}** berhasil dibuat dan diunduh.`);
      setStatus("success");
    } catch (error) {
      console.error("Error generating document:", error);

      let errorMessage =
        "❌ Gagal membuat dokumen. Cek koneksi server Python atau template.";

      if (axios.isAxiosError(error) && error.response) {
        try {
          const errorText = await error.response.data.text();
          const errorJson = JSON.parse(errorText);

          if (errorJson.error) {
            errorMessage = `❌ ${errorJson.error}`;
          }
        } catch (e) {
          // Tidak bisa parsing JSON, gunakan pesan default
        }
      }

      setMessage(errorMessage);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // --- Styling Mode Malam ---
  const primaryColor = "text-cyan-400";
  const secondaryColor = "text-gray-300";

  const getStatusStyle = () => {
    if (status === "success")
      return "bg-green-900 text-green-300 border-green-600";
    if (status === "error") return "bg-red-900 text-red-300 border-red-600";
    return "bg-blue-900 text-blue-300 border-blue-600";
  };

  const buttonClasses = `w-full py-3 px-4 flex items-center justify-center space-x-2 
                            rounded-xl shadow-xl transition duration-300 
                            ${
                              loading
                                ? "bg-cyan-600 opacity-70 cursor-not-allowed"
                                : "bg-cyan-500 hover:bg-cyan-400 hover:shadow-cyan-500/50"
                            } 
                            text-gray-900 font-bold uppercase tracking-wider`;

  const inputClass = `mt-1 block w-full rounded-lg border-2 border-gray-700 shadow-inner p-3 
                        bg-gray-800 ${secondaryColor} placeholder-gray-500 
                        focus:border-cyan-500 focus:ring-cyan-500 transition duration-150`;

  const cardBackground = "bg-gray-800 border border-gray-700";
  const headerText = "text-white";
  const sectionHeader = "text-cyan-400";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4`}
    >
      <div
        className={`p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-3xl transform transition duration-500 ${cardBackground} shadow-cyan-900/50`}
      >
        {/* Header */}
        <h1
          className={`text-3xl font-extrabold mb-2 ${headerText} flex items-center border-b border-gray-700 pb-2`}
        >
          <Zap className={`w-8 h-8 ${primaryColor} mr-3`} />
          Form Permohonan Kendaraan Dinas Operasional
        </h1>
        <p className={`text-gray-500 mb-6`}>
          PT PLN (PERSERO) UIP3B SULAWESI UPT MANADO
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... (BAGIAN 1: DETAIL PEMOHON & PENGAJUAN) ... */}
          <div className={`p-4 rounded-xl shadow-md ${cardBackground}`}>
            <h2 className={`text-lg font-bold ${sectionHeader} mb-3`}>
              1. Detail Pemohon & Pengajuan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama Pemohon */}
              <div>
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Nama Pemohon
                </label>
                <input
                  type="text"
                  value={namaPemohon}
                  onChange={(e) => setNamaPemohon(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Nama Lengkap"
                />
              </div>

              {/* Unit Kerja */}
              <div>
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Unit Kerja / Departemen
                </label>
                <input
                  type="text"
                  value={unitKerja}
                  onChange={(e) => setUnitKerja(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Contoh: HRD / Distribusi"
                />
              </div>

              {/* Jabatan (Dropdown) */}
              <div className="md:col-span-1">
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Jabatan
                </label>
                <select
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  required
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="text-gray-400">
                    Pilih Jabatan
                  </option>
                  {JABATAN_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      className="bg-gray-800 text-white"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Jenis Kendaraan (Dropdown) */}
              <div className="md:col-span-1">
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Jenis Kendaraan
                </label>
                <select
                  value={jenisKendaraan}
                  onChange={(e) => setJenisKendaraan(e.target.value)}
                  required
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="text-gray-400">
                    Pilih Jenis Kendaraan
                  </option>
                  {JENIS_KENDARAAN_OPTIONS.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      className="bg-gray-800 text-white"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Banyaknya Penumpang */}
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1 flex items-center`}
                >
                  <Users className="w-4 h-4 mr-2" /> Banyaknya Penumpang (Orang)
                </label>
                <input
                  type="number"
                  min="1"
                  value={jumlahPenumpang}
                  onChange={(e) => setJumlahPenumpang(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Jumlah orang yang ikut dalam perjalanan"
                />
              </div>
            </div>
          </div>

          {/* ... (BAGIAN 2: RENCANA PEMAKAIAN) ... */}
          <div className={`p-4 rounded-xl shadow-md ${cardBackground}`}>
            <h2 className={`text-lg font-bold ${sectionHeader} mb-3`}>
              2. Rencana Pemakaian
            </h2>

            {/* Keperluan (Diisi dengan jelas) */}
            <div className="mb-4">
              <label
                className={`block text-sm font-bold ${secondaryColor} mb-1`}
              >
                Keperluan (Diisi dengan jelas)
              </label>
              <textarea
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                required
                rows={2}
                className={inputClass}
                placeholder="Contoh: Kunjungan ke Gardu Induk Pembangkit A..."
              />
            </div>

            {/* Tujuan Perjalanan */}
            <div className="mb-4">
              <label
                className={`block text-sm font-bold ${secondaryColor} mb-1`}
              >
                Tempat Tujuan
              </label>
              <input
                type="text"
                value={tempatTujuan}
                onChange={(e) => setTempatTujuan(e.target.value)}
                required
                className={inputClass}
                placeholder="Contoh: Gardu Induk Pembangkit A, Minahasa"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Tanggal Mulai */}
              <div>
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Tgl Mulai
                </label>
                <input
                  type="date"
                  value={tglMulai}
                  onChange={(e) => setTglMulai(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              {/* Jam Mulai */}
              <div>
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Jam Mulai (WITA)
                </label>
                <input
                  type="time"
                  value={jamMulai}
                  onChange={(e) => setJamMulai(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              {/* Tanggal Selesai */}
              <div>
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Tgl Selesai
                </label>
                <input
                  type="date"
                  value={tglSelesai}
                  onChange={(e) => setTglSelesai(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              {/* Jam Selesai */}
              <div>
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Jam Selesai (WITA)
                </label>
                <input
                  type="time"
                  value={jamSelesai}
                  onChange={(e) => setJamSelesai(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* --- BAGIAN 3: LOGISTIK DAN PENCATATAN PENGGUNAAN (BARU) --- */}
          <div className={`p-4 rounded-xl shadow-md ${cardBackground}`}>
            <h2
              className={`text-lg font-bold ${sectionHeader} mb-3 flex items-center`}
            >
              <BookOpen className="w-5 h-5 mr-2" /> 3. Pencatatan Logistik
              (Diisi Pengemudi / Admin)
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Bagian ini mencatat detail penggunaan aktual kendaraan.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Nama Pengemudi */}
              <div className="col-span-2">
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Pengemudi
                </label>
                <input
                  type="text"
                  value={namaPengemudi}
                  onChange={(e) => setNamaPengemudi(e.target.value)}
                  className={inputClass}
                  placeholder="Nama Driver"
                />
              </div>

              {/* Nomor Polisi */}
              <div className="col-span-2">
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Nomor Polisi
                </label>
                <input
                  type="text"
                  value={nomorPolisi}
                  onChange={(e) => setNomorPolisi(e.target.value)}
                  className={inputClass}
                  placeholder="Contoh: DB 1234 A"
                />
              </div>

              {/* KM Awal */}
              <div className="col-span-2 md:col-span-1">
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Stand KM Awal
                </label>
                <input
                  type="number"
                  value={kmAwal}
                  onChange={(e) => setKmAwal(e.target.value)}
                  className={inputClass}
                  placeholder="KM Awal"
                />
              </div>

              {/* KM Akhir */}
              <div className="col-span-2 md:col-span-1">
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  KM Akhir
                </label>
                <input
                  type="number"
                  value={kmAkhir}
                  onChange={(e) => setKmAkhir(e.target.value)}
                  className={inputClass}
                  placeholder="KM Akhir"
                />
              </div>

              {/* Lama Penggunaan */}
              <div className="col-span-2 md:col-span-2">
                <label
                  className={`block text-sm font-bold ${secondaryColor} mb-1`}
                >
                  Lamanya Kendaraan dipergunakan (Hari/Jam)
                </label>
                <input
                  type="text"
                  value={lamaPenggunaan}
                  onChange={(e) => setLamaPenggunaan(e.target.value)}
                  className={inputClass}
                  placeholder="Contoh: 3 Hari / 24 Jam"
                />
              </div>

              <div className="col-span-2 border-t border-gray-700 pt-3">
                <h4 className={`text-sm font-semibold ${secondaryColor} mb-2`}>
                  Berangkat
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="date"
                      value={logBerangkatTgl}
                      onChange={(e) => setLogBerangkatTgl(e.target.value)}
                      className={inputClass}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tanggal Berangkat
                    </p>
                  </div>
                  <div>
                    <input
                      type="time"
                      value={logBerangkatJam}
                      onChange={(e) => setLogBerangkatJam(e.target.value)}
                      className={inputClass}
                    />
                    <p className="text-xs text-gray-500 mt-1">Jam Berangkat</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2 border-t border-gray-700 pt-3">
                <h4 className={`text-sm font-semibold ${secondaryColor} mb-2`}>
                  Kembali
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="date"
                      value={logKembaliTgl}
                      onChange={(e) => setLogKembaliTgl(e.target.value)}
                      className={inputClass}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tanggal Kembali
                    </p>
                  </div>
                  <div>
                    <input
                      type="time"
                      value={logKembaliJam}
                      onChange={(e) => setLogKembaliJam(e.target.value)}
                      className={inputClass}
                    />
                    <p className="text-xs text-gray-500 mt-1">Jam Kembali</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Submit */}
          <button type="submit" disabled={loading} className={buttonClasses}>
            {loading && <Loader2 className="animate-spin h-5 w-5 mr-3" />}
            {!loading && status === "success" ? (
              <Download className="h-5 w-5 mr-2" />
            ) : null}
            {loading
              ? "Mengirim & Memproses Dokumen..."
              : "AJUKAN & UNDUH FORMULIR"}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-xl border ${getStatusStyle()} flex items-center space-x-3`}
          >
            {status === "success" && <CheckCircle className="h-5 w-5" />}
            {status === "error" && <XCircle className="h-5 w-5" />}
            {status === "loading" && (
              <Loader2 className="animate-spin h-5 w-5" />
            )}
            <p
              className="text-sm font-medium"
              dangerouslySetInnerHTML={{
                __html: message.replace(
                  /\*\*(.*?)\*\*/g,
                  "<strong>$1</strong>"
                ),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
