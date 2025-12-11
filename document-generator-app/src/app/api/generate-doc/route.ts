// app/api/generate/route.ts

import { NextResponse } from "next/server";
import axios from "axios";

// Pastikan ini sesuai dengan port Flask Anda
const PYTHON_API_URL = "http://localhost:5000/generate-document";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Panggil Backend Python (Flask)
    const pythonResponse = await axios.post(PYTHON_API_URL, data, {
      responseType: "arraybuffer", // Menerima data biner (file DOCX)
      // Penting: Pastikan header Content-Type diatur sesuai kebutuhan Flask
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 1. Kesalahan: Variabel docData dideklarasikan dua kali. Kita hanya butuh satu.
    const docData = pythonResponse.data;

    // Siapkan Headers untuk Respons Next.js
    const headers = new Headers();

    // Atur Content-Type untuk file DOCX
    headers.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    // Ambil header Content-Disposition dari Python untuk nama file
    const contentDisposition = pythonResponse.headers["content-disposition"];

    // Salin header nama file ke respons Next.js
    if (contentDisposition) {
      headers.set("Content-Disposition", contentDisposition);
    } else {
      // Fallback nama file jika tidak ada dari Python
      headers.set(
        "Content-Disposition",
        `attachment; filename="Dokumen_NextJs_${Date.now()}.docx"`
      );
    }

    // 2. Kesalahan KRITIS & Perbaikan: Mengembalikan Response.
    // Anda harus mengembalikan objek Response baru, bukan hanya mendeklarasikan headers.
    // Gunakan new Response() dari Web API, yang didukung oleh Next.js App Router.
    return new Response(docData, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    // Penanganan error yang lebih detail
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        "Error response from Python API:",
        error.response.status,
        error.response.data.toString() // Konversi arraybuffer error ke string jika mungkin
      );
    } else {
      console.error("Error in Next.js API Route:", error);
    }

    return NextResponse.json(
      {
        error:
          "Failed to generate document via Python API. Check console logs.",
      },
      { status: 500 }
    );
  }
}
