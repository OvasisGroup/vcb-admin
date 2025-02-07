"use client"
import { getSession, signIn } from 'next-auth/react';
import { ReactElement, useState } from 'react';
// Update the import path according to your setup
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { useToast } from '../hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image'


export default function SignIn() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    sessionStorage.clear();

    const result = await signIn('credentials', {
      redirect: true,
      userId,
      password,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Incorrect Username/Password.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      try {
        // Fetch the session after successful login
        const session = await getSession();
        console.log("Login Page Session:", session);

        const accessToken = session?.user?.access_token;

        sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
        sessionStorage.setItem(
          "userId",
          JSON.stringify(session?.user?.userId)
        );
        console.log("customerId", session?.user?.userId);
        // Check if it's the first login
        if (session?.user?.firstLogin) {
          // Navigate to the reset password page if it's the first login
          router.push("/change-password");
        } else {
          // Navigate to the verification page if it's not the first login
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='hidden md:flex flex-col w-1/2 bg-vcblue flex items-center justify-center bg-[url(/assets/images/background-login-min.jpg)] bg-no-repeat bg-center bg-cover'>
        <h2 className='text-white font-extrabold text-4xl' >Welcome to Victoria Bank<br />
          <span className='text-vcbgold'>Administration Portal</span></h2>
      </div>
      <div className='flex-1 bg-white flex items-center justify-center p-10'>
        <form onSubmit={handleSubmit} className=''>
          <div className='flex flex-col justify-center items-center pb-4'>
          <Image
            width={180}
            height={75}
            className="p-4 mt-4"
            src="/assets/images/vcblogo.svg"
            alt="logo"
          />
          <p>Please sign in to continue</p>
          </div>
          <input type="text" placeholder='User ID' value={userId} onChange={(e) => setUserId(e.target.value)} className='w-full border p-2 rounded-md mb-2 font-light border-vcblue' />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border p-2 rounded-md mb-2 font-light border-vcblue' />
          <Button type="submit" className='w-full bg-vcblue text-white hover:bg-vcbgold'>Sign In</Button>
        </form>
      </div>
    </div>
  )

}



