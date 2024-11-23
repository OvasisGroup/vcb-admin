// app/api/register-bank-admin/route.ts
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.access_token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

  try {
    const body = await req.json(); // Read the request body
    const accessToken = session.user.access_token;
    const response = await fetch(`${process.env.NEXTAUTH_URL_API}/admin/registerBankAdmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while processing the request.' }, { status: 500 });
  }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.access_token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      // Call the external API to fetch all admin data
      const response = await fetch(`${process.env.NEXTAUTH_URL_API}/authentication/permissions/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.access_token}`,
        },
      });
  
      // Check if the external API response is OK
      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: errorData }, { status: response.status });
      }
  
      // Parse the response data from the external API
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      // Handle server errors
      return NextResponse.json(
        { error: 'An error occurred while fetching admin data.' },
        { status: 500 }
      );
    }
  }
