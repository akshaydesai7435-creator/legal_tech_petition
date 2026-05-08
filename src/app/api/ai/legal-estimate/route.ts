import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Mock response for estimating legal time and costs
    const mockResponse = {
      estimatedDurationDays: 120,
      estimatedCostRange: { min: 1500, max: 4000, currency: "USD" },
      requiredDocuments: ["Identity Proof", "Incident Report", "Prior Correspondence"],
      timelineStages: [
        { stage: "Filing", durationDays: 14 },
        { stage: "Hearings", durationDays: 60 },
        { stage: "Resolution", durationDays: 46 }
      ]
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json({ error: "Failed to estimate legal time and cost" }, { status: 500 });
  }
}
