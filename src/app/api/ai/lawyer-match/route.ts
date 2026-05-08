import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Mock response for matching lawyers to a case
    const mockResponse = {
      matches: [
        { lawyerId: "l-001", name: "Adv. Sarah Jenkins", compatibilityScore: 98, reason: "Expertise in similar civil rights cases." },
        { lawyerId: "l-003", name: "Adv. Michael Chen", compatibilityScore: 85, reason: "High success rate in local courts." }
      ]
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json({ error: "Failed to process lawyer matching request" }, { status: 500 });
  }
}
