import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Mock response for filtering petitions based on user query
    const mockResponse = {
      categories: ["Civil Rights", "Environment"],
      urgencyScore: 85,
      suggestedKeywords: ["justice", "sustainability"],
      relatedCaseIds: ["p-101", "p-204"]
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json({ error: "Failed to process petition filter request" }, { status: 500 });
  }
}
