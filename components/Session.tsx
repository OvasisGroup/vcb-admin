'use server'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function UserSession() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div>Signed in</div>
        )
    }
  return (
    <div>
        {session.user.email}
    </div>
  )
}
