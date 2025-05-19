import { NextResponse } from "next/server";

export async function GET() {
  const initialPrompt =
    "Welcome to the Crop Disease Detection Assistant! I'm here to help you identify and manage crop diseases. How can I assist you with your crops today?";

  return NextResponse.json({ reply: initialPrompt });
}
