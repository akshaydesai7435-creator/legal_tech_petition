import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Mock response for generating a legal document (e.g., FIR, Legal Notice)
    const mockResponse = {
      documentType: body.type || "Legal Notice",
      documentText: "[YOUR NAME]\n[YOUR ADDRESS]\n\nDate: [CURRENT DATE]\n\nTo:\n[RECIPIENT NAME]\n[RECIPIENT ADDRESS]\n\nSubject: Legal Notice regarding [SUBJECT]\n\nDear Sir/Madam,\n\nUnder instructions from my client, I hereby serve you this notice...\n\nSincerely,\n[LAWYER/SENDER NAME]",
      missingFields: ["Sender Address", "Recipient Name"],
      warnings: ["This document requires physical signature", "Please verify local jurisdiction laws"]
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate legal document" }, { status: 500 });
  }
}
