import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    //console.log(" body:", body)

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const data = await backendResponse.json();
    //console.log(" refresh data from api route:", data);
    const response = NextResponse.json(data);

    if (backendResponse.ok) {
      return response;
    } else {
      return NextResponse.json(
        data,
        { status: backendResponse.status }
      );
    }
  } catch (error) {
    console.error("Proxy refresh token error:", error);
    return NextResponse.json(
      { error: "There was an error occurred" },
      { status: 500 }
    );
  }
}
