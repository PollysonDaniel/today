import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages: [{ role: 'user', content: 'Say "Hello World"' }],
    });
    
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}