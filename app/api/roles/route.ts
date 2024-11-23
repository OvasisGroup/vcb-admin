// pages/api/proxy.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user.access_token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = session.user.access_token;
    // const externalUrl = "http://197.155.71.138:6508/authentication/role/getAllRoles";
    const externalUrl = `${process.env.NEXTAUTH_URL_API}/authentication/role/getAllRoles`;

    console.log('NEXTAUTH_URL_API:', process.env.NEXTAUTH_URL_API);

  try {
    const response = await fetch(externalUrl, {
        // method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`,
        // Pass any additional headers if required by the external server
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: response.statusText });
    }

    const data = await response.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

// export async function POST() {
//     const session = await getServerSession(authOptions);
//     if(!session || !session.user.access_token) {
//         return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const accessToken = session.user.access_token;
//     const externalUrl = "http://197.155.71.138:6508/admin/corporate/register";

//   try {
//     const response = await fetch(externalUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "Authorization": `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       return NextResponse.json({ message: response.statusText });
//     }

//     const data = await response.json();
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }
