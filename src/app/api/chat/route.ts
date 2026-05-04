import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Removed logging for production
    
    const response = await fetch('http://143.47.101.16:5678/webhook/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: body.message }),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.text();
    // The incoming text already contains actual newlines, 
    // but may be escaped with literal backslashes for some characters.
    // The prompt asks to handle \\n and \n explicitly to ensure they become real newlines
    // even if they arrive as literals from N8N.
    const cleanText = data
      .replace(/\\\\n/g, '\n')
      .replace(/\\n/g, '\n')
      // Remove spaces at the start of lines to help markdown lists render correctly
      .replace(/\n\s+-/g, '\n-')
      // Ensure double newlines exist where expected
      .replace(/\n\s*\n/g, '\n\n');

    return new Response(JSON.stringify({ reply: cleanText }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Keep error logging in production for troubleshooting, 
    // but remove verbose "Proxying message" log
    console.error('Chat API Error:', error);
    return NextResponse.json({ message: 'Error: Cannot connect to backend' }, { status: 500 });
  }
}
