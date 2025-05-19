import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `
You are an AI assistant specialized in crop disease detection and agricultural support.
Your role is to help farmers identify potential diseases in crops, suggest possible causes,
recommend preliminary treatments, and guide them on best agricultural practices.
Always respond with clear, practical, and supportive information—even if the user is not a technical expert.
Ask follow-up questions when needed to improve diagnosis and advice.
`;

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  try {
    const chat = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await chat.generateContent(
      `${SYSTEM_PROMPT} This is the conversation history: ${history
        .map((msg: any) => `${msg.role}: ${msg.content}`)
        .join("\n")}\nUser: ${message}\nAI:`
    );
    const reply = result.response.text();

    return NextResponse.json({
      reply,
      role: "bot",
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({
      reply: "Sorry, something went wrong while generating a response.",
      role: "bot",
    });
  }
}
