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

    if (backendResponse.ok) {
      const { tokens } = data.data;      
      const response = NextResponse.json(data);
      response.cookies.set('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      
      response.cookies.set('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
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
