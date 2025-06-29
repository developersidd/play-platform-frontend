import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Make request to your actual backend
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();
    console.log(" data:", data)

    if (backendResponse.ok) {
      const { tokens } = data.data;
      console.log(" tokens:", tokens)
      
      const response = NextResponse.json(data);
      console.log(" response:", response)
      
      // Set cookies on the same domain (Vercel domain)
      response.cookies.set('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Can use 'lax' since it's same-origin now
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
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
    console.error('Proxy login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Logout


export async function GET(request) {
  const accessToken = request.cookies.get('accessToken')?.value;
  
  if (!accessToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current-user`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const userData = await response.json();
      return NextResponse.json({ authenticated: true, user: userData });
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}