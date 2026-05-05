import { NextResponse } from 'next/server';

export async function GET() {
  const hasKey = !!process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const keyPrefix = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.substring(0, 10);
  
  return NextResponse.json({ 
    hasKey, 
    keyPrefix: keyPrefix || 'none',
    message: hasKey ? 'API key found' : 'API key missing'
  });
}