import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();
    //console.log(" login data from api route:", data)

    if (backendResponse.ok) {
      const { tokens } = data.data;
      //console.log(" tokens from APP route.js:", tokens)
      
      const response = NextResponse.json(data);
      
      // Set cookies on the same domain (Vercel domain)
      response.cookies.set('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', 
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
      });
      
      response.cookies.set('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      
      return response;
    } else {
      return NextResponse.json(data, { status: backendResponse.status });
    }
  } catch (error) {
    //console.error('Proxy login error:', error);
    return NextResponse.json(
      { error: 'There was an error logging in' },
      { status: 500 }
    );
  }
}
