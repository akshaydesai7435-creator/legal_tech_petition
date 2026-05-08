import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Mock response for generating a petition draft
    const mockResponse = {
      draftTitle: "Urgent Action Required: Stop Deforestation in Valley Region",
      draftContent: "We, the undersigned, strongly urge the local authorities to immediately halt the proposed logging activities in the Valley Region. This area is home to endangered species and serves as a critical carbon sink...",
      confidenceScore: 92,
      suggestedNextSteps: ["Review draft with a lawyer", "Add 3 more supporting references"]
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate petition draft" }, { status: 500 });
  }
}
