// app/api/enquiry/cif-details/route.ts
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.access_token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
  try {
    const { cif } = await req.json(); // Get CIF value from the request body

    const accessToken = session.user.access_token;
    // Construct the URL for the CIF search
    const url = `${process.env.NEXTAUTH_URL_API}/admin/enquiry/cif-details/${cif}`;
    
    // Make the fetch request to the CIF details endpoint
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`,
        // You can add additional headers like Authorization if needed
      },
    });

    // If the response is not ok, return an error response
    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to fetch CIF details' }, { status: response.status });
    }

    // Parse the response and return it
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
