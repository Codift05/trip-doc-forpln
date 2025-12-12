// app/api/generate-doc/route.ts

import { NextResponse } from "next/server";

// Support both local development and production
const PYTHON_API_URL = 
  process.env.PYTHON_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? '/api/python/generate-document' 
    : 'http://localhost:5000/generate-document');

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Call Python Backend (Local Flask or Vercel Serverless Function)
    const pythonResponse = await fetch(PYTHON_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!pythonResponse.ok) {
      const errorData = await pythonResponse.json();
      throw new Error(errorData.error || 'Python API error');
    }

    const responseData = await pythonResponse.json();

    // Check if response contains base64 file (Vercel serverless format)
    if (responseData.file && responseData.filename) {
      // Decode base64 to binary
      const fileBuffer = Buffer.from(responseData.file, 'base64');

      // Set headers for file download
      const headers = new Headers();
      headers.set(
        "Content-Type",
        responseData.mimetype || "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      headers.set(
        "Content-Disposition",
        `attachment; filename="${responseData.filename}"`
      );

      return new Response(fileBuffer, {
        status: 200,
        headers: headers,
      });
    }

    // Fallback for direct binary response (local Flask)
    const arrayBuffer = await pythonResponse.arrayBuffer();
    const headers = new Headers();
    
    headers.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    
    const contentDisposition = pythonResponse.headers.get("content-disposition");
    if (contentDisposition) {
      headers.set("Content-Disposition", contentDisposition);
    } else {
      headers.set(
        "Content-Disposition",
        `attachment; filename="Dokumen_${Date.now()}.docx"`
      );
    }

    return new Response(arrayBuffer, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error in Next.js API Route:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate document",
      },
      { status: 500 }
    );
  }
}
