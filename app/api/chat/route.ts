import OpenAI from 'openai';
import { NextResponse } from 'next/server';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 600,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const result = response.choices[0].message.content

  return NextResponse.json(result)
}