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
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = await req.json()

  let result: string = ""
 
  // Ask OpenAI for a streaming chat completion given the prompt
  await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 600,
    temperature: 0.9,
    frequency_penalty: 1,
    presence_penalty: 1,
  })
  .then(response => {
    if (response) {

      result = response.choices[0].message.content!
    }
  })
  .catch(error => {
    console.log(error);
    
  })

  if (!result) {
    return NextResponse.json({}, { status: 401 })
  }

  return NextResponse.json({result}, { status: 200 })
}