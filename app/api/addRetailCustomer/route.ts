import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.access_token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { cif, userId, email, phoneNumber } = body;

        // Validate required fields
        if (!cif || !userId || !email || !phoneNumber) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const accessToken = session.user.access_token;
        // Send the POST request to the external API
        const externalResponse = await fetch(`${process.env.NEXTAUTH_URL_API}/admin/customer/add-retail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ cif, userId, email, phoneNumber }),
        });

        // Check response status
        if (!externalResponse.ok) {
            const error = await externalResponse.json();
            return NextResponse.json(
                { error: 'Failed to communicate with the external API', details: error },
                { status: externalResponse.status }
            );
        }
        console.log(externalResponse);
        const responseData = await externalResponse.json();

        // Return the successful response
        return NextResponse.json({ message: 'Success', data: responseData }, { status: 200 });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
